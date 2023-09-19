
function getDataBlogsGroupDetail5(type) {
    let params = new URLSearchParams(window.location.search);
    let groupToken = params.get("token");
    if (!groupToken) {
        window.location = '?page=service-manage'
    } else {
        groupToken == '' ? window.location = '?page=service-manage' : null
    }
    let tablename = 'blogsgroupDetail1'
    let divname = `show-${tablename}`
    let arrayhead = ['Image', 'Title', 'Last Update','ลำดับการแสดง', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
        filter: search,
        groupToken: groupToken,
        Type: 5
    }
    connectApi('master/getGroupDetail', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        if (output.status == 200) {
            let divname = `show-${tablename}`
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
           
           
            output.data.forEach(blogs => {
                let txtOptionSort = '';
                // for(let i=1;i<=output.data.length;i++){
                //     txtOptionSort+=`<option ${blogs.blogs_topService==i?`selected`:``} value="${i}">${i}</option>`;
                // }


                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${blogs.blogs_img2}','${blogs.blogs_name}')" src="../../src/img/setting/${blogs.blogs_img2}" style="max-width:8rem"></div>`
                ArrTd[1].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${blogs.blogs_img}','${blogs.blogs_name}')" src="../../src/img/setting/${blogs.blogs_img}" style="max-width:8rem"></div>`
                ArrTd[0].style.width = `8rem`;
                ArrTd[1].style.width = `8rem`;
                ArrTd[6].style.width = `5rem`;
                ArrTd[7].style.width = `5rem`;
                ArrTd[5].style.width = `5rem`;

                ArrTd[2].innerHTML = `<b>${blogs.blogs_name}</b><br><small>${blogs.blogs_}</small>`;
                ArrTd[3].innerHTML = `https://${YOURDOMAIN}/product/${blogs.blogs_customURL}`;
                ArrTd[4].innerHTML = `${moment(blogs.blogs_update).format('H:mm DD/MM/YY')}<br><small>โดย ${blogs.MasterName}</small>`
                
                // ArrTd[5].innerHTML =  `<select onchange="changeTopServire(this,'${blogs.blogs_token}')" class="form-control">${txtOptionSort}</select>`;
                ArrTd[5].innerHTML =  `<div class="d-flex">
                    <div class="w-50 cursor-pointer" onclick="changeTopServire('up','${blogs.blogs_token}')"><i class="fas fa-arrow-circle-up"></i></div>
                    <div  class="w-50 cursor-pointer" onclick="changeTopServire('down','${blogs.blogs_token}')"><i class="fas fa-arrow-alt-circle-down"></i></div>

                </div>`;

                if (blogs.blogs_status == 1) {
                    ArrTd[6].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_status', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                } else {
                    ArrTd[6].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_status', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                }
                ArrTd[7].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupDetail5('${blogs.blogs_token}','${groupToken}')`);
                tbody.appendChild(table_row);
                tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
    })
}

function changeTopServire(e,token){
    let dataAPI ={
        token : token,
        topservice:e
    }
    console.log(dataAPI)
    connectApi('master/getGroupDetail', { type: 'changeTopService', data: dataAPI, dataoption: 0 }, '', function(output) {
        // console.log(output)
        if (output.status == 200) {
            getDataBlogsGroupDetail5('all')
        }
    })
}
function addNewGroupDetail5(token, groupToken) {
    let show = byId(`show-blogsgroupDetail1`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataBlogsGroupDetail5('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
    </div>`
        // let token = 'uploadPromotion';
    body.innerHTML = `<div class="col-md-2"></div><div class="col-md-8 mt-3">
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
    <label style="display: block;">ชื่อแบรนด์ <small class="text-warning"> ไม่ควรเกิน 120 ตัวอักษร</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="" maxlength="120">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">คำอธิบายแบรนด์ </label>
    <input id="textarea-description-${token}" type="text" class="form-control inputSetting" value=""  maxlength="500">
    </div>`
    let randomURL = createToken(7);
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">กำหนด URL สำหรับแบรนด์ <b class="text-danger">ข้อความส่วนนี้ มีผลต่อ SEO อักษรอังกฤษ ไม่ควรยาวเกิน 20 ตัวอักษร</b><br>เช่น https://yourdomain/service/filler/<span class="text-danger">Your-Custom-URL</span> โดยระบุเฉพาะส่วนของ Your-Custom-URL เท่านั้น <span class="text-warning">ภาษาอังกฤษ และตัวเลขเท่านั้น ห้ามเว้นว่าง ใช้ - ขั้นข้อความได้</span></label>
    <input id="customUrl-${token}" onkeypress="inputCustomUrl(this,event)" type="text" class="form-control inputSetting" value="${randomURL}" maxlength="120">
    </div>`

    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">ชื่อลูกค้า/ผู้เขียนรีวิว</label>
    // <input id="desc-${token}" type="text" class="form-control inputSetting" value="">
    // </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">URL Youtube<small class="text-warning"> ไปที่หน้าจอ youtube กดแชร์ และคัดลอกลิงค์มาใส่ช่องนี้</small></label>
    // <input id="detail-${token}" type="url" class="form-control inputSetting" value="">
    // </div>`
    let setimgId0 = `imgpreview-0-${token}`;
    let setimgImg0 = `0-${token}`;

    box.innerHTML += `<div class="col-md-6">
            <div id="div_${setimgId0}" style="${token=='uploadblogsgroupDetail1'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId0}','${setimgId0}','img-uploadImg-${setimgImg0}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId0}" width="100%" src="../../src/img/setting/f-icon2.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-6">
            <div class="boxupload">
                <div style="${token!='uploadblogsgroupDetail1'? 'display:none': ''}" id="img-uploadImg-${setimgImg0}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg0}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>Logo <span class="text-danger">ขนาดที่แนะนำ 16:9 png or  297 x 222 px</span>
                    <small class="text-warning"></small></div>
                </div>
                <div class="custom-file" style="display: none;">
                    <label class="custom-file-label" id="label_input_${setimgImg0}">...</label>
                    <input data-filename="" type="file" id="Fileinput_${setimgImg0}" 
                        class="custom-file-input fileUpload_Plannedpro" accept="image/*;capture=camera"
                        onchange="loadFile(this,event,'${setimgImg0}')">

                </div>
            </div>
        </div>`


    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" style="${token=='uploadblogsgroupDetail1'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/f-icon2.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadblogsgroupDetail1'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพ Product <span class="text-danger">ขนาดที่แนะนำ 16:9 png or  1280x720 px</span>
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
    cardFooter.innerHTML += `<button type="button" onclick="saveBlogsGroupDetail5('${token}','${groupToken}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadblogsgroupDetail1') {
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

                byId(`Fileinput_0-${token}`).dataset.filename = output.data[0] ? output.data[0].blogs_img2 : '';
                byId(`imgpreview-0-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].blogs_img2 : ''}`;
            }
        })
    }



}


function saveBlogsGroupDetail5(token, groupToken) {

    if (checkDataInputRequest([`name-${token}`, `customUrl-${token}`, `textarea-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                html: byId(`textarea-${token}`).value,
                description: byId(`textarea-description-${token}`).value,
                customUrl: byId(`customUrl-${token}`).value,
                img: byId(`Fileinput_${token}`).dataset.filename,
                img2: byId(`Fileinput_0-${token}`).dataset.filename,
                token: token,
                groupToken: groupToken,
                Type: 5
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
                    getDataBlogsGroupDetail5('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}