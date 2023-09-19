<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-12">
                <h1 class="m-0 text-dark">INBOX & CHAT SETTING</h1>
                <small>
                    แสดงผลข้อมูลการตั้งค่า
                </small>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
$(window).ready(() => {
    // showTableBankTransfer('all', '')
    getdataSetting('14')
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
                            ตั้งค่าข้อความ การแจ้งเตือน และระบบแชท
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div id="body-setting-1" class="card-body ui form">
                        <form class="ui form #loading " id="formeditprofile" method="post"
                            enctype="multipart/form-data">
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
                            วิธีขอ Line Token
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form-row">
                            <div class="col-md-12">
                                เข้าสู่ระบบ Line (แนะนำวิธีแสกนบาร์โค้ด)
                                <a target="_BLANK"
                                    href="https://access.line.me/oauth2/v2.1/login?loginState=vLbzfli2l9GAXoK8QbHkqZ&loginChannelId=1476232700&returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fscope%3Dprofile%2Bopenid%2Bbot.add%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fnotify-bot.line.me%252Flogin%252Fcallback%26state%3DfQwnZ8idqguWID5qA59ruX%26nonce%3DD5MaKAH1uMOCHfetoKorC5%26client_id%3D1476232700#/"><button
                                        type="button" class="btn btn-success">คลิกที่นี่</button></a>
                                        <br>หรือ <a target="_BLANK" href="https://notify-bot.line.me/th/">https://notify-bot.line.me/th/</a>
                            </div>
                            <div class="col-md-12 mt-2">
                                <img src="../../src/howtoGetTokenLine.png" width="100%" alt="" srcset="">
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                            วิธีขอ Code Pugin Chat Facebook
                        </h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse"> <i
                                    class="fas fa-minus"></i> </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="form-row">
                            <div class="col-md-12">
                                เข้าสู่ระบบ Facebook Fanpage หรือ
                                <a target="_BLANK"
                                    href="https://business.facebook.com/latest/inbox/settings/chat_plugin"><button
                                        type="button" class="btn btn-primary">คลิกที่นี่</button></a>
                                        <br>หรือ <a target="_BLANK" href="https://business.facebook.com/latest/inbox/settings/chat_plugin">https://business.facebook.com/latest/inbox/settings/chat_plugin</a>
                            </div>
                            <div class="col-md-12 mt-2">
                                <img src="../../src/howtoGetPuginChatFacebook.png" width="100%" alt="" srcset="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>