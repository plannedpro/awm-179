function removeFileOnPreview(IdPreview, IdInputFile, ShowIdAfterDelete) {
    byId(ShowIdAfterDelete).style.display = 'block'
    byId(IdPreview).style.display = 'none'
        //console.log(IdPreview, IdInputFile, ShowIdAfterDelete)

    let arrToken = IdInputFile.split("-")
    byId(`Fileinput_${arrToken[1]}`) ? byId(`Fileinput_${arrToken[1]}`).dataset.filename = `` : null;

}


function clickForSelectImg(IdInputFile) {
    byId(IdInputFile).click()
}

function createDivPreviewImg(id, key, value) {

    return `<div id="div_${id}" class="setting__ ${key}">
    <span  onclick="removeFileOnPreview('div_${id}','${id}','img-uploadImg-${key}')" class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
    <img  id="${id}" width="100%" src="../../src/img/setting/${value}">
    </div>`
}

function newbannerSlide() {
    connectApi('master/banner', { type: 'new', data: 0, dataoption: 0 }, 'App', function(output) {
        if (output.status == 200) {
            getdataAllBanner('all')
        } else {
            showError(output.msg)
        }
    })
}

function getdataAllBanner(type) {
    let dataAPI = {}
    connectApi('master/banner', { type: type, data: dataAPI, dataoption: 0 }, 'App', function(output) {
        //console.log(output)
        if (output.status == 200) {
            createBoxBannerAdmin(output.data)
        } else {
            byId('App').innerHTML = `ไม่พบรายการ ท่านสามารถเพิ่มแบนเนอร์ได้ที่เมนู Add new banner (บนขวา)`
        }
    })
}

function createBoxBannerAdmin(banners) {
    let App = byId('App')
    App.innerHTML = ''
        // //console.log(banners)
    for (let i = 0; i < banners.length; i++) {
        let banner = banners[i]
            // //console.log(banner)
        let col = createTagE('div', ['col-md-4'])
        let card = createTagE('div', ['card'])
        let cardHeader = createTagE('div', ['card-header'])
        let cardbody = createTagE('div', ['card-body', 'ui', 'form', 'form-row'])
        cardbody.setAttribute('id', `body-${banner.bn_token}`)
        let cardFooter = createTagE('div', ['card-footer', 'text-right'])
        cardHeader.innerHTML = `<h3 class="card-title cursor-pointer" data-card-widget="collapse">
        <i class="fas fa-images"></i>
            SLIDER <span class="text-danger">ขนาดที่แนะนำ 1900 x 700</span>
        </h3>
        <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse"> 
            <i  class="fas fa-minus"></i> </button>
        </div>`
        cardFooter.innerHTML = ''

        let status = '';
        if (banner.bn_status == 1) {
            status = `<span data-status="${banner.bn_status}" onclick="setStatusBanner(this, '${banner.bn_token}')" class="text-success cursor-pointer"><i class="fas fa-toggle-on"></i> Show</span>`;
        } else {
            status = `<span data-status="${banner.bn_status}" onclick="setStatusBanner(this, '${banner.bn_token}')" class="text-danger cursor-pointer"><i class="fas fa-toggle-off"></i> Hide</span>`;
        }
        cardFooter.innerHTML += `<span class="mr-3">${status}</span>`
        cardFooter.innerHTML += `<button type="button" onclick="deleteBannerConfirm(this,'${banner.bn_token}')"  class="btn  ui mini grey  button ">Delete</button>`
        cardFooter.innerHTML += `<button type="button" onclick="saveBanner('${banner.bn_token}')" class="btn ui small primary  button ">Save changes</button>`

        cardbody.innerHTML = `<div class="form-group col-md-12">
        <label style="display: block;">ตั้งชื่อรูปภาพ <small class="text-warning">เมื่อค้นหาด้วยรูปภาพ SEO </small></label>
        <input id="title-${banner.bn_token}" type="text" class="form-control inputSetting" placeholder="ระบุชื่อรูปภาพ..." value="${banner.bn_title}">
        </div>`
        cardbody.innerHTML += `<div class="form-group col-md-12">
        <label style="display: block;">URL เมื่อกดที่แบนเนอร์ <small class="text-warning">เช่น เมื่อกดให้ไปที่ Facebook ฯลฯ</small></label>
        <input id="link-${banner.bn_token}" type="url" class="form-control inputSetting" placeholder="ระบุ URL" value="${banner.bn_link}">
        </div>`
        let setimgId = `imgpreview-${banner.bn_token}`;
        let setimgImg = `${banner.bn_token}`;

        cardbody.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/${banner.bn_file!=''? banner.bn_file : 'banner-eg.jpg'}">
            </div>
        </div>`
        cardbody.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="display:none" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพแบนเนอร์ Slide หน้าเว็บ <span class="text-danger">ขนาดที่แนะนำ 1900 x 700</span>
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

        card.appendChild(cardHeader)
        card.appendChild(cardbody)
        card.appendChild(cardFooter)

        col.appendChild(card)
        App.appendChild(col)
            //console.log(banner)
    }

}

function setStatusBanner(e, token) {
    let statusNow = e.dataset.status
    let statusNew = statusNow == '1' ? 0 : 1;
    e.dataset.status = statusNew
    ChangeStatusTo(e, 'banner_slider', 'bn_status', statusNew, 'bn_token', token, 'all', '')
    if (statusNew == 1) {
        e.classList.remove('text-danger')
        e.classList.add('text-success')
        e.innerHTML = `<i class="fas fa-toggle-on"></i> Show`
    } else {
        e.classList.add('text-danger')
        e.classList.remove('text-success')
        e.innerHTML = `<i class="fas fa-toggle-off"></i> Hide`
    }
}

function deleteBannerConfirm(e, token) {
    //console.log(token)
    let imgname = byId(`title-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้แบนเนอร์นี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>ภาพที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
        }
    });
}

function saveBanner(token) {
    let imgname = byId(`title-${token}`).value
    let urlLink = byId(`link-${token}`).value
    let img = byId(`Fileinput_${token}`).dataset.filename
    let dataAPI = {
        token: token,
        name: imgname,
        link: urlLink,
        img: img
    }
    if (checkDataInputRequest([`title-${token}`, `link-${token}`])) {
        //console.log(dataAPI)
        connectApi('master/banner', { type: 'save', data: dataAPI, dataoption: 0 }, `body-${token}`, function(output) {
            //console.log(output)
            if (output.status == 200) {
                getdataAllBanner('all')
            } else {
                showError(output.msg)
            }
        })
    }
    // //console.log(dataAPI)
}

function getDataPromotion(type) {
    let tablename = 'promotions'
    let divname = `show-${tablename}`
    let arrayhead = ['Last Update', 'Img', 'Promotions', 'Recommended promotion', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search
        }
        //console.log(type)
    connectApi('master/getPromotions', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            DataPromotionToTable(output.data, type, tablename)
        } else {
            createColumnPageNouFound(6, tablename)
        }
    })
}

function DataPromotionToTable(obj, type, tablename) {
    let divname = `show-${tablename}`
    let table = byId(`table-${tablename}`)
    let tbody = resetDataTbodyBeforeCreateTable(tablename)
    table.appendChild(tbody);
    for (let i = 0; i < obj.length; i++) {
        let pro = obj[i]
            //console.log(pro)
        let table_row = createE('tr');
        let ArrTd = createTd(6, table_row)
        let lastUpdate = convertDate(pro.pro_update)
        ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
        ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${pro.pro_img}" style="max-width:8rem"></div>`
        ArrTd[2].innerHTML = `${pro.pro_name}<br><small>${pro.pro_desc}</small>`
        if (pro.pro_ref == 1) {
            ArrTd[3].innerHTML = CreateButtonInCellTable('ปักหมุดไว้ <i class="fas fa-thumbtack"></i>', 'success', `ChangeStatusTo(this,'promotions', 'pro_ref', 0, 'pro_token', '${pro.pro_token}', 'all', '')`);
        } else {
            ArrTd[3].innerHTML = CreateButtonInCellTable('<i class="fas fa-thumbtack"></i> ไม่ได้ปักหมุดไว้', 'danger', `ChangeStatusTo(this,'promotions', 'pro_ref', 1, 'pro_token', '${pro.pro_token}', 'all', '')`);
        }
        if (pro.pro_status == 1) {
            ArrTd[4].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'promotions', 'pro_status', 0, 'pro_token', '${pro.pro_token}', 'all', '')`);
        } else {
            ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'promotions', 'pro_status', 1, 'pro_token', '${pro.pro_token}', 'all', '')`);
        }
        ArrTd[5].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewPromotion('${pro.pro_token}')`);
        tbody.appendChild(table_row);
    }
    createParentNode(divname, tablename, 20)
}

function addNewPromotion(token) {
    let show = byId(`show-promotions`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataPromotion('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
    </div>`
        // let token = 'uploadPromotion';
    body.innerHTML = `<div class="col-md-12 mt-3">
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
    <label style="display: block;">ชื่อโปรโมชั่น <small class="text-warning">ลูกค้าสามารถค้นหาคำนี้ได้</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">รายละเอียดโปรโมชั่น หรือ Keyword <small class="text-warning"> ลูกค้าสามารถค้นหาคำนี้ได้ + SEO // ใช้ commas ขั้นข้อความ (,)</small></label>
    <textarea id="detail-${token}" rows="3" class="form-control inputSetting" value=""></textarea>
    </div>`

    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" style="${token=='uploadPromotion'? 'display:none': ''}"  class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/promotion.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadPromotion'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพแบนเนอร์ Slide หน้าเว็บ <span class="text-danger">ขนาดที่แนะนำ 1:1 หรือ 1280 x 1280</span>
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

    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    cardFooter.innerHTML += `<button type="button" onclick="deletePromotionConfirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="savePromotions('${token}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadPromotion') {
        connectApi('master/getPromotions', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].pro_name : '';
                byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].pro_img : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].pro_img : ''}`;

            }
        })
    }



}

function savePromotions(token) {

    if (checkDataInputRequest([`name-${token}`, `detail-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                detail: byId(`detail-${token}`).value,
                img: byId(`Fileinput_${token}`).dataset.filename,
                token: token
            }
            //console.log(dataAPI)
        connectApi('master/getPromotions', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {

                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataPromotion('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deletePromotionConfirm(e, token) {
    //console.log(token)
    let imgname = byId(`name-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้โปรโมชั่นนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>โปรโมชั่นที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'promotions', 'pro_status', 9, 'pro_token', token, 'all', '')
        }
    });
}




function getDataVideoReview(type) {
    let tablename = 'videoreview'
    let divname = `show-${tablename}`
    let arrayhead = ['Last Update', 'ภาพปก', 'ชื่อคลิป', 'URL Youtube', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            reviewType: 1
        }
        //console.log(type)
    connectApi('master/getreview', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            DataVideoReviewToTable(output.data, type, tablename)
        } else {
            createColumnPageNouFound(6, tablename)
        }
    })
}

function DataVideoReviewToTable(obj, type, tablename) {
    let divname = `show-${tablename}`
    let table = byId(`table-${tablename}`)
    let tbody = resetDataTbodyBeforeCreateTable(tablename)
    table.appendChild(tbody);
    for (let i = 0; i < obj.length; i++) {
        let pro = obj[i]
            //console.log(pro)
        let table_row = createE('tr');
        let ArrTd = createTd(6, table_row)
        let lastUpdate = convertDate(pro.pro_update)
        ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
        ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${pro.pro_img}" style="max-width:8rem"></div>`
        ArrTd[2].innerHTML = `${pro.pro_name}`
        ArrTd[3].innerHTML = `${pro.pro_desc}`
        if (pro.pro_status == 1) {
            ArrTd[4].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'review', 'pro_status', 0, 'pro_token', '${pro.pro_token}', 'all', '')`);
        } else {
            ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'review', 'pro_status', 1, 'pro_token', '${pro.pro_token}', 'all', '')`);
        }
        ArrTd[5].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewVideoReview('${pro.pro_token}')`);
        tbody.appendChild(table_row);
    }
    createParentNode(divname, tablename, 20)
}


function addNewVideoReview(token) {
    let show = byId(`show-videoreview`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataVideoReview('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
    </div>`
        // let token = 'uploadPromotion';
    body.innerHTML = `<div class="col-md-12 mt-3">
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
    <label style="display: block;">ชื่อวีดิโอ <small class="text-warning">แสดงข้อความนี้ ใต้ปกวีดิโอ</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">URL Youtube<small class="text-warning"> ไปที่หน้าจอ youtube กดแชร์ และคัดลอกลิงค์มาใส่ช่องนี้</small></label>
    <input id="detail-${token}" type="url" class="form-control inputSetting" value="">
    </div>`

    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}"  style="${token=='uploadVideoReview'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/youtube-p.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadVideoReview'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพปกวีดิโอ <span class="text-danger">ขนาดที่แนะนำ 1280 x 720</span>
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

    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    cardFooter.innerHTML += `<button type="button" onclick="deleteVideoReviewConfirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveVideoReview('${token}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadVideoReview') {
        connectApi('master/getreview', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].pro_name : '';
                byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].pro_img : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].pro_img : ''}`;

            }
        })
    }



}


function saveVideoReview(token) {

    if (checkDataInputRequest([`name-${token}`, `detail-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                detail: byId(`detail-${token}`).value,
                detail2: '',
                customUrl: '',
                img: byId(`Fileinput_${token}`).dataset.filename,
                token: token,
                reviewType: 1
            }
            //console.log(dataAPI)
        connectApi('master/getreview', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataVideoReview('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deleteVideoReviewConfirm(e, token) {
    //console.log(token)
    let imgname = byId(`name-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้วิดีโอนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>วิดีโอที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'review', 'pro_status', 9, 'pro_token', token, 'all', '')
        }
    });
}


function getDataImagesReview(type) {
    let tablename = 'imagesreview'
    let divname = `show-${tablename}`
    let arrayhead = ['Last Update', 'ภาพปกรีวิว', 'ชื่อภาพ', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            reviewType: 2
        }
        //console.log(type)
    connectApi('master/getreview', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            DataImagesReviewToTable(output.data, type, tablename)
        } else {
            createColumnPageNouFound(6, tablename)
        }
    })
}

function DataImagesReviewToTable(obj, type, tablename) {
    let divname = `show-${tablename}`
    let table = byId(`table-${tablename}`)
    let tbody = resetDataTbodyBeforeCreateTable(tablename)
    table.appendChild(tbody);
    for (let i = 0; i < obj.length; i++) {
        let pro = obj[i]
            //console.log(pro)
        let table_row = createE('tr');
        let ArrTd = createTd(5, table_row)
        let lastUpdate = convertDate(pro.pro_update)
        ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
        ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${pro.pro_img}" style="max-width:8rem"></div>`
        ArrTd[2].innerHTML = `${pro.pro_name}`
            // ArrTd[3].innerHTML = `${pro.pro_desc}`
        if (pro.pro_status == 1) {
            ArrTd[3].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'review', 'pro_status', 0, 'pro_token', '${pro.pro_token}', 'all', '')`);
        } else {
            ArrTd[3].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'review', 'pro_status', 1, 'pro_token', '${pro.pro_token}', 'all', '')`);
        }
        ArrTd[4].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewImagesReview('${pro.pro_token}')`);
        tbody.appendChild(table_row);
    }
    createParentNode(divname, tablename, 20)
}


function addNewImagesReview(token) {
    let show = byId(`show-imagesreview`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataImagesReview('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
    </div>`
        // let token = 'uploadPromotion';
    body.innerHTML = `<div class="col-md-12 mt-3">
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
    <label style="display: block;">ชื่อของภาพนี้ <small class="text-warning">แสดงข้อความนี้ ใต้ภาพรีวิวในหน้าแรก</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
        // box.innerHTML += `<div class="form-group col-md-12">
        // <label style="display: block;">URL Youtube<small class="text-warning"> ไปที่หน้าจอ youtube กดแชร์ และคัดลอกลิงค์มาใส่ช่องนี้</small></label>
        // <input id="detail-${token}" type="url" class="form-control inputSetting" value="">
        // </div>`

    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" style="${token=='uploadImagesReview'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/review11.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadImagesReview'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพรีวิว <span class="text-danger">ขนาดที่แนะนำ 1:1 หรือ 720 x 720</span>
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

    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    cardFooter.innerHTML += `<button type="button" onclick="deleteImagesReviewConfirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveImagesReview('${token}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadImagesReview') {
        connectApi('master/getreview', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].pro_name : '';
                // byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].pro_img : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].pro_img : ''}`;

            }
        })
    }



}


function saveImagesReview(token) {

    if (checkDataInputRequest([`name-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                detail: '',
                detail2: '',
                customUrl: '',
                img: byId(`Fileinput_${token}`).dataset.filename,
                token: token,
                reviewType: 2
            }
            //console.log(dataAPI)
        connectApi('master/getreview', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataImagesReview('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deleteImagesReviewConfirm(e, token) {
    //console.log(token)
    let imgname = byId(`name-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้ภาพนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>ภาพที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'review', 'pro_status', 9, 'pro_token', token, 'all', '')
        }
    });
}



// function DataClinicToTable(obj, type, tablename) {
//     let divname = `show-${tablename}`
//     let table = byId(`table-${tablename}`)
//     let tbody = resetDataTbodyBeforeCreateTable(tablename)
//     table.appendChild(tbody);
//     for (let i = 0; i < obj.length; i++) {
//         let pro = obj[i]
//             //console.log(pro)
//         let table_row = createE('tr');
//         let ArrTd = createTd(8, table_row)
//         let lastUpdate = convertDate(pro.clinic_update)
//         ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
//         ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${pro.clinic_img}" style="max-width:8rem"></div>`
//         ArrTd[2].innerHTML = `${pro.clinic_name}`
//         ArrTd[3].innerHTML = `${pro.clinic_dayopen}`
//         ArrTd[4].innerHTML = `${pro.clinic_phone}`
//         ArrTd[5].innerHTML = `${pro.clinic_lineShow}`

//         // ArrTd[3].innerHTML = `${pro.pro_desc}`
//         if (pro.clinic_status == 1) {
//             ArrTd[6].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'clinic', 'clinic_status', 0, 'clinic_token', '${pro.clinic_token}', 'all', '')`);
//         } else {
//             ArrTd[6].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'clinic', 'clinic_status', 1, 'clinic_token', '${pro.clinic_token}', 'all', '')`);
//         }
//         ArrTd[7].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewClinic('${pro.clinic_token}')`);
//         tbody.appendChild(table_row);
//     }
//     createParentNode(divname, tablename, 20)
// }


// function addNewClinic(token) {
//     let show = byId(`show-Clinic`)
//     show.innerHTML = ``
//     let header = createTagE('div', ['form-row'])
//     let body = createTagE('div', ['form-row'])
//     header.innerHTML = `<div class="col-md-6">
//     <button type="button" onclick="getDataSalesMember('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
//     </div>`
//         // let token = 'uploadPromotion';
//     body.innerHTML = `<div class="col-md-12 mt-3">
//     <div class="card">
//         <div class="card-header">
//             <h3 class="card-title cursor-pointer" data-card-widget="collapse">
//                 <i class="fas fa-home"></i>
//                 ตั้งค่าการแสดงผล
//             </h3>
//             <div class="card-tools">
//                 <button type="button" class="btn btn-tool" data-card-widget="collapse"> 
//                 <i class="fas fa-minus"></i> </button>
//             </div>
//         </div>
//         <div id="body-${token}" class="card-body ui form">
//             <form class="ui form #loading " id="formeditprofile" method="post" enctype="multipart/form-data">
//                 <div class="ui form" id="showInutSettingGroup1">

//                 </div>
//             </form>
//         </div>
//         <div class="card-footer text-right" id="footer-${token}"></div>
//         </div>

//     </div>`

//     show.appendChild(header)
//     show.appendChild(body)

//     let box = byId('showInutSettingGroup1')
//     box.innerHTML = `<div class="form-group col-md-12">
//     <label style="display: block;">ชื่อคลินิก/สาขา</label>
//     <input id="name-${token}" type="text" class="form-control inputSetting" value="">
//     </div>`
//     box.innerHTML += `<div class="form-group col-md-12">
//     <label style="display: block;">ที่อยู่สาขา <small class="text-warning"> เลขที่ หรือรายละเอียดที่ชัดเจน</small></label>
//     <input id="clinic_location-${token}" type="text" class="form-control inputSetting" value="">
//     </div>`
//     box.innerHTML += `<div class="form-group col-md-12">
//     <label style="display: block;">maps iframe <small class="text-warning"> โปรดอย่าแก้ไข หรือติดต่อผู้ดูแล</small></label>
//     <input id="clinic_mapUrliframe-${token}" type="text" class="form-control inputSetting" value="">
//     </div>`
//     box.innerHTML += `<div class="form-group col-md-12">
//     <label style="display: block;">วันเปิดทำการ <small class="text-warning"> เช่น อาทิตย์ จันทร์ อังคาร</small></label>
//     <input id="dayopen-${token}" type="text" class="form-control inputSetting" value="">
//     </div>`
//     box.innerHTML += `<div class="form-group col-md-12">
//     <label style="display: block;">เบอร์โทรศัพท์คลินิค/สาขา </label>
//     <input id="phone-${token}" type="text" class="form-control inputSetting" value="">
//     </div>`
//     box.innerHTML += `<div class="form-group col-md-12">
//     <label style="display: block;">ไลน์คลินิก/สาขา <small class="text-warning"> ข้อความแสดง </small> </label>
//     <input id="line-${token}" type="text" class="form-control inputSetting" value="">
//     </div>`
//     box.innerHTML += `<div class="form-group col-md-12">
//         <label style="display: block;">URL Auto Add Line <small class="text-warning">วางลิงค์เพิ่มเพื่อนที่นี่ เมื่อกดข้อความจะไปยังลิงค์ที่กำหนด</small></label>
//         <input id="lineUrl-${token}" type="url" class="form-control inputSetting" value="">
//         </div>`
//     box.innerHTML += `<div class="form-group col-md-12">
//         <label style="display: block;">URL Googl Map <small class="text-warning">วางลิงค์ Google Maps เพื่อให้ลูกค้าเข้าถึงได้ง่ายขึ้น</small></label>
//         <input id="mapUrl-${token}" type="url" class="form-control inputSetting" value="">
//         </div>`

//     let setimgId = `imgpreview-${token}`;
//     let setimgImg = `${token}`;

//     box.innerHTML += `<div class="col-md-12">
//             <div id="div_${setimgId}" style="${token=='uploadClinic'? 'display:none': ''}" class="setting__ aboutVideoImg">
//                 <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
//                     class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
//                 <img id="${setimgId}" width="100%" src="../../src/img/setting/clinic1.png">
//             </div>
//         </div>`
//     box.innerHTML += `<div class="form-group col-md-12">
//             <div class="boxupload">
//                 <div style="${token!='uploadClinic'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
//                     onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
//                     <img src="../../src/img/png-file-format-symbol.png">
//                     <div>ภาพรีวิว <span class="text-danger">ขนาดที่แนะนำ 4:3 หรือ 960 x 720</span>
//                     <small class="text-warning"></small></div>
//                 </div>
//                 <div class="custom-file" style="display: none;">
//                     <label class="custom-file-label" id="label_input_${setimgImg}">...</label>
//                     <input data-filename="" type="file" id="Fileinput_${setimgImg}" 
//                         class="custom-file-input fileUpload_Plannedpro" accept="image/*;capture=camera"
//                         onchange="loadFile(this,event,'${setimgImg}')">

//                 </div>
//             </div>
//         </div>`

//     let cardFooter = byId(`footer-${token}`)
//     cardFooter.innerHTML = ''
//     cardFooter.innerHTML += `<button type="button" onclick="deleteClinicConfirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
//     cardFooter.innerHTML += `<button type="button" onclick="saveClinic('${token}')" class="btn ui small primary  button ">Save changes</button>`

//     if (token != 'uploadClinic') {
//         connectApi('master/getdataClinic', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
//             //console.log(output)
//             if (output.status == 200) {
//                 byId(`name-${token}`).value = output.data[0] ? output.data[0].clinic_name : '';
//                 byId(`dayopen-${token}`).value = output.data[0] ? output.data[0].clinic_dayopen : '';
//                 byId(`phone-${token}`).value = output.data[0] ? output.data[0].clinic_phone : '';
//                 byId(`line-${token}`).value = output.data[0] ? output.data[0].clinic_lineShow : '';
//                 byId(`lineUrl-${token}`).value = output.data[0] ? output.data[0].clinic_lineUrl : '';
//                 byId(`mapUrl-${token}`).value = output.data[0] ? output.data[0].clinic_mapUrl : '';
//                 byId(`clinic_location-${token}`).value = output.data[0] ? output.data[0].clinic_location : '';

//                 byId(`clinic_mapUrliframe-${token}`).value = output.data[0] ? output.data[0].clinic_mapUrliframe : '';



//                 // byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
//                 byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].clinic_img : '';
//                 byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].clinic_img : ''}`;

//             }
//         })
//     }

// }



// function deleteClinicConfirm(e, token) {
//     //console.log(token)
//     let imgname = byId(`name-${token}`).value
//     Swal.fire({
//         icon: 'warning',
//         html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้ข้อมุลนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
//             <br><br><span>คลินิก/สาขาที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
//         </div>`,
//         showCancelButton: true,
//         confirmButtonText: 'ตกลง',
//         cancelButtonText: 'ยกเลิก'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
//             ChangeStatusTo(e, 'clinic', 'clinic_status', 9, 'clinic_token', token, 'all', '')
//         }
//     });
// }













// 19-07-2022 

function getDataBlogsReview(type) {
    let tablename = 'blogsreview'
    let divname = `show-${tablename}`
    let arrayhead = ['Last Update', 'ภาพปกรีวิว', 'หัวข้อบทความ/รีวิว', 'ผู้รีวิว/ผู้เขียน', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            reviewType: 3
        }
        //console.log(type)
    connectApi('master/getreview', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            DataBlogsReviewToTable(output.data, type, tablename)
        } else {
            createColumnPageNouFound(6, tablename)
        }
    })
}

function DataBlogsReviewToTable(obj, type, tablename) {
    let divname = `show-${tablename}`
    let table = byId(`table-${tablename}`)
    let tbody = resetDataTbodyBeforeCreateTable(tablename)
    table.appendChild(tbody);
    for (let i = 0; i < obj.length; i++) {
        let pro = obj[i]
            //console.log(pro)
        let table_row = createE('tr');
        let ArrTd = createTd(6, table_row)
        let lastUpdate = convertDate(pro.pro_update)
        ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
        ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${pro.pro_img}" style="max-width:8rem"></div>`
        ArrTd[2].innerHTML = `${pro.pro_name}<br><small>${pro.pro_desc2}</small>`
        ArrTd[3].innerHTML = `${pro.pro_desc}`
        if (pro.pro_status == 1) {
            ArrTd[4].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'review', 'pro_status', 0, 'pro_token', '${pro.pro_token}', 'all', '')`);
        } else {
            ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'review', 'pro_status', 1, 'pro_token', '${pro.pro_token}', 'all', '')`);
        }
        ArrTd[5].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewBlogsReview('${pro.pro_token}')`);
        tbody.appendChild(table_row);
    }
    createParentNode(divname, tablename, 20)
}


function addNewBlogsReview(token) {
    let show = byId(`show-blogsreview`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataBlogsReview('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
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
    <label style="display: block;">ชื่อบทความ/ชื่อหัวข้อรีวิว <small class="text-warning"> ไม่ควรเกิน 120 ตัวอักษร</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">กำหนด URL สำหรับการเชร์เอง <b>ข้อความส่วนนี้ มีผลต่อ SEO </b><br>เช่น https://yourdomain/review/<span class="text-danger">Your-Custom-URL</span> โดยระบุเฉพาะส่วนของ Your-Custom-URL เท่านั้น <span class="text-warning">ภาษาอังกฤษ และตัวเลขเท่านั้น ห้ามเว้นว่าง ใช้ - ขั้นข้อความได้ เช่น Your-Custom-URL</span></label>
    <input id="customUrl-${token}" onkeypress="inputCustomUrl(this,event)" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">ชื่อลูกค้า/ผู้เขียนรีวิว</label>
    <input id="desc-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">คำอธิบายบริการสั้นๆ <small class="text-warning">  อาจมีผลต่อ SEO</small></label>
    <textarea rows="10" id="textarea-description-${token}" class="form-control inputSetting" value=""></textarea>
    </div>`
        // box.innerHTML += `<div class="form-group col-md-12">
        // <label style="display: block;">URL Youtube<small class="text-warning"> ไปที่หน้าจอ youtube กดแชร์ และคัดลอกลิงค์มาใส่ช่องนี้</small></label>
        // <input id="detail-${token}" type="url" class="form-control inputSetting" value="">
        // </div>`

    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" style="${token=='uploadblogsreview'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/review43.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadblogsreview'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพปกบทความ/รีวิว <span class="text-danger">ขนาดที่แนะนำ 4:3 หรือ 960 x 720</span>
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
    <label style="display: block;">เขียนบทความ/รีวิว</label>
    <textarea rows="10" id="textarea-${token}" class="form-control inputSetting" value=""></textarea>
    </div>`

    createTextareaEditor(token)

    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    cardFooter.innerHTML += `<button type="button" onclick="deleteBlogsReviewConfirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveBlogsReview('${token}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadblogsreview') {
        connectApi('master/getreview', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].pro_name : '';
                byId(`desc-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`customUrl-${token}`).value = output.data[0] ? output.data[0].pro_customUrl : '';
                byId(`textarea-description-${token}`).value = output.data[0] ? output.data[0].pro_desc2 : '';
                // //console.log(output.data[0].pro_detail)
                editorTextArea.setValue(output.data[0].pro_detail)
                    // byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].pro_img : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].pro_img : ''}`;
            }
        })
    }



}

function inputCustomUrl(el, e) {
    var regex = new RegExp("^[ก-ฮA-Za-z0-9_-ะาิีุูเแไใั่้็๋์ึๆ-][A-Za-z!@#$%^&*]*$");
    //console.log(e.which, e.charCode)
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;

    // return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57)
}

function saveBlogsReview(token) {

    if (checkDataInputRequest([`name-${token}`, `customUrl-${token}`, `desc-${token}`, `textarea-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                detail2: byId(`textarea-${token}`).value,
                detail: byId(`desc-${token}`).value,
                pro_desc2: byId(`textarea-description-${token}`).value,
                customUrl: byId(`customUrl-${token}`).value,
                img: byId(`Fileinput_${token}`).dataset.filename,
                token: token,
                reviewType: 3
            }
            //console.log(dataAPI)
        connectApi('master/getreview', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataBlogsReview('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deleteBlogsReviewConfirm(e, token) {
    //console.log(token)
    let imgname = byId(`name-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้ภาพนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>ภาพที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'review', 'pro_status', 9, 'pro_token', token, 'all', '')
        }
    });
}
var editorTextArea

function createTextareaEditor(token) {
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
        'alignment',
        'html'
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
    editorTextArea = new Simditor({
        textarea: $(`#textarea-${token}`),
        defaultImage: set__defaultImage,
        upload: set__upload,
        toolbarFloat: true,
        toolbar: set__toolbar
    });
}

//20/07/2022
// 19-07-2022 









function deleteBlogsGroupManage1Confirm(e, token) {
    //console.log(token)
    let imgname = byId(`name-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้หัวข้อนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>หัวข้อที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'group_', 'group_status', 9, 'group_token', token, 'all', '')
        }
    });
}

//20/07/2022



// function DataBlogsGroupDetail1ToTable(obj, type, tablename, groupToken) {
//     let divname = `show-${tablename}`
//     let table = byId(`table-${tablename}`)
//     let tbody = resetDataTbodyBeforeCreateTable(tablename)
//     table.appendChild(tbody);
//     for (let i = 0; i < obj.length; i++) {
//         let blogs = obj[i]
//         let table_row = createE('tr');
//         let ArrTd = createTd(7, table_row)
//         let lastUpdate = convertDate(blogs.blogs_update)
//         ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
//         ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${blogs.blogs_img}" style="max-width:8rem"></div>`
//             // ArrTd[2].innerHTML = `${blogs.blogs_name}`
//         ArrTd[2].innerHTML = `${blogs.blogs_name}<br><small>${blogs.blogs_}</small>`
//         ArrTd[3].innerHTML = `https://${YOURDOMAIN}/service/${blogs.blogs_customURL}/`
//             // ArrTd[4].innerHTML = CreateButtonInCellTable('Manage', 'secondary', `window.location='?page=service-detail&token=${blogs.blogs_token}'`)
//         if (blogs.blogs_topService == 1) {
//             ArrTd[4].innerHTML = CreateButtonInCellTable('ตั้งเป็น บริการยอดนิยม <i class="fas fa-thumbtack"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_topService', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
//         } else {
//             ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-thumbtack"></i> ไม่ใช่ บริการยอดนิยม', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_topService', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
//         }

//         if (blogs.blogs_status == 1) {
//             ArrTd[5].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_status', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
//         } else {
//             ArrTd[5].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_status', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
//         }
//         ArrTd[6].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupDetail1('${blogs.blogs_token}','${groupToken}')`);
//         tbody.appendChild(table_row);
//     }
//     createParentNode(divname, tablename, 20)
// }





function getDatablogsgroupmanage2(type) {
    let tablename = 'blogsgroupmanage2'
    let divname = `show-${tablename}`
    let arrayhead = ['Last Update', 'หัวข้อกลุ่มบทความ', 'URL', 'จัดการบทความ', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            Type: 2
        }
        //console.log(type)
    connectApi('master/getGroup', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            Datablogsgroupmanage2ToTable(output.data, type, tablename)
        } else {
            createColumnPageNouFound(6, tablename)
        }
    })
}

function Datablogsgroupmanage2ToTable(obj, type, tablename) {
    let divname = `show-${tablename}`
    let table = byId(`table-${tablename}`)
    let tbody = resetDataTbodyBeforeCreateTable(tablename)
    table.appendChild(tbody);
    for (let i = 0; i < obj.length; i++) {
        let group = obj[i]
        let table_row = createE('tr');
        let ArrTd = createTd(6, table_row)
        let lastUpdate = convertDate(group.group_update)
        ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
            // ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${group.group_img}" style="max-width:8rem"></div>`
        ArrTd[1].innerHTML = `${group.group_name}`
        ArrTd[2].innerHTML = `https://${YOURDOMAIN}/service/${group.group_customURL}/`
        ArrTd[3].innerHTML = CreateButtonInCellTable('Manage', 'secondary', `window.location='?page=blogs-detail&token=${group.group_token}'`)
        if (group.group_status == 1) {
            ArrTd[4].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'group_', 'group_status', 0, 'group_token', '${group.group_token}', 'all', '')`);
        } else {
            ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'group_', 'group_status', 1, 'group_token', '${group.group_token}', 'all', '')`);
        }
        ArrTd[5].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupManage2('${group.group_token}')`);
        tbody.appendChild(table_row);
    }
    createParentNode(divname, tablename, 20)
}


function addNewGroupManage2(token) {
    let show = byId(`show-blogsgroupmanage2`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDatablogsgroupmanage2('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
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
    <label style="display: block;">ชื่อหัวข้อ/บริการ <small class="text-warning"> ไม่ควรเกิน 120 ตัวอักษร</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">กำหนด URL สำหรับหัวข้อ/บริการ <b class="text-danger">ข้อความส่วนนี้ มีผลต่อ SEO อักษรอังกฤษ ไม่ควรยาวเกิน 20 ตัวอักษร</b><br>เช่น https://yourdomain/service/<span class="text-danger">Your-Custom-URL</span> โดยระบุเฉพาะส่วนของ Your-Custom-URL เท่านั้น <span class="text-warning">ภาษาอังกฤษ และตัวเลขเท่านั้น ห้ามเว้นว่าง ใช้ - ขั้นข้อความได้ เช่น filler</span></label>
    <input id="customUrl-${token}" onkeypress="inputCustomUrl(this,event)" type="text" class="form-control inputSetting" value="">
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

    // box.innerHTML += `<div class="col-md-12">
    //         <div id="div_${setimgId}" style="${token=='uploadblogsgroupmanage2'? 'display:none': ''}" class="setting__ aboutVideoImg">
    //             <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
    //                 class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
    //             <img id="${setimgId}" width="100%" src="../../src/img/setting/iconservice-1.png">
    //         </div>
    //     </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    //         <div class="boxupload">
    //             <div style="${token!='uploadblogsgroupmanage2'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
    //                 onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
    //                 <img src="../../src/img/png-file-format-symbol.png">
    //                 <div>ภาพปกหัวข้อ <span class="text-danger">ขนาดที่แนะนำ 300 x 240 px</span>
    //                 <small class="text-warning"></small></div>
    //             </div>
    //             <div class="custom-file" style="display: none;">
    //                 <label class="custom-file-label" id="label_input_${setimgImg}">...</label>
    //                 <input data-filename="" type="file" id="Fileinput_${setimgImg}" 
    //                     class="custom-file-input fileUpload_Plannedpro" accept="image/*;capture=camera"
    //                     onchange="loadFile(this,event,'${setimgImg}')">

    //             </div>
    //         </div>
    //     </div>`


    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">รายละเอียดภาพรวมเกี่ยวกับบริการ</label>
    // <textarea rows="10" id="textarea-${token}" class="form-control inputSetting" value=""></textarea>
    // </div>`

    // createTextareaEditor(token)

    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    cardFooter.innerHTML += `<button type="button" onclick="deleteblogsgroupmanage2Confirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveblogsgroupmanage2('${token}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadblogsgroupmanage2') {
        connectApi('master/getGroup', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].group_name : '';
                // byId(`desc-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`customUrl-${token}`).value = output.data[0] ? output.data[0].group_customURL : '';
                // byId(`textarea-${token}`).value = output.data[0] ? output.data[0].pro_detail : '';
                // //console.log(output.data[0].pro_detail)
                // editorTextArea.setValue(output.data[0].group_html)
                // byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                // byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].group_img : '';
                // byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].group_img : ''}`;
            }
        })
    }



}


function saveblogsgroupmanage2(token) {

    if (checkDataInputRequest([`name-${token}`, `customUrl-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                html: '',
                customUrl: byId(`customUrl-${token}`).value,
                img: '',
                token: token,
                type: 2
            }
            //console.log(dataAPI)
        connectApi('master/getGroup', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDatablogsgroupmanage2('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deleteblogsgroupmanage2Confirm(e, token) {
    //console.log(token)
    let imgname = byId(`name-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้หัวข้อนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>หัวข้อที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'group_', 'group_status', 9, 'group_token', token, 'all', '')
        }
    });
}

//20/07/2022










function getDataRewards(type) {
    let tablename = 'rewards'
    let divname = `show-${tablename}`
    let arrayhead = ['Last Update', 'ภาพรางวัล/กิจกรรม', 'ชื่อรางวัล/กิจกรรม', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            reviewType: 4
        }
        //console.log(type)
    connectApi('master/getreview', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            DataRewardsToTable(output.data, type, tablename)
        } else {
            createColumnPageNouFound(6, tablename)
        }
    })
}

function DataRewardsToTable(obj, type, tablename) {
    let divname = `show-${tablename}`
    let table = byId(`table-${tablename}`)
    let tbody = resetDataTbodyBeforeCreateTable(tablename)
    table.appendChild(tbody);
    for (let i = 0; i < obj.length; i++) {
        let pro = obj[i]
            //console.log(pro)
        let table_row = createE('tr');
        let ArrTd = createTd(5, table_row)
        let lastUpdate = convertDate(pro.pro_update)
        ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
        ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${pro.pro_img}" style="max-width:8rem"></div>`
        ArrTd[2].innerHTML = `${pro.pro_name}<br><small>${pro.pro_desc}</small>`
            // ArrTd[3].innerHTML = `${pro.pro_desc}`
        if (pro.pro_status == 1) {
            ArrTd[3].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'review', 'pro_status', 0, 'pro_token', '${pro.pro_token}', 'all', '')`);
        } else {
            ArrTd[3].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'review', 'pro_status', 1, 'pro_token', '${pro.pro_token}', 'all', '')`);
        }
        ArrTd[4].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewrewards('${pro.pro_token}')`);
        tbody.appendChild(table_row);
    }
    createParentNode(divname, tablename, 20)
}


function addNewrewards(token) {
    let show = byId(`show-rewards`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataRewards('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
    </div>`
        // let token = 'uploadPromotion';
    body.innerHTML = `<div class="col-md-12 mt-3">
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
    <label style="display: block;">ชื่อรางวัล/กิจกรรม </label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
        // box.innerHTML += `<div class="form-group col-md-12">
        //     <label style="display: block;">URL Youtube<small class="text-warning"> ไปที่หน้าจอ youtube กดแชร์ และคัดลอกลิงค์มาใส่ช่องนี้</small></label>
        //     <input id="detail-${token}" type="url" class="form-control inputSetting" value="">
        //     </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">รายละเอียดกิจกรรม/รางวัล</label>
    <textarea id="detail-${token}" rows="3" class="form-control inputSetting" value=""></textarea>
    </div>`

    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" style="${token=='uploadrewards'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/review11.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadrewards'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพประกอบ กิจกรรม/รางวัล <span class="text-danger">ขนาดเท่าไหร่ก็ได้ - ขนาดที่แนะนำ 1:1 หรือ 1280 x 1280</span>
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

    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    cardFooter.innerHTML += `<button type="button" onclick="deleterewardsConfirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saverewards('${token}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadrewards') {
        connectApi('master/getreview', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].pro_name : '';
                byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].pro_img : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].pro_img : ''}`;

            }
        })
    }



}


function saverewards(token) {

    if (checkDataInputRequest([`name-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                detail: byId(`detail-${token}`).value,
                detail2: '',
                customUrl: '',
                img: byId(`Fileinput_${token}`).dataset.filename,
                token: token,
                reviewType: 4
            }
            //console.log(dataAPI)
        connectApi('master/getreview', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataRewards('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deleterewardsConfirm(e, token) {
    //console.log(token)
    let imgname = byId(`name-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้ภาพนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>ภาพที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'review', 'pro_status', 9, 'pro_token', token, 'all', '')
        }
    });
}

function getDataNumNotify(type) {
    let dataAPI = {

        }
        console.log(type)
        connectApi('master/mainAdmin', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
            // console.log(output)
            if (output.status == 200) {
                let data = output.data[0]
                    console.log(data)

            if (type == 'numNotify') {
                data.inbox > 0 ? byId('n_inbox').classList.add('badge-danger') : null
                byId('n_inbox').innerHTML = `${data.inbox}`
                // byId('n-ourbrand').innerHTML = `${data.ourbrand}`


    //                 // byId('n_promotions').innerHTML = `${data.promotion}`
    //             byId('n_imagereview').innerHTML = `${data.imagereview}`
    //             byId('n_videoreview').innerHTML = `${data.videoreview}`
    //                 // byId('n_review').innerHTML = `${data.review}`
    //             byId('n_blogsManage').innerHTML = `${data.blogs}`
    //             byId('n_serviceManage').innerHTML = `${data.service}`
    //                 // byId('n_reward').innerHTML = `${data.reward}`
    //             byId('n_clinic').innerHTML = `${data.clinic}`
    //                 // byId('n_banner').innerHTML = `${data.banner}`
            } 
    // else if (type == 'dashboard') {
    //             byId('home_inbox').innerHTML = `${data.inbox}`
    //                 // byId('home_promotions').innerHTML = `${data.promotion}`
    //             byId('home_review').innerHTML = `${data.review}`
    //                 // byId('home_blogsmanage').innerHTML = `${data.blogs}`
    //             byId('home_blogs').innerHTML = `${data.blogsType2}`
    //             byId('home_service').innerHTML = `${data.service}`
    //             byId('home_clinic').innerHTML = `${data.clinic}`
    //                 // byId('home_banner').innerHTML = `${data.banner}`

    //             byId('home_blogs').innerHTML = `${data.blogsType2}`
    //             byId('home_blogs').innerHTML = `${data.blogsType2}`




    //         }





        } else {
            showError(output.msg)
        }
    })
}

// 28/07/2022


function getDatablogsgroupmanage3(type) {
    let tablename = 'blogsgroupmanage2'
    let divname = `show-${tablename}`
    let arrayhead = ['Last Update', 'หัวข้อกลุ่มบทความ', 'URL', 'จัดการบทความ', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            Type: 3
        }
        //console.log(type)
    connectApi('master/getGroup', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            Datablogsgroupmanage2ToTable(output.data, type, tablename)
        } else {
            createColumnPageNouFound(6, tablename)
        }
    })
}

function Datablogsgroupmanage2ToTable(obj, type, tablename) {
    console.log(obj, type, tablename)
    let divname = `show-${tablename}`
    let table = byId(`table-${tablename}`)
    let tbody = resetDataTbodyBeforeCreateTable(tablename)
    table.appendChild(tbody);
    for (let i = 0; i < obj.length; i++) {
        let group = obj[i]
        let table_row = createE('tr');
        let ArrTd = createTd(6, table_row)
        let lastUpdate = convertDate(group.group_update)
        ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
            // ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${group.group_img}" style="max-width:8rem"></div>`
        ArrTd[1].innerHTML = `${group.group_name}`
        ArrTd[2].innerHTML = `https://${YOURDOMAIN}/review/${group.group_customURL}/`
        ArrTd[3].innerHTML = CreateButtonInCellTable('Manage', 'secondary', `window.location='?page=blogs-detail&token=${group.group_token}'`)
        if (group.group_status == 1) {
            ArrTd[4].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'group_', 'group_status', 0, 'group_token', '${group.group_token}', 'all', '')`);
        } else {
            ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'group_', 'group_status', 1, 'group_token', '${group.group_token}', 'all', '')`);
        }
        ArrTd[5].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupManage3('${group.group_token}')`);
        tbody.appendChild(table_row);
    }
    createParentNode(divname, tablename, 20)
}


function addNewGroupManage3(token) {
    let show = byId(`show-blogsgroupmanage2`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDatablogsgroupmanage3('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
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
    <label style="display: block;">ชื่อหัวข้อรีวิว <small class="text-warning"> ไม่ควรเกิน 120 ตัวอักษร</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">กำหนด URL สำหรับหัวข้อรีวิว <b class="text-danger">ข้อความส่วนนี้ มีผลต่อ SEO อักษรอังกฤษ ไม่ควรยาวเกิน 20 ตัวอักษร</b><br>เช่น https://yourdomain/service/<span class="text-danger">Your-Custom-URL</span> โดยระบุเฉพาะส่วนของ Your-Custom-URL เท่านั้น <span class="text-warning">ภาษาอังกฤษ และตัวเลขเท่านั้น ห้ามเว้นว่าง ใช้ - ขั้นข้อความได้ เช่น filler</span></label>
    <input id="customUrl-${token}" onkeypress="inputCustomUrl(this,event)" type="text" class="form-control inputSetting" value="">
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
    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    cardFooter.innerHTML += `<button type="button" onclick="deleteblogsgroupmanage2Confirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveblogsgroupmanage3('${token}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadblogsgroupmanage2') {
        connectApi('master/getGroup', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].group_name : '';
                // byId(`desc-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`customUrl-${token}`).value = output.data[0] ? output.data[0].group_customURL : '';
                // byId(`textarea-${token}`).value = output.data[0] ? output.data[0].pro_detail : '';
                // //console.log(output.data[0].pro_detail)
                // editorTextArea.setValue(output.data[0].group_html)
                // byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                // byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].group_img : '';
                // byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].group_img : ''}`;
            }
        })
    }



}


function saveblogsgroupmanage3(token) {

    if (checkDataInputRequest([`name-${token}`, `customUrl-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                html: '',
                customUrl: byId(`customUrl-${token}`).value,
                img: '',
                token: token,
                type: 3
            }
            //console.log(dataAPI)
        connectApi('master/getGroup', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDatablogsgroupmanage3('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}