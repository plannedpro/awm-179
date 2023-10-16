<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


session_start();
date_default_timezone_set("Asia/Bangkok");

require_once('../../include/php/connect.php');
//include('component/time.php');
require('../../include/php/function-index-master.php');

// print_r($_SESSION['id-user-master']$_SESSION);


// check_login();
// $user = get_user($_SESSION["user_id"]);
if (isset($_GET["page"])) {
   $page = $_GET["page"];
} else {
   $page = "dashboard";
}
$datalogin = checkloginMaster();

getDataSettingAllToSession();
// $_SESSION["id-user-master"]=1;
// $_SESSION["token-user-master"]='XSddxxSaaXX';

?>

<!DOCTYPE html>
<html lang="th">

<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta http-equiv="x-ua-compatible" content="ie=edge">


   <link rel="shortcut icon" href="../../include/img/logo.png" type="image/png" />
    <link href="../../include/img/logo.png" rel="apple-touch-icon">

   <link rel="stylesheet" href="include/css/OverlayScrollbars.min.css?v=2.4">
   <link rel="stylesheet" href="include/css/adminlte.min.css?v=2.4">
   <link rel="stylesheet" href="include/css/main.css?v=2.4">
   <!-- <link rel="stylesheet" href="include/css/main_admin.css?v=2.4"> -->
   <title>MASTER ADMIN - <?= getDataSetting('web_title'); ?></title> 
   <!-- <script src="../../include/sweetalert/sweetalert2@11"></script> -->

   <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js?v=2.4"></script> -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   <script src="https://code.jquery.com/jquery-migrate-1.4.1.min.js"></script>
   <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

   <!-- <link rel="stylesheet" href="https://cdn.js?v=2delivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css?v=2.4" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous"> -->
   <!-- <script src="../../include/bootstrap/bootstrap.min.js?v=2.4"></script> -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>

   <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" />
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
   <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" ></script> -->


   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">



   <script src="include/js/jquery/jquery.overlayScrollbars.min.js?v=2.4"></script>
   <script src="include/js/adminlte.js?v=2.4"></script>
   <!-- <link href="../../include/js/jquery.Thailand.js?v=2/dist/jquery.Thailand.min.css?v=2.4" rel="stylesheet" > -->
   <!-- <link href="../../include/fontawesome/css/all.css?v=2.4" rel="stylesheet"> -->
   <script src="https://kit.fontawesome.com/64d58efce2.js" type="text/javascript"></script>
   <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
   <link href="../../include/css/semantic.css?v=2.4" rel="stylesheet" />
   <!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script> -->

   <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script type="text/javascript" src="../../include/js/moment-timezone.js"></script>

    
   <script type="text/javascript" src="include/js/main_.js?v=2.4"></script>

   <script src="include/js/paginator.js?v=2.4" type="text/javascript"></script>
   <script src="include/js/old.js?v=2.4" type="text/javascript"></script>
   <script src="include/js/old2.js?v=2.4" type="text/javascript"></script>


   <!-- <script src="include/js/function.js?v=2.4" type="text/javascript"></script> -->
   <!-- <script src="include/js/plannedpro_data.js?v=2.4" type="text/javascript"></script> -->
   <!-- <link rel="stylesheet" href="../../include/bootstrap/bootstrap.min.css?v=2.4"> -->
   <link href="../../include/css/bootstrap.min.css" rel="stylesheet" />

   <!-- <link rel="stylesheet" href="include/css/bless.css?v=2.4"> -->
   <link rel="stylesheet" href="include/css/old.css?v=2.4">

   <script type="text/javascript" src="include/js/main.js?v=2.4"></script>

   <!-- <script type="text/javascript" src="include/js/simditor.js?v=2.4"></script> -->

   <link rel="stylesheet" type="text/css" href="include/css/simditor/simditor.css?v=2.4" />

   <!-- <script type="text/javascript" src="include/js/simditor/jquery.min.js?v=2.4"></script> -->
   <script type="text/javascript" src="include/js/simditor/module.js?v=2.4"></script>
   <script type="text/javascript" src="include/js/simditor/hotkeys.js?v=2.4"></script>
   <script type="text/javascript" src="include/js/simditor/uploader.js?v=2.4"></script>
   <script type="text/javascript" src="include/js/simditor/simditor.js?v=2.4"></script>
   <script type="text/javascript" src="include/js/simditor/beautify-html.js?v=2.4"></script>


<link rel="stylesheet" type="text/css" href="./include/css/dataTable_BTN.css" />
    <link rel="stylesheet" type="text/css" href="./include/css/dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.js">
    </script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.colVis.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.print.min.js"></script>
    <link rel="stylesheet" type="text/css"
        href="https://cdn.datatables.net/select/1.4.0/css/select.dataTables.min.css" />
    <script type="text/javascript" src="https://cdn.datatables.net/select/1.4.0/js/dataTables.select.min.js"></script>
   


    





   <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.4/beautify.js?v=2.4"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.4/beautify-css.js?v=2.4"></script> -->
   <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.4/beautify-html.js?v=2.4"></script> -->

   <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.4/beautify.min.js?v=2.4"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.4/beautify-css.min.js?v=2.4"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.4/beautify-html.min.js?v=2.4"></script> -->
      <link href="./include/css/daterangepicker.css" rel="stylesheet" />
    <script type="text/javascript" src="include/js/daterangepicker.min.js" ></script>


    <script src="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.min.css">

    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script type="text/javascript" src="include/js/customFunctions.js" ></script>


   <link rel="stylesheet" href="include/js/simditor/simditor-html.css?v=2.4">
   <script type="text/javascript" src="include/js/simditor/simditor-html.js?v=2.4"></script>

   <script type="text/javascript" src="include/js/JsBarcode.code128.min.js"></script>
   <script type="text/javascript" src="include/js/cleancare.js?v=2.4"></script>
   <script type="text/javascript" src="include/js/custom.js?v=2.4"></script>

   <script type="text/javascript" src="include/js/lib.js?v=2.4"></script>

   <link rel="stylesheet" href="include/css/custom.css?v=2.4">
   <link rel="stylesheet" href="include/css/lib.css?v=2.4">
  
  <!-- <style type="text/css" media="print">
    .noPrint{
      display: none;
    }
  </style> -->

</head>

<script type="text/javascript">
   $(window).load(function() {
      $(".se-pre-con").fadeOut("slow");
   });
</script>

<body class="hold-transition noPrint sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
   <div class="wrapper">
      <?php
      include('include/component/navbar.php');
      include('include/component/aside-menu.php');
      ?>
      <div class="content-wrapper">
         <div class="se-pre-con"></div>
         <?php
         if ($page === 'home') {
          
         // } else if ($page === 'inbox') {
         //    include_once('include/page/inbox/main.php');
         // } else if ($page === 'setting-inbox') {
         //    include_once('include/page/setting/inbox.php');
         } else if ($page === 'account-admin') {
            include_once('include/page/admin/main.php');
          //} else if ($page === 'setting-web') {
         //    include_once('include/page/setting/web.php');
         // } else if ($page === 'setting-facebook') {
         //    include_once('include/page/setting/facebook.php');
         // } else if ($page === 'setting-Google-Analytics') {
         //    include_once('include/page/setting/Google-Analytics.php');
         // } else if ($page === 'setting-Social-Media') { 
         //    include_once('include/page/setting/Social-Media.php');
         // } else if ($page === 'setting-footer') {
         //    include_once('include/page/setting/footer.php');
         // } else if ($page === 'setting-contactus') {
         //    include_once('include/page/setting/contactus.php');
         // } else if ($page === 'setting-distributors') {
         //    include_once('include/page/setting/distributors.php');
         // } else if ($page === 'setting-about') {
         //    include_once('include/page/setting/about.php');
         // } else if ($page === 'setting-aboutpolicy') {
         //    include_once('include/page/setting/aboutpolicy.php');
         // } else if ($page === 'setting-vision') {
         //    include_once('include/page/setting/aboutvision.php');
         // } else if ($page === 'setting-mission') {
         //    include_once('include/page/setting/aboutmission.php');
         // } else if ($page === 'award-setting') {
         //    include_once('include/page/award/setting.php');
         // } else if ($page === 'warranty-setting') {
         //    include_once('include/page/warranty/setting.php');
         // } else if ($page === 'warranty-all') {
         //    include_once('include/page/warranty/all.php');
         // } else if ($page === 'setting-oemprocess') {
         //    include_once('include/page/setting/oemprocess.php');
         // } else if ($page === 'setting-warranty') {
         //    include_once('include/page/setting/warranty.php');
         // } else if ($page === 'setting-ourbrand') {
         //    include_once('include/page/setting/ourbrand.php');
         // } else if ($page === 'setting-ourServices') {
         //    include_once('include/page/setting/ourServices.php');
         // } else if ($page === 'setting-ourbrandDetail') {
         //    include_once('include/page/setting/ourbrandDetail.php');
         // } else if ($page === 'setting-activityBlogs') {
         //    include_once('include/page/setting/activityBlogs.php');
         // } else if ($page === 'setting-homepage') {
         //    include_once('include/page/setting/homepage.php');
         // } else if ($page === 'setting-about_s') {
         //    include_once('include/page/setting/about_s.php');
         // } else if ($page === 'setting-effectbg') {
         //    include_once('include/page/setting/effectbg.php');
         // } else if ($page === 'setting-footerMenu') {
         //    include_once('include/page/setting/footerMenu.php');
         // } else if ($page === 'agent-setting') {
         //    include_once('include/page/agent/setting.php');
         // } else if ($page === 'agent-all') {
         //    include_once('include/page/agent/all.php');
         // } else if ($page === 'award-all') {
         //    include_once('include/page/award/all.php');
         // } else if ($page === 'blogs-detail') {
         //    include_once('include/page/blogs/page-blogs-detail.php');
         // }  else if ($page === 'blogs-detail-product') {
         //    if(isset($_GET['action'])){
         //       include_once('include/page/product/page-add-product.php');
         //    }else{
         //       include_once('include/page/product/page-product.php');
         //    }
            
         // } else if ($page === 'service-manage') {
         //    include_once('include/page/service/page-blogs-service-manage-1.php');
         // } else if ($page === 'service-detail') {
         //    include_once('include/page/service/page-blogs-service-detail-1.php');
         // } else if ($page === 'service-detail4') {
         //    include_once('include/page/service/page-blogs-service-detail-4.php');
         // } else if ($page === 'service-detail5') {
         //    include_once('include/page/service/page-blogs-service-detail-5.php');
         // }else if ($page === 'order') {
         //    include_once('include/page/order/page-order.php');

         // }else if($page==='order-setting-bank'){
         //    include_once('include/page/order/page-order-setting-bank.php');

         // } else if($page==='order-setting-delivery'){
         //    include_once('include/page/order/page-order-setting-delivery.php');

         }else if($page=='account-user'){
            include_once('include/page/user/main.php');
         }else if($page=='managebook'){
            include_once('include/page/book/manage.php');
         }else if($page=='checkinreport'){
            include_once('include/page/checkin/report.php');
         }else if($page=='borrow'){
            include_once('include/page/book/borrow.php');
         }else if($page=='return'){
            include_once('include/page/book/return.php');
         }else if($page=='history'){
            include_once('include/page/book/history.php');
         }else if($page=='pending'){
            include_once('include/page/book/pending.php');
         }else if($page=='bookGroup'){
            include_once('include/page/book/manageGroup.php');
         }else if($page=='bookShelf'){
            include_once('include/page/book/manageShelf.php');
         }else if($page=='dashboard'){
            include_once('include/page/book/dashboard.php');
         }else {
            include_once('include/page/page-notfound-404.php');
         }
         ?>

         <!-- service-detail -->

      </div>


   </div>


   <div class="modal fade" id="modal-ViewPDF0" data-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="ViewPDF0-Title"></h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close"  onclick="closeAndClearModal('ViewPDF0')">
                  <i class="far fa-times-circle"></i>
               </button>
            </div>
            <div class="modal-body p-0" id="body-ViewPDF0">
            </div>
            
         </div>
      </div>
   </div>

   <div class="modal fade" id="modal-ModalOther" data-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog ">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="ModalOther-Title"></h5>
               <button type="button" class="close" id="closeAndViewBTN" onclick="closeAndClearModal('ModalOther')">
                  <i class="far fa-times-circle"></i>
               </button>
            </div>
            <div class="modal-body p-0" id="body-ModalOther">
            </div>

         </div>
      </div>
   </div>

   <div class="modal fade" id="modal-ViewPDF" data-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="ViewPDF-Title"></h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="closeAndClearModal('ViewPDF')">
                  <i class="far fa-times-circle"></i>
               </button>
            </div>
            <div class="modal-body p-0" id="body-ViewPDF">
            </div>
            
         </div>
      </div>
   </div>


   <div class="modal fade" id="modal-print" data-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="print-Title"></h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <i class="far fa-times-circle"></i>
               </button>
            </div>

            <div class="modal-body p-0" id="body-print">
            </div>
            
            <div class="modal-footer text-right" style="display:none" id="footer-print">
            </div>
         </div>
      </div>
   </div>
  




</body>


<!-- <script type="text/javascript" src="../../include/js/jquery.Thailand.js?v=2/dependencies/zip.js?v=2/zip.js?v=2.4"></script>
<script type="text/javascript" src="../../include/js/jquery.Thailand.js?v=2/dependencies/JQL.min.js?v=2.4"></script>
<script type="text/javascript" src="../../include/js/jquery.Thailand.js?v=2/dependencies/typeahead.bundle.js?v=2.4"></script>
<script type="text/javascript" src="../../include/js/jquery.Thailand.js?v=2/dist/jquery.Thailand.min.js?v=2.4"></script> -->
<script type="text/javascript">
   $(window).ready(() => {
      //  startConsoleLog()
   });
   // $.Thailand({
   //     database: '../../include/js/jquery.Thailand.js?v=2/database/db.js?v=2on',
   //     $district: $('#formAddData [name="district"]'),
   //     $amphoe: $('#formAddData [name="amphoe"]'),
   //     $province: $('#formAddData [name="province"]'),
   //     $zipcode: $('#formAddData [name="zipcode"]'),

   //     onDataFill: function(data) {
   //     },
   //     onLoad: function() {
   //         $('#loader, .demo').toggle();
   //     }
   // });
</script>


</html>