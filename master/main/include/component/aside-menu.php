<?php if(isset($_GET["page"])){  $page1=$_GET["page"];}else{  $page1="home";} ?>
<script type="text/javascript">
$(window).ready(() => {
    //getDataNumNotify('numNotify')
});
</script>
<?php getDataSettingAllToSession();

$role = checkRoleAdmin();

// print_r($role);

?>

<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="./" class="brand-link logo_main">
        <img src="../../../../include/img/logoweb.png" height="45px" alt="" srcset="">
        <!-- <div class="webName brand-text ">
            <div class="title">
            CLEAN CARE CONCEPT
            </div>
            <div class="subctitle">
             MANUFACTURING CO.,LTD.
            </div>
        </div> -->

    </a>

    <div class="sidebar">
        <nav class="mt-4" id="navMenuMaster">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                <!-- <li class="nav-item">
                    <a href="./?page=inbox" class="nav-link <?=active_menu('inbox'); ?>">
                        <i class="nav-icon fas fa-comment-dots"></i>
                        <p>กล่องข้อความ</p>
                        <span id="n_inbox" class="right badge "></span>
                    </a>
                </li> -->

                <!-- <li class="nav-item has-treeview  <?=menu_open('setting-oemprocess')?><?=menu_open('setting-warranty')?><?=menu_open('setting-ourbrand')?><?=menu_open('setting-ourServices')?><?=menu_open('setting-ourbrandDetail')?><?=menu_open('setting-activityBlogs')?><?=menu_open('setting-homepage')?><?=menu_open('setting-inbox')?><?=menu_open('setting-about_s')?><?=menu_open('setting-effectbg')?><?=menu_open('setting-footerMenu')?><?=menu_open('setting-promotion')?><?=menu_open('setting-footer')?><?=menu_open('setting-header')?> <?=menu_open('setting-Social-Media')?><?=menu_open('setting-SectionAbountInHomeTitle')?><?=menu_open('setting-contactus')?><?=menu_open('setting-distributors')?>   ">
                    <a href="#" class="nav-link <?=active_menu('setting-oemprocess');?><?=active_menu('setting-warranty');?><?=active_menu('setting-ourbrand');?><?=active_menu('setting-ourServices');?><?=active_menu('setting-ourbrandDetail');?><?=active_menu('setting-activityBlogs');?><?=active_menu('setting-homepage');?><?=active_menu('setting-inbox');?><?=active_menu('setting-about_s');?><?=active_menu('setting-effectbg');?><?=active_menu('setting-footerMenu');?><?=active_menu('setting-promotion');?><?=active_menu('setting-footer');?><?=active_menu('setting-header');?>  <?=active_menu('setting-Social-Media');?> <?=active_menu('setting-SectionAbountInHomeTitle');?><?=active_menu('setting-contactus');?><?=active_menu('setting-distributors');?>   ">
                        <i class="nav-icon fas fa-cogs"></i>
                        <p>การตั้งค่า<i class="right fas fa-angle-right"></i></p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-homepage" class="nav-link <?=active_menu('setting-homepage')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>Home</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-oemprocess" class="nav-link <?=active_menu('setting-oemprocess')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>(Home) ขั้นตอนการทำ OEM</p>
                            </a>
                        </li>
                    </ul>

                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-warranty" class="nav-link <?=active_menu('setting-warranty')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>(Home) Warranty</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-ourbrand" class="nav-link <?=active_menu('setting-ourbrand')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>(Home) OUR BRAND</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-about_s" class="nav-link <?=active_menu('setting-about_s')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>about</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-ourServices" class="nav-link <?=active_menu('setting-ourServices')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>OUR SERVICES</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-ourbrandDetail" class="nav-link <?=active_menu('setting-ourbrandDetail')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>OUR BRAND</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-activityBlogs" class="nav-link <?=active_menu('setting-activityBlogs')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>activity/Blogs</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-contactus" class="nav-link <?=active_menu('setting-contactus')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>(ContactUs) ติดต่อเรา</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-footer" class="nav-link <?=active_menu('setting-footer')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>(Footer) contact</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-footerMenu" class="nav-link <?=active_menu('setting-footerMenu')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>(Footer) Menu</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-Social-Media" class="nav-link <?=active_menu('setting-Social-Media')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>(Footer) บัญชีโซเชียล</p>
                            </a>
                        </li>                       
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-inbox" class="nav-link <?=active_menu('setting-inbox')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>การแจ้งเตือน และแชท</p>
                            </a>
                        </li>
                    </ul>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-effectbg" class="nav-link <?=active_menu('setting-effectbg')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>เอฟเฟคพื้นหลัง (ฟอง)</p>
                            </a>
                        </li>
                    </ul>
                </li>
               
                <li class="nav-item has-treeview <?=menu_open('setting-Google-Analytics')?><?=menu_open('setting-web')?> <?=menu_open('setting-facebook')?>  ">
                    <a href="#" class="nav-link <?=active_menu('setting-Google-Analytics'); ?> <?=active_menu('setting-web'); ?>  <?=active_menu('setting-facebook'); ?> ">
                        <i class="nav-icon fas fa-share-square"></i>
                        <p>SEO SETTING<i class="right fas fa-angle-right"></i></p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="./?page=setting-web" class="nav-link <?=active_menu('setting-web')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>Google Search</p>
                                
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="./?page=setting-facebook"
                                class="nav-link <?=active_menu('setting-facebook')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>SOCIAL SHARE</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="./?page=setting-Google-Analytics"
                                class="nav-link <?=active_menu('setting-Google-Analytics')?>">
                                <i class="far fas fa-angle-right nav-icon icon_menu"></i>
                                <p>Google Analytics</p>
                            </a>
                        </li>
                    </ul>
                </li> -->

                <li class="nav-header">รายการยืม-คืน </li>
                <li class="nav-item ">
                    <a class="nlist nav-link <?=active_menu('borrow'); ?> " href="./?page=borrow">
                        <!-- <i class="nav-icon fas fa-arrow-right"></i> -->
                        <i class="nav-icon fas fa-reply fa-flip-horizontal"></i>
                        <p>ยืมหนังสือ
                        </p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nlist nav-link <?=active_menu('return'); ?> " href="./?page=return">
                        <i class="nav-icon fas fa-reply fa-flip-vertical"></i>
                        <p>คืนหนังสือ
                        </p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nlist nav-link <?=active_menu('history'); ?> " href="./?page=history">
                        <i class="nav-icon fas fa-history"></i>
                        <p> ตรวจสอบประวัติ
                        </p>
                    </a>
                </li>
                <li class="nav-item ">
                    <a class="nlist nav-link <?=active_menu('pending'); ?> " href="./?page=pending">
                        <i class="nav-icon far fa-clock"></i>
                        <p> รายการยืม/รอคืน
                        </p>
                    </a>
                </li>

                <li class="nav-header">สถิติการเข้าใช้บริการ </li>
                <li class="nav-item ">
                    <a class="nlist nav-link <?=active_menu('checkinreport'); ?> " href="./?page=checkinreport">
                        <i class="nav-icon fas fa-house-user"></i>
                        <p>สถิติการเข้าใช้บริการ
                        </p>
                    </a>
                </li>

                <li class="nav-header">จัดการข้อมูล </li>
                <li class="nav-item ">
                    <a class="nlist nav-link <?=active_menu('managebook'); ?> " href="./?page=managebook">
                        <i class="nav-icon fas fa-book"></i>
                        <p>ข้อมูลหนังสือ
                        </p>
                    </a>
                </li>


                <li class="nav-item ">
                    <a class="nlist nav-link <?=active_menu('account-user'); ?> " href="./?page=account-user">
                        <i class="nav-icon fas fa-users"></i>
                        <p>ข้อมูลผู้ใช้บริการ
                        </p>
                    </a>
                </li>


                <li class="nav-header"> การตั้งค่า </li>
                <?php if($role===0){ ?>
                <li class="nav-item ">
                    <a class="nlist nav-link <?=active_menu('account-admin'); ?> " href="./?page=account-admin">
                        <i class="nav-icon fas fa-user-shield"></i>
                        <p>จัดการข้อมูลผู้ดูแลระบบ</p>
                    </a>
                </li>
                <?php } ?>


                <li class="nav-item cursor-pointer">
                    <a class="nlist nav-link " href="#" onclick="logout()">
                        <i class="nav-icon fas fa-sign-out-alt"></i>
                        <p>ออกจากระบบ
                        </p>
                    </a>
                </li>

            </ul>
        </nav>
    </div>
</aside>