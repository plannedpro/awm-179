<script type="text/javascript">
$(window).ready(() => {
    $(`#filterDate`).daterangepicker({
        opens: 'left',
        startDate: new Date(SELECT_FILTER_DATE__START),
        endDate: new Date(SELECT_FILTER_DATE__END),
        "locale": {
            "format": "DD/MM/YY",
            "separator": " ถึง ",
            "applyLabel": "ตกลง",
            "cancelLabel": "ยกเลิก",
            "fromLabel": "จาก",
            "toLabel": "ถึง",
            "customRangeLabel": "เลือกช่วงเวลาเอง",
            "weekLabel": "W",
            "daysOfWeek": arrWeek,
            "monthNames": arrMonthThaiFull,
            "firstDay": 0
        },
        ranges: {
            'วันนี้': [moment(), moment()],
            'สัปดาห์นี้': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
            'สัปดาห์หน้า': [moment().add(1, 'weeks').startOf('isoWeek'), moment().add(1, 'weeks').endOf('isoWeek')],
            'เดือนนี้ ': [moment().startOf('month'), moment().endOf('month')],
            'เดือนก่อน': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'ปีนี้': [moment().startOf('year'), moment().endOf('year')],
            'ปีที่แล้ว': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
        }
    }, function(start,end){
        // console.log(start,end);
        // let lstart = new Date(start).getTime()
        // console.log(lstart);
        SELECT_FILTER_DATE__START = moment(start).format('YYYY-MM-DD H:mm:s');
        SELECT_FILTER_DATE__END = moment(end).format('YYYY-MM-DD H:mm:s');
        getDataDashboard()
    });



    getDataDashboard()
    $(`#search-dashboard`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataDashboard();
        }
    })
    $('#search-dashboard').focus();
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">รายงานสถิติ ระบบบันทึกข้อมูลการใช้บริการห้องสมุด</h1>
                <small>
                โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179
                </small>
            </div>
            <div class="col-md-6 text-right">
                <!-- <span onclick="AddDataBook(0)" class="badge badge-pill badge-success cursor-pointer">
                <i class="fas fa-plus"></i> เพิ่มข้อมูลใหม่</span> -->
                <span onclick="getDataDashboard()" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <div class="ui icon input mini d-none">
                    <input id="search-dashboard" autocomplete="off" type="text" placeholder="Scan Barcode" />
                </div>
                <div class="ui icon input mini">
                    <input id="filterDate" autocomplete="off" type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <div class="form-row">
            <div class="col-md-12">
                <div id="boxGraphLogBorrow" class="boxGraphCheckInLast30"></div>
            </div>
            <div class="col-md-4 mt-4">
                <div class="titleG">สรุปข้อมูลการยืม <small>ในช่วงเดือนปัจจุบัน</small></div>  
                <div class="form-row mb-3" >
                    <div class="col-md-4 col-12">
                        <div class="boxWhiteDashboard">
                            <div class="title">วันนี้</div>
                            <div class="num" id="showNumCheckInToday">0</div>
                            <div class="subtitle">รายการ</div>
                        </div>
                    </div>
                    <div class="col-md-4 col-6">
                        <div class="boxWhiteDashboard">
                            <div class="title">สัปดหาห์นี้</div>
                            <div class="num" id="showNumCheckInThisWeek">0</div>
                            <div class="subtitle">รายการ</div>
                        </div>
                    </div>
                    <div class="col-md-4 col-6">
                        <div class="boxWhiteDashboard">
                            <div class="title">เดือนนี้</div>
                            <div class="num" id="showNumCheckInThisMonth">0</div>
                            <div class="subtitle">รายการ</div>
                        </div>
                    </div>
                </div> 
                <div class="titleG">หนังสือที่ถูกยืมมากที่สุด 5 อันดับ <small>ในช่วงวันที่เลือก</small></div>   
                <div id="show-logBook5" class="CheckInreport"></div>

                <div class="titleG mt-3">ผู้ใช้บริการยืมหนังสือบ่อยที่สุด 5 อันดับ <small>ในช่วงวันที่เลือก</small></div>   
                <div id="show-logUser5" class="CheckInreport"></div>
            </div>
            <div class="col-md-8 mt-4">
               
                <div class="form-row">
                    <div class="col-md-12">
                         <div class="titleG">แสดงข้อมูลหนังสือค้างส่ง <b>ตามชื่อหนังสือและผู้ยืม</b> (ยืมแล้ว รอคืน)</div>   
                            <div id="show-CheckInreport2" class="CheckInreport"></div>
                    </div>
                    <div class="col-md-6 mt-3">
                        <div class="titleG ">ข้อมูลตามระดับชั้น ที่ใช้บริการ <small>ในช่วงวันที่เลือก</small></div>   
                        <div  class="CheckInreport"><div id="show-userClass"></div></div>
                    </div>
                    <div class="col-md-6 mt-3">
                        <div class="titleG ">ข้อมูลตามหมวดหมู่หนังสือ/กลุ่ม <small>ในช่วงวันที่เลือก</small></div>   
                        <div  class="CheckInreport"><div id="show-bookgroup"></div></div>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
</section>
