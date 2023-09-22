let URLAPI = '../api/master/';

let YOURDOMAIN = window.location.hostname;
let YOURDOMAIN_0 = window.location.hostname;
let BASEPATH = ``;
if (YOURDOMAIN == 'localhost') {
    // YOURDOMAIN = `./`;
    YOURDOMAIN_0 = `./`;
    YOURDOMAIN = 'http://localhost/'
        // YOURDOMAIN = 'http://localhost/'


}
// let URLAPI = '../../../api/master/';
function setPathURL_T(path) {
    //console.log(path)

    BASEPATH = path;
    URLAPI = `${path}api/master/`; // //console.log(path, URLAPI);
    // //console.log(YOURDOMAIN)
}


let byId = function(id) { return document.getElementById(id); };
let byClass = function(id) { return document.getElementsByClassName(id); }
let byTag = function(id) { return document.getElementsByTagName(id); }
let createE = function(id) { return document.createElement(id); };
let Find = function(tag) { return document.querySelector(tag); }
let FindAll = function(tag) { return document.querySelectorAll(tag); }
let btnUploadImgProfile = function(idInput) { byId(idInput).click() }
let openModal = function(id) { $('#modal-' + id).modal('show') }
let closeModal = function(id) { $('#modal-' + id).modal('hide') }
let configToTimeZone = 0
let configToTimeZoneNet = 0

let createTagE = function(nametag, arrClass) {
    let tag = createE(nametag)
    for (let i = 0; i < arrClass.length; i++) { tag.classList.add(arrClass[i]) }
    return tag
}

function setTitleBar(PageName) {
    document.title = `${PageName} - BT Midland Co.,Ltd.`
}

let createTd = function(num, tr) {
        let ArrReturn = []
        for (let i = 0; i < num; i++) {
            let cell = createTagE("td", ['td' + i]);
            tr.appendChild(cell);
            ArrReturn.push(cell)
        }
        ArrReturn[num - 1].classList.add('text-right');
        return ArrReturn
    }
    // let arrWeek = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."]
    // let arrMonthThaiFull = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
    // let ArrMonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    // let ArrMonthShort = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    // let ArrMonthEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    // let ArrMonthENShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    // let ArrDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    // let ArrDayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    // let ArrDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // let ArrDayNamesTH = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
    // let ArrDayNamesTHShort = ["อ.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."]

let arrWeek = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."]
let arrMonthThaiFull = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
let ArrMonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
let ArrMonthShort = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
let ArrMonthEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let ArrMonthENShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
let ArrMonthENShortV2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let ArrDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let ArrDayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let ArrDayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let ArrDayNamesTH = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
let ArrDayNamesTHShort = ["อ.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."]


// //console.log(convertDate(1644498354))
moment.tz.setDefault("Asia/Bangkok");
// moment.locale('th')
moment.locale('TH');


// moment.lang('TH');
moment.locale('TH', {
    months: arrMonthThaiFull,
    monthsShort: ArrMonthShort,
    monthsParseExact: true,
    // weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdays: ArrDayNamesTH,
    weekdaysShort: ArrDayNamesTHShort,
    weekdaysMin: ArrDayNamesTHShort,
    weekdaysParseExact: true,

    meridiem: function(hours, minutes, isLower) {
        // console.log(hours, minutes, isLower)
        return hours < 12 ? 'เช้า' : hours == 12 ? 'เที่ยง' : 'บ่าย';
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // Used to determine first week of the year.
    },
    months: arrMonthThaiFull,
    days: ArrDayNamesTH
});


$(window).ready(() => {

    $('.btn-signout').click(function() {
        logout()
    })

});




// //console.log(convertDate(1644498354))


function convertDate(milliseconds) {


    let myDate = new Date(milliseconds * 1000);

    let returnArr = {
            'data': milliseconds,
            'json': myDate.toJSON(),
            'd': myDate.getDate(),
            'h': myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`,
            'm': myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`,
            's': myDate.getSeconds(),

            'timeHM': `${myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`}:${myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`} น.`,
        
        'typeDMY_TH':`${myDate.getDate()} ${ArrMonth[myDate.getMonth()]} ${myDate.getFullYear()}`,
        'typeDMY_TH_short':`${myDate.getDate()} ${ArrMonthShort[myDate.getMonth()]} ${myDate.getFullYear()}`,
        'typeDMY_EN_short':`${myDate.getDate()} ${ArrMonthENShortV2[myDate.getMonth()]} ${myDate.getFullYear()}`,

        'full_1':`${myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`}:${myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`} น. ${myDate.getDate()} ${ArrMonthShort[myDate.getMonth()]} ${myDate.getFullYear()}`,
        'full_2':`${myDate.getHours() >= 10 ? myDate.getHours() : `0${myDate.getHours()}`}:${myDate.getMinutes() >= 10 ? myDate.getMinutes() : `0${myDate.getMinutes()}`} น.  วัน${ArrDayNamesTH[myDate.getDay()]} ${myDate.getDate()} ${ArrMonthShort[myDate.getMonth()]} ${myDate.getFullYear()}`,
        'yyyymmdd':`${myDate.getFullYear()}-${myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : `0${myDate.getMonth()+1}`}-${myDate.getDate() >= 10 ? myDate.getDate() : `0${myDate.getDate()}`}`,


        'dayInMonth': ArrDayInMonth[myDate.getMonth()],
        'day': {
            // 'digit': myDate.getDay(),
            'digit': myDate.getDate(),
            'digit_': myDate.getDate() >= 10 ? myDate.getDate() : `0${myDate.getDate()}`,
            'en': {
                'full': ArrDayNames[myDate.getDay()],
                'short': ArrDayNamesShort[myDate.getDay()]
            },
            'th': {
                'full': ArrDayNamesTH[myDate.getDay()],
                'short': ArrDayNamesTHShort[myDate.getDay()]
            }
        },
        'month': {
            'digit': myDate.getMonth() + 1,
            'digit_': myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : `0${myDate.getMonth()+1}`,
            'th': {
                'full': ArrMonth[myDate.getMonth()],
                'short': ArrMonthShort[myDate.getMonth()]
            },
            'en': {
                'full': ArrMonthEN[myDate.getMonth()],
                'short': ArrMonthENShort[myDate.getMonth()]
            }

        },
        'year': {
            'full': myDate.getFullYear(),
            'th': {
                'full': myDate.getFullYear() + 543,
                'short': myDate.getFullYear() - 1957,
            },
            'en': {
                'full': myDate.getFullYear(),
                'short': myDate.getFullYear() - 2000,
            }
        }
    }
    return returnArr
}



function createBtnBadge(id, className, html) {
    let btnAdd = createTagE('span', ['badge', 'badge-pill', 'badge_btn', className])
    btnAdd.innerHTML = html
    btnAdd.setAttribute('id', id)

    return btnAdd
}

function createInputSearchUi(id, type, placeholder) {
    let div = createTagE('div', ['ui', 'icon', 'input', 'mini', 'ml-1'])
    let input = createE('input')
    input.setAttribute('id', `search-${id}`)
    input.setAttribute('autocomplete', 'off')
    input.setAttribute('type', type)
    input.setAttribute('placeholder', placeholder)
    let i = createTagE('i', ['search', 'circular', 'link', 'icon'])
    i.setAttribute('onclick', `InputSearchData('search','${id}')`)
    div.appendChild(input)
    div.appendChild(i)
    return div
}

function createInputDateTimeUi(id, type, placeholder) {
    let div = createTagE('div', ['ui', 'left', 'icon', 'input', 'mini', 'ml-1', 'DateTimeUi', 'ranges'])
    let input = createE('input')
    input.setAttribute('id', `DateTime-${id}`)
    input.setAttribute('autocomplete', 'off')
    input.setAttribute('type', type)
    input.setAttribute('placeholder', placeholder)
    let i = createTagE('i', ['calendar', 'alternate', 'icon'])
        // i.setAttribute('onclick', `InputSearchData('search','${id}')`)
    div.appendChild(input)
    div.appendChild(i)
    return div
}

function createSelectOptionUi(id, arrValue, arrOption) {
    let div = createTagE('div', ['ui', 'icon', 'input', 'mini', 'ml-1'])
    let select = createTagE('select', ['custom-select', 'custom-select-sm'])
    select.setAttribute('id', `select-${id}`)
    div.appendChild(select)
        // if (type == 1) {
        //     addOptionToSelectV3(select, arrOption)
        // } else {
    addOptionToSelectV2(select, arrOption, arrOption)
        // }

    // div.appendChild(i)
    return div
}



let addCommas = function(x) {
    if (x != null) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return x
    }

}





function createToken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}



let mobileAndTabletCheck = function() {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


function showError(msg) {
    saveLogsFile('error', `Someting Error : ${msg}`, `Someting Error : ${msg}`)
    saveLogsFile('all', '', `Show Error : ${msg}`)
    Swal.fire({
        title: 'มีบางอย่างผิดพลาด',
        html: msg,
        icon: 'warning',
        confirmButtonText: 'ลองอีกครั้ง'
    });
}

function showErrorConnect(msg, dataUrl, dataArray, error) {
    Swal.fire({
        title: 'มีบางอย่างผิดพลาด',
        html: msg,
        icon: 'warning',
        confirmButtonText: 'ลองอีกครั้ง'
    }).then((result) => {
        if (result.isConfirmed) {
            saveLogsFile('api_error', `${dataUrl} (${error})`, dataArray)
            saveLogsFile('all', ``, `api error : ${error} (${dataUrl}) `)
            window.location = './'
        }

    })
}

function showSuccess(msg) {
    Swal.fire({
        title: 'ดำเนินการสำเร็จ',
        html: msg,
        icon: 'success',
        confirmButtonText: 'ตกลง'
    });
}



function saveLogsFile(type, filename, contant) {
    let dataArray = {
            type: type,
            filename: filename,
            data: contant
        }
        // $.ajax({
        //     type: 'post',
        //     url: '../include/php/savelogsfile.php',
        //     data: dataArray,
        //     contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        //     dataType: "text",
        //     success: function(result) {},
        //     beforeSend: function() {

    //     }

    // });

}


function randomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function searchArr(all, find) {
    let result = []
    for (let i = 0; i < all.length; i++) {
        if (all[i] == find) {
            result.push(i)
        }
    }
    if (result.length > 0) {
        return true
    } else {
        return false
    }
}

function searchArrToType(nameKey, myArray) {
    let result = []
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].to_type == nameKey) {
            result.push(myArray[i])
        }
    }
    return result
}

function searchArrToTypeAssign(nameKey, myArray) {
    let result = []
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].emp_token == nameKey) {
            result.push(myArray[i])
        }
    }
    return result
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function connectApi(dataUrl, dataArray, loading, handleData) {
    console.log(URLAPI + dataUrl);
    $.ajax({
        type: 'post',
        url: URLAPI + dataUrl,
        data: JSON.stringify(dataArray),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            if (loading != '') {
                byId(loading).classList.remove('loading', 'ui', 'form')
            }
            handleData(result)
        },
        beforeSend: function() {
            if (loading != '') {
                byId(loading).classList.add('loading', 'ui', 'form')
            }
        },
        error: function(data, errorThrown) {
            console.log('request failed : ' + errorThrown+data);

            showErrorConnect('ตรวจสอบการเชื่อมต่อ หรือลองรีเฟรชหน้านี้ใหม่อีกครั้ง', dataUrl, JSON.stringify(dataArray).toString(), errorThrown)
        }
    });
}

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24
  
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()
  
    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)
  
    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)
  
  }


  function buttonRotateImgPrevice(e, token, anglePreview) {
    let img = byId(`imgPreview_${token}`);
    anglePreview = (anglePreview + 90) % 360;
    img.className = `imgPreview_ rotate${anglePreview}`;
    e.setAttribute('onclick', `buttonRotateImgPrevice(this,'${token}',${anglePreview})`);
}