<script type="text/javascript">
$(window).ready(() => {
    manageDataShelf()
    $(`#search-manage`).keyup(function(event) {
        if (event.keyCode === 13) {
            manageDataShelf();
        }
    })
    // $('#search-manage').focus();
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">จัดการข้อมูลชั้นวาง ที่เก็บหนังสือ</h1>
                <small>
                    เพื่อง่ายต่อการค้นหา โปรดระบุให้ชัดเจน
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span onclick="AddDataBookShelf(0)" class="badge badge-pill badge-success cursor-pointer">
                <i class="fas fa-plus"></i> เพิ่มข้อมูลใหม่</span>
                <span onclick="manageDataShelf()" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <div class="ui icon input mini d-none">
                    <input id="search-manage" autocomplete="off" type="text" placeholder="Scan Barcode" />
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div class="showDashBoardUserSTD" id="showDashBoardUserSTD"></div> -->
        <div id="show-manage" class=""></div>
    </div>
</section>
