<?php

/**
 * ActivityTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class ActivityTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object ActivityTable
     */
    public static function getInstance() {
        return Doctrine_Core::getTable(self::table);
    }

    private static function formatData($array, $page, $count = false) {
        return array(
            'metaData' => array(
                'idProperty' => 'id',
                'root' => 'data',
                'totalProperty' => 'results',
                'fields' => array(
                    array('name' => 'id', 'type' => 'int'),
                    array('name' => 'deleteable', 'type' => 'bool'),
                    array('name' => 'code', 'type' => 'string'),
                    array('name' => 'name', 'type' => 'string'),
                    array('name' => 'comment', 'type' => 'string'),
                    array('name' => 'onatcode', 'type' => 'string'),
                    array('name' => 'mtsscode', 'type' => 'string'),
                    array('name' => 'amount', 'type' => 'decimal'),
                    array('name' => 'fixed', 'type' => 'bool'),
                    array('name' => 'Elements'),
                    array('name' => 'Taxes')
                ),
                'sortInfo' => array(
                    'field' => 'id',
                    'direction' => 'ASC'
                )
            ),
            'success' => true,
            'message' => 'app.msg.info.loadedsuccessful',
            'results' => $count,
            'data' => $array->toArray(),
            'page' => $page
        );
        return $rows;
    }

    const table = 'Activity';
    const akfield = 'code';

    public static function getAllPaged($start, $limit, $filters, $simple = false) {
        $select = 'e.*, tx.*, tar.*, (SELECT COUNT(q.activitygroupid) FROM Activity q WHERE q.activitygroupid = t.id)<1 as deleteable';
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $filters, array('t.Elements e', 't.Taxes tx', 'tx.TaxActivityRelation tar'), array(), false, $select);
        if ($simple)
            return $query['results'];
        return self::formatData($query['results'], $query['page'], $query['count']);
    }

    public static function findByAK($ak) {
        return BaseTable::findByAK(self::table, self::akfield, $ak);
    }

    public static function getAll($filters = array(), $simple = false) {
        return self::getAllPaged(0, PHP_INT_MAX, $filters, $simple);
    }

    public static function deleteByPK($pks) {
        return BaseTable::deleteByPK(self::getInstance(), $pks);
    }

    //[getByParentMethod]
}