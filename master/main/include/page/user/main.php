<script type="text/javascript">
$(window).ready(() => {
    getDataUserStudent()
    $(`#search-users`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataUserStudent();
        }
    })
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">ข้อมูลนักเรียน / ผู้ใช้บริการ</h1>
                <small>
                    แสดงข้อมูลทั้งหมด โปรดเลือก Filter ตามความต้องการก่อนเริ่มใช้งาน
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span onclick="AddDataUserStudent(0)" class="badge badge-pill badge-success cursor-pointer">
                <i class="fas fa-plus"></i> เพิ่มข้อมูล</span>
                <span onclick="getDataUserStudent()" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <div class="ui icon input mini d-none">
                    <input id="search-users" autocomplete="off" type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <div class="showDashBoardUserSTD" id="showDashBoardUserSTD"></div>
        <div id="show-users" class=""></div>
    </div>
</section>
