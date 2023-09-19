<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-12">
                <h1 class="m-0 text-dark">WEBSITE SETTING</h1>
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
    getdataSetting('4')
});
</script>


<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
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
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            <i class="fas fa-desktop"></i>
                            Preview Titile Tab Bar
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-Preview-Pc" class="card-body ui form body_Preview_fb_Pc px-0 py-1">
                        
                        <div class="previewWebTitleBar">
                        
                            <div class="previewWebTitleBarPC">
                                <img id="imgLogoICO" src="../../include/img/setting/queen_lg.png" height="20px" alt="" srcset="">
                                <span id="textTitleTabBar">ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ</span>
                            </div>
                            <!-- <img src="../../include/img/preview/titlebar-browser-01.png" width="100%"> -->
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            <i class="fas fa-mobile-alt"></i>
                            Preview Google search results
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-Preview-Mobile" class="card-body ui form  px-0 pt-1">
                        <img src="../../include/img/preview/titlebar-browser-02.png" width="100%">
                        <div class="priviewSearch">
                            <div class="url">https://yourwebsite.com <i class="fas fa-caret-down"></i></div>
                            <div id="WebShareTitle" class="title mt-1">รับออกแบบและพัฒนาเว็บไซต์ รับออกแบบและพัฒนาเว็บไซต์ รับออกแบบและพัฒนาเว็บไซต์</div>
                            <div id="WebShareDes" class="des">ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ ทดสอบข้อความยาวๆ</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>