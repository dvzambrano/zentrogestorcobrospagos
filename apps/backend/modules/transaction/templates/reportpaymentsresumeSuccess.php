<link media="screen,print" type="text/css" rel="stylesheet" href="../css/printReport.css">
<div id="body">
    <div id="content">
        <div class="page" style="font-size: 7pt">
            <table style="width: 100%;" class="header">
                <tr>
                    <td style="text-align: center;">
                        <img src="<?php echo $host ?>/images/logo-white-transpatent.png" height="50" />
                        <h1 style="text-align: center">Tributos asociados a la actividad pagados y deducibles en la declaraci&oacute;n jurada</h1>
                        <h3 style="text-align: center">Solo para uso de contribuyentes que presentan declaraci&oacute;n jurada</h3>
                    </td>
                </tr>
            </table>


            <table class="change_order_items pagebreaker" style="width: 100%; border-top: 1px solid black; border-bottom: 1px solid black;">
                <tbody>
                    <tr>
                        <th>Mes</th>
                        <?php foreach ($taxes as $tax): ?>
                            <th><?php echo $tax ?></th>
                        <?php endforeach ?>
                        <th>Total</th>
                    </tr>


                    <?php $taxtotals = array(); ?>
                    <?php foreach ($months as $monthindex => $month): ?>
                        <tr>
                            <?php $monthtotal = 0; ?>
                            <td><?php echo $month ?></td>
                            <?php foreach ($taxes as $taxindex => $tax): ?>
                                <?php if (!isset($taxtotals[$taxindex])): ?>
                                    <?php $taxtotals[$taxindex] = 0; ?>
                                <?php endif ?>
                                <?php if ($matrix[$taxindex][$monthindex] && $matrix[$taxindex][$monthindex] > 0): ?>
                                    <td>$<?php echo $matrix[$taxindex][$monthindex] ?></td>
                                    <?php $monthtotal += $matrix[$taxindex][$monthindex]; ?>
                                    <?php $taxtotals[$taxindex] += $matrix[$taxindex][$monthindex]; ?>
                                <?php endif ?>
                                <?php if (!$matrix[$taxindex][$monthindex] || $matrix[$taxindex][$monthindex] == 0): ?>
                                    <td>$0</td>
                                <?php endif ?>
                            <?php endforeach ?>
                            <td>$<?php echo $monthtotal ?></td>
                        </tr>
                    <?php endforeach ?>
                    <tr>
                        <td>Total</td>
                        <?php foreach ($taxtotals as $taxtotal): ?>
                            <td>$<?php echo $taxtotal ?></td>
                        <?php endforeach ?>
                        <td>&nbsp;</td>
                    </tr>


<!--                    <tr class="odd_row">
                        <td>Enero</td>
                        <td></td>                        
                        <td></td>                        
                        <td></td>                        
                        <td></td>                        
                        <td></td>                        
                        <td></td>                        
                        <td></td>                        
                        <td></td>                        
                        <td></td>                        
                    </tr>-->

                </tbody>
            </table>

        </div>

    </div>
</div>


