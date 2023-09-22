<section id="hero" class="d-flex align-items-center pagecheckin">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0">
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
                        <img src="<?=BASEPATH?>include/img/searchbook.png" class="animatedLeftRight" width="100%"
                            style="max-width: 30rem;" alt="" srcset="">
                    </div>
                    <div class="col-md-12">

                        <div class="row">
                            <div class="col-md-12">
                                <div class="boxScan" id="boxScan" data-aos="fade-up" data-aos-delay="200">
                                    <div class="row">
                                        <div class="col-md-12 mb-2" data-aos="fade-up" data-aos-delay="200">
                                            <h1>หนังสือเล่มนั้นอยู่ที่หนใด?</h1>
                                            <span>ระบบนี้จะค้นหาข้อมูลหนังสือในห้องสมุด เพื่อทราบถึงสถานะของหนังสือ
                                                และสถานที่จัดเก็บ</span>
                                        </div>
                                        <div class="col-md-12" data-aos="fade-up" data-aos-delay="400">

                                            <input class="form-control inputCustomFormScanBarcode" type="tel"
                                                id="input_search" placeholder="ชื่อหนังสือ/หมวดหมู่/รหัสหนังสือ">
                                            <div class="showMobileOnly0">
                                                <button type="button" class="btn btnCheckIn"
                                                    onclick="btnclickSearch()">ค้นหาเลย</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-lg-6" data-aos="zoom-in" data-aos-delay="200">
                <div class="resultSearch">
                    <div class="title">ผลการค้นหา : <span id="textPreviewSearch"></span></div>
                    <div class="resultHTML">
                        <div class="form-row" id="resultHTML">
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
<audio id="sound-hello" src="<?=BASEPATH?>include/sound/hello.mp3"></audio>
<audio id="sound-welcome" src="<?=BASEPATH?>include/sound/welcome.mp3"></audio>
<audio id="sound-hello_welcome" src="<?=BASEPATH?>include/sound/hello_welcome.mp3"></audio>
<audio id="sound-notfound" src="<?=BASEPATH?>include/sound/notfound.mp3"></audio>

<!-- <section id="cta" class="cta">
    <div class="container">

        <div class="row">
            <div class="col-lg-12 text-center text-lg-start" data-aos="fade-right">
                <h3>สถิติการเข้าใช้บริการ</h3>
                <div id="boxGraphCheckInLast30" class="boxGraphBgWhite"></div>
            </div>

            
        </div>
    </div>
</section> -->



<script type="text/javascript">
$(window).ready(() => {

    readyInputsearch();
});
</script>