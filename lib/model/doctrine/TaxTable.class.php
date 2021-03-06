<?php

/**
 * TaxTable
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */
class TaxTable extends Doctrine_Table {

    /**
     * Returns an instance of this class.
     *
     * @return object TaxTable
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
                    array('name' => 'period', 'type' => 'string'),
                    array('name' => 'comment', 'type' => 'string')
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
    }

    const table = 'Tax';
    const akfield = 'code';

    public static function getAllPaged($start, $limit, $filters, $simple = false) {
        $select = '((SELECT COUNT(q.tax_id) FROM TaxPersonRelation q WHERE q.tax_id = t.id)+(SELECT COUNT(w.tax_id) FROM TaxTaxRelation w WHERE w.tax_id = t.id)+(SELECT COUNT(e.tax_id) FROM TaxActivityRelation e WHERE e.tax_id = t.id))<1 as deleteable';
        $query = BaseTable::getAllPaged(self::table, $start, $limit, $filters, array(), array(), false, $select);
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

    public static function getPrincipalTax() {
        $patentcode = Util::getMetadataValue('app_patentcode');

        $q = Doctrine_Query::create()
                ->select('t.*')
                ->from(self::table . ' t')
                ->where('t.code = ?', $patentcode);
        return $q->fetchOne();
    }

    //[getByParentMethod]
}