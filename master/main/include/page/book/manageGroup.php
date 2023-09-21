<script type="text/javascript">
$(window).ready(() => {
    manageDataGroup()
    $(`#search-manage`).keyup(function(event) {
        if (event.keyCode === 13) {
            manageDataGroup();
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
                <h1 class="m-0 text-dark">จัดการกลุ่ม/หมวดหนังสือ</h1>
                <small>
                    แสดงข้อมูลทั้งหมด โปรดเลือก Filter ตามความต้องการก่อนเริ่มใช้งาน
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span onclick="AddDataBookGroup(0)" class="badge badge-pill badge-success cursor-pointer">
                <i class="fas fa-plus"></i> เพิ่มข้อมูลใหม่</span>
                <span onclick="manageDataGroup()" class="badge badge-pill badge-secondary cursor-pointer"><i
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
