<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage element
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class elementActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = ElementTable::getInstance()->getAll($filter);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = ElementTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $element = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $element = Doctrine::getTable('Element')->find($request->getParameter('id'));

        if ($element == array()) {
            $element = Doctrine::getTable('Element')->findByAK($ak);
            if ($element)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('element.field.label', 'element.field.name', $request->getParameter('name'))
                        )));
            $element = new Element();
        }

        $element->setCode($ak);
        $element->setName($request->getParameter('name'));
        $element->setComment($request->getParameter('comment'));


        $element->save();
        sfContext::getInstance()->getLogger()->alert('Salvado elemento de gasto ' . $element->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
        
        return $element->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Element')->deleteByPK($pks);
    }

}
