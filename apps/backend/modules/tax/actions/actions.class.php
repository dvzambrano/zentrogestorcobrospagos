<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage tax
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class taxActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = TaxTable::getInstance()->getAll($filter);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = TaxTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $tax = array();
        $ak = $request->getParameter('code');

        if ($request->getParameter('id') != '')
            $tax = Doctrine::getTable('Tax')->find($request->getParameter('id'));

        if ($tax == array()) {
            $tax = Doctrine::getTable('Tax')->findByAK($ak);
            if ($tax)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('tax.field.label', 'tax.field.name', $request->getParameter('name'))
                        )));
            $tax = new Tax();
        }

        $tax->setCode($ak);
        $tax->setName($request->getParameter('name'));
        $tax->setComment($request->getParameter('comment'));

        if ($request->getParameter('periodid') && $request->getParameter('periodid') != '')
            $tax->setPeriod($request->getParameter('periodid'));
        else
            $tax->setPeriod(null);



        $tax->save();
        sfContext::getInstance()->getLogger()->alert('Salvado impuesto ' . $tax->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
        
        return $tax->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Tax')->deleteByPK($pks);
    }

}
