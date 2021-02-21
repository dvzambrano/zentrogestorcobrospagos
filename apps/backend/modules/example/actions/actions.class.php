<?php

/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage example
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class exampleActions extends sfBaseActions {

    public function load(sfWebRequest $request) {
        $rows = array();
        if ($request->getParameter('query'))
            $query->query = $request->getParameter('query');
        if ($request->getParameter('is_active'))
            $query->is_active = $request->getParameter('is_active');

        switch ($request->getParameter('component')) {
            case 'combo':
                $rows = ExampleTable::getInstance()->getAll($query);
                break;
            case 'tree':
                $id = $request->getParameter('node');
                $query = $request->getParameter('query');
                $start = $request->getParameter('start');
                $limit = $request->getParameter('limit');

                $rows = ExampleTable::getInstance()->getByParentPaged($id, $start, $limit, $query);
                break;
            case 'auto':
                $rows = array();
                for ($index = 0; $index < 1000; $index++) {
                    $rows[] = array(
                        'threadid' => $index, 
                        'title' => $index, 
                        'forumtitle' => $index, 
                        'forumid' => $index, 
                        'author' => $index, 
                        'replycount' => $index, 
                        'lastposter' => $index, 
                        'excerpt' => $index, 
                        'lastpost' => date(), 
                    );
                }
                $rows = array(
                    'totalCount' => 1000,
                    'topics' => $rows,
                    'page' => $page
                );
                die;
                break;

            default:
                break;
        }

        return $rows;
    }

    public function save(sfWebRequest $request) {
        $example = array();
        $ak = Util::generateCode($request->getParameter('name'));

        if ($request->getParameter('id') != '')
            $example = Doctrine::getTable('Example')->find($request->getParameter('id'));

        if ($example == array()) {
            $example = Doctrine::getTable('Example')->findByAK($ak);
            if ($example)
                throw new Exception('app.error.duplicatedalternatekey');
            $example = new Example();
        }

        $example->setCode($ak);
        $example->setName($request->getParameter('name'));
        $example->setNick($request->getParameter('nick'));
        $example->setComment($request->getParameter('comment'));
        $example->setParent($request->getParameter('parent'));


        $example->save();
        sfContext::getInstance()->getLogger()->alert('Salvad@ example ' . $example->exportTo('json') . ' por el usuario "' . $this->getUser()->getUsername() . '".');
    }

    public function delete(sfWebRequest $request) {
        $pks = json_decode(stripslashes($request->getParameter('ids')));
        return Doctrine::getTable('Example')->deleteByPK($pks);
    }

}
