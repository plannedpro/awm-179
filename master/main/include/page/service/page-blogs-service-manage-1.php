<script type="text/javascript">
$(window).ready(() => {
    getDataBlogsGroupManage1('all')

    $(`#search-blogsgroupmanage1`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataBlogsGroupManage1('all')
        }
    })
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">บริการ <i class="fas fa-caret-right"></i> จัดการหัวข้อบริการ </h1>
                <small>
                    ข้อมูลกลุ่ม/หัวข้อบริกา่ร
                </small>
            </div>
            <div class="col-md-6 text-right">
                <!-- <span style="" id="btnAddAccountAdmin"
                    onclick="addNewGroupManage1('uploadblogsgroupmanage1')"
                    class="badge badge-pill badge-success cursor-pointer"><i class="fas fa-plus"></i> เพิ่มหัวข้อใหม่</span> -->
                <!-- <span onclick="AddDataAccountAdmin('add',0)" class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-user-plus"></i> Add Account</span> -->

                <span onclick="getDataBlogsGroupManage1('all')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <!-- <div class="ui mini icon input">
                  <input onkeyup='searchDataUsers()' id="search-user" type="text" placeholder="Search by id,name,phone,email"/>
                  <i aria-hidden="true" class="search icon"></i>
                </div> -->
                <div class="ui icon input mini">
                    <input id="search-blogsgroupmanage1" autocomplete="off" type="text" placeholder="Search..." />
                    <i aria-hidden="true" onclick="InputSearchData('search','blogsgroupmanage1')"
                        class="search circular link icon"></i>
                </div>
            </div>
        </div>
    </div>
</div>
 
<section class="content">
    <div class="container-fluid">
        <!-- <div id="table_account_admin" class=""></div> -->
        <div id="show-blogsgroupmanage1" class=""></div>
    </div>
</section>