<script type="text/javascript">
$(window).ready(() => {
    // $(`#filterDate`).daterangepicker({
    //     opens: 'left',
    //     startDate: new Date(SELECT_FILTER_DATE__START),
    //     endDate: new Date(SELECT_FILTER_DATE__END),
    //     "locale": {
    //         "format": "DD/MM/YY",
    //         "separator": " ถึง ",
    //         "applyLabel": "ตกลง",
    //         "cancelLabel": "ยกเลิก",
    //         "fromLabel": "จาก",
    //         "toLabel": "ถึง",
    //         "customRangeLabel": "เลือกช่วงเวลาเอง",
    //         "weekLabel": "W",
    //         "daysOfWeek": arrWeek,
    //         "monthNames": arrMonthThaiFull,
    //         "firstDay": 0
    //     },
    //     ranges: {
    //         'วันนี้': [moment(), moment()],
    //         'สัปดาห์นี้': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
    //         'สัปดาห์หน้า': [moment().add(1, 'weeks').startOf('isoWeek'), moment().add(1, 'weeks').endOf('isoWeek')],
    //         'เดือนนี้ ': [moment().startOf('month'), moment().endOf('month')],
    //         'เดือนก่อน': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    //         'ปีนี้': [moment().startOf('year'), moment().endOf('year')],
    //         'ปีที่แล้ว': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
    //     }
    // }, function(start,end){
    //     // console.log(start,end);
    //     // let lstart = new Date(start).getTime()
    //     // console.log(lstart);
    //     SELECT_FILTER_DATE__START = moment(start).format('YYYY-MM-DD H:mm:s');
    //     SELECT_FILTER_DATE__END = moment(end).format('YYYY-MM-DD H:mm:s');
    //     getDataCheckInreport()
    // });



    // getDataCheckInreport()
    $(`#inputScanBarcodeSTD`).keyup(function(event) {
        if (event.keyCode === 13) {
           checkBarcodeSID_ForBorrow()
        }
    })
    $('#inputScanBarcodeSTD').focus();
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">ทำรายการยืมหนังสือ</h1>
                <small>
                    โดยการแสกนบัตรสมาชิก เพื่อเริ่มทำรายการ และแสกนรหัสบาร์โค้ดหนังสือ เพื่อบันทึกรายการ
                </small>
            </div>
            <div class="col-md-6 text-right">
                <!-- <span onclick="AddDataBook(0)" class="badge badge-pill badge-success cursor-pointer">
                <i class="fas fa-plus"></i> เพิ่มข้อมูลใหม่</span> -->
                <!-- <span onclick="getDataCheckInreport()" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <div class="ui icon input mini ">
                    <input id="search-CheckInreport" autocomplete="off" type="text" placeholder="Scan Barcode" />
                </div>
                <div class="ui icon input mini">
                    <input id="filterDate" autocomplete="off" type="text" placeholder="Search..." />
                </div> -->
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid">
        <div class="cardBorrow boxWhiteDashboard">
            <img src="../../include/img/icon/howToBorrowBook.png" width="100%" alt="" srcset="">
            <div class="form-row">
                <div class="col-md-12 mb-2 text-left" id="showResultScanBarcode_section0">
                    <label for="inputScanBarcodeSTD">1.ป้อนรหัสสมาชิก หรือแสกนบาร์โค้ดบัตรสมาชิก</label>
                    <input type="text" class="form-control inputScanBarcode std" id="inputScanBarcodeSTD">
                </div>
                <div class="col-md-12" id="showResultScanBarcode_section1"></div>
                <div class="col-md-12 mb-2 mt-3 text-left" id="showResultScanBarcode_section2"></div>
                <div class="col-md-12" id="showResultScanBarcode_section3"></div>
                <div class="col-md-12 mb-2 mt-3 text-left" id="showResultScanBarcode_section4"></div>
                <div class="col-md-12 mb-2 mt-3 text-left" id="showResultScanBarcode_section5"></div>
            </div>
        </div>

    </div>
</section>

<!-- <section class="content">
    <div class="container-fluid">
        <div class="form-row">
            <div class="col-md-12">
                <div id="boxGraphCheckInLast30" class="boxGraphCheckInLast30"></div>
            </div>
            <div class="col-md-5 mt-4">
                <div class="form-row mb-3">
                    <div class="col-md-4 col-12">
                        <div class="boxWhiteDashboard">
                            <div class="title">วันนี้</div>
                            <div class="num" id="showNumCheckInToday">0</div>
                            <div class="subtitle">คน</div>
                        </div>
                    </div>
                    <div class="col-md-4 col-6">
                        <div class="boxWhiteDashboard">
                            <div class="title">สัปดหาห์นี้</div>
                            <div class="num" id="showNumCheckInThisWeek">0</div>
                            <div class="subtitle">คน</div>
                        </div>
                    </div>
                    <div class="col-md-4 col-6">
                        <div class="boxWhiteDashboard">
                            <div class="title">เดือนนี้</div>
                            <div class="num" id="showNumCheckInThisMonth">0</div>
                            <div class="subtitle">คน</div>
                        </div>
                    </div>
                </div>
                <div class="titleG">แสดงข้อมูลผู้ใช้บริการตามสถิติ แจงตามวันและผู้ใช้</div>
                <div id="show-CheckInreport" class="CheckInreport"></div>
            </div>
            <div class="col-md-7 mt-4">
                <div class="titleG">แสดงข้อมูลผู้ใช้บริการตามสถิติ แบบละเอียด</div>
                <div id="show-CheckInreport2" class="CheckInreport"></div>
            </div>
        </div>
    </div>
</section> -->

<audio id="sound-borrow_step1" src="../../include/sound/borrow_step1.mp3"></audio>
<audio id="sound-borrow_step2" src="../../include/sound/borrow_step2.mp3"></audio>
<audio id="sound-borrow_step3" src="../../include/sound/borrow_step3.mp3"></audio>
<audio id="sound-borrow_step31" src="../../include/sound/borrow_step31.mp3"></audio>
<audio id="sound-borrow_step4" src="../../include/sound/borrow_step4.mp3"></audio>
<audio id="sound-borrow_step5" src="../../include/sound/borrow_step5.mp3"></audio>
<audio id="sound-notfound" src="../../include/sound/notfound.mp3"></audio>

