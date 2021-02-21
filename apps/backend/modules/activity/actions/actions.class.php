<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage activity
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class activityActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = ActivityTable::getInstance()->getAll($filter);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = ActivityTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $activity = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $activity = Doctrine::getTable('Activity')->find($request->getParameter('id'));

        if ($activity == array()) {
            $activity = Doctrine::getTable('Activity')->findByAK($ak);
            if ($activity)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('activity.field.label', 'activity.field.name', $request->getParameter('name'))
                        )));
            $activity = new Activity();
        }

        $activity->setCode($ak);
        $activity->setName($request->getParameter('name'));
        $activity->setComment($request->getParameter('comment'));
        
        $activity->setOnatcode($request->getParameter('onatcode'));
        $activity->setMtsscode($request->getParameter('mtsscode'));

        $activity->setAmount($request->getParameter('amount'));
        if ($request->getParameter('fixed') && $request->getParameter('fixed') == 'true')
            $activity->setFixed(true);
        else
            $activity->setFixed(false);


        $activity->save();
        sfContext::getInstance()->getLogger()->alert('Salvada actividad ' . $activity->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');

        $q = Doctrine_Query::create()
                ->delete('TaxActivityRelation')
                ->where('activity_id = ?', $activity->getId());
        $q->execute();
        $taxes = json_decode($request->getParameter('taxes'));
        for ($i = 0; $i < count($taxes); $i++) {
            $r = new TaxActivityRelation();
            $r->setActivity($activity);

            $t = Doctrine::getTable('Tax')->find($taxes[$i]->id);
            $r->setTax($t);

            $r->setAmount($taxes[$i]->amount);
            $r->setFixed($taxes[$i]->fixed);

            $r->save();
        }

        $q = Doctrine_Query::create()
                ->delete('ElementActivityRelation')
                ->where('activity_id = ?', $activity->getId());
        $q->execute();
        $elements = json_decode($request->getParameter('elements'));
        for ($i = 0; $i < count($elements); $i++) {
            $r = new ElementActivityRelation();
            $r->setActivity($activity);

            $t = Doctrine::getTable('Element')->find($elements[$i]->id);
            $r->setElement($t);

            $r->save();
        }

        return $activity->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Activity')->deleteByPK($pks);
    }

}
