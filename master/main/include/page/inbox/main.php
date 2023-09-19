<script type="text/javascript">
$(window).ready(() => {
    getDataInbox('all')
    $(`#search-Inbox`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataInbox('all')
        }
    })
});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">INBOX</h1>
                <small>
                    แสดงข้อมูล กล่องข้อความจากหน้าเว็บ 
                </small>
            </div>
            <div class="col-md-6 text-right">
                <span onclick="getDataInbox('all')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <div class="ui icon input mini">
                    <input id="search-Inbox" autocomplete="off" type="text" placeholder="Search..." />
                    <!-- <i aria-hidden="true" onclick="InputSearchData('search','Inbox')"
                        class="search circular link icon"></i> -->
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div id="table_account_admin" class=""></div> -->
        <div id="show-Inbox" class=""></div>
    </div>
</section>
