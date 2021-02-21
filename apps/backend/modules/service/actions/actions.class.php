<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage service
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class serviceActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = ServiceTable::getInstance()->getAll($filter);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = ServiceTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $service = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $service = Doctrine::getTable('Service')->find($request->getParameter('id'));

        if ($service == array()) {
            $service = Doctrine::getTable('Service')->findByAK($ak);
            if ($service)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('service.field.label', 'service.field.name', $request->getParameter('name'))
                        )));
            $service = new Service();
        }

        $service->setCode($ak);
        $service->setName($request->getParameter('name'));
        $service->setComment($request->getParameter('comment'));
        $service->setAmount($request->getParameter('amount'));


        $service->save();
        sfContext::getInstance()->getLogger()->alert('Salvado servicio ' . $service->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
        
        return $service->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Service')->deleteByPK($pks);
    }

}
