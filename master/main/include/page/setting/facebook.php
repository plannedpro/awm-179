<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-12">
                <h1 class="m-0 text-dark">SOCIAL SHARE SETTING</h1>
                <small>
                    แสดงผลข้อมูลการตั้งค่า ที่แสดงผลในหน้าแรก
                </small>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
$(window).ready(() => {
    // showTableBankTransfer('all', '')
    getdataSetting('2')
});
</script>


<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-5">

              


                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            <i class="fas fa-home"></i>
                            ตั้งค่าการแสดงผล
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-setting-1" class="card-body ui form">
                        <form class="ui form #loading " id="formeditprofile" method="post" enctype="multipart/form-data">

                            
                            <!-- <img width="100%" id="bgPreview"/> -->
                            <div class="ui form" id="showInutSettingGroup1">
                                

                            </div>
                            
                        </form>
                    </div>
                </div>

                <div class="card collapsed-card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                        <i class="fas fa-fingerprint"></i>
                            คำแนะนำเกี่ยวกับ App Id
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div  class="card-body ui form">
                        1.ไปที่เว็บไซต์ <a href="https://developers.facebook.com/apps/" target="_BLANK">https://developers.facebook.com/apps/</a>
                        <br>2.กดปุ่ม "สร้างแอพ" (ปุ่มสีเขียว) กรอกข้อมูลทำตามคำแนะนำของระบบ
                        <br>หรือหากมีแอพแล้ว สามารถคัดลอก App Id ตามรูปภาพมาใส่ได้เลย<br>
                        <small class="text-danger">**หากไม่สร้าง App การแชร์อาจไม่ได้รับการเข้าถึงตามที่กำหนด**</small>
                        <img src="../../src/howtoGetIDAppFacebook.png" width="100%" alt="">
                    </div>
                </div>
                <div class="card collapsed-card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                        <i class="fas fa-share-square"></i>
                            คำแนะนำด้านการแชร์
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div  class="card-body ui form">
                        <img src="../../src/howtoShareProbum.png" width="100%" alt="">
                        ระบบ Facebook อาจใช้เวลาสักครู่ในการดึงข้อมูล และอัพเดตข้อมูลเว็บใหม่ 
                        ท่านสามารถ <a href="https://developers.facebook.com/tools/debug/?q=https%3A%2F%2F<?=$_SERVER['SERVER_NAME'];?>%2F" target="_BLANK">กดที่นี่ เพื่ออัพเดตข้อมูลเอง</a>
                        <br>1.กดปุ่ม "แก้ไขจุดบกพร่อง"
                        <br>2.กดปุ่ม "สเครปอีกครั้ง"
                    </div>
                </div>

                
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            <i class="fas fa-desktop"></i>
                            Preview Facebook Share PC
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-Preview-FB" class="card-body ui form body_Preview_fb_Pc">
                    <img src="../../include/img/preview/titlebar-browser-03.png" width="100%">
                    <div class="previewFacebook">
                        <div class="fbImgCover">
                             <img id="fbCoverPreviewImg" src="../../include/img/setting/fb-hero-image-001.jpeg" width="100%">
                        </div>
                        
                        <div class="previewFbSubtext">
                            <div class="url"><?=$_SERVER['SERVER_NAME']?> </div>
                            <div id="fbShareTitle" class="title mt-1">รับออกแบบและพัฒนาเว็บไซต์ รับออกแบบและพัฒนาเว็บไซต์ รับออกแบบและพัฒนาเว็บไซต์</div>
                            <div id="fbShareDes" class="des mt-1">ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ</div>
                        </div>
                    </div>
                    <img src="../../include/img/preview/titlebar-browser-04.png" width="100%">
                        
                    </div>

                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            <i class="fas fa-mobile-alt"></i>
                            Preview Messenger
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-Preview-Msg" class="card-body ui form p-0">
                        <img src="../../include/img/preview/titlebar-browser-05.png" width="100%">
                        <div class="contant_msg_mobile">
                            <div class="msggg">
                                <span>https://yourdomain.com</span>
                                <div class="MsgImgCover">
                                    <img id="MsgCoverPreviewImg" src="../../include/img/setting/fb-hero-image-001.jpeg" width="100%">
                                </div>
                                <div class="previewMsgSubtext">
                                    <div id="MsgShareTitle" class="title mt-1">รับออกแบบและพัฒนาเว็บไซต์ รับออกแบบและพัฒนาเว็บไซต์ รับออกแบบและพัฒนาเว็บไซต์</div>
                                    <div id="MsgShareDes" class="des">ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ</div>
                                </div>
                            </div>
                            
                        </div>
                        <img src="../../include/img/preview/titlebar-browser-07.png" width="100%">
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            <i class="fas fa-mobile-alt"></i>
                            Preview Line Chat
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-Preview-Line" class="card-body ui form p-0">
                        <img src="../../include/img/preview/titlebar-browser-06.png" width="100%">
                        <div class="contant_line_mobile">
                            <div class="lineee">
                                    <div class="LineImgCover">
                                        <img id="LineCoverPreviewImg" src="../../include/img/setting/fb-hero-image-001.jpeg" width="100%">
                                    </div>
                                    <div class="previewLineSubtext">
                                        <div id="LineShareTitle" class="title mt-1">รับออกแบบและพัฒนาเว็บไซต์ รับออกแบบและพัฒนาเว็บไซต์ รับออกแบบและพัฒนาเว็บไซต์</div>
                                        <div id="LineShareDes" class="des">ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ</div>
                                    </div>
                                 </div>
                        </div>
                        <img src="../../include/img/preview/titlebar-browser-08.png" width="100%">
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</section>