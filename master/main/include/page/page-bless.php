<?php
if(isset($_GET["s"])){
    if($_GET["s"]=='new'){
        $type = 'ใหม่';
        $typeId = 1;
    }else if($_GET["s"]=='approved'){
        $type = 'อนุมัติแล้ว';
        $typeId=2;
    }else if($_GET["s"]=='hidden'){
        $type = 'ไม่อนุมัติ';
        $typeId =0;
    }else{
        $type = 'ทังหมด';
        $typeId=9;
    }
}else{
    $type = 'ทังหมด';
    $typeId=9;
}

?>
<script type="text/javascript">
$(window).ready(() => {
    // showTableBankTransfer('all', '')
    getdataBless(<?=$typeId?>,'')
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-md-6">
        <h1 class="m-0 text-dark">คำถวายพระพร <i class="fas fa-caret-right"></i> <?=$type?></h1>
          <small>
         แสดงผลข้อมูลคำถวายพระพรชัยมงคล
            </small>
      </div>
      <div class="col-md-6 text-right">
                <!-- <span onclick="AdddataCustomer('add',0)" class="badge badge-pill badge-secondary cursor-pointer"><i class="far fa-paper-plane"></i> ส่งจดหมาย</span> -->
                <span onclick="getdataBless(<?=$typeId?>,'')" class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <!-- <div class="ui mini icon input">
                  <input onkeyup='searchDataUsers()' id="search-user" type="text" placeholder="Search by id,name,phone,email"/>
                  <i aria-hidden="true" class="search icon"></i>
                </div> -->
                <div class="ui icon input mini">
                            <input id="search-bless"  autocomplete="off" type="text" placeholder="Search..."/>
                            <i aria-hidden="true" onclick="InputSearchData(<?=$typeId?>,'bless')" class="search circular link icon"></i>
                        </div>
    </div>
    </div>
  </div>
</div>

<section class="content">
    <div class="container-fluid">
         <div id="table_list_bless" class=""></div>
    </div>
</section>