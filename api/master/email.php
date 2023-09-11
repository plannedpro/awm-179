<?php 

function SendEmailForCustomerOnShipmented($orderNo,$cs_name,$cs_email){
    $from_ = 'Clean Care Concept Thailand';
    $arrTo_ = array();
    array_push($arrTo_,array('mail'=>$cs_email,'name'=>$cs_name));
    $subject='คำสั่งซื้อหมายเลข '.$orderNo.' ถูกจัดส่งแล้ว';
    $html=createHTMLEmail_OrderCompleted($orderNo);
    $ttt = sendmail($from_,$arrTo_,$subject,$html);
    return $ttt;
}
function SendEmailForCustomerOnConfirmOrder($orderNo,$cs_name,$cs_email){
    $from_ = 'Clean Care Concept Thailand';
    $arrTo_ = array();
    array_push($arrTo_,array('mail'=>$cs_email,'name'=>$cs_name));
    $subject='ยืนยันการชำระเงิน คำสั่งซื้อหมายเลข '.$orderNo.' ';
    $html=createHTMLEmail_OrderConfirmOrder($orderNo);
    $ttt = sendmail($from_,$arrTo_,$subject,$html);
    return $ttt;
}

function SendEmailForCustomerOnRejectOrder($orderNo,$cs_name,$cs_email){
    $from_ = 'Clean Care Concept Thailand';
    $arrTo_ = array();
    array_push($arrTo_,array('mail'=>$cs_email,'name'=>$cs_name));
    $subject='ยกเลิก คำสั่งซื้อหมายเลข '.$orderNo.' เนื่องจาก ไม่สามารถตรวจสอบยอดชำระได้';
    $html=createHTMLEmail_OrderRejectOrder($orderNo);
    $ttt = sendmail($from_,$arrTo_,$subject,$html);
    return $ttt;
}
function createHTMLEmail_OrderRejectOrder($orderNo){
    $dataOrder = getDataSQLv1(1,"SELECT * FROM orders WHERE orderRunNo=? ",array($orderNo));
    foreach($dataOrder AS $order){

        // $domain = 'https://cleancareth.com';
        $domain = 'https://'.$_SERVER['HTTP_HOST'];

        $dataProduct = getDataSQLv1(1,"SELECT * FROM orders_product
        left join products_option on ref_priceToken=option_token
        left join products on product_id=option_ref
         WHERE ReforderRunNo=? ",array($orderNo));
        $htmlProduct = '';
        $subtotal =number_format($order['sum_total'],2);
        $shipping =number_format($order['sum_shipping'],2);
        $discount =number_format($order['sum_discount'],2);
        $subtotal0=number_format($order['sum_subtotal'],2);
        $sum_grandTotal=number_format($order['sum_grandTotal'],2);


        foreach($dataProduct AS $product){
            $pricePerUnit=$product['price_perItem'];
            $priceTotal = $product['price_net'];
            if($product['option_discount']==1){
                //มีการลดราคา
                $pricePerUnit='<small><s>'.number_format($product['price_perItem'],2).'</s></small> '.number_format($product['price_perItemNet'],2);
                $priceTotal = '<small><s>'.number_format($product['price_perItem']*$product['numProduct'],2).'</s></small> '.number_format($product['price_net'],2);
                // $discount+=($product['option_price']*$product['numProduct'])-($product['option_priceDiscount']*$product['numProduct']);
                // $subtotal+=$product['price_perItemNet']*$product['numProduct'];
                
            }else{
                $pricePerUnit=number_format($product['price_perItemNet'],2);
                $priceTotal = $product['price_net']*$product['numProduct'];
                // $subtotal+=$product['price_net']*$product['numProduct'];
                // $subtotal0+=$product['price_perItem'];
            }
            // $subtotal0+=$product['price_perItem']*$product['numProduct'];
            // $subtotal0+=$product['price_net'];
            


            $option  = $product['product_option']>0?'Option : '.$product['option_name']:'';
            $htmlProduct.= '<tr>
            <td style="padding-top: 0;">
                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee;">
                    <tbody>
                        <tr>
                            <td rowspan="4" style="padding-right: 10px; padding-bottom: 10px;">
                                <img style="height: 80px;" src="'.$domain.'/include/img/products/'.$product['product_imgprofile'].'" alt="Product Image" />
                            </td>
                            <td colspan="2" style="font-size: 14px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                            '.$product['product_name'].'
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px; line-height: 18px; color: #757575;">
                            Quantity: '.number_format($product['numProduct']).'
                            </td>
                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right;">
                                '.$pricePerUnit.' Per Unit
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px; line-height: 18px; color: #757575; padding-bottom: 10px;">
                            '.$option.'
                            </td>
                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; padding-bottom: 10px;">
                                <b style="color: #666666;">'.$priceTotal.'</b> Total
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>';
        }



        $t='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Email Template for Order Confirmation Email</title>
                
                <!-- Start Common CSS -->
                <style type="text/css">
                    #outlook a {padding:0;}
                    body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; font-family: Helvetica, arial, sans-serif;}
                    .ExternalClass {width:100%;}
                    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
                    .backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
                    .main-temp table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family: Helvetica, arial, sans-serif;}
                    .main-temp table td {border-collapse: collapse;}
                </style>
                <!-- End Common CSS -->
            </head>
            <body>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" class="backgroundTable main-temp" style="background-color: #d5d5d5;">
                    <tbody>
                        <tr>
                            <td>
                                <table width="600" align="center" cellpadding="15" cellspacing="0" border="0" class="devicewidth" style="background-color: #ffffff;">
                                    <tbody>
                                        <!-- Start header Section -->
                                        <tr>
                                            <td style="padding-top: 30px;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee; text-align: center;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding-bottom: 10px;">
                                                                <a href="'.$domain.'"><img src="'.$domain.'/include/img/logo_clencare1.png" alt="Cleancareconcept" width="80px" /></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                            Clean Care Concept  Manufacturing co. ltd
                                                            </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                            29/3 Moo 10 Buengkamproi, Lumlukka, Pathumthani, Thailand. 12150<br>
                                                            Tel : 02-5772139 | ID LINE : @HABY
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;">
                                                                <strong>Order Number:</strong> '.$order['orderRunNo'].' | <strong>Order Date:</strong> '.date('H:m:s - d M Y',strtotime($order['order_createDate'])).'
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center">
                                                <h1 style="color:red;line-height:1.5">
                                                your order canceled because your payment was not successfully processed.<br>
                                               
                                                </h1>
                                            </td>
                                        </tr>
                                       
                                        <!-- End header Section -->
                                        
                                        <!-- Start address Section -->
                                        
                                        <tr>
                                            <td style="padding-top: 0;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="width: 100%; text-align: left;  font-size: 13px; font-weight: 400; color: #666666; padding: 15px 0; border-top: 1px solid #eeeeee;">
                                                            <b>Dear '.$order['cs_name'].'</b>,<br>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If none of these apply to you, or if you need more help, contact our Customer Support.<br>
                                                            When your order is canceled, it means that you will have to place a new order.
                                                            
                                                            </td>
                                                                        
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End address Section -->
                                        
                                        <!-- Start product Section -->
                                        
                                        '.$htmlProduct.'
                                       
                                        <!-- End product Section -->
                                        
                                        <!-- Start calculation Section -->
                                        <tr>
                                            <td style="padding-top: 0;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb; margin-top: -5px;">
                                                    <tbody>
                                                        <tr>
                                                            <td rowspan="5" style="width: 55%;"></td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Sub-Total:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                                '.$subtotal0.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Discount:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                                '.$discount.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Total:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                                '.$subtotal.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee;">
                                                                Shipping Fee:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee; text-align: right;">
                                                                '.$shipping.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px;">
                                                                Order Total
                                                            </td>
                                                            <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px; text-align: right;">
                                                            '.$sum_grandTotal.'
                                                            </td>
                                                        </tr>
                                                       
                                                       
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End calculation Section -->
                                        
                                        <!-- Start payment method Section -->
                                        <tr>
                                            <td style="padding: 0 10px;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner">
                                                    <tbody>
                                                    <tr>
                                                    <td colspan="2" style="font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                            Payment Method (Bank Transfer)
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="width: 55%; font-size: 14px; line-height: 18px; color: #666666;">
                                                            <img src="'.$domain.'/include/img/slip/'.$order['file_slip'].'" width="100%">
                                                        </td>
                                                
                                                    </tr>
                                                        <tr>
                                                            <td colspan="2" style="width: 100%; text-align: center;  font-size: 11px; font-weight: 400; color: #666666; padding: 15px 0; border-top: 1px solid #eeeeee;">
                                                            <br>อีเมลฉบับนี้ส่งจากระบบอัตโนมัติ กรุณาอย่าตอบกลับ <br>
                                                            This is an automated email. Please do not reply.<br><br>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End payment method Section -->
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>';
    
        return $t;
    }
}


function createHTMLEmail_OrderConfirmOrder($orderNo){
    $dataOrder = getDataSQLv1(1,"SELECT * FROM orders WHERE orderRunNo=? ",array($orderNo));
    foreach($dataOrder AS $order){

        // $domain = 'https://cleancareth.com';
        $domain = 'https://'.$_SERVER['HTTP_HOST'];

        $dataProduct = getDataSQLv1(1,"SELECT * FROM orders_product
        left join products_option on ref_priceToken=option_token
        left join products on product_id=option_ref
         WHERE ReforderRunNo=? ",array($orderNo));
        $htmlProduct = '';
        $subtotal =number_format($order['sum_total'],2);
        $shipping =number_format($order['sum_shipping'],2);
        $discount =number_format($order['sum_discount'],2);
        $subtotal0=number_format($order['sum_subtotal'],2);
        $sum_grandTotal=number_format($order['sum_grandTotal'],2);


        foreach($dataProduct AS $product){
            $pricePerUnit=$product['price_perItem'];
            $priceTotal = $product['price_net'];
            if($product['option_discount']==1){
                //มีการลดราคา
                $pricePerUnit='<small><s>'.number_format($product['price_perItem'],2).'</s></small> '.number_format($product['price_perItemNet'],2);
                $priceTotal = '<small><s>'.number_format($product['price_perItem']*$product['numProduct'],2).'</s></small> '.number_format($product['price_net'],2);
                // $discount+=($product['option_price']*$product['numProduct'])-($product['option_priceDiscount']*$product['numProduct']);
                // $subtotal+=$product['price_perItemNet']*$product['numProduct'];
                
            }else{
                $pricePerUnit=number_format($product['price_perItemNet'],2);
                $priceTotal = $product['price_net']*$product['numProduct'];
                // $subtotal+=$product['price_net']*$product['numProduct'];
                // $subtotal0+=$product['price_perItem'];
            }
            // $subtotal0+=$product['price_perItem']*$product['numProduct'];
            // $subtotal0+=$product['price_net'];
            


            $option  = $product['product_option']>0?'Option : '.$product['option_name']:'';
            $htmlProduct.= '<tr>
            <td style="padding-top: 0;">
                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee;">
                    <tbody>
                        <tr>
                            <td rowspan="4" style="padding-right: 10px; padding-bottom: 10px;">
                                <img style="height: 80px;" src="'.$domain.'/include/img/products/'.$product['product_imgprofile'].'" alt="Product Image" />
                            </td>
                            <td colspan="2" style="font-size: 14px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                            '.$product['product_name'].'
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px; line-height: 18px; color: #757575;">
                            Quantity: '.number_format($product['numProduct']).'
                            </td>
                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right;">
                                '.$pricePerUnit.' Per Unit
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px; line-height: 18px; color: #757575; padding-bottom: 10px;">
                            '.$option.'
                            </td>
                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; padding-bottom: 10px;">
                                <b style="color: #666666;">'.$priceTotal.'</b> Total
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>';
        }



        $t='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Email Template for Order Confirmation Email</title>
                
                <!-- Start Common CSS -->
                <style type="text/css">
                    #outlook a {padding:0;}
                    body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; font-family: Helvetica, arial, sans-serif;}
                    .ExternalClass {width:100%;}
                    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
                    .backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
                    .main-temp table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family: Helvetica, arial, sans-serif;}
                    .main-temp table td {border-collapse: collapse;}
                </style>
                <!-- End Common CSS -->
            </head>
            <body>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" class="backgroundTable main-temp" style="background-color: #d5d5d5;">
                    <tbody>
                        <tr>
                            <td>
                                <table width="600" align="center" cellpadding="15" cellspacing="0" border="0" class="devicewidth" style="background-color: #ffffff;">
                                    <tbody>
                                        <!-- Start header Section -->
                                        <tr>
                                            <td style="padding-top: 30px;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee; text-align: center;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding-bottom: 10px;">
                                                                <a href="'.$domain.'"><img src="'.$domain.'/include/img/logo_clencare1.png" alt="Cleancareconcept" width="80px" /></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                            Clean Care Concept  Manufacturing co. ltd
                                                            </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                            29/3 Moo 10 Buengkamproi, Lumlukka, Pathumthani, Thailand. 12150<br>
                                                            Tel : 02-5772139 | ID LINE : @HABY
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;">
                                                                <strong>Order Number:</strong> '.$order['orderRunNo'].' | <strong>Order Date:</strong> '.date('H:m:s - d M Y',strtotime($order['order_createDate'])).'
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center">
                                                <h1 style="color:green;line-height:1.5">Payment confirmation<br>
                                               
                                                </h1>
                                            </td>
                                        </tr>
                                       
                                        <!-- End header Section -->
                                        
                                        <!-- Start address Section -->
                                        
                                        <tr>
                                            <td style="padding-top: 0;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="width: 100%; text-align: left;  font-size: 13px; font-weight: 400; color: #666666; padding: 15px 0; border-top: 1px solid #eeeeee;">
                                                            <b>Dear '.$order['cs_name'].'</b>,<br>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thanks for shopping with us! We are glad to inform you that your order <b>'.$order['orderRunNo'].' </b>  Confirmed Order!
                                                            <br>This is an automatically generated message to confirm that a payment has been made from your account.
                                                            
                                                            </td>
                                                                        
                                                        </tr>
                                                    
                                                        <tr>
                                                            <td style="width: 100%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                            Delivery Details :
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                <b>'.$order['cs_name'].' '.$order['cs_company'].'</b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                '.$order['cs_address'].'
                                                            </td>
                                                            
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px;">
                                                                <b>'.$order['cs_phone'].'</b>
                                                            </td>
                                                            
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px;">
                                                            <br><b>Note : </b><br>'.$order['cs_other'].'
                                                            </td>
                                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End address Section -->
                                        
                                        <!-- Start product Section -->
                                        
                                        '.$htmlProduct.'
                                       
                                        <!-- End product Section -->
                                        
                                        <!-- Start calculation Section -->
                                        <tr>
                                            <td style="padding-top: 0;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb; margin-top: -5px;">
                                                    <tbody>
                                                        <tr>
                                                            <td rowspan="5" style="width: 55%;"></td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Sub-Total:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                                '.$subtotal0.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Discount:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                                '.$discount.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Total:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                                '.$subtotal.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee;">
                                                                Shipping Fee:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee; text-align: right;">
                                                                '.$shipping.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px;">
                                                                Order Total
                                                            </td>
                                                            <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px; text-align: right;">
                                                            '.$sum_grandTotal.'
                                                            </td>
                                                        </tr>
                                                       
                                                       
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End calculation Section -->
                                        
                                        <!-- Start payment method Section -->
                                        <tr>
                                            <td style="padding: 0 10px;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner">
                                                    <tbody>
                                                      
                                                        <tr>
                                                            <td colspan="2" style="width: 100%; text-align: center;  font-size: 11px; font-weight: 400; color: #666666; padding: 15px 0; border-top: 1px solid #eeeeee;">
                                                            <br>อีเมลฉบับนี้ส่งจากระบบอัตโนมัติ กรุณาอย่าตอบกลับ <br>
                                                            This is an automated email. Please do not reply.<br><br>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End payment method Section -->
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>';
    
        return $t;
    }
}
function createHTMLEmail_OrderCompleted($orderNo){
    $dataOrder = getDataSQLv1(1,"SELECT * FROM orders WHERE orderRunNo=? ",array($orderNo));
    foreach($dataOrder AS $order){

        // $domain = 'https://cleancareth.com';
        $domain = 'https://'.$_SERVER['HTTP_HOST'];

        $dataProduct = getDataSQLv1(1,"SELECT * FROM orders_product
        left join products_option on ref_priceToken=option_token
        left join products on product_id=option_ref
         WHERE ReforderRunNo=? ",array($orderNo));
        $htmlProduct = '';
        $subtotal =number_format($order['sum_total'],2);
        $shipping =number_format($order['sum_shipping'],2);
        $discount =number_format($order['sum_discount'],2);
        $subtotal0=number_format($order['sum_subtotal'],2);
        $sum_grandTotal=number_format($order['sum_grandTotal'],2);


        foreach($dataProduct AS $product){
            $pricePerUnit=$product['price_perItem'];
            $priceTotal = $product['price_net'];
            if($product['option_discount']==1){
                //มีการลดราคา
                $pricePerUnit='<small><s>'.number_format($product['price_perItem'],2).'</s></small> '.number_format($product['price_perItemNet'],2);
                $priceTotal = '<small><s>'.number_format($product['price_perItem']*$product['numProduct'],2).'</s></small> '.number_format($product['price_net'],2);
                // $discount+=($product['option_price']*$product['numProduct'])-($product['option_priceDiscount']*$product['numProduct']);
                // $subtotal+=$product['price_perItemNet']*$product['numProduct'];
                
            }else{
                $pricePerUnit=number_format($product['price_perItemNet'],2);
                $priceTotal = $product['price_net']*$product['numProduct'];
                // $subtotal+=$product['price_net']*$product['numProduct'];
                // $subtotal0+=$product['price_perItem'];
            }
            // $subtotal0+=$product['price_perItem']*$product['numProduct'];
            // $subtotal0+=$product['price_net'];
            


            $option  = $product['product_option']>0?'Option : '.$product['option_name']:'';
            $htmlProduct.= '<tr>
            <td style="padding-top: 0;">
                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee;">
                    <tbody>
                        <tr>
                            <td rowspan="4" style="padding-right: 10px; padding-bottom: 10px;">
                                <img style="height: 80px;" src="'.$domain.'/include/img/products/'.$product['product_imgprofile'].'" alt="Product Image" />
                            </td>
                            <td colspan="2" style="font-size: 14px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                            '.$product['product_name'].'
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px; line-height: 18px; color: #757575;">
                            Quantity: '.number_format($product['numProduct']).'
                            </td>
                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right;">
                                '.$pricePerUnit.' Per Unit
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px; line-height: 18px; color: #757575; padding-bottom: 10px;">
                            '.$option.'
                            </td>
                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; padding-bottom: 10px;">
                                <b style="color: #666666;">'.$priceTotal.'</b> Total
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>';
        }



        $t='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Email Template for Order Confirmation Email</title>
                
                <!-- Start Common CSS -->
                <style type="text/css">
                    #outlook a {padding:0;}
                    body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; font-family: Helvetica, arial, sans-serif;}
                    .ExternalClass {width:100%;}
                    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
                    .backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
                    .main-temp table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family: Helvetica, arial, sans-serif;}
                    .main-temp table td {border-collapse: collapse;}
                </style>
                <!-- End Common CSS -->
            </head>
            <body>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" class="backgroundTable main-temp" style="background-color: #d5d5d5;">
                    <tbody>
                        <tr>
                            <td>
                                <table width="600" align="center" cellpadding="15" cellspacing="0" border="0" class="devicewidth" style="background-color: #ffffff;">
                                    <tbody>
                                        <!-- Start header Section -->
                                        <tr>
                                            <td style="padding-top: 30px;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee; text-align: center;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding-bottom: 10px;">
                                                                <a href="'.$domain.'"><img src="'.$domain.'/include/img/logo_clencare1.png" alt="Cleancareconcept" width="80px" /></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                            Clean Care Concept  Manufacturing co. ltd
                                                            </td>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                            29/3 Moo 10 Buengkamproi, Lumlukka, Pathumthani, Thailand. 12150<br>
                                                            Tel : 02-5772139 | ID LINE : @HABY
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;">
                                                                <strong>Order Number:</strong> '.$order['orderRunNo'].' | <strong>Order Date:</strong> '.date('H:m:s - d M Y',strtotime($order['order_createDate'])).'
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center">
                                                <h1 style="color:green;line-height:1.5">Your order has been delivered<br>
                                                <small><small><b>Tracking No. '.$order['order_deliveryTrackingNo'].' By '.$order['order_deliveryCompany'].'</b></small></small>
                                                </h1>
                                            </td>
                                        </tr>
                                       
                                        <!-- End header Section -->
                                        
                                        <!-- Start address Section -->
                                        
                                        <tr>
                                            <td style="padding-top: 0;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="width: 100%; text-align: left;  font-size: 13px; font-weight: 400; color: #666666; padding: 15px 0; border-top: 1px solid #eeeeee;">
                                                            <b>Dear '.$order['cs_name'].'</b>,<br>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thanks for shopping with us! We are glad to inform you that your order <b>'.$order['orderRunNo'].' </b> has been fully delivered with details as below. We hope you enjoy your purchase on CleancareTH
                                                            
                                                            </td>
                                                                        
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                            Tracking Order Details : <b>'.$order['order_deliveryTrackingNo'].' By '.$order['order_deliveryCompany'].'</b>
                                                            </td>
                                                        </tr>
                                                      
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; line-height: 20px; color: green;">
                                                                
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                            Delivery Details :
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                <b>'.$order['cs_name'].' '.$order['cs_company'].'</b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                '.$order['cs_address'].'
                                                            </td>
                                                            
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px;">
                                                                <b>'.$order['cs_phone'].'</b>
                                                            </td>
                                                            
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 100%; font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px;">
                                                            <br><b>Note : </b><br>'.$order['cs_other'].'
                                                            </td>
                                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End address Section -->
                                        
                                        <!-- Start product Section -->
                                        
                                        '.$htmlProduct.'
                                       
                                        <!-- End product Section -->
                                        
                                        <!-- Start calculation Section -->
                                        <tr>
                                            <td style="padding-top: 0;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb; margin-top: -5px;">
                                                    <tbody>
                                                        <tr>
                                                            <td rowspan="5" style="width: 55%;"></td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Sub-Total:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                                '.$subtotal0.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Discount:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                                '.$discount.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Total:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; width: 130px; text-align: right;">
                                                                '.$subtotal.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee;">
                                                                Shipping Fee:
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px; border-bottom: 1px solid #eeeeee; text-align: right;">
                                                                '.$shipping.'
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px;">
                                                                Order Total
                                                            </td>
                                                            <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px; text-align: right;">
                                                            '.$sum_grandTotal.'
                                                            </td>
                                                        </tr>
                                                       
                                                       
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End calculation Section -->
                                        
                                        <!-- Start payment method Section -->
                                        <tr>
                                            <td style="padding: 0 10px;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner">
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="2" style="width: 100%; text-align: center; font-style: italic; font-size: 13px; font-weight: 600; color: #666666; padding: 15px 0; border-top: 1px solid #eeeeee;">
                                                                <b style="font-size: 14px;">Note:</b>Please keep your invoice and original packaging in case you need to return, replace, or claim your product\'s warranty.
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2" style="width: 100%; text-align: center;  font-size: 11px; font-weight: 400; color: #666666; padding: 15px 0; border-top: 1px solid #eeeeee;">
                                                            <br>อีเมลฉบับนี้ส่งจากระบบอัตโนมัติ กรุณาอย่าตอบกลับ <br>
                                                            This is an automated email. Please do not reply.<br><br>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End payment method Section -->
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>';
    
        return $t;
    }
}

?>