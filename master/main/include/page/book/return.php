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
    // $(`#search-CheckInreport`).keyup(function(event) {
    //     if (event.keyCode === 13) {
    //         getDataCheckInreport();
    //     }
    // }) 
    $(`#inputScanBarcodeSTD`).keyup(function(event) {
        if (event.keyCode === 13) {
            checkBarcodeSID_ForRetrun()
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
                <h1 class="m-0 text-dark">ทำรายการคืนหนังสือ</h1>
                <small>
                    โดยการแสกนแสกนรหัสบาร์โค้ดหนังสือ เพื่อบันทึกรายการ
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
            <img src="../../include/img/icon/howToReturnBook.png" width="100%" alt="" srcset="">
            <div class="form-row">
                <div class="col-md-12 mb-2 text-left" id="showResultScanBarcode_section0">
                    <label for="inputScanBarcodeSTD">1.แสกนหนังสือ</label>
                    <input type="text" class="form-control inputScanBarcode std" id="inputScanBarcodeSTD">
                </div>
                <div class="col-md-12 mb-2 text-left" id="showResultScanBarcode_section1"></div>
            
                <div class="col-md-12 mb-2" id="showResultScanBarcode_section2"> </div>
                <!-- <div class="col-md-12">
                    <div class="text-left">ข้อมูลผู้ยืม</div>
                    <div class="showResultScanBarcode">
                        <div class="tagUserType"><small>ประเภทบัตร</small><br>นักเรียน</div>
                        <div class="imgprofile">
                            <div class="img">
                                <img src="../../include/img/uploads/profile/null.png"
                                    onclick="viewModelPDFV2('include/img/uploads/profile/','null.png','ปฏิภาณ อินธิบาล')"
                                    width="100%" alt="" srcset="">
                            </div>
                        </div>
                        <div class="datauser">
                            <div class="title">เด็กชาย ปฏิภาณ อินธิบาล</div>
                            <div class="subtitle">รหัสสมาชิก : 19077</div>
                            <div class="history">
                                <div class="boxHistoryEasy">
                                    <div class="form-row">
                                        <div class="col-md-4">
                                            <div class="box1 checkin">
                                                <div class="ttitle">เข้าใช้บริการ</div>
                                                <div class="tnum">2</div>
                                                <div class="tsubtitle">ครั้ง</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="box1 borrow">
                                                <div class="ttitle">ยืมแล้ว</div>
                                                <div class="tnum">2</div>
                                                <div class="tsubtitle">เล่ม</div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="box1 pending">
                                                <div class="ttitle">ค้าง/รอคืน</div>
                                                <div class="tnum">0</div>
                                                <div class="tsubtitle">เล่ม</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> -->

                <div class="col-md-12 mb-2 mt-3 text-left" id="showResultScanBarcode_section3"></div>
            </div>
        </div>

    </div>
</section>
<audio id="sound-return_step1" src="../../include/sound/return_step1.mp3"></audio>

<audio id="sound-return_step11" src="../../include/sound/return_step11.mp3"></audio>
<audio id="sound-return_step2" src="../../include/sound/return_step2.mp3"></audio>

<audio id="sound-notfound" src="../../include/sound/notfound.mp3"></audio>