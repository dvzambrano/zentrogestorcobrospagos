<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage place
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class placeActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        $filter = $this->getFilter($request);

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = PlaceTable::getInstance()->getAll($filter);
                break;

            case 'grid':
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');
                $rows = PlaceTable::getInstance()->getAllPaged($start, $limit, $filter);
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $place = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $place = Doctrine::getTable('Place')->find($request->getParameter('id'));

        if ($place == array()) {
            $place = Doctrine::getTable('Place')->findByAK($ak);
            if ($place)
                throw new Exception(json_encode(array(
                            msg => 'app.error.duplicatedalternatekey',
                            params => array('place.field.label', 'place.field.name', $request->getParameter('name'))
                        )));
            $place = new Place();
        }

        $place->setCode($ak);
        $place->setName($request->getParameter('name'));
        $place->setComment($request->getParameter('comment'));


        $place->save();
        sfContext::getInstance()->getLogger()->alert('Salvado lugar de trabajo ' . $place->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
        
        return $place->toArray();
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Place')->deleteByPK($pks);
    }

}
