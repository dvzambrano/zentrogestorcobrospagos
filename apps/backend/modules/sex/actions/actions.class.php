<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage sex
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class sexActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = SexTable::getInstance()->getAll($filter);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = SexTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $sex = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $sex = Doctrine::getTable('Sex')->find($request->getParameter('id'));

        if ($sex == array()) {
            $sex = Doctrine::getTable('Sex')->findByAK($ak);
            if ($sex)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('sex.field.label', 'sex.field.name', $request->getParameter('name'))
                        )));
            $sex = new Sex();
        }

        $sex->setCode($ak);
        $sex->setName($request->getParameter('name'));
        $sex->setComment($request->getParameter('comment'));


        $sex->save();
        sfContext::getInstance()->getLogger()->alert('Salvado sexo ' . $sex->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
        
        return $sex->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Sex')->deleteByPK($pks);
    }

}
