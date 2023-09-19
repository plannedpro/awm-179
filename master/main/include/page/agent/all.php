<script type="text/javascript">
$(window).ready(() => {
    getDataSalesMember('all')

    $(`#search-SalesMember`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataSalesMember('all')
        }
    })
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">ศูนย์กระจายสินค้า/ตัวแทน</h1>
                <small>
                    จัดการข้อมูล
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span style="" id="btnAddAccountAdmin"
                    onclick="addNewSalesMember('uploadImg')"
                    class="badge badge-pill badge-success cursor-pointer"><i class="fas fa-plus"></i> เพิ่มศูนย์กระจายสินค้า/ตัวแทน</span>
                <!-- <span onclick="AddDataAccountAdmin('add',0)" class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-user-plus"></i> Add Account</span> -->

                <span onclick="getDataSalesMember('all')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <!-- <div class="ui mini icon input">
                  <input onkeyup='searchDataUsers()' id="search-user" type="text" placeholder="Search by id,name,phone,email"/>
                  <i aria-hidden="true" class="search icon"></i>
                </div> -->
                <div class="ui icon input mini">
                    <input id="search-SalesMember" autocomplete="off" type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div id="table_account_admin" class=""></div> -->
        <div id="show-SalesMember" class=""></div>
    </div>
</section>
