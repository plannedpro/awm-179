<!DOCTYPE html>
<html lang="en">
<?php 
use Steampixel\Route;
include 'include/Steampixel/Route.php';
define('BASEPATH','/');
// define('BASEPATH','/gitHub/crmu66-travel2/');
$domain_ = $_SERVER['SERVER_NAME'];
$versionScript = 1;

?>

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>ระบบบันทึกข้อมูลการใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179</title>
    <meta name="description"
        content="ระบบบันทึกข้อมูลการใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179 โดย Plannedpro Creative Solutions" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />


    <!-- facebook share -->
    <link rel="image_src" type="image/jpeg" href="https://<?=$domain_?>/facebbook1.png">
    <meta property="fb:app_id" content="">
    <meta property="fb:admins" content="">
    <meta property="og:type" content="website">
    <meta property="og:title" content="ระบบบันทึกข้อมูลการใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179">
    <meta property="og:description"
        content="ระบบบันทึกข้อมูลการใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179">
    <meta property="og:image" content="https://<?=$domain_?>/facebbook1.png">
    <meta property="og:url" content="">
    <meta property="og:site_name" content="P">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="ระบบบันทึกข้อมูลการใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179">
    <meta name="twitter:description"
        content="ระบบบันทึกข้อมูลการใช้บริการห้องสมุด โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179">
    <meta name="twitter:image" content="https://<?=$domain_?>/facebbook1.png">
    <meta property="fb:pages" content="" />
    <meta property="og:image:width" content="371">
    <meta property="og:image:height" content="278">
    <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="https://<?=$domain_?>">
    <meta name="theme-color" content="#8dc63f">

    <!--====== Favicon Icon ======-->
    <link rel="shortcut icon" href="<?=BASEPATH?>include/img/logo.png" type="image/png" />
    <link href="<?=BASEPATH?>include/img/logo.png" rel="apple-touch-icon">

    <script src="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.min.css">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <!-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css"> -->
    <script src="https://cdn.jsdelivr.net/npm/moment@latest"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/daterangepicker@latest"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script type="text/javascript" src="<?=BASEPATH?>include/js/moment-timezone.js"></script>
    <!-- Favicons -->
    <!-- <link href="<?=BASEPATH?>assets/img/favicon.png" rel="icon">
    <link href="<?=BASEPATH?>assets/img/apple-touch-icon.png" rel="apple-touch-icon"> -->

    <!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Jost:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet">

    <!-- Vendor CSS Files -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11" async></script>


    <link href="<?=BASEPATH?>include/css/semantic.css" rel="stylesheet">


    <link href="<?=BASEPATH?>assets/vendor/aos/aos.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        crossorigin="anonymous">



    <!-- <link href="<?=BASEPATH?>assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"> -->

    <link href="<?=BASEPATH?>assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="<?=BASEPATH?>assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="<?=BASEPATH?>assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="<?=BASEPATH?>assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="<?=BASEPATH?>assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">




    <!-- Template Main CSS File -->
    <link href="<?=BASEPATH?>assets/css/style.css?v=<?=$versionScript?>" rel="stylesheet">

    <script src="https://kit.fontawesome.com/8e7e2562e0.js" crossorigin="anonymous"></script>
    <link href="<?=BASEPATH?>include/css/custom.css?v=<?=$versionScript?>" rel="stylesheet">
    <script src="<?=BASEPATH?>include/js/main_.js?v=<?=$versionScript?>"></script>
    <script src="<?=BASEPATH?>include/js/custom.js?v=<?=$versionScript?>"></script>
    <script src="<?=BASEPATH?>include/js/custom-awm.js?v=<?=$versionScript?>"></script>

    <!-- =======================================================
  * Template Name: Arsha
  * Updated: Jul 27 2023 with Bootstrap v5.3.1
  * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->

    <script>
    $(window).ready(() => {

        setPathURL_T('<?=BASEPATH?>');
        saveLogs_web('view', 'loadPage');
        $('.showImgPreviewOnModal').click(function() {
            // console.log(this);
            let img = this.src;
            openModal('ShowModal_img');
            let body = byId('ShowModal_img-body');
            body.innerHTML = `<img src="${img}" width="100%">`;
        })
        $('.clickForViewIngoImg').click(function() {
            // console.log(this);
            let img = this.dataset.id;
            openModal('ShowModal_img');

            clickForViewImgImgInfographic(img)
            // body.innerHTML=`<img src="${img}" width="100%">`;
        })
        // $('.customLoading').append( `<div class="spinner-border"></div>`);
    });
    </script>
</head>

<body>

    <?php include('include/page/header.php'); ?>
    <?php  ?>

    <?php 
  
    Route::add('/', function() {
        include('include/page/hearder_home.php');
        include('include/page/about.php');
    
        // include('include/page/study_main.php');
        // include('include/page/section_all.php');
        
        // include('include/page/main.php'); 
        include('include/page/team.php');
    });


    Route::add('/checkin', function() {
        include('include/page/page_checkin.php');
        // include('include/page/about.php');
        // include('include/page/team.php');
    });





    Route::pathNotFound(function($path) {
        // include('./include/page/error/404.php');
        //  include('./include/page/home/NewBlogs.php'); 
        include('include/page/notfound.php');
        // echo "<div class='text-center mt-2'>ไม่พบหน้าที่ต้องการ โปรดลองอีกครั้ง</div>";
        // echo 'Not found! '.$path;
    });
      
    Route::methodNotAllowed(function($path, $method) {
        echo 'Error 405 :-(<br>';
        echo 'The requested path "'.$path.'" exists. But the request method "'.$method.'" is not allowed on this path!';
    });
    
    
    ?>
    <?php Route::run(BASEPATH); ?>
    <?php
    include('include/page/footer.php');
    ?>


    <div id="preloader"></div>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
            class="bi bi-arrow-up-short"></i></a>

    <!-- Vendor JS Files -->
    <script src="<?=BASEPATH?>assets/vendor/aos/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous">
    </script>
    <!-- <script src="<?=BASEPATH?>assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script> -->
    <script src="<?=BASEPATH?>assets/vendor/glightbox/js/glightbox.min.js"></script>
    <script src="<?=BASEPATH?>assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
    <script src="<?=BASEPATH?>assets/vendor/swiper/swiper-bundle.min.js"></script>
    <script src="<?=BASEPATH?>assets/vendor/waypoints/noframework.waypoints.js"></script>
    <script src="<?=BASEPATH?>assets/vendor/php-email-form/validate.js"></script>

    <!-- Template Main JS File -->
    <script src="<?=BASEPATH?>assets/js/main.js"></script>

</body>

<div class="modal fade" id="modal-ShowModal_img" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="ShowModal_img-title">Preview</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0" id="ShowModal_img-body"></div>
        </div>
    </div>
</div>

</html>