<link media="screen,print" type="text/css" rel="stylesheet" href="../css/printReport.css">
<div id="body">
    <div id="content">
        <div class="page" style="font-size: 7pt">
            <table style="width: 100%;" class="header">
                <tr>
                    <td style="text-align: center;">
                        <img src="<?php echo $host ?>/images/logo-white-transpatent.png" height="50" />
                        <h1 style="text-align: center">Balance de comprobaci&oacute;n de saldos</h1>
                        <h3 style="text-align: center">para <?php echo $person ?> desde <?php echo $start ?> hasta <?php echo $end ?></h3>
                    </td>
                </tr>
            </table>

            <?php if (count($transactions) == 0): ?>
                <table style="width: 100%;" class="header">
                    <tr>
                        <td>
                            <h3>No existen transacciones</h3>
                        </td>
                    </tr>
                </table>
            <?php endif ?>
            <?php if (count($transactions) > 0): ?>
                <table class="change_order_items pagebreaker" style="width: 100%; border-top: 1px solid black; border-bottom: 1px solid black;">

                    <tbody>
                        <tr>
                            <th>Fecha</th>
                            <th>Descripci&oacute;n</th>
                            <th>D&eacute;bito</th>
                            <th>Cr&eacute;dito</th>
                            <th>Balance</th>
                        </tr>

                        <?php foreach ($transactions as $transaction): $rowed = false; ?>
                            <?php if (count($transaction['annexes']) == 0): ?>
                                <tr class="odd_row">
                                    <td><?php echo $transaction['creationdate'] ?></td>
                                    <td><b><?php echo $transaction['comment'] ?></b></td>
                                    <td>$<?php echo $transaction['debit'] ?></td>
                                    <td>$<?php echo $transaction['credit'] ?></td>
                                    <td>$<?php echo $transaction['balance'] ?></td>
                                </tr>
                            <?php endif ?>
                            <?php if (count($transaction['annexes']) > 0): ?>
                                <?php for ($index = -1; $index < count($transaction['annexes']); $index++): ?>
                                    <tr class="odd_row">
                                        <?php if ($rowed): ?>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $transaction['annexes'][$index]['element'] ?></td>
                                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$<?php echo $transaction['annexes'][$index]['amount'] ?></td>
                                        <?php endif ?>
                                        <?php if (!$rowed): $rowed = true;
                                            $len = count($transaction['annexes']) + 1; ?>
                                            <td rowspan="<?php echo $len ?>"><?php echo $transaction['creationdate'] ?></td>
                                            <td><b><?php echo $transaction['comment'] ?></b></td>
                                            <td>$<?php echo $transaction['debit'] ?></td>
                                            <td rowspan="<?php echo $len ?>">$<?php echo $transaction['credit'] ?></td>
                                            <td rowspan="<?php echo $len ?>">$<?php echo $transaction['balance'] ?></td>
                                    <?php endif ?>
                                    </tr>
                                <?php endfor ?>
                            <?php endif ?>

    <?php endforeach ?>

                    </tbody>
                </table>

                <table class="sa_signature_box" style="padding-top: 2em; margin-top: 2em;">

                    <tr>    
                        <td></td><td style="padding-left: 2.5in">&nbsp;</td>
                        <td style="padding-left: 1em"></td><td class="written_field" style="padding-left: 2.5in; text-align: right;">X</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="padding-top: 0em">&nbsp;</td>
                        <td style="text-align: center; padding-top: 0em;"><?php echo $user ?></td>
                    </tr>
                </table>

<?php endif ?>
        </div>

    </div>
</div>