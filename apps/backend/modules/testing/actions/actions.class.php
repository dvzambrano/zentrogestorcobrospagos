<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage testing
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class testingActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            
            case 'combo':
                $rows = TestingTable::getInstance()->getAll($filter);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');

                $rows = TestingTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $testing = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $testing = Doctrine::getTable('Testing')->find($request->getParameter('id'));

        if ($testing == array()) {
            $testing = Doctrine::getTable('Testing')->findByAK($ak);
            if ($testing)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('testing.field.label', 'testing.field.name', $request->getParameter('name'))
                        )));
            $testing = new Testing();
        }
        else {
            $testobj = Doctrine::getTable('Testing')->findByAK($ak);
            if ($testobj && ($request->getParameter('id') == '' || $testobj->getName() != $testing->getName()))
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('testing.field.label', 'testing.field.name', $request->getParameter('name'))
                        )));
        }

                $testing->setCode($ak);
        $testing->setName($request->getParameter('name'));
        $testing->setNick($request->getParameter('nick'));
        $testing->setComment($request->getParameter('comment'));
        $testing->setParentid($request->getParameter('parentid'));


        $testing->save();
        sfContext::getInstance()->getLogger()->alert('Salvad@ testing ' . $testing->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');

        return $testing->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Testing')->deleteByPK($pks);
    }

}
