<script type="text/javascript">
$(window).ready(() => {
    getDataBookAll()
    $(`#search-bookall`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataBookAll();
        }
    })
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">จัดการข้อมูลหนังสือ</h1>
                <small>
                    แสดงข้อมูลทั้งหมด โปรดเลือก Filter ตามความต้องการก่อนเริ่มใช้งาน
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span onclick="AddDataBook(0)" class="badge badge-pill badge-success cursor-pointer">
                <i class="fas fa-plus"></i> เพิ่มข้อมูลใหม่</span>
                <span onclick="getDataBookAll()" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <div class="ui icon input mini d-none">
                    <input id="search-bookall" autocomplete="off" type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div class="showDashBoardUserSTD" id="showDashBoardUserSTD"></div> -->
        <div id="show-bookall" class=""></div>
    </div>
</section>
