<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage bar
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class barActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        if ($request->getParameter('query'))
            $query->query = $request->getParameter('query');
        if ($request->getParameter('is_active'))
            $query->is_active = $request->getParameter('is_active');

        switch ($request->getParameter('component')) {

            case 'combounpayed':
                $personid = false;
                if ($request->getParameter('personid') && $request->getParameter('personid') != '')
                    $personid = $request->getParameter('personid');

                $month = false;
                if ($request->getParameter('month') && $request->getParameter('month') != '')
                    $month = $request->getParameter('month');

                $rows = BarTable::getInstance()->getAllToPay($personid, $month);
                break;

            case 'combo':
                $rows = BarTable::getInstance()->getAll($query->query);
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

                $rows = BarTable::getInstance()->getAllPaged($start, $limit, $query, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $bar = array();
        //2013114
        $ak = $request->getParameter('year') . $request->getParameter('monthid') . $request->getParameter('taxid');

        if ($request->getParameter('id') != '')
            $bar = Doctrine::getTable('Bar')->find($request->getParameter('id'));

        if ($bar == array()) {
            $bar = Doctrine::getTable('Bar')->findByAK($ak);
            if (!$bar)
                $bar = new Bar();
        }

        $bar->setCode($ak);
        $bar->setYear($request->getParameter('year'));
        $bar->setGeneral($request->getParameter('general'));
        $bar->setSimplified($request->getParameter('simplified'));
        $bar->setTaxid($request->getParameter('taxid'));
        if ($request->getParameter('monthid') && $request->getParameter('monthid') != '')
            $bar->setMonth($request->getParameter('monthid'));
        else
            $bar->setMonth(null);


        $bar->save();
        sfContext::getInstance()->getLogger()->alert('Salvada barra ' . $bar->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Bar')->deleteByPK($pks);
    }

}
