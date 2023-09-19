// var URLAPIMASTER = '../../api/master/';
var URLAPIMASTER = '../../api/master/';
let border_left = 'border-l.png'
let border_right = 'border-r.png'
let bg = 'body_bg.jpg'
let profile_img = 'queen.png'
let profile_logo = 'queen_lg.png'
let img_title = 'text_q.png'
let head_title = 'frame3.png'
let facebook_image = 'fb-hero-image-001.jpeg'
let facebook_title = 'Example'
let facebook_des = 'Example'
let web_logo = ''
let web_title = 'รับออกแบบและพัฒนาเว็บไซต์'
let web_des = 'Plannedpro Creative Solutions รับออกแบบและพัฒนาเว็บไซต์'
let web_input_sub_email = ''
let web_input_sub_name = ''
let web_input_sub_msg = ''
let web_text_button = 'บันทึก'
let web_text_sub_form = ''
let web_placeholder_msg = '0'
let web_btn_bless_color = '#008000'
let web_border_bless_color = '#e9cd34'
let web_msg_bless_color = '#000000'
let web_sub_bless_color = '#e9cd34'
let web_foot_sub = 'ด้วยเกล้าด้วยกระหม่อม'
let web_foot_name = 'ข้าพระพุทธเจ้า'
let pageSize = 4;
let incremSlide = 5;
let startPage = 0;
let numberPage = 0;




var DATABLESS = ''

var DATASETTING = ''

function startConsoleLog() {
    // alert('erer');
    var styles = [
        'color: red', 'display: block', 'line-height: 40px', 'text-align: center', 'font-weight: bold', 'font-size:40px'
    ].join(';');
    var styles2 = [
        'color: white', 'display: block', 'line-height: 20px', 'text-align: center', 'font-weight: bold', 'font-size:18px'
    ].join(';');

    console.log('%cWARNING!', styles);
    console.log('%cThis is a browser feature intended for developers.Do NOT copy and paste something here.', styles2);
    // console.log('test', "color:" + color)

}


var loadFile = function(element, event, idKey) {
    console.log(idKey)
    var reader = new FileReader();
    reader.onload = function() {
        // console.log(event.target.files[0].name)
        byId('label_input_' + idKey).innerHTML = event.target.files[0].name
            // byId('btn_' + idKey).style.display = 'inline'
        if (idKey == 'bg') {
            byId('body-Preview-Pc').style.backgroundImage = "url('" + reader.result + "')"
            byId('body-Preview-Mobile').style.backgroundImage = "url('" + reader.result + "')"
        } else if (idKey == 'profile_img') {
            byId('profile_img_pc').src = reader.result
            byId('profile_img_mobile').src = reader.result
        } else if (idKey == 'profile_logo') {
            byId('img_logo_pc').src = reader.result
            byId('img_logo_mobile').src = reader.result
        } else if (idKey == 'img_title') {
            byId('img_text_pc').src = reader.result
            byId('img_text_mobile').src = reader.result
        } else if (idKey == 'head_title') {
            byId('img_text_title').src = reader.result
                // byId('img_text_mobile').src = reader.result
            byId('img_text_title_mobile').style.backgroundImage = "url('" + reader.result + "')"
        } else if (idKey == 'border_right') {
            byId('main-content-bg-Pc').style.backgroundImage = "url('" + reader.result + "'),url('../../src/img/setting/" + border_left + "')"
            byId('main-content-bg-mobile').style.backgroundImage = "url('" + reader.result + "'),url('../../src/img/setting/" + border_left + "')"
        } else if (idKey == 'border_left') {
            byId('main-content-bg-Pc').style.backgroundImage = "url('../../src/img/setting/" + border_right + "'),url('" + reader.result + "')"
            byId('main-content-bg-mobile').style.backgroundImage = "url('../../src/img/setting/" + border_right + "'),url('" + reader.result + "')"
        } else if (idKey == 'facebook_image') {
            byId('fbCoverPreviewImg').src = reader.result
            byId('MsgCoverPreviewImg').src = reader.result
            byId('LineCoverPreviewImg').src = reader.result
        } else if (idKey == 'web_logo') {
            byId('imgLogoICO').src = reader.result
        } else if (idKey == 'aboutHeaderImg' || idKey == 'aboutVideoImg' || idKey == 'footerImgContact' || idKey == 'aboutImg2' || idKey == 'aboutRewardImg') {
            byId('div_imgpreviewHeaderImg').style.display = 'block'
            byId(`img-uploadImg-${idKey}`).style.display = 'none'
            byId('imgpreviewHeaderImg').src = reader.result
        } else if (idKey == 'about_policyImg' || idKey == 'about_DetailImg' || idKey == 'about_missionImg' || idKey == 'oemprocess_img' || idKey == 'homewarranty_img' || idKey == 'homeourbrand_img') {
            byId('div_imgpreviewHeaderImg').style.display = 'block'
            byId(`img-uploadImg-${idKey}`).style.display = 'none'
            byId('imgpreviewHeaderImg').src = reader.result
        } else if (idKey == 'ourservice_img_service_1' || idKey == 'ourservice_img_service_2' || idKey == 'ourservice_img_service_3') {
            byId('div_imgpreviewHeaderImg').style.display = 'block'
            byId(`img-uploadImg-${idKey}`).style.display = 'none'
            byId('imgpreviewHeaderImg').src = reader.result
        } else if (idKey == 'homepage_bg_img' || idKey == 'aboutSet_bg_img' || idKey == 'ourservice_bg_img' || idKey == 'ourbrand_bg_img' || idKey == 'activityblogs_bg_img' || idKey == 'contact_bg_img' || idKey == 'order_ImgBank') {
            byId('div_imgpreviewHeaderImg').style.display = 'block'
            byId(`img-uploadImg-${idKey}`).style.display = 'none'
            byId('imgpreviewHeaderImg').src = reader.result
        } else {
            // console.log(element, event, idKey)
            byId(`imgpreview-${idKey}`).src = reader.result
            byId(`div_imgpreview-${idKey}`).style.display = 'block'
            byId(`img-uploadImg-${idKey}`).style.display = 'none'

            let dataAPI = {
                file: reader.result,
                name: '',
                folder: 'setting'
            }
            console.log(idKey)
            console.log(dataAPI)
            connectApi('master/uploadFile', { type: 'save', data: dataAPI, dataoption: 0 }, `body-${idKey}`, function(output) {
                console.log(output)
                if (output.status == 200) {
                    let file__ = `${output.data[0].path}${output.data[0].fileName}`
                    byId(`imgpreview-${idKey}`).src = file__
                    byId(`Fileinput_${idKey}`).dataset.filename = `${output.data[0].fileName}`;
                } else {
                    showError(output.msg)
                }
            })


        }

    };
    reader.readAsDataURL(event.target.files[0]);
};

function getdataSetting(typeId) {
    // console.log(URLAPIMASTER)
    let showInutSettingGroup1 = byId('showInutSettingGroup1')
    showInutSettingGroup1.innerHTML = ''

    let data = {
        type: typeId,
        dataArray: 0
    };
    $.ajax({
        type: 'post',
        url: URLAPIMASTER + 'setting/get',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            // console.log(result);
            showInutSettingGroup1.classList.remove('loading');
            let obj = $.parseJSON(JSON.stringify(result));
            DATASETTING = obj[0].data
            createFormSetting(typeId, obj[0].data)
        },
        beforeSend: function() {
            showInutSettingGroup1.classList.add('loading')
            if (typeId == '1' || typeId == '4') {
                byId('body-Preview-Pc').classList.add('loading')
                byId('body-Preview-Mobile').classList.add('loading')
            } else if (typeId == '2') {
                byId('body-Preview-FB').classList.add('loading')
                byId('body-Preview-Msg').classList.add('loading')
                byId('body-Preview-Line').classList.add('loading')
            } else if (typeId == '3' || typeId == '5') {
                byId('body-Preview-Pc').classList.add('loading')
            }
        },
        error: function(data, errorThrown) {
            console.log('request failed : ' + errorThrown);
        }
    });

}

function checkInput(e) {
    let r = true
    if (e.value === '') {
        e.classList.add('is-invalid')
        r = false
    } else {
        e.classList.remove('is-invalid')
    }
    return r
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function createFormSetting(typeId, obj) {
    let showInutSettingGroup1 = byId('showInutSettingGroup1')
    let previewPc = byId('body-Preview-Pc')
    let previewMobile = byId('body-Preview-Mobile')
    let contentBGPC = byId('main-content-bg-Pc')

    // previewPc.innerHTML = ''
    showInutSettingGroup1.innerHTML = ''

    // previewPc.classList.add('loading')
    // previewMobile.classList.add('loading')

    let bg = 'body_bg.jpg'
    let profile_img = 'queen.png'
    let profile_logo = 'queen_lg.png'
    let img_title = 'text_q.png'
    let head_title = 'frame3.png'
    let facebook_image = 'fb-hero-image-001.jpeg'
    let facebook_title = 'Example'
    let facebook_des = 'Example'
    let web_logo = ''
    let web_title = 'รับออกแบบและพัฒนาเว็บไซต์'
    let web_des = 'Plannedpro Creative Solutions รับออกแบบและพัฒนาเว็บไซต์'

    // console.log(obj)
    for (let i = 0; i < obj.length; i++) {
        let keyNow = obj[i].setKey
        let valueNow = obj[i].setValue
        let typeNow = obj[i].setType
        if (obj[i].setKey == 'bg') {
            bg = obj[i].setValue
        } else if (obj[i].setKey == 'profile_img') {
            profile_img = obj[i].setValue
        } else if (obj[i].setKey == 'profile_logo') {
            profile_logo = obj[i].setValue
        } else if (obj[i].setKey == 'img_title') {
            img_title = obj[i].setValue
        } else if (obj[i].setKey == 'border_left') {
            border_left = obj[i].setValue
        } else if (obj[i].setKey == 'border_right') {
            border_right = obj[i].setValue
        } else if (obj[i].setKey == 'head_title') {
            head_title = obj[i].setValue
        } else if (obj[i].setKey == 'facebook_image') {
            facebook_image = obj[i].setValue
        } else if (obj[i].setKey == 'facebook_title') {
            facebook_title = obj[i].setValue
        } else if (obj[i].setKey == 'facebook_des') {
            facebook_des = obj[i].setValue
        } else if (obj[i].setKey == 'web_logo') {
            web_logo = obj[i].setValue
        } else if (obj[i].setKey == 'web_title') {
            web_title = obj[i].setValue
        } else if (obj[i].setKey == 'web_des') {
            web_des = obj[i].setValue
        } else if (obj[i].setKey == 'web_input_sub_name') {
            web_input_sub_name = obj[i].setValue
        } else if (obj[i].setKey == 'web_input_sub_email') {
            web_input_sub_email = obj[i].setValue
        } else if (obj[i].setKey == 'web_input_sub_msg') {
            web_input_sub_msg = obj[i].setValue
        } else if (obj[i].setKey == 'web_text_button') {
            web_text_button = obj[i].setValue
        } else if (obj[i].setKey == 'web_text_sub_form') {
            web_text_sub_form = obj[i].setValue
        } else if (obj[i].setKey == 'web_placeholder_msg') {
            web_placeholder_msg = obj[i].setValue
        } else if (obj[i].setKey == 'web_btn_bless_color') {
            web_btn_bless_color = obj[i].setValue
        } else if (obj[i].setKey == 'web_border_bless_color') {
            web_border_bless_color = obj[i].setValue
        } else if (obj[i].setKey == 'web_msg_bless_color') {
            web_msg_bless_color = obj[i].setValue
        } else if (obj[i].setKey == 'web_sub_bless_color') {
            web_sub_bless_color = obj[i].setValue
        } else if (obj[i].setKey == 'web_foot_sub') {
            web_foot_sub = obj[i].setValue
        } else if (obj[i].setKey == 'web_foot_name') {
            web_foot_name = obj[i].setValue
        } else if (obj[i].setKey == 'bless_pageSize') {
            pageSize = obj[i].setValue
        } else if (obj[i].setKey == 'web_foot_name') {
            web_foot_name = obj[i].setValue
        } else if (obj[i].setKey == 'aboutHeaderImg') {
            //web_foot_name = obj[i].setValue
            // byId('').src = 
        }

        let row = createE('div')
        let colTitle = createE('div')
        let groupInput = createE('div')
        let groupButton = createE('div')
        let inputId = createE('div')
        row.classList.add('form-row')
        colTitle.classList.add('col-md-12')
        groupInput.classList.add('form-group', 'col-md-12')
        groupButton.classList.add('form-group', 'col-md-4')
        if (obj[i].setDetail == null) {
            colTitle.innerHTML = '<label style="display: block;">' + obj[i].setName + ' <small></small></label>'
        } else {
            colTitle.innerHTML = '<label  style="display: block;" >' + obj[i].setName + ' <span class="text-danger">' + obj[i].setValue2 + '</span> <small class="text-warning">' + obj[i].setDetail + '</small></label>'
        }

        if (keyNow == 'aboutHeaderImg' || keyNow == 'aboutVideoImg') {
            // colTitle.innerHTML += `<div id="div_imgpreviewHeaderImg" class="setting__ ${keyNow}">
            // <span  onclick="removeFileOnPreview('div_imgpreviewHeaderImg','imgpreviewHeaderImg','img-uploadImg-${keyNow}')" class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
            // <img  id="imgpreviewHeaderImg" width="100%" src="../../src/img/setting/${obj[i].setValue}">
            // </div>`
        }
        if (typeNow == 9) {
            colTitle.innerHTML += createDivPreviewImg('imgpreviewHeaderImg', keyNow, valueNow);

        }


        inputId.innerHTML = '<input type="hidden" value="000">'
        groupInput.appendChild(inputId)

        if (typeNow == 1) {
            // input
            let file = createE('div')
            file.classList.add('custom-file')
            file.innerHTML = '<input type="file" data-setid="' + obj[i].setId + '" class="custom-file-input fileUpload_Plannedpro" type="file" accept="image/*;capture=camera" onchange="loadFile(this,event,\'' + obj[i].setKey + '\')">'
            file.innerHTML += '<label class="custom-file-label" id="label_input_' + obj[i].setKey + '" for="customFile">เลือก' + obj[i].setName + '</label>'
            groupInput.appendChild(file)
                // groupButton.innerHTML = '<button onclick="btnSettingClick(\'upload\',this)" style="display:none" type="button" id="btn_' + obj[i].setKey + '" class="btn fluid ui small primary  button ">Save</button>'
        } else if (typeNow == 2) {
            let input = createE('input')
            input.setAttribute('type', 'text')
            input.classList.add('form-control', 'inputSetting')
            input.setAttribute('placeholder', 'ระบุ' + obj[i].setName)
            input.setAttribute('data-setid', obj[i].setId)
            input.setAttribute('value', obj[i].setValue)
            input.setAttribute('onkeyup', 'inputTextPreview(this,\'' + obj[i].setKey + '\',' + obj[i].setGroup + ')')
            groupInput.appendChild(input)
        } else if (typeNow == 3) {
            let input = createE('textarea')
            input.setAttribute('rows', '3')
                // input.setAttribute('id', `textarea-${obj[i].setKey}`)
            input.classList.add('form-control', 'inputSetting')
            input.setAttribute('data-setid', obj[i].setId)
            input.setAttribute('value', obj[i].setValue)
            input.setAttribute('placeholder', 'ระบุ' + obj[i].setName)
            input.setAttribute('onkeyup', 'inputTextPreview(this,\'' + obj[i].setKey + '\',' + obj[i].setGroup + ')')
            input.innerText = obj[i].setValue
            groupInput.appendChild(input)
        } else if (typeNow == 4) {
            let input = createE('input')
            input.setAttribute('type', 'color')
            input.classList.add('form-control', 'inputSetting')
            input.setAttribute('data-setid', obj[i].setId)
            input.setAttribute('value', obj[i].setValue)
            input.setAttribute('onchange', 'previewcolorRgb(this,\'' + obj[i].setKey + '\',' + obj[i].setGroup + ')')
            input.innerText = obj[i].setValue
            groupInput.appendChild(input)
        } else if (typeNow == 5) {
            let input = createE('input')
            input.setAttribute('type', 'url')
            input.classList.add('form-control', 'inputSetting')
            input.setAttribute('placeholder', 'ระบุ' + obj[i].setName)
            input.setAttribute('data-setid', obj[i].setId)
            input.setAttribute('value', obj[i].setValue)
            input.setAttribute('onkeyup', 'inputTextPreview(this,\'' + obj[i].setKey + '\',' + obj[i].setGroup + ')')
            groupInput.appendChild(input)
        } else if (typeNow == 6) {
            let input = createE('input')
            input.setAttribute('type', 'tel')
            input.classList.add('form-control', 'inputSetting')
            input.setAttribute('placeholder', 'ระบุ' + obj[i].setName)
            input.setAttribute('data-setid', obj[i].setId)
            input.setAttribute('value', obj[i].setValue)
            input.setAttribute('onkeyup', 'inputTextPreview(this,\'' + obj[i].setKey + '\',' + obj[i].setGroup + ')')
            groupInput.appendChild(input)
        } else if (typeNow == 7) {
            let input = createE('div')
            let check__ = ``
            obj[i].setValue == 1 ? check__ = `checked` : null
            input.innerHTML = `<div class="custom-control custom-switch">
            <input onclick="setDataInputChcek(this)" data-setid="${obj[i].setId}" data-check="${obj[i].setValue}" type="checkbox" ${check__} class="custom-control-input inputSetting" id="customSwitch${obj[i].setKey}">
            <label class="custom-control-label" for="customSwitch${obj[i].setKey}">${obj[i].setValue2}</label>
            </div>`
            groupInput.appendChild(input)
        } else if (typeNow == 8) {
            let input = createE('textarea')
            input.setAttribute('rows', 10)
            input.setAttribute('id', `textarea-${obj[i].setKey}`)
            input.classList.add('form-control', 'inputSetting')
            input.setAttribute('data-setid', obj[i].setId)
            input.setAttribute('value', obj[i].setValue)
            input.setAttribute('placeholder', 'ระบุ' + obj[i].setName)
            input.setAttribute('onkeyup', 'inputTextPreview(this,\'' + obj[i].setKey + '\',' + obj[i].setGroup + ')')
            input.innerText = obj[i].setValue
            groupInput.appendChild(input)
        } else if (typeNow == 9) {
            // input
            let groupfileSetBoxNew = createTagE('div', ['boxupload'])
            groupfileSetBoxNew.innerHTML = `<div style="${obj[i].setValue!=''?'display:none':null}" id="img-uploadImg-${obj[i].setKey}" onclick="clickForSelectImg('input_${obj[i].setKey}')" class="img-uploadImg-newbox"><img src="../../src/img/png-file-format-symbol.png"><div>${obj[i].setName} <span class="text-danger">${obj[i].setValue2}</span> <small class="text-warning">${obj[i].setDetail}</small></div></div>`
            let file = createE('div');
            file.style.display = 'none';
            file.classList.add('custom-file');
            file.innerHTML = `<input type="file" id="input_${obj[i].setKey}" data-setid="${obj[i].setId}" class="custom-file-input fileUpload_Plannedpro" type="file" accept="image/*;capture=camera" onchange="loadFile(this,event,'${obj[i].setKey}')">`
            file.innerHTML += '<label class="custom-file-label" id="label_input_' + obj[i].setKey + '" for="customFile">เลือก' + obj[i].setName + '</label>'
            groupfileSetBoxNew.appendChild(file)
            groupInput.appendChild(groupfileSetBoxNew)
                // groupButton.innerHTML = '<button onclick="btnSettingClick(\'upload\',this)" style="display:none" type="button" id="btn_' + obj[i].setKey + '" class="btn fluid ui small primary  button ">Save</button>'
        } else if (typeNow == 10) {
            let input = createE('input')
            input.setAttribute('type', 'number')
            input.classList.add('form-control', 'inputSetting')
            input.setAttribute('placeholder', 'ระบุ' + obj[i].setName + ' *ตัวเลขเท่านั้น')
            input.setAttribute('data-setid', obj[i].setId)
            input.setAttribute('value', obj[i].setValue)
            input.setAttribute('onkeyup', 'inputTextPreview(this,\'' + obj[i].setKey + '\',' + obj[i].setGroup + ')')
            groupInput.appendChild(input)
        }
        row.appendChild(colTitle)
        row.appendChild(groupInput)
            // row.appendChild(groupButton)
        showInutSettingGroup1.appendChild(row)

        // var editor = new Simditor({
        //     textarea: $('#editor')
        //         //optional options
        // });

        let setTypeKey = obj[i].setType
        let set__toolbar = [
            'title',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'fontScale',
            'color',
            'ol',
            'ul',
            'blockquote',
            // 'code',
            'table',
            'link',
            'image',
            'hr',
            'indent',
            'outdent',
            'alignment'
        ]
        let set__upload = {
            url: '../../include/php/upload_test.php',
            params: 1,
            fileKey: 'upload_file',
            connectionCount: 1,
            leaveConfirm: 'Uploading is in progress, are you sure to leave this page?',
            pasteImage: true,
        }
        let set__defaultImage = '../../src/img/setting/image128.png'
        if (setTypeKey == 8) {
            var editor = new Simditor({
                textarea: $(`#textarea-${keyNow}`),
                defaultImage: set__defaultImage,
                upload: set__upload,
                toolbarFloat: true,
                toolbar: set__toolbar
            });
        }

    }
    let row = createE('div')
    row.classList.add('form-row')
    let groupButton = createE('div')
    groupButton.classList.add('form-group', 'col-md-12')
    if (typeId == 9) {
        groupButton.classList.add('text-right')
        groupButton.innerHTML = '<button onclick="btnSettingClick(' + typeId + ',this)"  type="button" id="btn_typeId' + typeId + '" class="btn ui small primary  button ">Save</button>'

    } else {
        groupButton.innerHTML = '<button onclick="btnSettingClick(' + typeId + ',this)"  type="button" id="btn_typeId' + typeId + '" class="btn fluid ui small primary  button ">Save</button>'

    }
    row.appendChild(groupButton)
    showInutSettingGroup1.appendChild(row)

    if (typeId == '1') {
        // byId('body-Preview-Pc').classList.remove('loading')
        // byId('body-Preview-Mobile').classList.remove('loading')
        createPreviewHomepage(typeId, bg, border_right, border_left, profile_img, profile_logo, img_title, head_title)
    } else if (typeId == '2') {
        fbSharePreview(facebook_image, facebook_title, facebook_des)
    } else if (typeId == '4') {
        WebSharePreview(web_logo, web_title, web_des)
    } else if (typeId == '3') {
        formBlessPreview()
    } else if (typeId == '5') {
        BoxShowBlessPreview()
    }
}

function setDataInputChcek(e) {
    if (e.checked) {
        e.dataset.check = 1;
    } else {
        e.dataset.check = 0;
    }
}

function previewcolorRgb(e, setKey, setGroup) {
    if (setGroup == 3) {
        if (setKey == 'web_btn_bless_color') {
            byId('web_button_save_bless').style.backgroundColor = e.value
        }
    } else if (setGroup == 5) {
        if (setKey == 'web_border_bless_color') {
            byId('show-bless').style.border = '3px solid ' + e.value
        } else if (setKey == 'web_sub_bless_color') {
            byId('preview_web_sub_bless_color').style.color = e.value
        } else if (setKey == 'web_msg_bless_color') {
            byId('preview_web_msg_bless_color').style.color = e.value
        }
    }
    // console.log(e.value);

}

function BoxShowBlessPreview() {
    byId('show-bless').style.border = '3px solid ' + web_border_bless_color
    byId('preview_web_sub_bless_color').style.color = web_sub_bless_color
    byId('preview_web_msg_bless_color').style.color = web_msg_bless_color
    byId('web_foot_sub').innerHTML = web_foot_sub
    byId('web_foot_name').innerHTML = web_foot_name
    byId('body-Preview-Pc').classList.remove('loading')
}

function formBlessPreview() {

    byId('web_input_sub_email').innerHTML = web_input_sub_email
    byId('web_input_sub_name').innerHTML = web_input_sub_name
    byId('label_msg').innerHTML = web_placeholder_msg
    byId('web_button_save_bless').innerHTML = web_text_button
    byId('web_text_sub_form').innerHTML = web_text_sub_form
    byId('input_msg').placeholder = web_placeholder_msg
    byId('web_input_sub_msg').innerHTML = web_input_sub_msg
    byId('web_button_save_bless').style.backgroundColor = web_btn_bless_color
    byId('body-Preview-Pc').classList.remove('loading')

}

function inputTextPreview(e, setKey, setGroup) {
    if (setGroup == 2) {
        if (setKey == 'facebook_title') {
            byId('fbShareTitle').innerHTML = e.value

            byId('MsgShareTitle').innerHTML = e.value
            byId('LineShareTitle').innerHTML = e.value
        } else if (setKey == 'facebook_des') {
            byId('fbShareDes').innerHTML = e.value
            byId('MsgShareDes').innerHTML = e.value
            byId('LineShareDes').innerHTML = e.value
        }
    } else if (setGroup == 4) {
        if (setKey == 'web_title') {
            byId('textTitleTabBar').innerHTML = e.value
            byId('WebShareTitle').innerHTML = e.value
        } else if (setKey == 'web_des') {
            byId('WebShareDes').innerHTML = e.value
        }
    } else if (setGroup == 3) {
        if (setKey == 'web_input_sub_email') {
            byId('web_input_sub_email').innerHTML = e.value
        } else if (setKey == 'web_input_sub_name') {
            byId('web_input_sub_name').innerHTML = e.value
        } else if (setKey == 'web_placeholder_msg') {
            byId('input_msg').placeholder = e.value
            byId('label_msg').innerHTML = e.value
        } else if (setKey == 'web_text_button') {
            byId('web_button_save_bless').innerHTML = e.value
        } else if (setKey == 'web_text_sub_form') {
            byId('web_text_sub_form').innerHTML = e.value
        } else if (setKey == 'input_msg') {
            byId('input_msg').innerHTML = e.value
        } else if (setKey == 'web_input_sub_msg') {
            byId('web_input_sub_msg').innerHTML = e.value
        }
    } else if (setGroup == 5) {
        if (setKey == 'web_foot_sub') {
            byId('web_foot_sub').innerHTML = e.value

        } else if (setKey == 'web_foot_name') {
            byId('web_foot_name').innerHTML = e.value
        }
    }
    // console.log(e.value)
}

function btnSettingClick(groupId, btn) {
    // console.log(groupId, btn)

    btn.classList.add('loading', 'disabled')
    btn.disable = true

    const formData = new FormData();

    // if (groupId == '1' || groupId == '2' || groupId == '4') {
    const files2 = document.querySelectorAll('.fileUpload_Plannedpro');
    for (let i = 0; i < files2.length; i++) {
        let file = files2[i].files[0];
        formData.append('files[]', file);
        if (file) {
            formData.append('setid[]', files2[i].dataset.setid);
        }
    }
    // }

    // if (groupId == '2' || groupId == '4') {
    const inputSetting = document.querySelectorAll('.inputSetting');
    for (let i = 0; i < inputSetting.length; i++) {
        // console.log(inputSetting[i].type)
        if (inputSetting[i].type == 'checkbox') {
            // console.log(inputSetting[i].dataset.setid)
            formData.append('inputSetting[]', inputSetting[i].dataset.check);
            formData.append('inputSetid[]', inputSetting[i].dataset.setid);
        } else {
            formData.append('inputSetting[]', inputSetting[i].value);
            formData.append('inputSetid[]', inputSetting[i].dataset.setid);
        }
    }

    // const inputSetting = document.querySelectorAll('.inputSetting');
    // for (let i = 0; i < inputSetting.length; i++) {
    //     // console.log(inputSetting[i].value)
    //     formData.append('inputSetting[]', inputSetting[i].value);
    //     formData.append('inputSetid[]', inputSetting[i].dataset.setid);
    // }
    // formData.append('groupId', groupId);
    // }
    formData.append('groupId', groupId);
    let data = fetch('../../include/php/uploadSetting.php', {
        method: 'POST',
        body: formData
    }).then(response => {
        return response.text();
    }).then(data => {
        btn.classList.remove('loading', 'disabled')
        btn.disable = false
        Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ",
            showCancelButton: false,
            confirmButtonText: 'ตกลง',
        }).then((result) => {
            getdataSetting(groupId)
        })
    });


}

function WebSharePreview(web_logo, web_title, web_des) {
    byId('imgLogoICO').src = '../../src/img/setting/' + web_logo
    byId('textTitleTabBar').innerHTML = web_title
    byId('WebShareTitle').innerHTML = web_title
    byId('WebShareDes').innerHTML = web_des
    byId('body-Preview-Pc').classList.remove('loading')
    byId('body-Preview-Mobile').classList.remove('loading')
}

function fbSharePreview(facebook_image, facebook_title, facebook_des) {
    byId('fbCoverPreviewImg').src = '../../src/img/setting/' + facebook_image
    byId('fbShareTitle').innerHTML = facebook_title
    byId('fbShareDes').innerHTML = facebook_des

    byId('MsgCoverPreviewImg').src = '../../src/img/setting/' + facebook_image
    byId('MsgShareTitle').innerHTML = facebook_title
    byId('MsgShareDes').innerHTML = facebook_des

    byId('LineCoverPreviewImg').src = '../../src/img/setting/' + facebook_image
    byId('LineShareTitle').innerHTML = facebook_title
    byId('LineShareDes').innerHTML = facebook_des

    byId('body-Preview-FB').classList.remove('loading')
    byId('body-Preview-Msg').classList.remove('loading')
    byId('body-Preview-Line').classList.remove('loading')
}

function createPreviewHomepage(typeId, bg, border_right, border_left, profile_img, profile_logo, img_title, head_title) {
    // console.log(typeId, bg, border_right, border_left, profile_img, profile_logo, img_title, head_title)
    byId('body-Preview-Pc').style.backgroundImage = "url('../../src/img/setting/" + bg + "')"
    byId('main-content-bg-Pc').style.backgroundImage = "url('../../src/img/setting/" + border_right + "'),url('../../src/img/setting/" + border_left + "')"
    byId('profile_img_pc').src = '../../src/img/setting/' + profile_img
    byId('img_logo_pc').src = '../../src/img/setting/' + profile_logo
    byId('img_text_pc').src = '../../src/img/setting/' + img_title
    byId('img_text_title').src = '../../src/img/setting/' + head_title
        // mobile preview
    byId('body-Preview-Mobile').style.backgroundImage = "url('../../src/img/setting/" + bg + "')"
    byId('main-content-bg-mobile').style.backgroundImage = "url('../../src/img/setting/" + border_right + "'),url('../../src/img/setting/" + border_left + "')"
    byId('img_text_title_mobile').style.backgroundImage = "url('../../src/img/setting/" + head_title + "')"
    byId('profile_img_mobile').src = '../../src/img/setting/' + profile_img
    byId('img_logo_mobile').src = '../../src/img/setting/' + profile_logo
    byId('img_text_mobile').src = '../../src/img/setting/' + img_title
    byId('body-Preview-Pc').classList.remove('loading')
    byId('body-Preview-Mobile').classList.remove('loading')
}

function getdataBless(typeId, search) {
    // console.log(typeId)
    let arrayhead = ['DATE', 'NAME SHOW', 'GRETING MESSAGE', 'STATUS', 'ACTION']
    createDataTableTiw('bless', 'table_list_bless', arrayhead)
    let divTable = byId('table_list_bless')
    let data = {
        type: typeId,
        search: search
    };
    $.ajax({
        type: 'post',
        url: URLAPIMASTER + 'bless/get',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            // console.log(result);
            divTable.classList.remove('loading');
            let obj = $.parseJSON(JSON.stringify(result));
            DATABLESS = obj[0].data
            showDataOnTableBless(typeId, search, obj[0].data)
        },
        beforeSend: function() {
            divTable.classList.add('loading', 'ui', 'form')
        },
        error: function(data, errorThrown) {
            console.log('request failed : ' + errorThrown);
        }
    });

}

function showDataOnTableBless(typeId, search, obj) {
    // console.log(typeId, search, obj)
    let table = byId("table-bless");
    let tbody = createE('tbody');
    tbody.setAttribute("id", "tbody-tab3");
    table.appendChild(tbody);

    for (let i = 0; i < obj.length; i++) {
        // console.log(obj[i])
        let data = obj[i]
        let table_row = createE('tr');
        let cell0 = createE("td");
        let cell1 = createE("td");
        let cell2 = createE("td");
        let cell3 = createE("td");
        let cell4 = createE("td");
        table_row.appendChild(cell0);
        table_row.appendChild(cell1);
        table_row.appendChild(cell2);
        table_row.appendChild(cell3);
        table_row.appendChild(cell4);
        // cell0.classList.add('collapsing')
        // cell3.classList.add('collapsing')
        // cell4.classList.add('collapsing', 'text-right');
        cell4.classList.add('text-right');

        cell0.innerHTML = '<div class="text_teble_head"> ' + data.blessCreate.short + '</div><p class="text_sub_mini upText">' + data.blessCreate.time + '</p>'
        cell1.innerHTML = '<div class="text_teble_head"> ' + data.blessName + '</div><p class="text_sub_mini upText">' + data.blessEmail + '</p>'
        cell2.innerHTML = '<div class="text_teble_head"> ' + data.blessMsg + '</div>'
        if (data.blessStatus == 1) {
            cell3.innerHTML = '<span class="text-primary">new/pending</span>'
            cell4.innerHTML = '<div onclick="TiwChangeStatusServiceTo(this,\'bless_msg\',\'blessStatus\',2,\'blessId\',' + data.blessId + ',\'' + typeId + '\',\'' + search + '\')" class="badge badge-pill mr-1 px-2 py-1 upText badge-success cursor-pointer">Show</div>';
            cell4.innerHTML += '<div onclick="TiwChangeStatusServiceTo(this,\'bless_msg\',\'blessStatus\',2,\'blessId\',' + data.blessId + ',\'' + typeId + '\',\'' + search + '\')" class="badge badge-pill mr-1 px-2 py-1 upText badge-danger cursor-pointer">hidden</div>';
        } else if (data.blessStatus == 2) {
            cell3.innerHTML = '<span class="text-success">show</span>'
            cell4.innerHTML = '<div onclick="TiwChangeStatusServiceTo(this,\'bless_msg\',\'blessStatus\',0,\'blessId\',' + data.blessId + ',\'' + typeId + '\',\'' + search + '\')" class="badge badge-pill mr-1 px-2 py-1 upText badge-secondary cursor-pointer">hidden</div>';
        } else if (data.blessStatus == 0) {
            cell3.innerHTML = '<span class="text-secondary">Hidden</span>'
            cell4.innerHTML = '<div onclick="TiwChangeStatusServiceTo(this,\'bless_msg\',\'blessStatus\',2,\'blessId\',' + data.blessId + ',\'' + typeId + '\',\'' + search + '\')" class="badge badge-pill mr-1 px-2 py-1 upText badge-success cursor-pointer">Show</div>';
        }


        tbody.appendChild(table_row);

    }
    let parentNode = byId('table_list_bless');
    if (parentNode) {
        parentNode.appendChild(table);
    }
    var box = paginator({
        table: parentNode.getElementsByTagName("table")[0],
        box_mode: "list",
    });
    box.className = "box";
    parentNode.appendChild(box);


}


function createDataTableTiw(tablename, divname, arrayhead) {
    let t = byId("table-" + tablename);
    let boxbox = byId("boxbox");
    if (t) { t.remove(); }
    if (boxbox) { boxbox.remove(); }
    let table = createE("table");
    byId(divname).appendChild(table);
    // byId(divname).classList.add('loading', 'ui', 'form')
    table.setAttribute("id", "table-" + tablename);
    table.classList.add('ui', 'very', 'compact', 'table', 'selectable');
    let thead = createE('thead');
    let trHeader = createE('tr');
    for (let i = 0; i <= arrayhead.length - 1; i++) {
        // console.log(arrayhead[i])
        let thHeader0 = createE('th');
        thHeader0.innerHTML = arrayhead[i];
        trHeader.appendChild(thHeader0);
        if (i === arrayhead.length - 1) {
            thHeader0.classList.add('text-right');
        }
    }
    thead.appendChild(trHeader);
    table.appendChild(thead);
}

function TiwChangeStatusServiceTo(btn, tableDB, columnstatus, newstatus, columnwhere, id, type, search) {
    let data = {
        tableDB: tableDB,
        columnstatus: columnstatus,
        columnwhere: columnwhere,
        newstatus: newstatus,
        id: id,
        type: type,
        search: search
    };
    $.ajax({
        type: 'post',
        url: URLAPIMASTER + 'master/setStatus',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            // console.log(result);
            btn.classList.remove('loading', 'ui', 'button')
            let obj = $.parseJSON(JSON.stringify(result));
            if (obj[0].status == 1) {
                if (tableDB === 'bless_msg') {
                    // getdataNumInMenu('all')
                    getdataBless(type, search)
                } else if (tableDB === 'master_account') {
                    getDataAccountAdmin(type, search)
                }
            } else {
                Swal.fire({
                    title: 'มีบางอย่างผิดพลาด',
                    text: obj[0].data.msg,
                    icon: 'warning',
                    confirmButtonText: 'ลองอีกครั้ง'
                });
            }
        },
        beforeSend: function() {
            btn.classList.add('loading', 'ui', 'button')
        },
        error: function(data, errorThrown) {
            console.log('request failed : ' + errorThrown);
        }
    });

}

function getdataNumInMenu(type, page) {
    let navMenuMaster = byId('navMenuMaster')
    let data = {
        type: type,
    };
    // console.log(data)
    $.ajax({
        type: 'post',
        url: URLAPIMASTER + 'master/GetNumInMenu',
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            // console.log(result);
            // navMenuMaster.classList.remove('inverted', 'placeholder', 'ui')
            let obj = $.parseJSON(JSON.stringify(result));
            let data = obj[0].data
            if (obj[0].status == 1) {
                if (type == 'all') {
                    if (data.bless.new > 0) {
                        byId('b_head_bless').style.display = 'block'
                        byId('b_bless_new').style.display = 'block'
                        byId('b_head_bless').innerHTML = data.bless.new
                        byId('b_bless_new').innerHTML = data.bless.new
                    } else {
                        byId('b_bless_new').style.display = 'none'
                        byId('b_head_bless').style.display = 'none'
                    }

                    byId('b_bless_show').innerHTML = data.bless.show
                    byId('b_bless_hidden').innerHTML = data.bless.hidden
                    byId('b_bless_all').innerHTML = data.bless.all
                }
                if (page == 'home') {
                    byId('HomeShowNum_bless_all').innerHTML = data.bless.all
                    byId('HomeShowNum_bless_new').innerHTML = data.bless.new
                    byId('HomeShowNum_bless_hidden').innerHTML = data.bless.hidden
                    byId('HomeShowNum_bless_show').innerHTML = data.bless.show
                }


                // if (tableDB === 'bless_msg') {
                //     getdataBless(type, search)
                // }
            } else {
                Swal.fire({
                    title: 'มีบางอย่างผิดพลาด',
                    text: obj[0].data.msg,
                    icon: 'warning',
                    confirmButtonText: 'ลองอีกครั้ง'
                });

            }

        },
        beforeSend: function() {
            // navMenuMaster.classList.add('inverted', 'placeholder', 'ui')
        },
        error: function(data, errorThrown) {
            console.log('request failed : ' + errorThrown);
        }
    });
}




function InputSearchData(type, table) {
    let input = byId('search-' + table).value;
    if (table == 'bless') {
        getdataBless(type, input)
    } else if (table == 'account-admin') {
        getDataAccountAdmin(type, input)
    }
}
let DATAACCOUNTADMIN = ''
let ARR_ROLE = ['Admin (Full)','Manage Website','Sales','Manage & Sales'];
function getDataAccountAdmin(type, search) {
    console.log(type, search)
    let tablename = 'account-admin'
    let divname = `show-${tablename}`
    let arrayhead = ['ACCOUNT', 'NAME','', '', 'ACTION']
    createDataTable(tablename, divname, arrayhead)
    let divTable = byId(`table-${tablename}`)
    connectApi('master/getaccount', { type: type, data: search, dataoption: 0 }, divname, function(output) {
        console.log(output)
        if (output.status == 200) {
            DATAACCOUNTADMIN = output.data
            if (type == 'add' || type == 'update') {
                $('#ModalDataAccountAdmin').modal('hide');
                // closeModal()
            }

            let Myaccount = output.Myaccount;
           
            // let tablename = 'account-admin'
            // let divname = `show-${tablename}`
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
            for (let i = 0; i < output.data.length; i++) {
                let data = output.data[i]
                console.log(data)
                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                ArrTd[4].classList.add('text-right');
                ArrTd[0].innerHTML = '<div class="text_teble_head"> ' + data.MasterMail + '</div><p class="text_sub_mini upText"><i class="fas fa-user-plus"></i> ' + data.MasterRegis.short + ', ' + data.MasterRegis.time + '</p>'
                ArrTd[1].innerHTML = '<div class="text_teble_head"> ' + data.MasterName + '</div><p class="text_sub_mini upText"><i class="fas fa-mobile-alt"></i> ' + data.MasterPhone + '</p>'
                
                // ArrTd[2].innerHTML = `<div class="text_teble_head">${ARR_ROLE[data.MasterRole]}</div>`;
                let htmlRole = '';
                for(let k=0;k<ARR_ROLE.length;k++){
                    htmlRole+=`<option ${data.MasterRole==k?`selected`:``} value="${k}">${ARR_ROLE[k]}</option>`;
                }
                // if(data.MasterType==1){
                //     ArrTd[2].innerHTML = `<div><select onchange="changeRole('${data.MasterId}',this)" class="form-select form-control-sm">${htmlRole}</select></div>`;
                // }else{
                //     ArrTd[2].innerHTML = `${ARR_ROLE[data.MasterRole]}`;
                // }

                ArrTd[3].innerHTML = '<div class="text_sub_mini"></div>'
                    // if(MasterId.)
                if (data.MasterStatus === 1) {
                    if (Myaccount.MasterId == data.MasterId) {
                        table_row.classList.add('positive');
                        ArrTd[4].innerHTML += 'Your Account ';
                        ArrTd[4].innerHTML += CreateButtonInCellTable('<i class="fas fa-user-edit"></i> EDIT', 'secondary', 'editDataAccount(' + i + ',\'' + type + '\',\'' + search + '\')');
                    } else {
                        if (data.MasterType > 2) {
                            ArrTd[4].innerHTML += 'Master Admin ';
                        } else {
                            if (Myaccount.MasterType == 2) {
                                ArrTd[4].innerHTML += CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', 'TiwChangeStatusServiceTo(this,\'master_account\',\'MasterStatus\',0,\'MasterId\',' + data.MasterId + ',\'' + type + '\',\'' + search + '\')');
                            } else if (Myaccount.MasterType == 3) {
                                ArrTd[4].innerHTML += CreateButtonInCellTable('<i class="fas fa-user-edit"></i> EDIT', 'secondary', 'editDataAccount(' + i + ',\'' + type + '\',\'' + search + '\')');
                                ArrTd[4].innerHTML += CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', 'TiwChangeStatusServiceTo(this,\'master_account\',\'MasterStatus\',0,\'MasterId\',' + data.MasterId + ',\'' + type + '\',\'' + search + '\')');
                            }
                        }
                    }
                } else if (data.MasterStatus == 0) {
                    table_row.classList.add('negative');
                    if (Myaccount.MasterType == 2) {
                        ArrTd[4].innerHTML += '<div onclick="TiwChangeStatusServiceTo(this,\'master_account\',\'MasterStatus\',1,\'MasterId\',' + data.MasterId + ',\'' + type + '\',\'' + search + '\')" class="badge badge-pill mr-1 px-2 py-1 upText badge-danger cursor-pointer"><i class="fas fa-power-off"></i> INACTIVE </div>';
                    } else if (Myaccount.MasterType == 3) {
                        ArrTd[4].innerHTML += CreateButtonInCellTable('<i class="fas fa-user-edit"></i> EDIT', 'secondary', 'editDataAccount(' + i + ',\'' + type + '\',\'' + search + '\')');
                        ArrTd[4].innerHTML += CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE ', 'danger', 'TiwChangeStatusServiceTo(this,\'master_account\',\'MasterStatus\',1,\'MasterId\',' + data.MasterId + ',\'' + type + '\',\'' + search + '\')');
                    }
                }
                if (Myaccount.MasterType == 3) {
                    byId('btnAddAccountAdmin').style.display = 'inline-block'
                }
                tbody.appendChild(table_row);
            }
            createParentNode(divname, tablename, 20)

            // DataAccountAdmin(output.data, type, search, output.Myaccount)


        } else {
            createColumnPageNouFound(3, tablename)
        }
    })

}

function changeRole(MasterId,e){
 let dataAPI = {
    MasterId:MasterId,
    newRole:e.value
 }
 console.log(dataAPI)
 connectApi('master/admin', { type: 'changeRole', data: dataAPI, dataoption: 0 }, '', function(output) {})
}


function DataAccountAdmin(obj, type, search, Myaccount) {
    let tablename = 'account-admin'
    let divname = `show-${tablename}`
    let table = byId(`table-${tablename}`)
    let tbody = resetDataTbodyBeforeCreateTable(tablename)
    table.appendChild(tbody);
    for (let i = 0; i < obj.length; i++) {
        let data = obj[i]
        let table_row = createE('tr');
        let ArrTd = createTd(4, table_row)
        ArrTd[3].classList.add('text-right');
        ArrTd[0].innerHTML = '<div class="text_teble_head"> ' + data.MasterMail + '</div><p class="text_sub_mini upText"><i class="fas fa-user-plus"></i> ' + data.MasterRegis.short + ', ' + data.MasterRegis.time + '</p>'
        ArrTd[1].innerHTML = '<div class="text_teble_head"> ' + data.MasterName + '</div><p class="text_sub_mini upText"><i class="fas fa-mobile-alt"></i> ' + data.MasterPhone + '</p>'
        ArrTd[2].innerHTML = '<div class="text_sub_mini"></div>'
            // if(MasterId.)
        if (data.MasterStatus === 1) {
            if (Myaccount.MasterId == data.MasterId) {
                table_row.classList.add('positive');
                ArrTd[3].innerHTML += 'Your Account ';
                ArrTd[3].innerHTML += CreateButtonInCellTable('<i class="fas fa-user-edit"></i> EDIT', 'secondary', 'editDataAccount(' + i + ',\'' + type + '\',\'' + search + '\')');
            } else {
                if (data.MasterType > 2) {
                    ArrTd[3].innerHTML += 'Master Admin ';
                } else {
                    if (Myaccount.MasterType == 2) {
                        ArrTd[3].innerHTML += CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', 'TiwChangeStatusServiceTo(this,\'master_account\',\'MasterStatus\',0,\'MasterId\',' + data.MasterId + ',\'' + type + '\',\'' + search + '\')');
                    } else if (Myaccount.MasterType == 3) {
                        ArrTd[3].innerHTML += CreateButtonInCellTable('<i class="fas fa-user-edit"></i> EDIT', 'secondary', 'editDataAccount(' + i + ',\'' + type + '\',\'' + search + '\')');
                        ArrTd[3].innerHTML += CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', 'TiwChangeStatusServiceTo(this,\'master_account\',\'MasterStatus\',0,\'MasterId\',' + data.MasterId + ',\'' + type + '\',\'' + search + '\')');
                    }
                }
            }
        } else if (data.MasterStatus == 0) {
            table_row.classList.add('negative');
            if (Myaccount.MasterType == 2) {
                ArrTd[3].innerHTML += '<div onclick="TiwChangeStatusServiceTo(this,\'master_account\',\'MasterStatus\',1,\'MasterId\',' + data.MasterId + ',\'' + type + '\',\'' + search + '\')" class="badge badge-pill mr-1 px-2 py-1 upText badge-danger cursor-pointer"><i class="fas fa-power-off"></i> INACTIVE </div>';
            } else if (Myaccount.MasterType == 3) {
                ArrTd[3].innerHTML += CreateButtonInCellTable('<i class="fas fa-user-edit"></i> EDIT', 'secondary', 'editDataAccount(' + i + ',\'' + type + '\',\'' + search + '\')');
                ArrTd[3].innerHTML += CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE ', 'danger', 'TiwChangeStatusServiceTo(this,\'master_account\',\'MasterStatus\',1,\'MasterId\',' + data.MasterId + ',\'' + type + '\',\'' + search + '\')');
            }
        }
        if (Myaccount.MasterType == 3) {
            byId('btnAddAccountAdmin').style.display = 'inline-block'
        }
        tbody.appendChild(table_row);
    }
    createParentNode(divname, tablename, 20)
}

// function CreateButtonInCellTable(text, color, onClick) {
//     let r = '<div onclick="' + onClick + '" class="badge badge-pill mr-1 px-2 py-1 upText badge-' + color + ' cursor-pointer">' + text + '</div>'
//     return r
// }

function editDataAccount(i, type, search) {
    $('#ModalDataAccountAdmin').modal('show');
    let data = DATAACCOUNTADMIN[i]
    byId('MasterId').value = data.MasterId
    byId('MasterMail').value = data.MasterMail
    byId('MasterPass').value = ''
    byId('MasterName').value = data.MasterName
    byId('MasterPhone').value = data.MasterPhone
    byId('btnsave').setAttribute('onclick', 'CheckDataFormInput(this,\'UpdateAccountAdmin\',[\'MasterMail\',\'MasterPass\',\'MasterName\',\'MasterPhone\',\'MasterRole\'])')
}

function OpenModalDialog(dialogId, data) {
    $('#' + dialogId + '').modal('show');
    clearDataInputByArrId(data)
    if(dialogId=='ModalDataAccountAdmin'){
        byId('btnsave').setAttribute('onclick', `CheckDataFormInput(this,'AccountAdmin',['MasterMail','MasterPass','MasterName','MasterPhone'])`)
    }
}

// function clearDataInputByArrId(data) {
//     for (let i = 0; i < data.length; i++) {
//         let fatainput = byId(data[i]);
//         fatainput.value = ''
//     }
// }

function CheckDataFormInput(e, id, data) {
    // console.log(e, id, data)
    let error = false
    let dataArr = []
    for (let i = 0; i < data.length; i++) {
        let fatainput = byId(data[i]);
        if (id == 'UpdateAccountAdmin' && data[i] == 'MasterPass') {
            dataArr.push(fatainput.value)
        } else {
            if (checkInput(fatainput)) {
                error = false
                dataArr.push(fatainput.value);
            } else {
                dataArr.push('')
                error = true
                break;
            }
        }
    }

    console.log(dataArr)
    if (!error) {
        console.log(id);
        if (id == 'AccountAdmin') {
            getDataAccountAdmin('add', dataArr)
        } else if (id == 'UpdateAccountAdmin') {
            dataArr.push(byId('MasterId').value);
            getDataAccountAdmin('update', dataArr)
        }
    }

}

function checkEmail(id) {
    let data = byId(id)
    if (!validateEmail(data.value)) {
        data.classList.add('is-invalid')
        data.style.color = '#9e9e9e!important'
    } else {
        data.classList.remove('is-invalid')
    }
}