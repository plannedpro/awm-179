<script type="text/javascript">
$(window).ready(() => {
    // getDataBookAll()
    $(`#search-history`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataHistoryBorrow();
        }
    })
    getDataHistoryBorrow();
    $('#search-history').focus();
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark"> ประวัติการทำรายการ ยืม-คืน หนังสือ</h1>
                <small>
                    แสดงข้อมูลทั้งหมด โปรดเลือก Filter ตามความต้องการก่อนเริ่มใช้งาน
                </small>
            </div>
            <div class="col-md-6 text-right">
                <!-- <span onclick="getDataBookAll()" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span> -->
               <div> 
                <!-- <input type="checkbox" checked name="filterStatus" id="filterStatus_2">
                <label for="filterStatus_2">คืนแล้ว</label> -->
                <input type="checkbox" onchange="getDataHistoryBorrow()" name="filterStatus" id="filterStatus_1">
                <label for="filterStatus_1">รอคืนเท่านั้น</label>
            </div>


            <div> 
                <input type="radio" onclick="getDataHistoryBorrow()" checked name="typeSearch" id="typeSearch_sid">
                <label for="typeSearch_sid">บัตรสมาชิก</label>
                <input type="radio" onclick="getDataHistoryBorrow()"  name="typeSearch" id="typeSearch_barcode">
                <label for="typeSearch_barcode">รหัสหนังสือ</label>
            </div>
            
                <div class="ui icon input mini">
                    <input id="search-history" autocomplete="off" type="text" placeholder="Scan Barcode" />
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div class="showDashBoardUserSTD" id="showDashBoardUserSTD"></div> -->
        <div id="show-history" class=""></div>
    </div>
</section>
