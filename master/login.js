const URLAPI = '../api/master/';

function text() {
    let login__ip = 0;
    let login__username = document.getElementById('login__username');
    let login__password = document.getElementById('login__password');
    let showerror = document.getElementById('showerror');
    let error = false;
    if (login__username.value == "") {
        error = true;
    }
    if (login__password.value == "") {
        error = true;
    }
    if (error === true) {
        showerror.innerHTML = "โปรดระบุข้อมูลให้ครบถ้วน";
    } else {
        checkLogin1(login__ip, login__username.value, login__password.value);
    }

}

function myRandom(min, max) {
    const N = max - min + 1;
    return Math.floor(Math.random() * N) + min;
}

function checkLogin1(login__ip, login__username, login__password) {
    //  alert("สถานะ "+inputUser+"-"+inputPass);
    let btnsignin = document.getElementById('btnsignin');
    let data = {
        login__ip: login__ip,
        login__username: login__username,
        login__password: login__password,
    };
    let num = Math.floor(Math.random() * 10) + 1;
    btnsignin.classList.add("loading");
    btnsignin.disabled = true;
    // setTimeout(function() {
    $.ajax({
        type: 'post',
        url: URLAPI + 'master/login',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            console.log(result);
            let obj = $.parseJSON(JSON.stringify(result));
            btnsignin.classList.remove("loading");
            btnsignin.disabled = false;
            if (obj[0].status == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'ยินดีต้อนรับ!',
                    confirmButtonText: 'ไปยังหน้าหลัก',
                }).then((result) => {
                    window.location = "./main";
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ไม่สามารถทำรายการได้',
                    text: obj[0].msg,
                    confirmButtonText: 'ตกลง',
                });
            }

        },
        beforeSend: function() {
            //  console.log("Loading data...");
            btnsignin.classList.add("loading");
            btnsignin.disabled = true;
        },
        error: function() {
            console.log("Error");
        }
    });
    // }, myRandom(0, 2) * 1000);
}