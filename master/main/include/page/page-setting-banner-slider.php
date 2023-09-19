<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark">BANNER SLIDER</h1>
                <small>
                    แสดงผลข้อมูลการตั้งค่า ที่แสดงผลในหน้าแรก
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span style="" id="btnAddAccountAdmin" onclick="newbannerSlide()"
                    class="badge badge-pill badge-success cursor-pointer"><i class="fas fa-plus"></i> Add
                    new Banner</span>
                <span onclick="getdataAllBanner('all')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>

            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
$(window).ready(() => {
    // showTableBankTransfer('all', '')
    getdataAllBanner('all')
    // byId('btn_typeId9').classList.remove('fluid')
});
</script>


<section class="content">
    <div class="container-fluid">
        <div class="form-row" id="App">
            <!-- <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            <i class="fas fa-home"></i>
                            SLIDER <span class="text-danger">ขนาดที่แนะนำ -> 1900 x 700</span>
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-setting-1" class="card-body ui form form-row">

                        <div class="form-group col-md-12">
                            <input type="hidden" class="form-control inputSetting" value="id">

                            <label style="display: block;">ตั้งชื่อรูปภาพ <small
                                    class="text-warning">เมื่อค้นหาด้วยรูปภาพ SEO </small></label>
                            <input type="text" class="form-control inputSetting" placeholder="ระบุชื่อรูปภาพ..."
                                value="">
                        </div>
                        <div class="form-group col-md-12">
                            <label style="display: block;">URL เมื่อกดที่แบนเนอร์ <small class="text-warning">เช่น
                                    เมื่อกดให้ไปที่ Facebook ฯลฯ</small></label>
                            <input type="url" class="form-control inputSetting" placeholder="ระบุ URL" value="">
                        </div>
                        <div class="col-md-12">
                            <div id="div_imgpreviewHeaderImg" class="setting__ aboutVideoImg">
                                <span
                                    onclick="removeFileOnPreview('div_imgpreviewHeaderImg','imgpreviewHeaderImg','img-uploadImg-aboutVideoImg')"
                                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                                <img id="imgpreviewHeaderImg" width="100%" src="../../src/img/setting/XhZs1rLuLf.png">
                            </div>
                        </div>

                        <div class="form-group col-md-12">
                            <div class="boxupload">
                                <div style="display:none" id="img-uploadImg-aboutVideoImg"
                                    onclick="clickForSelectImg('input_aboutVideoImg')" class="img-uploadImg-newbox">
                                    <img src="../../src/img/png-file-format-symbol.png">
                                    <div>ภาพแบนเนอร์ Slide หน้าเว็บ <span class="text-danger">ขนาดที่แนะนำ
                                            1900 x 700</span> <small class="text-warning"></small></div>
                                </div>
                                <div class="custom-file" style="display: none;">
                                    <input type="file" id="input_aboutVideoImg" data-setid="268"
                                        class="custom-file-input fileUpload_Plannedpro" accept="image/*;capture=camera"
                                        onchange="loadFile(this,event,'aboutVideoImg')">

                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 text-right">
                            <button type="button" class="btn  ui mini grey  button ">Delete this banner</button>
                            <button type="button" class="btn ui small primary  button ">Save changes</button>
                        </div>


                    </div>
                </div>
            </div> -->

        </div>
    </div>
</section>