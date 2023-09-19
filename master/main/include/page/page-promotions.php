<script type="text/javascript">
$(window).ready(() => {
    getDataPromotion('all')

    $(`#search-promotions`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataPromotion('all')
        }
    })
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">PROMOTIONS </h1>
                <small>
                    ข้อมูลโปรโมชั่นที่แสดงในหน้าเว็บ
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span style="" id="btnAddAccountAdmin"
                    onclick="addNewPromotion('uploadPromotion')"
                    class="badge badge-pill badge-success cursor-pointer"><i class="fas fa-plus"></i> Add New Promotion</span>
                <!-- <span onclick="AddDataAccountAdmin('add',0)" class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-user-plus"></i> Add Account</span> -->

                <span onclick="getDataPromotion('all')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <!-- <div class="ui mini icon input">
                  <input onkeyup='searchDataUsers()' id="search-user" type="text" placeholder="Search by id,name,phone,email"/>
                  <i aria-hidden="true" class="search icon"></i>
                </div> -->
                <div class="ui icon input mini">
                    <input id="search-promotions" autocomplete="off" type="text" placeholder="Search..." />
                    <i aria-hidden="true" onclick="InputSearchData('search','promotions')"
                        class="search circular link icon"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div id="table_account_admin" class=""></div> -->
        <div id="show-promotions" class=""></div>
    </div>
</section>
