<section id="hero" class="d-flex align-items-center pagecheckin">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1">
                <!-- <h1 class=""><div data-aos="fade-up" data-aos-delay="200"><small >ระบบบันทึกข้อมูล</small></div><div data-aos="fade-up" data-aos-delay="400">การใช้บริการห้องสมุด </div></h1>
                <h2 data-aos="fade-up" data-aos-delay="600"> โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179</h2>
                <h2 data-aos="fade-up" data-aos-delay="800" class="mb-5"> <small><small>สํานักงานเขตพื้นที่การศึกษาประถมศึกษาสระแก้ว เขต 1</small></small></h2>
                <div class="d-flex justify-content-center justify-content-lg-start" data-aos="fade-up" data-aos-delay="1000">
                    <a href="#about" class="btn-get-started scrollto">เข้าสู่ระบบ</a>
                    <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" class="glightbox btn-watch-video"><i
                            class="bi bi-play-circle"></i><span>วิธีการใช้งาน</span></a>
                </div> -->
                <div class="row customPageScan">
                    <div class="col-md-12" data-aos="fade-up" data-aos-delay="0">
                        <img src="<?=BASEPATH?>include/img/user-scanbarcode.png" class="animatedLeftRight" width="100%"
                            style="max-width: 30rem;" alt="" srcset="">
                    </div>
                    <div class="col-md-12">

                        <div class="row">
                            <div class="col-md-12">
                                <div class="boxScan" id="boxScan" data-aos="fade-up" data-aos-delay="200">
                                    <div class="row">
                                        <div class="col-md-12" data-aos="fade-up" data-aos-delay="200">
                                            <h1>บันทึกการเข้าใช้งานห้องสมุด</h1>
                                        </div>
                                        <div class="col-md-12" data-aos="fade-up" data-aos-delay="400">

                                            <input class="form-control inputCustomFormScanBarcode" type="tel"
                                                id="input_checkin"
                                                placeholder="ระบุรหัสผู้ใช้ หรือแสกนบาร์โค้ดบัตรสมาชิก">
                                                <div class="showMobileOnly">
                                                    <button type="button" class="btn btnCheckIn" onclick="btnclickCkeckIn()">ตรวจสอบ</button>
                                                </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div id="showTextHelloWelcome" class="showTextHelloWelcome"></div>
                                        </div>
                                        <div class="col-md-12 mt-3" data-aos="fade-up" data-aos-delay="600">
                                            <small>หากไม่สามารถแสกนบัตรสมาชิกได้ โปรดระบุหมายเลขสมาชิก
                                                หรือรหัสนักเรียน</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                <!-- <img src="<?=BASEPATH?>assets/img/hero-img.png" class="img-fluid animated" alt=""> -->
                <img src="<?=BASEPATH?>include/img/coverpage_home.png" class="img-fluid animated" alt="">
            <div class="text-center boxBgWhite numuserCheckInToday" data-aos="fade-up" data-aos-delay="400">
                จำนวนผู้ใช้บริการวันนี้
                <div id="numuserCheckInToday"></div>
                คน
            </div>
            </div>
        </div>
    </div>
</section>
<audio id="sound-hello" src="<?=BASEPATH?>include/sound/hello.mp3"></audio>
<audio id="sound-welcome" src="<?=BASEPATH?>include/sound/welcome.mp3"></audio>
<audio id="sound-hello_welcome" src="<?=BASEPATH?>include/sound/hello_welcome.mp3"></audio>
<audio id="sound-notfound" src="<?=BASEPATH?>include/sound/notfound.mp3"></audio>

<section id="cta" class="cta">
    <div class="container">

        <div class="row">
            <div class="col-lg-12 text-center text-lg-start" data-aos="fade-right">
                <h3>สถิติการเข้าใช้บริการ</h3>
                <div id="boxGraphCheckInLast30" class="boxGraphBgWhite"></div>
            </div>
            <!-- <div class="col-lg-4" data-aos="fade-left" data-aos-delay="200">
                <h3>ผู้ใช้บริการวันนี้</h3>
                <div class="textAbount25">1. เพื่อสังเคราะห์องค์ความรู้ เกี่ยวกับแนวทางการส่งเสริมเรียนรู้
                    ทักษะอาชีพในท้องถิ่น 3 ด้าน ได้แก่<br>
                    &nbsp;&nbsp;1) แบบวัดแววความถนัดทางอาชีพท้องถิ่น<br>
                    &nbsp;&nbsp;2) สื่อผสมผสานการเรียนรู้อาชีพในท้องถิ่น และขั้นตอน/เส้นทางการเข้าสู่อาชีพ
                    <br>
                    2. เพื่อพัฒนาเวปไซด์ ห้องเรียนดิจิทัลเปิดโลกกว้าง
                    สร้างเส้นทางเรียนรู้สู่อาชีพเพื่อส่งเสริมทักษะการมีงานทำ
                </div>
            </div> -->
            
        </div>
    </div>
</section>



<script type="text/javascript">
$(window).ready(() => {

    readyInputCheckIn();
});
</script>