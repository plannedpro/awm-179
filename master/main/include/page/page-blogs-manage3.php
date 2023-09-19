<script type="text/javascript">
$(window).ready(() => {
    getDatablogsgroupmanage3('all')

    $(`#search-blogsgroupmanage2`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDatablogsgroupmanage3('all')
        }
    })
}); 
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">บทความ <i class="fas fa-caret-right"></i> จัดการหัวข้อรีวิว</h1>
                <small>
                    ข้อมูลหัวข้อรีวิว
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span style="" id="btnAddAccountAdmin"
                    onclick="addNewGroupManage3('uploadblogsgroupmanage2')"
                    class="badge badge-pill badge-success cursor-pointer"><i class="fas fa-plus"></i> เพิ่มหัวข้อรีวิวใหม่</span>
                <!-- <span onclick="AddDataAccountAdmin('add',0)" class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-user-plus"></i> Add Account</span> -->

                <span onclick="getDatablogsgroupmanage3('all')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <!-- <div class="ui mini icon input">
                  <input onkeyup='searchDataUsers()' id="search-user" type="text" placeholder="Search by id,name,phone,email"/>
                  <i aria-hidden="true" class="search icon"></i>
                </div> -->
                <div class="ui icon input mini">
                    <input id="search-blogsgroupmanage2" autocomplete="off" type="text" placeholder="Search..." />
                    <i aria-hidden="true" onclick="InputSearchData('search','blogsgroupmanage2')"
                        class="search circular link icon"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div id="table_account_admin" class=""></div> -->
        <div id="show-blogsgroupmanage2" class=""></div>
    </div>
</section>