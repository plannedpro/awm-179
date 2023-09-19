<script type="text/javascript">
$(window).ready(() => {
    getDataAccountAdmin('all', '')
 
    $(`#search-account-admin`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataAccountAdmin('search', this.value)
        }
    })
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">ACCOUNT ADMIN MANAGE</h1>
                <small>
                    บัญชีผู้ใช้สำหรับจัดการข้อมูล
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span style="" id="btnAddAccountAdmin"
                    onclick="OpenModalDialog('ModalDataAccountAdmin',['MasterMail','MasterPass','MasterName','MasterPhone'])"
                    class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-user-plus"></i> Add
                    Account</span>
                <!-- <span onclick="AddDataAccountAdmin('add',0)" class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-user-plus"></i> Add Account</span> -->

                <span onclick="getDataAccountAdmin('all','')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <!-- <div class="ui mini icon input">
                  <input onkeyup='searchDataUsers()' id="search-user" type="text" placeholder="Search by id,name,phone,email"/>
                  <i aria-hidden="true" class="search icon"></i>
                </div> -->
                <div class="ui icon input mini">
                    <input id="search-account-admin" autocomplete="off" type="text" placeholder="Search..." />
                    <i aria-hidden="true" onclick="InputSearchData('search','account-admin')"
                        class="search circular link icon"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div id="table_account_admin" class=""></div> -->
        <div id="show-account-admin" class=""></div>
    </div>
</section>

<div class="modal fade" id="ModalDataAccountAdmin" data-backdrop="static" data-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">ACCOUNT ADMIN</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body" id="bodyModalDataAccountAdmin">
                <form class="ui form #loading " id="formeditprofile" method="post" enctype="multipart/form-data">
                    <input type="hidden" readonly require class="form-control" id="MasterId">

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="MasterMail">E-Mail Address</label>
                            <input onkeyup="checkEmail('MasterMail')" type="email" require class="form-control"
                                id="MasterMail">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="MasterPass">Create Password</label>
                            <input type="text" require class="form-control" id="MasterPass">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="MasterName">Full Name</label>
                            <input type="text" require class="form-control" id="MasterName">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="MasterPhone">Phone</label>
                            <input type="text" require class="form-control" id="MasterPhone"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');">
                        </div>
                    </div>
                    <?php $ARR_ROLE = array('Admin (Full)','Manage Website','Sales','Manage & Sales'); ?>
                    <div class="form-row d-none">
                        <div class="col-md-12">
                        <label for="">สิทธิ์การใช้งาน</label>
                       <select class="form-select form-control-sm" id="MasterRole">
                        <?php foreach($ARR_ROLE AS $key=>$role){ ?>
                            <option value="<?=$key?>"><?=$role?></option>
                            <?php  } ?>
                       </select>
                        </div>
                    </div>
                    <!-- <div class="form-row">
                          <div class="form-group col-md-4">
                              <label for="MasterType">MasterType</label>
                              <select name="classcss" id="MasterType" titile="Master Type">
                                  <option  value="1">Admin</option>
                                  <option value="9">MasterAdmin</option>
                              </select>
                          </div>
                      </div> -->
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn p-btn btn-out btn-secondary" data-dismiss="modal">Close</button>
                <button type="button"
                    onclick="CheckDataFormInput(this,'AccountAdmin',['MasterMail','MasterPass','MasterName','MasterPhone'])"
                    id="btnsave" class="btn p-btn btn-secondary ui button">CONFIRM</button>
            </div>

        </div>
    </div>
</div>