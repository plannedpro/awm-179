<script type="text/javascript">
$(window).ready(() => {
    getDataProductByBrandToken('<?=$_GET['token']?>')

    $(`#search-product`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataProductByBrandToken('<?=$_GET['token']?>')
        }
    })
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">จัดการรายการสินค้า <i class="fas fa-caret-right"></i> <b><?=urldecode($_GET['productname'])?></b></h1>
                <small>
                    อ้างอิง : <?=$_GET['token']?>
                </small>
            </div>
            <div class="col-md-6 text-right">
                <a href="?page=blogs-detail-product&token=<?=$_GET['token']?>&productname=<?=$_GET['productname']?>&action=new">
                <span style="" id="btnAddAccountAdmin"  class="badge badge-pill badge-success cursor-pointer"><i class="fas fa-plus"></i> เพิ่มสินค้าใหม่</span>
                </a>
                <!-- <span onclick="AddDataAccountAdmin('add',0)" class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-user-plus"></i> Add Account</span> -->

                <span onclick="getDataProductByBrandToken('<?=$_GET['token']?>')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <!-- <div class="ui mini icon input">
                  <input onkeyup='searchDataUsers()' id="search-user" type="text" placeholder="Search by id,name,phone,email"/>
                  <i aria-hidden="true" class="search icon"></i>
                </div> -->
                <div class="ui icon input mini">
                    <input id="search-product" autocomplete="off" type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div id="table_account_admin" class=""></div> -->
        <div id="show-product" class=""></div>
    </div>
</section>