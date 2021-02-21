<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage activitygroup
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class activitygroupActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = ActivitygroupTable::getInstance()->getAll($filter);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = ActivitygroupTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $activitygroup = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $activitygroup = Doctrine::getTable('Activitygroup')->find($request->getParameter('id'));

        if ($activitygroup == array()) {
            $activitygroup = Doctrine::getTable('Activitygroup')->findByAK($ak);
            if ($activitygroup)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('activitygroup.field.label', 'activitygroup.field.name', $request->getParameter('name'))
                        )));
            $activitygroup = new Activitygroup();
        }

        $activitygroup->setCode($ak);
        $activitygroup->setName($request->getParameter('name'));
        $activitygroup->setComment($request->getParameter('comment'));
        $activitygroup->setAmount($request->getParameter('amount'));
        if ($request->getParameter('fixed') && $request->getParameter('fixed') == 'true')
            $activitygroup->setFixed(true);
        else
            $activitygroup->setFixed(false);


        $activitygroup->save();
        sfContext::getInstance()->getLogger()->alert('Salvado grupo de actividad ' . $activitygroup->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
        
        return $activitygroup->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Activitygroup')->deleteByPK($pks);
    }

}
