<?php
//$school = get_data_shool_show($user["school"]);
//$location = json_decode($school["school_location"], true);
 ?>

<nav class="main-header navbar navbar-expand navbar-white navbar-light">
  <!-- Left navbar links -->
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
    </li>
    <!-- <li class="nav-item d-none d-sm-inline-block">
      <a href="./" class="nav-link">Admin</a>
    </li> -->
  </ul>

  <ul class="navbar-nav ml-auto">


    <li class="nav-item dropdown">
      <a class="nav-link link_profile" data-toggle="dropdown" href="#">
        Admin
        <i class="far fa-user"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
        <!-- <span class="dropdown-item dropdown-header">บัญชีของฉัน</span>
        <div class="dropdown-divider"></div>
        <a href="?page=profile" class="dropdown-item">ข้อมูลส่วนตัว
          <span class="float-right text-muted text-sm"><i class="fas fa-angle-right"></i></span>
        </a>
        <div class="dropdown-divider"></div>
        <a href="?page=history&show=1" class="dropdown-item">
          ข้อมูลประวัติการทำรายการ
          <span class="float-right text-muted text-sm"><i class="fas fa-angle-right"></i></span>
        </a>
        <div class="dropdown-divider"></div> -->
        <a   onclick="logout()" class="dropdown-item dropdown-footer nlist cursor-pointer"><i class="fas fa-sign-out-alt"></i> ออกจากระบบ</a>
      </div>
    </li>


  </ul>
</nav>
