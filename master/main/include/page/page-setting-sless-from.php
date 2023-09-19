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
    getdataSetting('3')
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
                            
                            <div class="form-row mt-3">
                                    <div class="form-group col-md-6">
                                        <label for="input__email">ที่อยู่อีเมล</label>
                                        <input disabled type="email" class="form-control formPcontrol disabled" id="input__email">
                                        <small id="web_input_sub_email" class="form-text text-muted"></small>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="input__name">ชื่อ - นามสกุล</label>
                                        <input disabled type="email" class="form-control formPcontrol disabled" id="input__name">
                                        <small id="web_input_sub_name" class="form-text text-muted"></small>
                                    </div>
                            </div>
                            <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <label id="label_msg" for="exampleInputEmail1"></label>
                                        <textarea disabled class="form-control formTcontrol disabled" id="input_msg" rows="3" name="message"></textarea>
                                        <small id="web_input_sub_msg" class="form-text text-muted"></small>
                                    </div>
                             </div>
                             <div class="row">
                                    <div class="col-md-12 text-center mt-2 mb-3">
                                        <button type="button"  id="web_button_save_bless" class="ui  button btn_save_bless">Save</button>
                                    </div>
                             </div>
                             <div class="row">
                                <div class="col-md-12 text-center">
                                    <span class="web_text_sub_form" id="web_text_sub_form"></span>
                                </div>
                             </div>
                        
                    </div>

                </div>
            </div>
           
        </div>
    </div>
</section>