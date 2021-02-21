<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage transaction
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class transactionActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        if ($request->getParameter('query'))
            $query->query = $request->getParameter('query');
        if ($request->getParameter('is_active'))
            $query->is_active = $request->getParameter('is_active');

        switch ($request->getParameter('component')) {

            case 'combo':
                $rows = TransactionTable::getInstance()->getAll($query->query);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $filter = json_decode(stripslashes($request->getParameter('filter')));

                if ($request->getParameter('entityid') && $request->getParameter('entityid') != '') {
                    $obj = new stdClass();
                    $obj->type = "int";
                    $obj->field = "entityid";
                    $obj->comparison = "eq";
                    $obj->value = $request->getParameter('entityid');
                    $filter[] = $obj;
                }

                $rows = TransactionTable::getInstance()->getAllPaged($start, $limit, $query, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        if ($request->getParameter('activityid') && $request->getParameter('activityid') != '' &&
                $request->getParameter('personid') && $request->getParameter('personid') != '') {
            
            $transactions = json_decode($request->getParameter('transactions'));

            foreach ($transactions as $transaction) {
                $t = new Transaction();
                $t->setCreationdate($transaction->transactiondate);
                $t->setComment($transaction->comment);
                $t->setDebit($transaction->debit);
                $t->setCredit($transaction->credit);
                $t->setPersonId($request->getParameter('personid'));
                $t->setActivityId($request->getParameter('activityid'));

                $regannexes = json_decode($transaction->regannex);
                foreach ($regannexes as $regannex) {
                    $ra = new Regannex();
                    $ra->setElementId($regannex->id);
                    $ra->setAmount($regannex->debit);

                    $t->Regannexs[] = $ra;
                }

                $t->save();
                sfContext::getInstance()->getLogger()->alert('Salvada transaccion ' . $t->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
            }
        }
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Transaction')->deleteByPK($pks);
    }

    public function executeReporttransactionbalance(sfWebRequest $request) {
        $this->host = 'http' . ($request->isSecure() ? 's' : '') . '://' . $request->getHost();

        $this->user = Doctrine::getTable('sfGuardUser')->retrieveByUsername($this->getUser()->getUsername());
        $this->user = $this->user->getFirstName() . ' ' . $this->user->getLastName();

        $filter = array();

        $this->start = date_create_from_format('Y-m-d', $request->getParameter('start'));
        $this->end = date_create_from_format('Y-m-d', $request->getParameter('end'));

        $obj = new stdClass();
        $obj->type = "date";
        $obj->field = "creationdate";
        $obj->comparison = "get";
        $obj->value = $this->start->format('d/m/Y');
        $filter[] = $obj;

        $obj = new stdClass();
        $obj->type = "date";
        $obj->field = "creationdate";
        $obj->comparison = "let";
        $obj->value = $this->end->format('d/m/Y');
        $filter[] = $obj;


        $rows = TransactionTable::getInstance()->getAllPaged(0, 1000000, false, $filter);
        $this->transactions = $rows['data'];

        for ($index = 0; $index < count($this->transactions); $index++) {
            $this->transactions[$index]['creationdate'] = date_create_from_format('Y/m/d', $this->transactions[$index]['creationdate']);
            $this->transactions[$index]['creationdate'] = $this->transactions[$index]['creationdate']->format('d/m/Y');
        }

        $this->start = $this->start->format('d/m/Y');
        $this->end = $this->end->format('d/m/Y');

        $this->person = $request->getParameter('person');

//        echo json_encode($this->transactions);
    }

    public function executeReportpaymentsresume(sfWebRequest $request) {
        $months = array(1 => 'Enero', 2 => 'Febrero', 3 => 'Marzo', 4 => 'Abril', 5 => 'Mayo', 6 => 'Junio', 7 => 'Julio', 8 => 'Agosto', 9 => 'Septiembre', 10 => 'Octubre', 11 => 'Noviembre', 12 => 'Diciembre');

        $this->host = 'http' . ($request->isSecure() ? 's' : '') . '://' . $request->getHost();

        $personid = $request->getParameter('personid');
        $year = $request->getParameter('year');



        $q = Doctrine_Query::create()
                ->select('t.*')
                ->from('Tax t');
        $taxes = $q->execute();

        $result = array();
        $this->taxes = array();
        foreach ($months as $index => $name) {
            foreach ($taxes as $tax) {
                $q = Doctrine_Query::create()
                        ->select('r.*, p.*, u.*, b.*')
                        ->from('PersonPaymentRelation r')
                        ->leftJoin('r.Payment b')
                        ->where('r.person_id = ? AND b.taxid = ? AND b.year = ? AND b.month = ?', array($personid, $tax->getId(), $year, $index));

                $r = $q->execute();

                if (count($r) > 0) {

                    if (!isset($result[$tax->getId()])) {
                        $result[$tax->getId()] = array();
                        $this->taxes[$tax->getId()] = $tax->getName();
                    }



                    if (!isset($result[$tax->getId()][$index])) {
                        $result[$tax->getId()][$index] = 0;
                    }

                    foreach ($r as $relation)
                        $result[$tax->getId()][$index] += $relation->getAmount();
                }
            }
        }

        $this->matrix = $result;
        $this->months = $months;

//        echo json_encode($this->months).'<br/><br/><br/><br/>';
//        echo json_encode($this->taxes).'<br/><br/><br/><br/>';
//        echo json_encode($this->matrix).'<br/><br/><br/><br/>';
    }

}
