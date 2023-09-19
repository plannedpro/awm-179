function getDataBlogsGroupDetail3(type) {
    let params = new URLSearchParams(window.location.search);
    let groupToken = params.get("token");
    if (!groupToken) {
        window.location = '?page=blogs-manage'
    } else {
        groupToken == '' ? window.location = '?page=blogs-manage' : null
    }

    let tablename = 'blogsgroupDetail1'
    let divname = `show-${tablename}`
    let arrayhead = ['Last Update', 'ภาพหน้าปก', 'ชื่อบทความ', 'URL', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            groupToken: groupToken,
            Type: 3
        }
        //console.log(type)
    connectApi('master/getGroupDetail', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            DataBlogsGroupDetail2ToTable(output.data, type, tablename, groupToken)
        } else {
            createColumnPageNouFound(6, tablename)
        }
    })
}

function DataBlogsGroupDetail2ToTable(obj, type, tablename, groupToken) {
    let divname = `show-${tablename}`
    let table = byId(`table-${tablename}`)
    let tbody = resetDataTbodyBeforeCreateTable(tablename)
    table.appendChild(tbody);
    for (let i = 0; i < obj.length; i++) {
        let blogs = obj[i]
        let table_row = createE('tr');
        let ArrTd = createTd(6, table_row)
        let lastUpdate = convertDate(blogs.blogs_update)
        ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
        ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${blogs.blogs_img}" style="max-width:8rem"></div>`
        ArrTd[2].innerHTML = `${blogs.blogs_name}<br><small>${blogs.blogs_}</small>`
        ArrTd[3].innerHTML = `https://${YOURDOMAIN}/service/${blogs.blogs_customURL}/`
        if (blogs.blogs_status == 1) {
            ArrTd[4].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_status', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
        } else {
            ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_status', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
        }
        ArrTd[5].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupDetail3('${blogs.blogs_token}','${groupToken}')`);
        tbody.appendChild(table_row);
    }
    createParentNode(divname, tablename, 20)
}


function addNewGroupDetail3(token, groupToken) {
    let show = byId(`show-blogsgroupDetail1`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataBlogsGroupDetail3('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
    </div>`
        // let token = 'uploadPromotion';
    body.innerHTML = `<div class="col-md-8 mt-3">
    <div class="card">
        <div class="card-header">
            <h3 class="card-title cursor-pointer" data-card-widget="collapse">
                <i class="fas fa-home"></i>
                ตั้งค่าการแสดงผล
            </h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse"> 
                <i class="fas fa-minus"></i> </button>
            </div>
        </div>
        <div id="body-${token}" class="card-body ui form">
            <form class="ui form #loading " id="formeditprofile" method="post" enctype="multipart/form-data">
                <div class="ui form" id="showInutSettingGroup1">

                </div>
            </form>
        </div>
        <div class="card-footer text-right" id="footer-${token}"></div>
        </div>

    </div>`

    show.appendChild(header)
    show.appendChild(body)

    let box = byId('showInutSettingGroup1')
    box.innerHTML = `<div class="form-group col-md-12">
    <label style="display: block;">ชื่อบทความ <small class="text-warning"> ไม่ควรเกิน 120 ตัวอักษร</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">กำหนด URL สำหรับบทความนี้ <b class="text-danger">ข้อความส่วนนี้ มีผลต่อ SEO อักษรอังกฤษ ไม่ควรยาวเกิน 20 ตัวอักษร</b><br>เช่น https://yourdomain/service/filler/<span class="text-danger">Your-Custom-URL</span> โดยระบุเฉพาะส่วนของ Your-Custom-URL เท่านั้น <span class="text-warning">ภาษาอังกฤษ และตัวเลขเท่านั้น ห้ามเว้นว่าง ใช้ - ขั้นข้อความได้</span></label>
    <input id="customUrl-${token}" onkeypress="inputCustomUrl(this,event)" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">คำอธิบายบทความสั้นๆ <small class="text-warning">  อาจมีผลต่อ SEO</small></label>
    <textarea rows="10" id="textarea-description-${token}" class="form-control inputSetting" value=""></textarea>
    </div>`
        // box.innerHTML += `<div class="form-group col-md-12">
        // <label style="display: block;">ชื่อลูกค้า/ผู้เขียนรีวิว</label>
        // <input id="desc-${token}" type="text" class="form-control inputSetting" value="">
        // </div>`
        // box.innerHTML += `<div class="form-group col-md-12">
        // <label style="display: block;">URL Youtube<small class="text-warning"> ไปที่หน้าจอ youtube กดแชร์ และคัดลอกลิงค์มาใส่ช่องนี้</small></label>
        // <input id="detail-${token}" type="url" class="form-control inputSetting" value="">
        // </div>`

    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" style="${token=='uploadblogsgroupDetail2'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/f-icon2.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadblogsgroupDetail2'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพปกบทความ <span class="text-danger">ขนาดที่แนะนำ 1280 x 720 px</span>
                    <small class="text-warning"></small></div>
                </div>
                <div class="custom-file" style="display: none;">
                    <label class="custom-file-label" id="label_input_${setimgImg}">...</label>
                    <input data-filename="" type="file" id="Fileinput_${setimgImg}" 
                        class="custom-file-input fileUpload_Plannedpro" accept="image/*;capture=camera"
                        onchange="loadFile(this,event,'${setimgImg}')">

                </div>
            </div>
        </div>`


    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">รายละเอียดเกี่ยวกับบริการ</label>
    <textarea rows="10" id="textarea-${token}" class="form-control inputSetting" value=""></textarea>
    </div>`

    createTextareaEditor(token)

    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    cardFooter.innerHTML += `<button type="button" onclick="deleteBlogsGroupDetail1Confirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveBlogsGroupDetail2('${token}','${groupToken}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadblogsgroupDetail2') {
        connectApi('master/getGroupDetail', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].blogs_name : '';
                // byId(`desc-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`customUrl-${token}`).value = output.data[0] ? output.data[0].blogs_customURL : '';
                byId(`textarea-description-${token}`).value = output.data[0] ? output.data[0].blogs_ : '';

                // byId(`textarea-${token}`).value = output.data[0] ? output.data[0].pro_detail : '';
                // //console.log(output.data[0].pro_detail)
                editorTextArea.setValue(output.data[0].blogs_html)
                    // byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].blogs_img : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].blogs_img : ''}`;
            }
        })
    }



}


function saveBlogsGroupDetail2(token, groupToken) {

    if (checkDataInputRequest([`name-${token}`, `customUrl-${token}`, `textarea-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                html: byId(`textarea-${token}`).value,
                description: byId(`textarea-description-${token}`).value,
                customUrl: byId(`customUrl-${token}`).value,
                img: byId(`Fileinput_${token}`).dataset.filename,
                token: token,
                groupToken: groupToken,
                type: 3
            }
            //console.log(dataAPI)
        connectApi('master/getGroupDetail', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataBlogsGroupDetail3('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}