<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-12">
                <h1 class="m-0 text-dark">HOMEPAGE SETTING</h1>
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
    getdataSetting('1')
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
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            <i class="fas fa-desktop"></i>
                            Preview On Desktop
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-Preview-Pc" class="card-body ui form body_Preview_Pc">
                        <div class="main-content-bg row" id="main-content-bg-Pc">
                            <div class="0col-md-6 img-container-pc">
                                 <img class="w-75" id="profile_img_pc"  alt="">
                            </div>
                            <div class="content-container-pc">
                                <img class="img_logo" id="img_logo_pc" width="60vw"  alt="">
                                <img class="img_res w-100" id="img_text_pc"  alt="">
                            </div>
                            
                        </div>
                        <div class="text-center mt-3">
                        <img class="img_res" id="img_text_title" width="80%"  alt="">
                        </div>
                        
                    </div>

                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            <i class="fas fa-mobile-alt"></i>
                            Preview On Mobile
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-Preview-Mobile" class="card-body ui form body_Preview_mobile">
                        <div class="main-content-bg row" id="main-content-bg-mobile">
                            <div class="0col-md-6 img-container-mobile">
                                 <img class="w-75" id="profile_img_mobile"  alt="">
                            </div>
                            <div class="content-container-mobile">
                                <img class="img_logo_mobile" id="img_logo_mobile" width="60vw"  alt="">
                                <img class="img_res w-100" id="img_text_mobile"  alt="">
                            </div>
                            
                        </div>
                        <div class="text-center mt-3 img_text_title_mobile" id="img_text_title_mobile">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>