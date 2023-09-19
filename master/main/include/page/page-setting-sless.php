<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-12">
                <h1 class="m-0 text-dark">SLESS SETTING</h1>
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
    getdataSetting('5')
});
</script>


<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
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
            
            <div class="col-md-6">
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
                    <div id="body-Preview-Pc" class="card-body ui form body_Preview_fb_Pc">
                            
                        <div id="show-bless" class="show-bless">
                                <p id="preview_web_msg_bless_color" class="show-bless-txt" >ข้อความทดสอบคำถวายพระพรชัยมงคล</p>
                                <ul id="preview_web_sub_bless_color" class="show-bless-title">
                                <li id="web_foot_sub"></li>
                                    <li><span id="web_foot_name" class="mr-1"> </span><span class="">นายทดสอบ นามสมมุติ</span> </li>
                                    <li>7 ม.ค. 65 00.38 น.</li>
                                </ul>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>