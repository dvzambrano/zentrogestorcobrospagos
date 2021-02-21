<?php

/**
 * BarTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class BarTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object BarTable
     */
    public static function getInstance() {
        return Doctrine_Core::getTable(self::table);
    }

    private static function formatData($array, $page, $count = false) {
        $rows = array();

        $pos = 0;
        foreach ($array as $row) {
            $rows[] = $row->toArray();
            $rows[$pos]['tax'] = $row->getTax()->getName();
            $rows[$pos]['deleteable'] = true;

            $pos++;
        }

        $rows = array(
            'metaData' => array(
                'idProperty' => 'id',
                'root' => 'data',
                'totalProperty' => 'results',
                'fields' => array(
                    array('name' => 'id', 'type' => 'int'),
                    array('name' => 'deleteable', 'type' => 'bool'),
                    array('name' => 'code', 'type' => 'string')
                    , array('name' => 'year', 'type' => 'int')
                    , array('name' => 'month', 'type' => 'int')
                    , array('name' => 'general', 'type' => 'string')
                    , array('name' => 'simplified', 'type' => 'string')
                    , array('name' => 'taxid', 'type' => 'int')
                    , array('name' => 'tax', 'type' => 'string')
                ),
                'sortInfo' => array(
                    'field' => 'id',
                    'direction' => 'ASC'
                )
            ),
            'success' => true,
            'message' => 'app.msg.info.loadedsuccessful',
            'results' => $count ? $count : Doctrine_Query::create()->from(self::table . ' b')->count(),
            'data' => $rows,
            'page' => $page
        );
        return $rows;
    }

    const table = 'Bar';
    const akfield = 'code';

    public static function getAllPaged($start, $limit, $query, $filters) {
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $query, $filters, true, self::akfield);
        return self::formatData($query['results'], $query['page'], $query['count']);
    }

    public static function findByAK($ak) {
        return BaseTable::findByAK(self::table, self::akfield, $ak);
    }

    public static function getIncomesAtPeriod($personid, $activityid, $from, $to) {
        $publicservicecode = Util::getMetadataValue('app_publicservice');


        // STEP 1: getting requested person
        $person = PersonTable::getInstance()->getPersonANDUser($personid);

        $percents = $person->getPercents();
        $taxXpercent = $percents['taxXpercent'];



        // activity asociated taxes
        $q = Doctrine_Query::create()
                ->select('p.id, a.*, p.*, t.*, b.*')
                ->from('Bar b')
                ->leftJoin('b.Tax t')
                ->leftJoin('t.Activities a')
                ->leftJoin('a.Persons p')
                ->where('p.id = ? AND a.id = ? AND t.code = ?', array($personid, $activityid, $publicservicecode));
        $bars = $q->execute();

        $total = 0;
        foreach ($bars as $bar) {
            $q = Doctrine_Query::create()
                    ->select('r.*')
                    ->from('PersonPaymentRelation r')
                    ->where('r.person_id = ? AND r.payment_id = ?', array($personid, $bar->getId()));
//                    ->where('r.person_id = ? AND r.payment_id = ? AND r.paymentdate >= ? AND r.paymentdate <= ?', array($personid, $bar->getId(), $from, $to));
            $payments = $q->execute();

            foreach ($payments as $payment)
                $total += $payment->getAmount();
        }

        $total = $total * 100 / $taxXpercent;

        return round($total, 2);
    }

    public static function getAllToPay($personid, $month = false) {
        if (!$month)
            $month = date('m');

        $date = date_create_from_format('Y-m-d', date('Y') . '-' . $month . '-15');

        // STEP 1: getting requested person
        $person = PersonTable::getInstance()->getPersonANDUser($personid);

        // validating regime
        $thissimplified = $person->isSimplified();


        $percents = $person->getPercents();
        $taxXpercent = $percents['taxXpercent'];
        $tax4activity = $percents['tax4activity'];

        //----------------------------------------------------------------------        
        // STEP 2: getting bars
        $bars = array();
        // patent tax
        $patentcode = Util::getMetadataValue('app_patentcode');
        $q = Doctrine_Query::create()
                ->select('b.*, t.*')
                ->from('Bar b')
                ->leftJoin('b.Tax t')
                ->where('t.code = ? AND b.year = ? AND b.month = ?', array($patentcode, $date->format('Y'), $date->format('m')));
        $bars = self::prepareBars($bars, $q->execute(), $tax4activity, true, $personid);

        if (!$thissimplified) {
            $publicservicecode = Util::getMetadataValue('app_publicservice');
            $q = Doctrine_Query::create()
                    ->select('b.*, t.*')
                    ->from('Bar b')
                    ->leftJoin('b.Tax t')
                    ->where('t.code = ? AND b.year = ? AND b.month = ?', array($publicservicecode, $date->format('Y'), $date->format('m')));
            $bars = self::prepareBars($bars, $q->execute(), $taxXpercent, false, $personid);

            // activity asociated taxes
            $q = Doctrine_Query::create()
                    ->select('p.id, a.*, p.*, t.*, b.*')
                    ->from('Bar b')
                    ->leftJoin('b.Tax t')
                    ->leftJoin('t.Activities a')
                    ->leftJoin('a.Persons p')
                    ->where('t.code != ? AND t.code != ? AND p.id = ? AND b.year = ? AND b.month = ?', array($patentcode, $publicservicecode, $personid, $date->format('Y'), $date->format('m')));
            $bars = self::prepareBars($bars, $q->execute(), false, false, $personid);
        }

        // person asociated taxes
        $q = Doctrine_Query::create()
                ->select('p.id, a.*, p.*, t.*, b.*')
                ->from('Bar b')
                ->leftJoin('b.Tax t')
                ->leftJoin('t.TaxPersonRelation pr')
                ->where('pr.person_id = ? AND b.year = ? AND b.month = ?', array($personid, $date->format('Y'), $date->format('m')));
        $bars = self::prepareBars($bars, $q->execute(), false, false, $personid);

        $result = array();

        foreach ($bars as $monthbar) {
            foreach ($monthbar as $bar) {
                $result[] = $bar;

                $result[count($result) - 1]['period'] = $bar['monthstr'] . ' | 20 / ' . $bar['monthpayment'] . ' / ' . $bar['yearpayment'];
                $result[count($result) - 1]['bar'] = $bar['simplified'];
                if (!$thissimplified)
                    $result[count($result) - 1]['bar'] = $bar['general'];

                $result[count($result) - 1]['taxname'] = $bar['Tax']['name'];
            }
        }

        $rows = array(
            'metaData' => array(
                'idProperty' => 'id',
                'root' => 'data',
                'totalProperty' => 'results',
                'fields' => array(
                    array('name' => 'id', 'type' => 'int'),
                    array('name' => 'colectorid', 'type' => 'int'),
                    array('name' => 'colector', 'type' => 'string'),
                    array('name' => 'taxcode', 'type' => 'string'),
                    array('name' => 'taxname', 'type' => 'string'),
                    array('name' => 'period', 'type' => 'string'),
                    array('name' => 'bar', 'type' => 'string'),
                    array('name' => 'amount', 'type' => 'decimal'),
                    array('name' => 'amountstr', 'type' => 'string'),
                    array('name' => 'payed', 'type' => 'decimal'),
                    array('name' => 'paymentdate', 'type' => 'date'),
                    array('name' => 'deposited', 'type' => 'bool')
                ),
                'sortInfo' => array(
                    'field' => 'id',
                    'direction' => 'ASC'
                )
            ),
            'success' => true,
            'message' => 'app.msg.info.loadedsuccessful',
            'results' => count($result),
            'data' => $result,
            'page' => 1
        );
        return $rows;
    }

    public static function getAll($query) {
        $q = Doctrine_Query::create()
                ->from(self::table . ' cbr');

        if ($query && $query != '')
            $q = Doctrine_Query::create()
                    ->select('cbr.*')
                    ->from(self::table . ' cbr')
                    ->where('cbr.taxid = ?', $query);

        return self::formatData($q->execute(), 1);
    }

    public static function deleteByPK($pks) {
        return BaseTable::deleteByPK(self::getInstance(), $pks);
    }

    public static function prepareBars($result, $bars, $amount, $fixed, $personid) {
        $months = array(1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril', 5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto', 9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre');

        foreach ($bars as $bar) {
            if (!isset($result[$bar->getMonth()]))
                $result[$bar->getMonth()] = array();
            if (!isset($result[$bar->getMonth()][$bar->getTax()->getCode()]))
                $result[$bar->getMonth()][$bar->getTax()->getCode()] = array();

            $b = $bar->toArray();

            if (!$amount) {
                $b['amount'] = 0;
                $b['fixed'] = true;

                foreach ($bar->getTax()->getTaxPersonRelation() as $relation) {
                    if ($relation->getFixed() && $relation->getAmount() > $b['amount'] &&
                            $personid && $personid > 0 && $relation->getPersonId() == $personid)
                        $b['amount'] = $relation->getAmount();
                    else
                    if ($result[$bar->getMonth()][$bar->getTax()->getCode()]['amount'] > 0)
                        $b['amount'] = $result[$bar->getMonth()][$bar->getTax()->getCode()]['amount'];


                    $b['fixed'] = $relation->getFixed();
                }

                foreach ($bar->getTax()->getTaxActivityRelation() as $relation)
                    if ($relation->getFixed() && $relation->getAmount() > $b['amount']) {
                        $b['amount'] = $relation->getAmount();
                        $b['fixed'] = $relation->getFixed();
                    }

                if ($b['fixed'])
                    $b['amountstr'] = '$' . $b['amount'];
                else
                    $b['amountstr'] = $b['amount'] . '%';
            }
            else {
                $b['amount'] = $amount;
                $b['fixed'] = $fixed;
                if ($fixed)
                    $b['amountstr'] = '$' . $amount;
                else
                    $b['amountstr'] = $amount . '%';
            }

            $b['taxcode'] = $bar->getTax()->getCode();

            $b['monthstr'] = $months[$bar->getMonth()];
            $b['monthpayment'] = $bar->getMonth() + 1;

            $b['yearpayment'] = $bar->getYear();
            if ($b['monthpayment'] == 13) {
                $b['monthpayment'] = 1;
                $b['yearpayment']++;
            }
            $b['monthpayment'] = $months[$b['monthpayment']];



            $q = Doctrine_Query::create()
                    ->select('r.*')
                    ->from('PersonPaymentRelation r')
                    ->where('r.person_id = ? AND r.payment_id = ?', array($personid, $b['id']));
            $payment = $q->fetchOne();
            if ($payment) {
                // , paymentdate, colector, deposited
                $b['payed'] = $payment->getAmount();
                $b['paymentdate'] = $payment->getPaymentdate();
                $b['colectorid'] = $payment->getColectorId();
                $b['colector'] = $payment->getColector()->getSfGuardUser()->getFirstName() . ' ' . $payment->getColector()->getSfGuardUser()->getLastName();
                $b['deposited'] = $payment->getDeposited();
            }

            $result[$bar->getMonth()][$bar->getTax()->getCode()] = $b;
        }
        return $result;
    }

}