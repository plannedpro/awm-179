<script type="text/javascript">
$(window).ready(() => {
    getDataBlogsGroupDetail2('all')

    $(`#search-blogsgroupDetail1`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataBlogsGroupDetail2('all')
        }
    })
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">รายละเอียดบทความ/ข่าวสาร </h1>
                <small>
                    รายละเอียด
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span style="" id="btnAddAccountAdmin"
                    onclick="addNewGroupDetail2('uploadblogsgroupDetail2','<?=$_GET['token']?>')"
                    class="badge badge-pill badge-success cursor-pointer"><i class="fas fa-plus"></i> เพิ่มบทความใหม่</span>
                <!-- <span onclick="AddDataAccountAdmin('add',0)" class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-user-plus"></i> Add Account</span> -->

                <span onclick="getDataBlogsGroupDetail2('all')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <!-- <div class="ui mini icon input">
                  <input onkeyup='searchDataUsers()' id="search-user" type="text" placeholder="Search by id,name,phone,email"/>
                  <i aria-hidden="true" class="search icon"></i>
                </div> -->
                <div class="ui icon input mini">
                    <input id="search-blogsgroupDetail1" autocomplete="off" type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div id="table_account_admin" class=""></div> -->
        <div id="show-blogsgroupDetail1" class=""></div>
    </div>
</section>