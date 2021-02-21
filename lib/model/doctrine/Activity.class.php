<?php

/**
 * Activity
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    SGArqBase
 * @subpackage model
 * @author     MSc. Donel Vazquez Zambrano
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
class Activity extends BaseActivity {

    public function getAllTaxes() {
        $xpercent = Util::getMetadataValue('app_xpercent');

        $taxes = $this->getTaxes();

        $patenttax = Doctrine::getTable('Tax')->findByAK(Util::getMetadataValue('app_patentcode'));
        if ($patenttax && $patenttax->getId()) {
            $r = new TaxActivityRelation();
            $r->setActivity($this);
            $r->setAmount($this->getAmount());
            $r->setFixed($this->getFixed());

            $patenttax->TaxActivityRelation[] = $r;

            $taxes[] = $patenttax;
        }



        if ($this->getActivitygroup() && $this->getActivitygroup()->getName()) {
            $publicservicetax = Doctrine::getTable('Tax')->findByAK(Util::getMetadataValue('app_publicservice'));
            if ($publicservicetax && $publicservicetax->getId()) {
                $r = new TaxActivityRelation();
                $r->setActivity($this);
                $r->setAmount($xpercent);
                $r->setFixed(false);

                $publicservicetax->TaxActivityRelation[] = $r;

                $taxes[] = $publicservicetax;
            }

            $q = Doctrine_Query::create()
                    ->select('t.*')
                    ->from('Tax t')
                    ->where('t.period = "Y"');
            $yearlytaxes = $q->execute();
            foreach ($yearlytaxes as $tax) {
                $r = new TaxActivityRelation();
                $r->setActivity($this);
                $r->setAmount($this->getActivitygroup()->getAmount());
                $r->setFixed($this->getActivitygroup()->getFixed());

                $tax->TaxActivityRelation[] = $r;

                $taxes[] = $tax;
            }
        }

        return $taxes;
    }
    public function getAsArray() {
		$result = $this->toArray();
		$result['Elements'] =$this->getElements()->toArray();
		$result['Taxes'] = array();
		foreach ($this->getTaxes() as $tax)
			$result['Taxes'][] = $tax->getAsArray();
		
		return $result;
	}

}