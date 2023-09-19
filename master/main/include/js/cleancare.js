function getDataSalesMember(type) {
    let tablename = 'SalesMember'
    let divname = `show-${tablename}`
    let arrayhead = ['ภาพสาขา/ร้าน/แผนที่', 'ชื่อศูนย์/ร้าน/ตัวแทน', 'ชื่อ', 'โทรศัพท์', 'ไลน์ไอดี', 'พื้นที่', 'Lastupdate', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
        filter: search
    } 
    connectApi('master/getdataSalesMember', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            let obj = output.data
            let divname = `show-${tablename}`
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
            output.data.forEach(agent => {
                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${agent.agent_img}','${agent.agent_title}')" src="../../src/img/setting/${agent.agent_img}" style="max-width:8rem"></div>`
                ArrTd[0].style.width = `8rem`;
                ArrTd[7].style.width = `5rem`;
                ArrTd[8].style.width = `5rem`;
                ArrTd[1].innerHTML = `${agent.agent_title}`
                ArrTd[2].innerHTML = `${agent.agent_name}`
                ArrTd[3].innerHTML = `${agent.agent_phone}`
                ArrTd[4].innerHTML = `${agent.agent_line}`
                ArrTd[5].innerHTML = `${agent.agent_location}`
                ArrTd[6].innerHTML = `${moment(agent.agent_lastupdate).format('H:mm DD/MM/YY')}<br><small>โดย ${agent.MasterName}</small>`
                if (agent.agent_status == 1) {
                    ArrTd[7].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'agent_sales', 'agent_status', 0, 'agent_token', '${agent.agent_token}', 'all', '')`);
                } else {
                    ArrTd[7].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'agent_sales', 'agent_status', 1, 'agent_token', '${agent.agent_token}', 'all', '')`);
                }
                ArrTd[8].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewSalesMember('${agent.agent_token}')`);
                tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
    })
}

function addNewSalesMember(token) {
    let show = byId(`show-SalesMember`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataSalesMember('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
    </div>`
        // let token = 'uploadPromotion';
    body.innerHTML = `<div class="col-md-3"></div><div class="col-md-6 mt-3">
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
                <div class="ui form" id="showInutSettingGroup1"></div>
            </form>
        </div>
        <div class="card-footer text-right" id="footer-${token}"></div>
        </div>
        
    </div>`

    show.appendChild(header)
    show.appendChild(body)

    let box = byId('showInutSettingGroup1')
    box.innerHTML = `<div class="form-group col-md-12">
    <label style="display: block;">ชื่อศูนย์/ร้าน/ตัวแทน</label>
    <input id="agent_title-${token}" type="text"  maxlength="200" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">ชื่อตัวแทน/ผู้ติดต่อ <small class="text-warning"> เช่น คุณทิว</small></label>
    <input id="agent_name-${token}" type="text"  maxlength="200" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">หมายเลขโทรศัพท์ติดต่อ</label>
    <input id="agent_phone-${token}" type="text"  maxlength="30" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">ไลน์ไอดี</label>
    <input id="agent_line-${token}" type="text" maxlength="50" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">พื้นที่ให้บริการ</label>
    <input id="agent_location-${token}" type="text" maxlength="250" class="form-control inputSetting" value="">
    </div>`
        // box.innerHTML += `<div class="form-group col-md-12">
        // <label style="display: block;">ไลน์คลินิก/สาขา <small class="text-warning"> ข้อความแสดง </small> </label>
        // <input id="line-${token}" type="text" class="form-control inputSetting" value="">
        // </div>`
        // box.innerHTML += `<div class="form-group col-md-12">
        //     <label style="display: block;">URL Auto Add Line <small class="text-warning">วางลิงค์เพิ่มเพื่อนที่นี่ เมื่อกดข้อความจะไปยังลิงค์ที่กำหนด</small></label>
        //     <input id="lineUrl-${token}" type="url" class="form-control inputSetting" value="">
        //     </div>`
        // box.innerHTML += `<div class="form-group col-md-12">
        //     <label style="display: block;">URL Googl Map <small class="text-warning">วางลิงค์ Google Maps เพื่อให้ลูกค้าเข้าถึงได้ง่ายขึ้น</small></label>
        //     <input id="mapUrl-${token}" type="url" class="form-control inputSetting" value="">
        //     </div>`

    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" style="${token=='uploadImg'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/img-notfound.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadImg'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพหน้าปก ศูนย์/ร้าน/ตัวแทน <span class="text-danger">ขนาดที่แนะนำ 16:9 หรือ 1280 x 720</span>
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



    if (token != 'uploadImg') {
        cardFooter.innerHTML += `<button type="button" onclick="deleteSalesMemberConfirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
        connectApi('master/getdataSalesMember', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            console.log(output)
            if (output.status == 200) {
                byId(`agent_title-${token}`).value = output.data[0] ? output.data[0].agent_title : '';
                byId(`agent_name-${token}`).value = output.data[0] ? output.data[0].agent_name : '';
                byId(`agent_phone-${token}`).value = output.data[0] ? output.data[0].agent_phone : '';
                byId(`agent_line-${token}`).value = output.data[0] ? output.data[0].agent_line : '';
                byId(`agent_location-${token}`).value = output.data[0] ? output.data[0].agent_location : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].agent_img : ''}`;

            }
        })
    }

    cardFooter.innerHTML += `<button type="button" onclick="saveSalesMember('${token}')" class="btn ui small primary  button ">Save changes</button>`

}

function saveSalesMember(token) {
    if (checkDataInputRequest([`agent_title-${token}`, `agent_name-${token}`, `agent_phone-${token}`, `agent_line-${token}`, `agent_location-${token}`])) {
        let dataAPI = {
            agent_title: byId(`agent_title-${token}`).value,
            agent_name: byId(`agent_name-${token}`).value,
            agent_phone: byId(`agent_phone-${token}`).value,
            agent_line: byId(`agent_line-${token}`).value,
            agent_location: byId(`agent_location-${token}`).value,
            detail: '',
            img: byId(`Fileinput_${token}`).dataset.filename,
            token: token
        }
        console.log(dataAPI)
        connectApi('master/getdataSalesMember', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataSalesMember('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deleteSalesMemberConfirm(e, token) {
    //console.log(token)
    let imgname = byId(`agent_title-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้ข้อมูลนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>ข้อมูลที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'agent_sales', 'agent_status', 9, 'agent_token', token, 'all', '')
        }
    });
}

// -------------------------------------------------------------
// Award
function getDataAward(type) {
    let tablename = 'Award'
    let divname = `show-${tablename}`
    let arrayhead = ['ภาพประกอบ', 'หัวข้อ', 'รายละเอียด', 'วันที่ได้รับ', 'การแสดงผล', 'Lastupdate', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
        filter: search
    }
    connectApi('master/getdataAward', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
                //console.log(output)
                if (output.status == 200) {
                    let obj = output.data
                    let divname = `show-${tablename}`
                    let table = byId(`table-${tablename}`)
                    let tbody = resetDataTbodyBeforeCreateTable(tablename)
                    table.appendChild(tbody);
                    output.data.forEach(data => {
                                let table_row = createE('tr');
                                let ArrTd = createTd(arrayhead.length, table_row)

                                ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${data.award_img}','${data.award_title}')" src="../../src/img/setting/${data.award_img}" style="max-width:8rem"></div>`
                                ArrTd[0].style.width = `8rem`;
                                ArrTd[6].style.width = `5rem`;
                                ArrTd[7].style.width = `5rem`;
                                ArrTd[1].innerHTML = `${data.award_title}`
                                ArrTd[2].innerHTML = `${data.award_description}`
                                ArrTd[3].innerHTML = `${moment(data.award_date).format('DD/MM/YY')}`
                                ArrTd[4].innerHTML = `${data.award_showYearOnly==1?`Show Year Only`:`Show Full date`}`
                // ArrTd[5].innerHTML = `${data.agent_location}`
                ArrTd[5].innerHTML = `${moment(data.award_update).format('H:mm DD/MM/YY')}<br><small>โดย ${data.MasterName}</small>`
                    if (data.award_status == 1) {
                        ArrTd[6].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'award', 'award_status', 0, 'award_token', '${data.award_token}', 'all', '')`);
                    } else {
                        ArrTd[6].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'award', 'award_status', 1, 'award_token', '${data.award_token}', 'all', '')`);
                    }
                    ArrTd[7].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewAward('${data.award_token}')`);
                tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
    })
}

function addNewAward(token) {
    let show = byId(`show-Award`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataAward('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
    </div>`
        // let token = 'uploadPromotion';
    body.innerHTML = `<div class="col-md-3"></div><div class="col-md-6 mt-3">
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
                <div class="ui form" id="showInutSettingGroup1"></div>
            </form>
        </div>
        <div class="card-footer text-right" id="footer-${token}"></div>
        </div>
        
    </div>`

    show.appendChild(header)
    show.appendChild(body)

    let box = byId('showInutSettingGroup1')
    box.innerHTML = `<div class="form-group col-md-12">
    <label style="display: block;">ชื่อรางวัล</label>
     <input id="award_title-${token}" type="text" maxlength="240" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">รายละเอียด</label>
     <textarea id="award_description-${token}" rows="3" maxlength="450"  class="form-control inputSetting" value=""></textarea>
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">วันที่ได้รับรางวัล <small> | กรณีไม่ต้องการแสดงวันที่ เลือกวันใดก็ได้ในปีนั้น</small></label>
     <input id="award_date-${token}"  type="date" maxlength="240" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12"><div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="award_showYearOnly-${token}">
    <label class="form-check-label" for="award_showYearOnly-${token}">แสดงเฉพาะปีเท่านั้น</label>
    </div></div>`
    box.innerHTML += `<div class="form-group col-md-12"><div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="award_imgShow-${token}">
    <label class="form-check-label" for="award_imgShow-${token}">แสดงภาพประกอบ</label>
    </div></div>`

    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">หมายเลขโทรศัพท์ติดต่อ</label>
    // <input id="agent_phone-${token}" type="text" class="form-control inputSetting" value="">
    // </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">ไลน์ไอดี</label>
    // <input id="agent_line-${token}" type="text" class="form-control inputSetting" value="">
    // </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">พื้นที่ให้บริการ</label>
    // <input id="agent_location-${token}" type="text" class="form-control inputSetting" value="">
    // </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">ไลน์คลินิก/สาขา <small class="text-warning"> ข้อความแสดง </small> </label>
    // <input id="line-${token}" type="text" class="form-control inputSetting" value="">
    // </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    //     <label style="display: block;">URL Auto Add Line <small class="text-warning">วางลิงค์เพิ่มเพื่อนที่นี่ เมื่อกดข้อความจะไปยังลิงค์ที่กำหนด</small></label>
    //     <input id="lineUrl-${token}" type="url" class="form-control inputSetting" value="">
    //     </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    //     <label style="display: block;">URL Googl Map <small class="text-warning">วางลิงค์ Google Maps เพื่อให้ลูกค้าเข้าถึงได้ง่ายขึ้น</small></label>
    //     <input id="mapUrl-${token}" type="url" class="form-control inputSetting" value="">
    //     </div>`

    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" style="${token=='uploadImg'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/img-notfound.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadImg'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพหน้าปก (ถ้ามี) <span class="text-danger">ขนาดที่แนะนำ 16:9 หรือ 1280 x 720</span>
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



    if (token != 'uploadImg') {
        cardFooter.innerHTML += `<button type="button" onclick="deleteAwardConfirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
        connectApi('master/getdataAward', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            console.log(output)
            if (output.status == 200) {
                byId(`award_title-${token}`).value = output.data[0] ? output.data[0].award_title : '';
                byId(`award_description-${token}`).value = output.data[0] ? output.data[0].award_description : '';
                byId(`award_date-${token}`).value = output.data[0] ? output.data[0].award_date : '';
                byId(`award_showYearOnly-${token}`).checked = output.data[0] ? output.data[0].award_showYearOnly == 1 ? true : false : false;
                byId(`award_imgShow-${token}`).checked = output.data[0] ? output.data[0].award_imgShow == 1 ? true : false : false;
              
                  // byId(`agent_location-${token}`).value = output.data[0] ? output.data[0].agent_location : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].award_img : ''}`;

            }
        })
    }

    cardFooter.innerHTML += `<button type="button" onclick="saveAward('${token}')" class="btn ui small primary  button ">Save changes</button>`

}

function saveAward(token) {
    if (checkDataInputRequest([`award_title-${token}`, `award_description-${token}`, `award_date-${token}`])) {
        let dataAPI = {
            award_title: byId(`award_title-${token}`).value,
            award_description: byId(`award_description-${token}`).value,
            award_date: byId(`award_date-${token}`).value,
            award_showYearOnly: byId(`award_showYearOnly-${token}`).checked ? 1 : 0,
            award_imgShow: byId(`award_imgShow-${token}`).checked ? 1 : 0,
            award_type:1,
            img: byId(`Fileinput_${token}`).dataset.filename,
            token: token
        }
        console.log(dataAPI)
        connectApi('master/getdataAward', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataAward('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deleteAwardConfirm(e, token) {
    //console.log(token)
    let imgname = byId(`agent_title-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้ข้อมูลนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>ข้อมูลที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'award', 'award_status', 9, 'award_token', token, 'all', '')
        }
    });
}

// -------------------------------------------------------------

// -------------------------------------------------------------
// Warranty
function getDataWarranty(type) {
    let tablename = 'Warranty'
    let divname = `show-${tablename}`
    let arrayhead = ['ภาพประกอบ', 'หัวข้อ', 'รายละเอียด','วันที่','Lastupdate', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
        filter: search
    }
    connectApi('master/getDataWarranty', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
                //console.log(output)
                if (output.status == 200) {
                    let obj = output.data
                    let divname = `show-${tablename}`
                    let table = byId(`table-${tablename}`)
                    let tbody = resetDataTbodyBeforeCreateTable(tablename)
                    table.appendChild(tbody);
                    output.data.forEach(data => {
                                let table_row = createE('tr');
                                let ArrTd = createTd(arrayhead.length, table_row)

                                ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${data.award_img}','${data.award_title}')" src="../../src/img/setting/${data.award_img}" style="max-width:8rem"></div>`
                                ArrTd[0].style.width = `8rem`;
                                ArrTd[5].style.width = `5rem`;
                                ArrTd[6].style.width = `5rem`;
                                ArrTd[1].innerHTML = `${data.award_title}`
                                ArrTd[2].innerHTML = `${data.award_description}`
                                ArrTd[3].innerHTML = `${moment(data.award_date).format('DD/MM/YY')}`
                                // ArrTd[4].innerHTML = `${data.award_showYearOnly==1?`Show Year Only`:`Show Full date`}`
                // ArrTd[5].innerHTML = `${data.agent_location}`
                ArrTd[4].innerHTML = `${moment(data.award_update).format('H:mm DD/MM/YY')}<br><small>โดย ${data.MasterName}</small>`
                    if (data.award_status == 1) {
                        ArrTd[5].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'award', 'award_status', 0, 'award_token', '${data.award_token}', 'all', '')`);
                    } else {
                        ArrTd[5].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'award', 'award_status', 1, 'award_token', '${data.award_token}', 'all', '')`);
                    }
                    ArrTd[6].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewWarranty('${data.award_token}')`);
                tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
    })
}

function addNewWarranty(token) {
    let show = byId(`show-Warranty`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataWarranty('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
    </div>`
        // let token = 'uploadPromotion';
    body.innerHTML = `<div class="col-md-3"></div><div class="col-md-6 mt-3">
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
                <div class="ui form" id="showInutSettingGroup1"></div>
            </form>
        </div>
        <div class="card-footer text-right" id="footer-${token}"></div>
        </div>
        
    </div>`

    show.appendChild(header)
    show.appendChild(body)

    let box = byId('showInutSettingGroup1')
    box.innerHTML = `<div class="form-group col-md-12">
    <label style="display: block;">ชื่อรางวัล</label>
     <input id="award_title-${token}" type="text" maxlength="240" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">รายละเอียด</label>
     <textarea id="award_description-${token}" rows="3" maxlength="450"  class="form-control inputSetting" value=""></textarea>
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">วันที่ได้รับรางวัล <small> | กรณีไม่ต้องการแสดงวันที่ เลือกวันใดก็ได้ในปีนั้น</small></label>
     <input id="award_date-${token}"  type="date" maxlength="240" class="form-control inputSetting" value="">
    </div>`
    // box.innerHTML += `<div class="form-group col-md-12"><div class="form-check form-switch">
    // <input class="form-check-input" type="checkbox" role="switch" id="award_showYearOnly-${token}">
    // <label class="form-check-label" for="award_showYearOnly-${token}">แสดงเฉพาะปีเท่านั้น</label>
    // </div></div>`
    // box.innerHTML += `<div class="form-group col-md-12"><div class="form-check form-switch">
    // <input class="form-check-input" type="checkbox" role="switch" id="award_imgShow-${token}">
    // <label class="form-check-label" for="award_imgShow-${token}">แสดงภาพประกอบ</label>
    // </div></div>`

    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">หมายเลขโทรศัพท์ติดต่อ</label>
    // <input id="agent_phone-${token}" type="text" class="form-control inputSetting" value="">
    // </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">ไลน์ไอดี</label>
    // <input id="agent_line-${token}" type="text" class="form-control inputSetting" value="">
    // </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">พื้นที่ให้บริการ</label>
    // <input id="agent_location-${token}" type="text" class="form-control inputSetting" value="">
    // </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">ไลน์คลินิก/สาขา <small class="text-warning"> ข้อความแสดง </small> </label>
    // <input id="line-${token}" type="text" class="form-control inputSetting" value="">
    // </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    //     <label style="display: block;">URL Auto Add Line <small class="text-warning">วางลิงค์เพิ่มเพื่อนที่นี่ เมื่อกดข้อความจะไปยังลิงค์ที่กำหนด</small></label>
    //     <input id="lineUrl-${token}" type="url" class="form-control inputSetting" value="">
    //     </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    //     <label style="display: block;">URL Googl Map <small class="text-warning">วางลิงค์ Google Maps เพื่อให้ลูกค้าเข้าถึงได้ง่ายขึ้น</small></label>
    //     <input id="mapUrl-${token}" type="url" class="form-control inputSetting" value="">
    //     </div>`

    let setimgId = `imgpreview-${token}`;
    let setimgImg = `${token}`;

    box.innerHTML += `<div class="col-md-12">
            <div id="div_${setimgId}" style="${token=='uploadImg'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/img-notfound.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadImg'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพประกอบ <span class="text-danger">ขนาดที่แนะนำ อัตราส่วน 1:1 </span>
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



    if (token != 'uploadImg') {
        cardFooter.innerHTML += `<button type="button" onclick="deleteWarrantyConfirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
        connectApi('master/getDataWarranty', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            console.log(output)
            if (output.status == 200) {
                byId(`award_title-${token}`).value = output.data[0] ? output.data[0].award_title : '';
                byId(`award_description-${token}`).value = output.data[0] ? output.data[0].award_description : '';
                byId(`award_date-${token}`).value = output.data[0] ? output.data[0].award_date : '';
                // byId(`award_showYearOnly-${token}`).checked = output.data[0] ? output.data[0].award_showYearOnly == 1 ? true : false : false;
                // byId(`award_imgShow-${token}`).checked = output.data[0] ? output.data[0].award_imgShow == 1 ? true : false : false;
              
                  // byId(`agent_location-${token}`).value = output.data[0] ? output.data[0].agent_location : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].award_img : ''}`;

            }
        })
    }

    cardFooter.innerHTML += `<button type="button" onclick="saveWarranty('${token}')" class="btn ui small primary  button ">Save changes</button>`

}

function saveWarranty(token) {
    if (checkDataInputRequest([`award_title-${token}`, `award_description-${token}`])) {
        let dataAPI = {
            award_title: byId(`award_title-${token}`).value,
            award_description: byId(`award_description-${token}`).value,
            award_date: byId(`award_date-${token}`).value,
            award_showYearOnly: 0,
            award_imgShow: 1,
            award_type:2,
            img: byId(`Fileinput_${token}`).dataset.filename,
            token: token
        }
        console.log(dataAPI)
        connectApi('master/getDataWarranty', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataWarranty('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deleteWarrantyConfirm(e, token) {
    //console.log(token)
    let imgname = byId(`agent_title-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้ข้อมูลนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span>ข้อมูลที่ต้องการลบ<br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'award', 'award_status', 9, 'award_token', token, 'all', '')
        }
    });
}

// -------------------------------------------------------------


function getDataBlogsGroupDetail1(type) {
    let params = new URLSearchParams(window.location.search);
    let groupToken = params.get("token");
    if (!groupToken) {
        window.location = '?page=service-manage'
    } else {
        groupToken == '' ? window.location = '?page=service-manage' : null
    }

    let tablename = 'blogsgroupDetail1'
    let divname = `show-${tablename}`
    // let arrayhead = ['Last Update', 'icon menu', 'ชื่อบริการ', 'URL', 'ตั้งเป็น บริการยอดนิยม', 'Status', 'Edit']
    let arrayhead = ['ภาพหน้าปก', 'หัวข้อบริการ', 'URL','Last Update',  'Status', 'Edit']

    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            groupToken: groupToken,
            Type: 1
        }
        //console.log(type)
    connectApi('master/getGroupDetail', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            let divname = `show-${tablename}`
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
            // for (let i = 0; i < obj.length; i++) {
            output.data.forEach(blogs => {
                // let blogs = obj[i]
                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                // let lastUpdate = convertDate(blogs.blogs_update)

                ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${blogs.blogs_img}','${blogs.blogs_name}')" src="../../src/img/setting/${blogs.blogs_img}" style="max-width:8rem"></div>`
                ArrTd[0].style.width = `8rem`;
                ArrTd[4].style.width = `5rem`;
                ArrTd[5].style.width = `5rem`;



                // ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${blogs.blogs_img}" style="max-width:8rem"></div>`
                ArrTd[1].innerHTML = `<b>${blogs.blogs_name}</b><br><small>${blogs.blogs_}</small>`;
                ArrTd[2].innerHTML = `https://${YOURDOMAIN}/service/${blogs.blogs_customURL}`;
                ArrTd[3].innerHTML = `${moment(blogs.blogs_update).format('H:mm DD/MM/YY')}<br><small>โดย ${blogs.MasterName}</small>`

                if (blogs.blogs_status == 1) {
                    ArrTd[4].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_status', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                } else {
                    ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_status', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                }
                ArrTd[5].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupDetail1('${blogs.blogs_token}','${groupToken}')`);
                tbody.appendChild(table_row);



                // ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
                // ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${blogs.blogs_img}" style="max-width:8rem"></div>`
                //     // ArrTd[2].innerHTML = `${blogs.blogs_name}`
                // ArrTd[2].innerHTML = `${blogs.blogs_name}<br><small>${blogs.blogs_}</small>`
                // ArrTd[3].innerHTML = `https://${YOURDOMAIN}/service/${blogs.blogs_customURL}`
                //     // ArrTd[4].innerHTML = CreateButtonInCellTable('Manage', 'secondary', `window.location='?page=service-detail&token=${blogs.blogs_token}'`)
                // if (blogs.blogs_topService == 1) {
                //     ArrTd[4].innerHTML = CreateButtonInCellTable('ตั้งเป็น บริการยอดนิยม <i class="fas fa-thumbtack"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_topService', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                // } else {
                //     ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-thumbtack"></i> ไม่ใช่ บริการยอดนิยม', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_topService', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                // }

                // if (blogs.blogs_status == 1) {
                //     ArrTd[5].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_status', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                // } else {
                //     ArrTd[5].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_status', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                // }
                // ArrTd[6].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupDetail1('${blogs.blogs_token}','${groupToken}')`);
                // tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
    })
}


// ----------------------------------------------

function getDataBlogsGroupDetail2(type) {
    let params = new URLSearchParams(window.location.search);
    let groupToken = params.get("token");
    if (!groupToken) {
        window.location = '?page=blogs-manage'
    } else {
        groupToken == '' ? window.location = '?page=blogs-manage' : null
    }

    let tablename = 'blogsgroupDetail1'
    let divname = `show-${tablename}`
    let arrayhead = ['ภาพหน้าปก', 'ชื่อบทความ', 'URL','Last Update',  'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            groupToken: groupToken,
            Type: 2
        }
    console.log(dataAPI)
    connectApi('master/getGroupDetail', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        console.log(output)
        if (output.status == 200) {
            let divname = `show-${tablename}`
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
            output.data.forEach(blogs => {
                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                // let lastUpdate = convertDate(blogs.blogs_update)
                // ArrTd[0].innerHTML = `${lastUpdate.h}:${lastUpdate.m} ${lastUpdate.day.th.short} ${lastUpdate.day.digit} ${lastUpdate.month.th.short} ${lastUpdate.year.th.short}`
                
                ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${blogs.blogs_img}','${blogs.blogs_name}')" src="../../src/img/setting/${blogs.blogs_img}" style="max-width:8rem"></div>`
                ArrTd[0].style.width = `8rem`;
                ArrTd[4].style.width = `5rem`;
                ArrTd[5].style.width = `5rem`;



                // ArrTd[1].innerHTML = `<div class="previewImgOntable"><img src="../../src/img/setting/${blogs.blogs_img}" style="max-width:8rem"></div>`
                ArrTd[1].innerHTML = `<b>${blogs.blogs_name}</b><br><small>${blogs.blogs_}</small>`;
                ArrTd[2].innerHTML = `https://${YOURDOMAIN}/blogs/${blogs.blogs_customURL}`;
                ArrTd[3].innerHTML = `${moment(blogs.blogs_update).format('H:mm DD/MM/YY')}<br><small>โดย ${blogs.MasterName}</small>`

                if (blogs.blogs_status == 1) {
                    ArrTd[4].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_status', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                } else {
                    ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_status', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                }
                ArrTd[5].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupDetail2('${blogs.blogs_token}','${groupToken}')`);
                tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
    })
}

function addNewGroupDetail2(token, groupToken) {
    let show = byId(`show-blogsgroupDetail1`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataBlogsGroupDetail2('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
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
    <label style="display: block;">ชื่อบทความ <small class="text-warning"> ไม่ควรเกิน 120 ตัวอักษร</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`;
    let randomURL = createToken(7);
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">กำหนด URL สำหรับบทความนี้ <b class="text-danger">ข้อความส่วนนี้ มีผลต่อ SEO อักษรอังกฤษ ไม่ควรยาวเกิน 20 ตัวอักษร</b><br>เช่น https://yourdomain/blogs/<span class="text-danger">Your-Custom-URL</span> โดยระบุเฉพาะส่วนของ Your-Custom-URL เท่านั้น <span class="text-warning">ภาษาอังกฤษ และตัวเลขเท่านั้น ห้ามเว้นว่าง ใช้ - ขั้นข้อความได้</span></label>
    <input id="customUrl-${token}" onkeypress="inputCustomUrl(this,event)" type="text" class="form-control inputSetting" value="${randomURL}">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">คำอธิบายบทความสั้นๆ <small class="text-warning">  แสดงใต้รูปภาพหลัก อาจมีผลต่อ SEO</small></label>
    <textarea rows="2" maxlength="250" id="textarea-description-${token}" class="form-control inputSetting" value=""></textarea>
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
    <label style="display: block;">รายละเอียดบทความ</label>
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
                img3: '',
                token: token,
                groupToken: groupToken,
                type: 2
            }
            // console.log(dataAPI)
        connectApi('master/getGroupDetail', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataBlogsGroupDetail2('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}


// --------------------------------------
function getDataBlogsGroupManage1(type) {
    let tablename = 'blogsgroupmanage1'
    let divname = `show-${tablename}`
    let arrayhead = ['ภาพปกหัวข้อบริการ', 'หัวข้อ', 'URL', 'จัดการบริการ', 'Last Update','Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search,
            Type: 1
        }
        //console.log(type)
    connectApi('master/getGroup', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        //console.log(output)
        if (output.status == 200) {
            let divname = `show-${tablename}`
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
          
            output.data.forEach(group => {
                   let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                let lastUpdate = convertDate(group.group_update)
                ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${group.group_img}','${group.group_name}')" src="../../src/img/setting/${group.group_img}" style="max-width:8rem"></div>`
                ArrTd[0].style.width = `8rem`;
                ArrTd[5].style.width = `5rem`;
                ArrTd[6].style.width = `5rem`;

                ArrTd[1].innerHTML = `<b>${group.group_name}</b><br><small>${group.group_subtitleHome}</small>`
                ArrTd[2].innerHTML = `https://${YOURDOMAIN}/service/${group.group_customURL}/`
                ArrTd[3].innerHTML = CreateButtonInCellTable('Manage', 'secondary', `window.location='?page=service-detail&token=${group.group_token}'`)

                // ArrTd[3].innerHTML = `${moment(blogs.group_update).format('H:mm DD/MM/YY')}<br><small>โดย ${blogs.MasterName}</small>`
                ArrTd[4].innerHTML = `${moment(group.group_update).format('H:mm DD/MM/YY')}<br><small>โดย ${group.MasterName}</small>`

                // if (group.group_refInHome == 1) {
                //     ArrTd[4].innerHTML = CreateButtonInCellTable('ตั้งเป็น บริการยอดนิยม <i class="fas fa-thumbtack"></i>', 'success', `ChangeStatusTo(this,'group_', 'group_refInHome', 0, 'group_token', '${group.group_token}', 'all', '')`);
                // } else {
                //     ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-thumbtack"></i> ไม่ใช่ บริการยอดนิยม', 'danger', `ChangeStatusTo(this,'group_', 'group_refInHome', 1, 'group_token', '${group.group_token}', 'all', '')`);
                // }

                if (group.group_status == 1) {
                    ArrTd[5].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'group_', 'group_status', 0, 'group_token', '${group.group_token}', 'all', '')`);
                } else {
                    ArrTd[5].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'group_', 'group_status', 1, 'group_token', '${group.group_token}', 'all', '')`);
                }
                ArrTd[6].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupManage1('${group.group_token}')`);
                tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
    })
}


function addNewGroupManage1(token) {
    let show = byId(`show-blogsgroupmanage1`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataBlogsGroupManage1('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
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
    <label style="display: block;">ชื่อหัวข้อ/บริการ <small class="text-warning"> ไม่ควรเกิน 120 ตัวอักษร</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">กำหนด URL สำหรับหัวข้อ/บริการ <b class="text-danger">ข้อความส่วนนี้ มีผลต่อ SEO อักษรอังกฤษ ไม่ควรยาวเกิน 20 ตัวอักษร</b><br>เช่น https://yourdomain/service/<span class="text-danger">Your-Custom-URL</span> โดยระบุเฉพาะส่วนของ Your-Custom-URL เท่านั้น <span class="text-warning">ภาษาอังกฤษ และตัวเลขเท่านั้น ห้ามเว้นว่าง ใช้ - ขั้นข้อความได้ เช่น filler</span></label>
    <input id="customUrl-${token}" ${token!='uploadblogsgroupmanage1'? 'disabled': ''} style="${token!='uploadblogsgroupmanage1'? 'background-color: #f2f2f2;': ''}" onkeypress="inputCustomUrl(this,event)" type="text" class="form-control inputSetting" value="">
    </div>`

    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">URL Youtube เฉพาะ ID เช่น https://www.youtube.com/watch?v=<b class="text-danger">8ChPh78KfE8</b></label>
        <input id="group_youtubeRefHome-${token}" type="text" class="form-control inputSetting" value="">
    </div>`

    box.innerHTML += `<div class="form-group col-md-12">
        <label style="display: block;">ข้อความหน้าแรก (ใช้ commas ขั้นรายการ เช่น ตัวอย่าง,ตัวอย่าง)</label>
            <input maxlength="70" id="group_subtitleHome-${token}" type="text" class="form-control inputSetting" value="">
        </div>`

    box.innerHTML += `<div class="form-group col-md-12">
        <label style="display: block;">ข้อความรายละเอียดคร่าวๆ (แสดงในหน้าแรก)</label>
            <textarea maxlength="220" rows="2" id="group_descriptionHome-${token}" class="form-control inputSetting" value=""></textarea>
        </div>`
        // box.innerHTML += `<div class="form-group col-md-12">
        // <label style="display: block;">URL Youtube<small class="text-warning"> ไปที่หน้าจอ youtube กดแชร์ และคัดลอกลิงค์มาใส่ช่องนี้</small></label>
        // <input id="detail-${token}" type="url" class="form-control inputSetting" value="">
        // </div>`


    let setimgId00 = `imgpreview-00-${token}`;
    let setimgImg00 = `00-${token}`;

    box.innerHTML += `<div class="col-md-6">
                <div id="div_${setimgId00}" style="${token=='uploadblogsgroupmanage1'? 'display:none': ''}" class="setting__ aboutVideoImg">
                    <span onclick="removeFileOnPreview('div_${setimgId00}','${setimgId00}','img-uploadImg-${setimgImg00}')"
                        class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                    <img id="${setimgId00}" width="100%" src="../../src/img/setting/icon-new.png">
                </div>
            </div>`
    box.innerHTML += `<div class="form-group col-md-6">
                <div class="boxupload">
                    <div style="${token!='uploadblogsgroupmanage1'? 'display:none': ''}" id="img-uploadImg-${setimgImg00}"
                        onclick="clickForSelectImg('Fileinput_${setimgImg00}')" class="img-uploadImg-newbox">
                        <img src="../../src/img/png-file-format-symbol.png">
                        <div>ภาพหัวข้อเมนู (แสดงในหน้าแรก)
                        <small class="text-warning"></small></div>
                    </div>
                    <div class="custom-file" style="display: none;">
                        <label class="custom-file-label" id="label_input_${setimgImg00}">...</label>
                        <input data-filename="" type="file" id="Fileinput_${setimgImg00}" 
                            class="custom-file-input fileUpload_Plannedpro" accept="image/*;capture=camera"
                            onchange="loadFile(this,event,'${setimgImg00}')">
    
                    </div>
                </div>
            </div>`

    let setimgId0 = `imgpreview-0-${token}`;
    let setimgImg0 = `0-${token}`;

    box.innerHTML += `<div class="col-md-6">
            <div id="div_${setimgId0}" style="${token=='uploadblogsgroupmanage1'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId0}','${setimgId0}','img-uploadImg-${setimgImg0}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId0}" width="100%" src="../../src/img/setting/homepage-Medium-slide2.webp">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-6">
            <div class="boxupload">
                <div style="${token!='uploadblogsgroupmanage1'? 'display:none': ''}" id="img-uploadImg-${setimgImg0}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg0}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพพรีเซ็นเตอร์ png (แสดงในหน้าแรก)
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
            <div id="div_${setimgId}" style="${token=='uploadblogsgroupmanage1'? 'display:none': ''}" class="setting__ aboutVideoImg">
                <span onclick="removeFileOnPreview('div_${setimgId}','${setimgId}','img-uploadImg-${setimgImg}')"
                    class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                <img id="${setimgId}" width="100%" src="../../src/img/setting/iconservice-1.png">
            </div>
        </div>`
    box.innerHTML += `<div class="form-group col-md-12">
            <div class="boxupload">
                <div style="${token!='uploadblogsgroupmanage1'? 'display:none': ''}" id="img-uploadImg-${setimgImg}"
                    onclick="clickForSelectImg('Fileinput_${setimgImg}')" class="img-uploadImg-newbox">
                    <img src="../../src/img/png-file-format-symbol.png">
                    <div>ภาพปกหัวข้อ <span class="text-danger">ขนาดที่แนะนำ 300 x 240 px</span>
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
    <label style="display: block;">รายละเอียดภาพรวมเกี่ยวกับบริการ</label>
    <textarea rows="10" id="textarea-${token}" class="form-control inputSetting" value=""></textarea>
    </div>`

    createTextareaEditor(token)

    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    cardFooter.innerHTML += `<button type="button" onclick="deleteBlogsGroupManage1Confirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveBlogsGroupManage1('${token}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadblogsgroupmanage1') {
        connectApi('master/getGroup', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].group_name : '';
                // byId(`desc-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`group_subtitleHome-${token}`).value = output.data[0] ? output.data[0].group_subtitleHome : '';
                byId(`group_youtubeRefHome-${token}`).value = output.data[0] ? output.data[0].group_youtubeRefHome : '';


                byId(`group_descriptionHome-${token}`).value = output.data[0] ? output.data[0].group_descriptionHome : '';


                byId(`customUrl-${token}`).value = output.data[0] ? output.data[0].group_customURL : '';
                // byId(`textarea-${token}`).value = output.data[0] ? output.data[0].pro_detail : '';
                // //console.log(output.data[0].pro_detail)
                editorTextArea.setValue(output.data[0].group_html)
                    // byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].group_img : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].group_img : ''}`;

                byId(`Fileinput_0-${token}`).dataset.filename = output.data[0] ? output.data[0].group_ImgHome : '';
                byId(`imgpreview-0-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].group_ImgHome : ''}`;

                byId(`Fileinput_00-${token}`).dataset.filename = output.data[0] ? output.data[0].group_img2 : '';
                byId(`imgpreview-00-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].group_img2 : ''}`;
            }
        })
    }



}

function saveBlogsGroupManage1(token) {

    if (checkDataInputRequest([`name-${token}`, `customUrl-${token}`, `textarea-${token}`])) {
        let dataAPI = {
            name: byId(`name-${token}`).value,
            html: byId(`textarea-${token}`).value,
            customUrl: byId(`customUrl-${token}`).value,
            img: byId(`Fileinput_${token}`).dataset.filename,
            group_ImgHome: byId(`Fileinput_0-${token}`).dataset.filename,
            group_img2: byId(`Fileinput_00-${token}`).dataset.filename,
            token: token,
            group_youtubeRefHome: byId(`group_youtubeRefHome-${token}`).value,
            group_descriptionHome: byId(`group_descriptionHome-${token}`).value,
            group_subtitleHome: byId(`group_subtitleHome-${token}`).value,
            type: 1
        }
        console.log(dataAPI)
        connectApi('master/getGroup', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    confirmButtonText: 'ตกลง',
                }).then((result) => {
                    getDataBlogsGroupManage1('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}


function addNewGroupDetail1(token, groupToken) {
    let show = byId(`show-blogsgroupDetail1`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataBlogsGroupDetail1('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
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
    <label style="display: block;">ชื่อบริการ <small class="text-warning"> ไม่ควรเกิน 120 ตัวอักษร</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">คำอธิบายบริการ </label>
    <input id="textarea-description-${token}" type="text" class="form-control inputSetting" value="">
    </div>`
    let randomURL = createToken(7);
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">กำหนด URL สำหรับบริการ <b class="text-danger">ข้อความส่วนนี้ มีผลต่อ SEO อักษรอังกฤษ ไม่ควรยาวเกิน 20 ตัวอักษร</b><br>เช่น https://yourdomain/service/filler/<span class="text-danger">Your-Custom-URL</span> โดยระบุเฉพาะส่วนของ Your-Custom-URL เท่านั้น <span class="text-warning">ภาษาอังกฤษ และตัวเลขเท่านั้น ห้ามเว้นว่าง ใช้ - ขั้นข้อความได้</span></label>
    <input id="customUrl-${token}" onkeypress="inputCustomUrl(this,event)" type="text" class="form-control inputSetting" value="${randomURL}">
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
                    <div>ภาหน้าปก <span class="text-danger">ขนาดที่แนะนำ 16:9 png or  1280x720 px</span>
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
    cardFooter.innerHTML += `<button type="button" onclick="deleteBlogsGroupDetail1Confirm(this,'${token}')" id="btnDelete" class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveBlogsGroupDetail1('${token}','${groupToken}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadblogsgroupDetail1') {
        connectApi('master/getGroupDetail', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].blogs_name : '';
                // byId(`desc-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`customUrl-${token}`).value = output.data[0] ? output.data[0].blogs_customURL : '';
                byId(`customUrl-${token}`).disabled = true;
                byId(`textarea-description-${token}`).value = output.data[0] ? output.data[0].blogs_ : '';
                // byId(`textarea-${token}`).value = output.data[0] ? output.data[0].pro_detail : '';
                // //console.log(output.data[0].pro_detail)
                editorTextArea.setValue(output.data[0].blogs_html)
                    // byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].blogs_img : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].blogs_img : ''}`;
           
                if(output.data[0].blogs_type==1){
                    byId(`btnDelete`).style.display = 'none';
                }
           
            }
        })
    }



}


function saveBlogsGroupDetail1(token, groupToken) {

    if (checkDataInputRequest([`name-${token}`, `customUrl-${token}`, `textarea-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                html: byId(`textarea-${token}`).value,
                description: byId(`textarea-description-${token}`).value,
                customUrl: byId(`customUrl-${token}`).value,
                img: byId(`Fileinput_${token}`).dataset.filename,
                img3: '',
                token: token,
                groupToken: groupToken,
                type: 1
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
                    getDataBlogsGroupDetail1('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}

function deleteBlogsGroupDetail1Confirm(e, token) {
    //console.log(token)
    let imgname = byId(`name-${token}`).value
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้ หากต้องการให้บริการนี้ไม่แสดงในหน้าเว็บ โปรด <b>ใช้วิธีการเปลี่ยนสถานะ</b>แทน</span>
            <br><br><span class="text-info">${imgname}</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            ChangeStatusTo(e, 'blogs', 'blogs_status', 9, 'blogs_token', token, 'all', '')
        }
    });
}

function getDataBlogsGroupDetail4(type) {
    let params = new URLSearchParams(window.location.search);
    let groupToken = params.get("token");
    if (!groupToken) {
        window.location = '?page=service-manage'
    } else {
        groupToken == '' ? window.location = '?page=service-manage' : null
    }
    let tablename = 'blogsgroupDetail1'
    let divname = `show-${tablename}`
    let arrayhead = ['Logo','Product', 'รายละเอียด', 'URL', 'Last Update','จัดการสินค้า','ลำดับการแสดง', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
        filter: search,
        groupToken: groupToken,
        Type: 4
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
                ArrTd[7].style.width = `5rem`;
                ArrTd[8].style.width = `5rem`;
                ArrTd[6].style.width = `5rem`;

                ArrTd[2].innerHTML = `<b>${blogs.blogs_name}</b><br><small>${blogs.blogs_}</small>`;
                ArrTd[3].innerHTML = `https://${YOURDOMAIN}/product/${blogs.blogs_customURL}`;
                ArrTd[4].innerHTML = `${moment(blogs.blogs_update).format('H:mm DD/MM/YY')}<br><small>โดย ${blogs.MasterName}</small>`
                ArrTd[5].innerHTML = `<a href="?page=blogs-detail-product&token=${blogs.blogs_token}&productname=${blogs.blogs_name}"><span class="badge badge-pill badge-secondary cursor-pointer">จัดการสินค้า</span></a>`;
                ArrTd[6].innerHTML =  `<div class="d-flex">
                    <div class="w-50 cursor-pointer" onclick="changeTopServire(4,'up','${blogs.blogs_token}')"><i class="fas fa-arrow-circle-up"></i></div>
                    <div  class="w-50 cursor-pointer" onclick="changeTopServire(4,'down','${blogs.blogs_token}')"><i class="fas fa-arrow-alt-circle-down"></i></div>

                </div>`;

                if (blogs.blogs_status == 1) {
                    ArrTd[7].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_status', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                } else {
                    ArrTd[7].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_status', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                }
                ArrTd[8].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupDetail4('${blogs.blogs_token}','${groupToken}')`);
                tbody.appendChild(table_row);
                // tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
    })
}

function changeTopServire(groupType,e,token){
    let dataAPI ={
        token : token,
        topservice:e,
        type:groupType
    }
    console.log(dataAPI)
    connectApi('master/getGroupDetail', { type: 'changeTopService', data: dataAPI, dataoption: 0 }, '', function(output) {
        console.log(output)
        if (output.status == 200) {
            if(groupType==4){
                getDataBlogsGroupDetail4('all')

            }else if(groupType==5){
                getDataBlogsGroupDetail5('all')

            }
        }
    })
}
function addNewGroupDetail4(token, groupToken) {
    let show = byId(`show-blogsgroupDetail1`)
    show.innerHTML = ``
    let header = createTagE('div', ['form-row'])
    let body = createTagE('div', ['form-row'])
    header.innerHTML = `<div class="col-md-6">
    <button type="button" onclick="getDataBlogsGroupDetail4('all')" class="btn btn-warning"><i class="fas fa-angle-left"></i> ย้อนกลับ</button>
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


        let setimgId1 = `imgpreview-1-${token}`;
        let setimgImg1 = `1-${token}`;
    
        box.innerHTML += `<div class="col-md-12">
                <div id="div_${setimgId1}" style="${token=='uploadblogsgroupDetail1'? 'display:none': ''}" class="setting__ aboutVideoImg">
                    <span onclick="removeFileOnPreview('div_${setimgId1}','${setimgId1}','img-uploadImg-${setimgImg1}')"
                        class="btnRemoveImgPreview"><i class="far fa-times-circle"></i></span>
                    <img id="${setimgId1}" width="100%" src="../../src/img/setting/f-icon2.png">
                </div>
            </div>`
        box.innerHTML += `<div class="form-group col-md-12">
                <div class="boxupload">
                    <div style="${token!='uploadblogsgroupDetail1'? 'display:none': ''}" id="img-uploadImg-${setimgImg1}"
                        onclick="clickForSelectImg('Fileinput_${setimgImg1}')" class="img-uploadImg-newbox">
                        <img src="../../src/img/png-file-format-symbol.png">
                        <div>ภาพพื้นหลัง (Header) <span class="text-danger">ขนาดที่แนะนำ 1920x1355 px png</span>
                        <small class="text-warning"></small></div>
                    </div>
                    <div class="custom-file" style="display: none;">
                        <label class="custom-file-label" id="label_input_${setimgImg1}">...</label>
                        <input data-filename="" type="file" id="Fileinput_${setimgImg1}" 
                            class="custom-file-input fileUpload_Plannedpro" accept="image/*;capture=camera"
                            onchange="loadFile(this,event,'${setimgImg1}')">
    
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
    // cardFooter.innerHTML += `<button type="button" onclick="deleteBlogsGroupDetail1Confirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveBlogsGroupDetail4('${token}','${groupToken}')" class="btn ui small primary  button ">Save changes</button>`

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

                byId(`Fileinput_1-${token}`).dataset.filename = output.data[0] ? output.data[0].blogs_img3 : '';
                byId(`imgpreview-1-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].blogs_img3 : ''}`;
            }
        })
    }



}


function saveBlogsGroupDetail4(token, groupToken) {

    if (checkDataInputRequest([`name-${token}`, `customUrl-${token}`, `textarea-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                html: byId(`textarea-${token}`).value,
                description: byId(`textarea-description-${token}`).value,
                customUrl: byId(`customUrl-${token}`).value,
                img: byId(`Fileinput_${token}`).dataset.filename,
                img2: byId(`Fileinput_0-${token}`).dataset.filename,
                img3: byId(`Fileinput_1-${token}`).dataset.filename,
                token: token,
                groupToken: groupToken,
                type: 4
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
                    getDataBlogsGroupDetail4('all')
                });
            } else {
                showError(output.msg)
            }
        })
    }
}


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
                console.log(blogs)
                let txtOptionSort = '';
                // for(let i=1;i<=output.data.length;i++){
                //     txtOptionSort+=`<option ${blogs.blogs_topService==i?`selected`:``} value="${i}">${i}</option>`;
                // }


                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                // ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${blogs.blogs_img2}','${blogs.blogs_name}')" src="../../src/img/setting/${blogs.blogs_img2}" style="max-width:8rem"></div>`
                ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('src/img/setting/','${blogs.blogs_img}','${blogs.blogs_name}')" src="../../src/img/setting/${blogs.blogs_img}" style="max-width:8rem"></div>`
                ArrTd[0].style.width = `8rem`;
                // ArrTd[1].style.width = `8rem`;
                ArrTd[3].style.width = `5rem`;
                ArrTd[4].style.width = `5rem`;
                ArrTd[5].style.width = `5rem`;

                ArrTd[1].innerHTML = `<b>${blogs.blogs_name}</b><br><small>${blogs.blogs_customURL}</small>`;
                // ArrTd[3].innerHTML = `https://${YOURDOMAIN}/product/${blogs.blogs_customURL}`;
                ArrTd[2].innerHTML = `${moment(blogs.blogs_update).format('H:mm DD/MM/YY')}<br><small>โดย ${blogs.MasterName}</small>`
                
                // // ArrTd[5].innerHTML =  `<select onchange="changeTopServire(this,'${blogs.blogs_token}')" class="form-control">${txtOptionSort}</select>`;
                ArrTd[3].innerHTML =  `<div class="d-flex">
                    <div class="w-50 cursor-pointer" onclick="changeTopServire(5,'up','${blogs.blogs_token}')"><i class="fas fa-arrow-circle-up"></i></div>
                    <div  class="w-50 cursor-pointer" onclick="changeTopServire(5,'down','${blogs.blogs_token}')"><i class="fas fa-arrow-alt-circle-down"></i></div>
                </div>`;

                if (blogs.blogs_status == 1) {
                    ArrTd[4].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'blogs', 'blogs_status', 0, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                } else {
                    ArrTd[4].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'blogs', 'blogs_status', 1, 'blogs_token', '${blogs.blogs_token}', 'all', '')`);
                }
                ArrTd[5].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `addNewGroupDetail5('${blogs.blogs_token}','${groupToken}')`);
                tbody.appendChild(table_row);
                // tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
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
    <label style="display: block;">ชื่อหัวข้อ <small class="text-warning"> ภาษาไทย</small></label>
    <input id="name-${token}" type="text" class="form-control inputSetting" value="" maxlength="200">
    </div>`
    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">คำอธิบายแบรนด์ </label>
    // <input id="textarea-description-${token}" type="text" class="form-control inputSetting" value=""  maxlength="500">
    // </div>`
    // let randomURL = createToken(7);
    box.innerHTML += `<div class="form-group col-md-12">
    <label style="display: block;">ชื่อหัวข้อ <small class="text-warning"> English</small></label>
    <input id="customUrl-${token}" type="text" class="form-control inputSetting"  maxlength="200">
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
                    <div>ภาพประกอบ <span class="text-danger">ขนาดที่แนะนำ 16:9 png or  1280x720 px</span>
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




    // box.innerHTML += `<div class="form-group col-md-12">
    // <label style="display: block;">รายละเอียดเกี่ยวกับบริการ</label>
    // <textarea rows="10" id="textarea-${token}" class="form-control inputSetting" value=""></textarea>
    // </div>`

    // createTextareaEditor(token)

    let cardFooter = byId(`footer-${token}`)
    cardFooter.innerHTML = ''
    // cardFooter.innerHTML += `<button type="button" onclick="deleteBlogsGroupDetail1Confirm(this,'${token}')"  class="btn  ui mini grey  button ">Delete</button>`
    cardFooter.innerHTML += `<button type="button" onclick="saveBlogsGroupDetail5('${token}','${groupToken}')" class="btn ui small primary  button ">Save changes</button>`

    if (token != 'uploadblogsgroupDetail1') {
        connectApi('master/getGroupDetail', { type: 'bytoken', data: token, dataoption: 0 }, '', function(output) {
            //console.log(output)
            if (output.status == 200) {
                byId(`name-${token}`).value = output.data[0] ? output.data[0].blogs_name : '';
                // byId(`desc-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`customUrl-${token}`).value = output.data[0] ? output.data[0].blogs_customURL : '';
                // byId(`textarea-description-${token}`).value = output.data[0] ? output.data[0].blogs_ : '';
                // byId(`textarea-${token}`).value = output.data[0] ? output.data[0].pro_detail : '';
                // //console.log(output.data[0].pro_detail)
                // editorTextArea.setValue(output.data[0].blogs_html)
                    // byId(`detail-${token}`).value = output.data[0] ? output.data[0].pro_desc : '';
                byId(`Fileinput_${token}`).dataset.filename = output.data[0] ? output.data[0].blogs_img : '';
                byId(`imgpreview-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].blogs_img : ''}`;

                // byId(`Fileinput_0-${token}`).dataset.filename = output.data[0] ? output.data[0].blogs_img2 : '';
                // byId(`imgpreview-0-${token}`).src = `../../src/img/setting/${output.data[0] ? output.data[0].blogs_img2 : ''}`;
            }
        })
    }



}


function saveBlogsGroupDetail5(token, groupToken) {

    if (checkDataInputRequest([`name-${token}`, `customUrl-${token}`])) {
        let dataAPI = {
                name: byId(`name-${token}`).value,
                html:'',
                description: '',
                customUrl: byId(`customUrl-${token}`).value,
                img: byId(`Fileinput_${token}`).dataset.filename,
                img2: '',
                img3: '',

                token: token,
                groupToken: groupToken,
                type: 5
            }
            console.log(dataAPI)
        connectApi('master/getGroupDetail', { type: 'update', data: dataAPI, dataoption: 0 }, '', function(output) {
            console.log(output)
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






function counttextLimit(e,id,num){
    e.setAttribute('maxlength',num)
    let text = e.value;
    let show = byId(`txtCountText-${id}`)
    show.innerHTML = `${addCommas(text.length)}/${addCommas(num)}`;
}

function saveDataProduct(){
    // เช็คข้อมูลการกรอกทั้งหมด
    // เช็คว่าตัวเลือกสินค้าแบบไหน
    let ProductNumOption = byId(`ProductNumOption`).value;
    let checkNoError = true;
    let arrCheck = ['product_name','product_no','product_refbrand'];
    if(ProductNumOption==0){
        // ตัวเลือกเดียว
        arrCheck.push('product_stock');
        arrCheck.push('product_price');
        if(byId('product_price_promo_check').checked==true){
            arrCheck.push('product_pricePromo');
        }
    }else{
        // หลายตัวเลือก
        let optionValue = FindAll(`.product_option_name`);
        optionValue.forEach(option=>{
            let token = option.dataset.token;
            arrCheck.push(`product_option_name_${token}`);
            arrCheck.push(`product_option_price_${token}`);
            
            arrCheck.push(`product_option_stock_${token}`);
            if(byId(`product_option_pricePromoCheck_${token}`).checked==true){
                
                if(parseFloat(byId(`product_option_price_${token}`).value)<=parseFloat(byId(`product_option_pricePromo_${token}`).value)){
                    byId(`product_option_pricePromo_${token}`).classList.add('is-invalid')
                    checkNoError=false;
                }else{
                    byId(`product_option_pricePromo_${token}`).classList.remove('is-invalid');
                    arrCheck.push(`product_option_pricePromo_${token}`);
                }
            }
        })
    }
    let thisAction = byId('product_action').value;
    if(thisAction=='New'){
        let img = byId('imgProduct_main');
        if(img.files.length==0){
            checkNoError = checkNoError==true?false:false;
            byId('boxImgProfileProduct').classList.add('notUpload');
        }else{
            byId('boxImgProfileProduct').classList.remove('notUpload');
        }
    }
   
    if(checkDataInputRequest(arrCheck) && checkNoError){
        Swal.fire({
            icon: 'warning',
            html: `<div>โปรดตรวจสอบข้อมูลให้ครบถ้วนก่อนกดบันทึก</div>`,
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                $('#formManageProduct').submit()
            }
        });
    } 

   
    
}

function checkboxPromotions(e,id){
    if(e.checked==true){
        byId(`product_${id}`).removeAttribute('readonly');
    }else{
        byId(`product_${id}`).setAttribute('readonly','true');
        byId(`product_${id}`).value='0';
    }
}
let numOptions_ = 0;
function addProductOption(tokenOptions,name,price,priceAfterDiscount,priceDiscount,stock){
    let show = byId(`groupPriceoption`);
    numOptions_++;
    if(tokenOptions==0){
        tokenOptions = createToken(5);
    }
    show.insertAdjacentHTML(`beforeend`,`<div class="form-row" id="groupPrice__${tokenOptions}">
        <div class="form-group col-md-3">
            <label for="product_price">ชื่อตัวเลือก</label>
            <input type="hidden" name="Product_price_tokenOption[]" value="${tokenOptions}">
            <small class="float-end text-secondary" id="txtCountText-productPrice__${tokenOptions}">0/15</small>
            <div class="input-group">
                <input type="text" value="${name}" class="form-control product_option_name" data-token="${tokenOptions}" name="product_option_name[]"  id="product_option_name_${tokenOptions}"  onkeyup="counttextLimit(this,'productPrice__${tokenOptions}',15)">
            </div>
        </div>
        <div class="form-group col-md-3">
                <label for="product_price">ราคา</label>
                <div class="input-group">
                    <input type="number" value="${price}"  name="product_option_price[]" min="0" id="product_option_price_${tokenOptions}" class="form-control" step=".1" id="" >
                    <div class="input-group-prepend">
                        <div class="input-group-text">฿</div>
                    </div>
                </div>
        </div>
        <div class="form-group col-md-3">
                <label for="product_price">ราคาโปรโมชั่น</label>
                    <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input type="checkbox" value="1"  ${priceDiscount==1?'checked':''} name="product_option_pricePromoCheck[]" id="product_option_pricePromoCheck_${tokenOptions}" onclick="checkboxPromotions(this,'option_pricePromo_${tokenOptions}')" aria-label="Checkbox for following text input">
                        </div>
                    </div>
                    <input type="number" name="product_option_pricePromo[]" value="${priceDiscount==1?priceAfterDiscount:''}" max="${price}" required value="0" min="0" class="form-control"  step=".1" ${priceDiscount==1?'':'readonly'}   id="product_option_pricePromo_${tokenOptions}" >
                    <div class="input-group-prepend">
                        <div class="input-group-text">฿</div>
                    </div>
                </div>
        </div>
        <div class="form-group col-md-2">
                <label for="product_price">คลัง</label>
                <div class="input-group">
                    <input type="number" value="${stock}" name="product_option_stock[]" class="form-control" step="1" id="product_option_stock_${tokenOptions}" >
                </div>
        </div>
        <div class="col-md-1">
            <label for="product_price">ลบ</label>
            <button type="button" onclick="deleteOptionPrice('${tokenOptions}')" class="btn btn-sm btn-secondary btn-block"><i class="fas fa-trash-alt"></i></button>
        </div>
    </div>`);
    checkNumGroupPrice(0,'','',0,'')
}

function checkNumGroupPrice(token,price,priceAfterDiscount,priceDiscount,stock){
    let optionValue = FindAll(`.product_option_name`);
    numOptions_ = optionValue.length;
    byId(`ProductNumOption`).value = numOptions_;
    if(numOptions_>0){
        byId('groupPrice').innerHTML = ``;
    }else{
        if(token==0){
            token = createToken(5);
        }
        // let token = createToken(5);
        byId('groupPrice').innerHTML = `<div class="form-row">
            <div class="form-group col-md-5">
                    <label for="product_price">ราคา</label>
                    <div class="input-group">
                        <input type="hidden" name="Product_price_token" value="${token}">
                        <input type="number" value="${price}" class="form-control" min="0" step=".1" id="product_price" name="product_price" >
                        <div class="input-group-prepend">
                            <div class="input-group-text">บาท</div>
                        </div>
                    </div>
            </div>
            <div class="form-group col-md-5">
                    <label for="product_price">ราคาโปรโมชั่น</label>
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <input type="checkbox" ${priceDiscount==1?'checked':''} id="product_price_promo_check" name="product_price_promo_check" onclick="checkboxPromotions(this,'pricePromo')" aria-label="Checkbox for following text input">
                            </div>
                        </div>
                        <input type="number" value="${priceDiscount==1?priceAfterDiscount:''}" class="form-control" min="0" name="product_price_promo" step=".1" ${priceDiscount==1?'':'readonly'}  id="product_pricePromo" >
                        <div class="input-group-prepend">
                            <div class="input-group-text">บาท</div>
                        </div>
                    </div>
            </div>
            <div class="form-group col-md-2">
                    <label for="product_price">คลัง</label>
                    <div class="input-group">
                        <input type="number" value="${stock}" name="product_stock" class="form-control" min="0"  step="1" id="product_stock" >
                    </div>
            </div>
        </div>`;
    }
}

function deleteOptionPrice(id){
    numOptions_--;
    byId(`groupPrice__${id}`).remove();
    checkNumGroupPrice(0,'','',0,'')
}
function clickElement(id){
    $(id).click();
}
function previewImgOnClickSelectFileTo(e,idClick,idPreview){
    let thisId = e.id;
    if (e.files && e.files[0]) {
        byId(idClick).style.display ='none'
        byId(idPreview).style.display = 'flex'
        var reader = new FileReader();
        byId(idPreview).classList.add('ui', 'loading', 'form')
        reader.onload = function(e) {
            byId(idPreview).innerHTML = `<img onclick="deleteImgProductPreview('${thisId}','${idClick}','${idPreview}')" src="${e.target.result}" width="100%">`;
            !!byId(`preview__${thisId}`)?byId(`preview__${thisId}`).value='11':null;
            byId(idPreview).classList.remove('ui', 'loading', 'form')
        }

        reader.readAsDataURL(e.files[0]);
    }
}
function deleteImgProductPreview(idInput,idClick,idPreview){
    byId(idInput).value = '';
    byId(idClick).style.display = 'flex';
    byId(idPreview).style.display = 'none';
    byId(idPreview).innerHTML = '';
    !!byId(`preview__${idInput}`)?byId(`preview__${idInput}`).value='':null;
}
// let currentURL = window.location.pathname;
function checkAndCreateDataToken(){
    let params = new URLSearchParams(window.location.search);
    let productToken = params.get("productToken");
    if(!!productToken){
        byId('product_token').value = productToken;
    }else{
        let nn = createToken(30);
        byId('product_token').value = nn
        window.history.pushState("object or string", "Report", `${currentURL}?page=blogs-detail-product&token=${params.get("token")}&productname=${params.get("productname")}&action=${params.get("action")}&productToken=${nn}`);
    }
}

function getdataProductdefault(){
    let token =byId('product_token').value;
    let dataAPI = {
        token:token
    }
    connectApi('master/product', { type: 'View1', data: dataAPI, dataoption: 0 }, 'formManageProduct', function(output) {
        console.log(output)
        if (output.status == 200) {
          let products = output.data;
          products.forEach(product=>{
            byId('product_name').value = product.product_name;
            // byId('textarea-product_detail').value = product.product_detail;
            editorTextArea.setValue(product.product_detail)
            byId('product_no').value = product.product_no;
            byId('ProductNumOption').value = product.product_option;
            byId('product_refbrand').value = product.product_refbrand;
            byId('product_action').value = 'Edit';
            byId('imgProduct_preview').style.display = 'flex';
            byId('imgProduct_select').style.display = 'none';
            byId('imgProduct_preview').innerHTML = `<img onclick="deleteImgProductPreview('imgProduct_main','imgProduct_select','imgProduct_preview')" src="../../include/img/products/${product.product_imgprofile}" width="100%">`;


            byId('productname____').innerHTML = ` <i class="fas fa-caret-right"></i> ${product.product_name}`;

            numOptions_  = product.product_option;
            console.log(numOptions_)
            let priceOptions = product.option
            if(product.product_option==0){
                priceOptions.forEach(op=>{
                    checkNumGroupPrice(op.option_token,op.option_price,op.option_priceDiscount,op.option_discount,op.option_stock);
                })
            }else{
                checkNumGroupPrice(0,'','',0,'')
                priceOptions.forEach(op=>{
                    console.log(op)
                    addProductOption(op.option_token,op.option_name,op.option_price,op.option_priceDiscount,op.option_discount,op.option_stock)
                    // checkNumGroupPrice(op.option_token,op.option_price,op.option_priceDiscount,op.option_discount,op.option_stock);
                })
            }

            createInputImageDetail(product.imgDetail)

            
            // if(product.product_option>0){

            // }else{

            // }
            

          }) 
        }else{
            byId('product_action').value = 'New';

        }
    })
}

function createInputImageDetail(dataImgArr){
    let imgOtherDetail  = byId('imgOtherDetail')
    imgOtherDetail.innerHTML = '';
    if(dataImgArr.length==0){
        dataimg = [{token:createToken(12)},{token:createToken(12)},{token:createToken(12)},{token:createToken(12)}];
    }else{
        dataimg = dataImgArr;
    }
    
    dataimg.forEach(img=>{
        let imgName ='';
        if(!!img.img_token){
            img.token=img.img_token;
            imgName = img.img_name
        }
        imgOtherDetail.insertAdjacentHTML('beforeend',`<div class="col-6 mb-3 flexCenter">
        <div class="boxImgProfileProduct2">
            <div class="preview" style="display:${imgName!=''?`flex`:`none`}" id="imgProduct_detail_${img.token}_preview">${imgName!=''?`<img onclick="deleteImgProductPreview('imgProduct_detail_${img.token}_main','imgProduct_detail_${img.token}_select','imgProduct_detail_${img.token}_preview')" src="../../include/img/products/${imgName}" width="100%">`:``}</div>
            <div style="display:${imgName==''?`flex`:`none`}" onclick="clickElement('#imgProduct_detail_${img.token}_main')" class="clickforUpload" id="imgProduct_detail_${img.token}_select">
                <i class="fas fa-file-image"></i>
            </div>
            <input type="hidden" name="imgDetail[]" value="${img.token}">
            <input type="hidden" name="imgPreview_img[]" id="preview__imgProduct_detail_${img.token}_main" value="${img.token}">
            <input class="d-none" type="file" accept="image/*" onchange="previewImgOnClickSelectFileTo(this,'imgProduct_detail_${img.token}_select','imgProduct_detail_${img.token}_preview')" name="imgProductDetail[]" id="imgProduct_detail_${img.token}_main">
        </div>
    </div>`);
    })

    if(dataimg.length<4){
        for(let i=0;i<4-dataimg.length;i++){
            let newToken =createToken(12);
            imgOtherDetail.insertAdjacentHTML('beforeend',`<div class="col-6 mb-3 flexCenter">
            <div class="boxImgProfileProduct2">
                <div class="preview" id="imgProduct_detail_${newToken}_preview"></div>
                <div onclick="clickElement('#imgProduct_detail_${newToken}_main')" class="clickforUpload" id="imgProduct_detail_${newToken}_select">
                    <i class="fas fa-file-image"></i>
                </div>
                <input type="hidden" name="imgDetail[]" value="${newToken}">
                <input type="hidden" name="imgPreview_img[]" id="preview__imgProduct_detail_${newToken}_main" value="${newToken}">
                <input class="d-none" type="file" accept="image/*" onchange="previewImgOnClickSelectFileTo(this,'imgProduct_detail_${newToken}_select','imgProduct_detail_${newToken}_preview')" name="imgProductDetail[]" id="imgProduct_detail_${newToken}_main">
            </div>
        </div>`);
        }
    }
    
}

function getDataProductByBrandToken(token){
    // console.log(token)

    let tablename = 'product'
    let divname = `show-${tablename}`
    let arrayhead = ['ภาพหน้าปก', 'รหัสสินค้า', 'ชื่อสินค้า', 'ตัวเลือก / ราคา', 'ตัวเลือก / สต๊อก', 'ขายแล้ว', 'Lastupdate', 'Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)

    let params = new URLSearchParams(window.location.search);
    let productname = params.get("productname");

    let dataAPI ={
        token:token,
        search:byId(`search-product`).value
    }
    // console.log(dataAPI)
    connectApi('master/product', { type: 'byBrand', data: dataAPI, dataoption: 0 }, '', function(output) {
        console.log(output)
        if (output.status == 200) {
            let divname = `show-${tablename}`
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
            output.data.forEach(product => {
                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                ArrTd[0].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('include/img/products/','${product.product_imgprofile}','${product.product_name}')" src="../../include/img/products/${product.product_imgprofile}" style="max-width:8rem"></div>`
                ArrTd[0].innerHTML += `<small>${product.imgDetail.length>0?`และอีก ${product.imgDetail.length} ภาพ`:``}</small>`
                
                ArrTd[0].style.width = `8rem`;
                ArrTd[arrayhead.length-2].style.width = `5rem`;
                ArrTd[arrayhead.length-1].style.width = `5rem`;
                ArrTd[1].innerHTML = `<b> ${product.product_no}</b><br><small><i class="fas fa-tag"></i> ${product.blogs_name}</small>`
                ArrTd[2].innerHTML = `<b>${product.product_name}</b>`

                let option = product.option;
                let HTML_SALE = ``;
                // option.forEach()
                if(product.product_option==0){
                    option.forEach(price=>{
                        ArrTd[3].innerHTML = `<b class="">${addCommas(parseFloat(price.option_discount==1?price.option_priceDiscount:price.option_price).toFixed(2))}</b>`
                        ArrTd[3].innerHTML += ` <br><small><s>${price.option_discount==1?addCommas(parseFloat(price.option_price).toFixed(2)):''}</s></small>`
                        ArrTd[4].innerHTML = `<b>${addCommas(parseFloat(price.option_stock).toFixed(0))}</b>`;
                        let countSales = 0;
                        product.sales.forEach(sale=>{
                            if(sale.option_token==price.option_token){
                                countSales+=sale.numProduct;
                            }
                        })
                        ArrTd[5].innerHTML = `<b>${addCommas(parseFloat(countSales).toFixed(0))}</b>`;
                    })
                }else{
                    ArrTd[3].innerHTML = '';
                    ArrTd[4].innerHTML = '';
                    ArrTd[5].innerHTML ='';
                    option.forEach(price=>{
                        ArrTd[3].innerHTML += `<div>${price.option_name} : <b class="">${addCommas(parseFloat(price.option_discount==1?price.option_priceDiscount:price.option_price).toFixed(2))}</b> <small><s>${price.option_discount==1?addCommas(parseFloat(price.option_price).toFixed(2)):''}</s></small></div>`
                        // ArrTd[3].innerHTML += ` <small><s>${price.option_discount==1?addCommas(parseFloat(price.option_price).toFixed(2)):''}</s></small>`
                        ArrTd[4].innerHTML += `<div>${price.option_name} : <b>${addCommas(parseFloat(price.option_stock).toFixed(0))}</b></div>`;
                    
                        let countSales = 0;
                        product.sales.forEach(sale=>{
                            if(sale.option_token==price.option_token){
                                countSales+=sale.numProduct;
                            }
                        })
                        ArrTd[5].innerHTML += `<div>${price.option_name} : <b> ${addCommas(parseFloat(countSales).toFixed(0))}</b></div>`;
                    
                    })

                    
                }
                // let countSales = 0;
                // product.sales.forEach(sale=>{
                //     countSales+=sale.numProduct;
                // })

                // ArrTd[5].innerHTML = `<b>${addCommas(parseFloat(countSales).toFixed(0))}</b>`
                // ArrTd[2].innerHTML = `${agent.agent_name}`
                // ArrTd[3].innerHTML = `${agent.agent_phone}`
                // ArrTd[4].innerHTML = `${agent.agent_line}`
                // ArrTd[5].innerHTML = `${agent.agent_location}`
                ArrTd[arrayhead.length-3].innerHTML = `${moment(product.product_lastupdate).format('H:mm DD/MM/YY')}<br><small>โดย ${product.MasterName}</small>`
                if (product.product_status == 1) {
                    ArrTd[arrayhead.length-2].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'products', 'product_status', 0, 'product_token', '${product.product_token}', 'all', '')`);
                } else {
                    ArrTd[arrayhead.length-2].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'products', 'product_status', 1, 'product_token', '${product.product_token}', 'all', '')`);
                }
                // ArrTd[7].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `window.location=')`);
                ArrTd[arrayhead.length-1].innerHTML = `<a href="?page=blogs-detail-product&token=${token}&productname=${productname}&action=new&productToken=${product.product_token}"><span class="badge badge-warning"><i class="fas fa-edit"></i> EDIT</span></a>`;

                tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
    })
}

function selectFilterDateOrder(start, end) {
    let lstart = new Date(start).getTime() / 1000
    DATA_PLAN_DATE_3 = parseInt(lstart)
}

let FILTER_DATE_START = parseInt(Math.floor(moment().subtract(3, 'month').startOf('month') / 1000))
let FILTER_DATE_END = parseInt(Math.floor(moment().endOf('month') / 1000))

let SELECT_FILTER_DATE_START_0 = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD H:mm:s');
let SELECT_FILTER_DATE_END_0 = moment().format('YYYY-MM-DD H:mm:s');

let Arr_StatusOrder = ['ยกเลิก','คำสั่งซื้อใหม่','ยืนยันการชำระเงิน','เสร็จสิ้น',''];
function getDataOrderByStatusType(type){
    console.log(type)
// console.log($('#filterBrand254').val())
    let tablename = 'order'
    let divname = `show-${tablename}`
    let arrayhead=[];
    // let arrayhead = ['หมายเลขคำสั่งซื้อ', 'ลูกค้า', 'ข้อมูลการจัดส่ง', 'รายละเอียดยอด','สินค้า/สรุปยอด', 'สลิปโอนเงิน',  'Status', 'Action']
    // if(type==)
    arrayhead = ['หมายเลขคำสั่งซื้อ', 'ลูกค้า', 'ข้อมูลการจัดส่ง', 'รายละเอียดยอด','สินค้า/สรุปยอด', 'สลิปโอนเงิน',  'Status', 'Action']
    createDataTable(tablename, divname, arrayhead)

    // let params = new URLSearchParams(window.location.search);
    // let type = params.get("token");
    // let Filter
    let dataAPI ={
        token:type,
        search:byId(`search-order`).value,
        start:SELECT_FILTER_DATE_START_0,
        end:SELECT_FILTER_DATE_END_0
        
    }
    let option_ =$('#filterBrand254').val();
    console.log(option_)
    connectApi('master/order', { type: 'table', data: dataAPI, dataoption: option_ }, '', function(output) {
        console.log(output)
        if (output.status == 200) {
            let divname = `show-${tablename}`
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
            output.data.forEach(order => {

                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row);
                let products = order.product;

                ArrTd[0].innerHTML = `<b>${order.orderRunNo}</b><br><small>${moment(order.order_createDate).format('H:mm DD/MM/YY')}</small>`
                ArrTd[1].innerHTML = `<b>${order.cs_name}</b><br>
                <small>TexID : ${order.cs_taxID}</small><br>
                <small>Email : ${order.cs_email}</small><br>`
                ArrTd[2].innerHTML = `<b>${order.cs_name} ${order.cs_company!=''?`(${order.cs_company})`:``}</b><br><small>${order.cs_address}</small><bR><b>โทรศัพท์  ${order.cs_phone}</b>`
                let numProduct = 0;
                products.forEach(product=>{
                    numProduct+=parseInt(product.numProduct);
                })
                ArrTd[3].style.textAlign ='right';
                ArrTd[3].innerHTML = `
                <small>ราคาเต็ม : ${addCommas(parseFloat(order.sum_subtotal).toFixed(2))}</small><br>
                <small>ส่วนลด : ${addCommas(parseFloat(order.sum_discount).toFixed(2))}</small><br>
                <b><small>รวม : ${addCommas(parseFloat(order.sum_total).toFixed(2))}</small></b><br>
                <small>ค่าส่ง : ${addCommas(parseFloat(order.sum_shipping).toFixed(2))}</small>`;

                ArrTd[4].style.textAlign ='right';
                ArrTd[4].innerHTML = `<b>${addCommas(numProduct)} ชิ้น</b><br>
                <b>รวม : ${addCommas(parseFloat(order.sum_grandTotal).toFixed(2))}</b><br>`;

                // ArrTd[4].innerHTML = `<b>${addCommas(order.sum_total)} บาท</b><br><small>ค่าขนส่ง : ${addCommas(parseFloat(order.sum_shipping).toFixed(2))}</small>`
                ArrTd[5].innerHTML = `<div class="previewImgOntable"><img onclick="viewModelPDFV2('include/img/slip/','${order.file_slip}','${order.orderRunNo}')" src="../../include/img/slip/${order.file_slip}" style="max-width:5rem"></div>`

                ArrTd[6].innerHTML =`${Arr_StatusOrder[order.order_status]}`;
                ArrTd[6].style.width='7rem';
                ArrTd[arrayhead.length-1].innerHTML =`<button type="button" onclick="viewOrderDetail('${order.order_token}')" class="btn btn-primary btn-sm">ดูรายละเอียดคำสั่งซื้อ</button>`;



                tbody.appendChild(table_row);
            })
            createParentNode(divname, tablename, PAGE_PERPAGE)
        } else {
            createColumnPageNouFound(arrayhead.length, tablename)
        }
        
    });

}

function viewOrderDetail(token){
    let dataAPI ={
        token:token,
    }
    openModal('ViewPDF')
    let title = byId('ViewPDF-Title')
    let body = byId('body-ViewPDF')

    connectApi('master/order', { type: 'detail', data: dataAPI, dataoption: 0 }, '', function(output) {
        console.log(output)
        if (output.status == 200) {
            output.data.forEach(order=>{
                title.innerHTML = `คำสั่งซื้อหมายเลข #${order.orderRunNo}`;
                let products = order.product
                let bodyOrderDetail = '';
                let Subtotal =0;
                let Discount =0;

                products.forEach(product=>{
                    let price = 0;
                    if(product.option_discount==1){
                        price = parseFloat(product.option_priceDiscount);
                        Discount+=parseFloat(product.option_price)-parseFloat(product.option_priceDiscount);
                    }else{
                        price = parseFloat(product.option_price);
                    }
                    Subtotal+=parseFloat(product.option_price);

                    bodyOrderDetail +=`<div class="product" id="product____${product.option_token}">
                    <div class="product-image">
                        <img src="../../include/img/products/${product.product_imgprofile}">
                    </div>
                    <div class="product-details">
                        <div class="product-title"><a target="_BLANK" href="../../shop/${product.product_name}/${product.product_id}/${product.product_no}/${product.blogs_customURL}"><b>${product.product_name}</b></a>
                            <br>${product.product_option>0?`<b class="shopingCartOptionName">${product.option_name}</b>`:``}
                        </div>
                        <p class="product-description">รหัสสินค้า : ${product.product_no}</p>
                    </div>
                    <div class="product-price">
                        ${product.price_perItemNet!=0?`<small><s>${addCommas(product.price_perItem)}</s></small> <span class="text-danger">${addCommas((product.price_perItemNet).toFixed(2))}</span>`:addCommas((product.price_perItem).toFixed(2))}
                       <b>x ${parseInt(product.numProduct)} </b>
                    </div>
                    

                    <div class="product-line-price" id="product-line-price-${product.option_token}">
                    ${product.price_perItemNet!=0?`<small><s>${addCommas((product.price_perItem*parseInt(product.numProduct)).toFixed(2))}</s></small> <span class="text-danger">${addCommas((product.price_perItemNet*parseInt(product.numProduct)).toFixed(2))}</span>`:addCommas((product.price_perItem*parseInt(product.numProduct)).toFixed(2))}
                    </div>
                </div>`;

                })



                body.innerHTML =`<div class="p-4"><div class="row">
                    <div class="col-md-6">
                        <div class="form-row mb-2">
                            <div class="col-5 textTQ">หมายเลขคำสั่งซื้อ</div><div class="col-7 textTG">${order.orderRunNo}</div>
                            <div class="col-5 textTQ">สร้างเมื่อ</div><div class="col-7 textTG">เวลา ${moment(order.order_createDate).format('H:mm')} วันที่ ${moment(order.order_createDate).format('D MMM YY')}</div>
                            <div class="col-5 textTQ">ชื่อลูกค้า</div><div class="col-7 textTG">${order.cs_name}</div>
                            <div class="col-5 textTQ">บริษัท</div><div class="col-7 textTG">${order.cs_company}</div>
                            <div class="col-5 textTQ">เลขประจำตัวผู้เสียภาษี</div><div class="col-7 textTG">${order.cs_taxID}</div>
                            <div class="col-5 textTQ">โทรศัพท์</div><div class="col-7 textTG">${order.cs_phone}</div>
                            <div class="col-5 textTQ">อีเมล</div><div class="col-7 textTG">${order.cs_email}</div>
                            <div class="col-5 textTQ">Note : </div><div class="col-7 textTG">${order.cs_other}</div>
                           
                        </div>

                        <div class="form-row">
                            <div class="col-12">
                                <div class="boxShowShipment">
                                    <div class="head">ที่อยู่สำหรับการจัดส่ง</div>
                                    <div class="body">

                                    <b>${order.cs_name} ${order.cs_company!=''?`(${order.cs_company})`:``}</b><br>
                                    ${order.cs_address}<br>
                                    <b>โทรศัพท์ ${order.cs_phone}</b>
                                    
                                    
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row  mt-2">
                            <div class="col-md-12 mb-3">รายละเอียด</div>
                            <div class="col-md-12 example-split mb-5">
                                <div class="row">
                                    <div class="col-xs-12 col-xs-offset-1 col-sm-12 col-sm-offset-2">
                                        <ul class="timeline_custom timeline_custom-split mb-5">
                                            <li class="timeline_custom-item period ">
                                                
                                                <div class="timeline_custom-marker"></div>
                                                <div class="timeline_custom-content">
                                                    <div class="timeline_custom-title">
                                                    <b>สร้างคำสั่งซื้อ/ชำระเงิน</b>
                                                    <br> <small class="text-secondary">โดย ${order.cs_name}</small><br>
                                                    <small class="text-primary">เมื่อ ${moment(order.order_createDate).format('H:mm น. D MMM YY')}</small>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="timeline_custom-item period ">
                                                
                                                <div class="timeline_custom-marker"></div>
                                                <div class="timeline_custom-content">
                                                    <div class="timeline_custom-title">
                                                    <b>ตรวจสอบข้อมูลการชำระเงิน</b><br>
                                                    ${order.order_status==1?`<div class="mt-2 mb-3">
                                                        <button onclick="updateOrder_1('${order.order_token}',2)" class="btn btn-sm btn-success">ยืนยันออเดอร์</button>
                                                        <button onclick="updateOrder_1('${order.order_token}',0)" class="btn btn-sm btn-danger">ยกเลิกออเดอร์</button>
                                                    </div>`:`${order.order_status>=2?`<span class="text-success">ยืนยันแล้ว</span>`:`<span class="text-danger">ยกเลิกรายการ</span>`} โดย ${order.checkSlip[0].MasterName}`}
                                                    ${order.order_status>=2 || order.order_status==0?`<br><small class="text-primary">เมื่อ ${moment(order.order_checkSlipAt).format('H:mm น. D MMM YY')}</small>`:``}
                                                    
                                                    </div>
                                                </div>
                                            </li>

                                            ${order.order_status>=2?`
                                            <li class="timeline_custom-item period ">
                                                
                                                <div class="timeline_custom-marker"></div>
                                                <div class="timeline_custom-content">
                                                    <div class="timeline_custom-title"><b>เตรียมสินค้า และจัดส่ง</b><br>
                                                    ${order.order_status==2?`<div class="mt-2 mb-3">
                                                    <div class="input-group mb-1">
                                                        <input type="text" class="form-control" id="tracking_${order.order_token}" placeholder="Tracking No.">
                                                        <span class="input-group-text">โดยบริษัท</span>
                                                        <input type="text" class="form-control" id="tracking_by_${order.order_token}" placeholder="e.g. Kerry,EMS,Frash Express">
                                                        <button onclick="updateOrder_2('${order.order_token}',3)" class="btn btn-sm btn-success">บันทึก</button>
                                                    </div>
                                                    <small class="text-info"> เมื่อบันทึกข้อมูลเลขที่ติดตามพัสดุ และกดบันทึก จะถือว่าออเดอร์นี้เสร็จสิ้น</small>
                                                </div>`:order.order_status>2?`<div class="mt-2 mb-3">
                                                <div class="input-group mb-1">
                                                        <input type="text" class="form-control" value="${order.order_deliveryTrackingNo}" readonly>
                                                        <span class="input-group-text">โดยบริษัท</span>
                                                        <input type="text" class="form-control" value="${order.order_deliveryCompany}" readonly>
                                                    </div>
                                                    โดย ${order.deliveryby[0].MasterName}
                                                    <br><small class="text-primary">เมื่อ ${moment(order.order_deliveryAt).format('H:mm น. D MMM YY')}</small>
                                                </div>`:``}
                                                    
                                                    </div>
                                                </div>
                                            </li>

                                          
                                            
                                            
                                            
                                            `:``}


                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="orderDetail">
                            <div class="head">รายละเอียดสินค้า</div>
                            <div class="body" id="bodyOrderDetail">
                            ${bodyOrderDetail}
                                <div class="product" id="showTotal">
                                    <div class="totals">
                                        <div class="totals-item">
                                            <label>Subtotal</label>
                                            <div class="totals-value" id="cart-subtotal">${addCommas(parseFloat(order.sum_subtotal).toFixed(2))}</div>
                                        </div>
                                        <div class="totals-item">
                                            <label>Discount</label>
                                            <div class="totals-value" id="cart-discount">${addCommas(parseFloat(order.sum_discount).toFixed(2))}</div>
                                        </div>
                                        <div class="totals-item">
                                            <label>Total</label>
                                            <div class="totals-value" id="cart-subtotal1">${addCommas(parseFloat(order.sum_total).toFixed(2))}</div>
                                        </div>
                                        <div class="totals-item">
                                            <label>Shipping</label>
                                            <div class="totals-value" id="cart-shipping">${addCommas(parseFloat(order.sum_shipping).toFixed(2))}</div>
                                        </div>
                                        <div class="totals-item totals-item-total">
                                            <label>Grand Total</label>
                                            <div class="totals-value" id="cart-total">${addCommas(parseFloat(order.sum_grandTotal).toFixed(2))}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="detailSlip">
                            <div class="head">หลักฐานการชำระเงิน</div>
                            <div class="body">
                              <img src="../../include/img/slip/${order.file_slip}" width="100%" >
                            </div>
                        </div>
                    </div>
                
                </div></div>`;
            })

        }
    })


}


function updateOrder_1(token,action){
    let dataAPI ={
        token:token,
        action:action
    }
    // openModal('ViewPDF')
    closeModal('ViewPDF')
let Arr_StatusOrder1 = ['Reject','Create','ยืนยันออเดอร์','ยกเลิกออเดอร์'];

    // let title = byId('ViewPDF-Title')
    // let body = byId('body-ViewPDF')
    Swal.fire({
        icon: 'warning',
        title: `${Arr_StatusOrder1[action]}?`,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            connectApi('master/order', { type: 'update1', data: dataAPI, dataoption: 0 }, '', function(output) {
                console.log(output)
                if (output.status == 200) {
                    viewOrderDetail(token);
                }
            })
        }else{
            viewOrderDetail(token);
        }
    });

    
    
}

function updateOrder_2(token,action){
    let dataAPI ={
        token:token,
        action:action,
        tracking:byId(`tracking_${token}`).value,
        trackingBy:byId(`tracking_by_${token}`).value
    }
    closeModal('ViewPDF');
    Swal.fire({
        icon: 'warning',
        title: `จัดส่งเรียบร้อย?`,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            connectApi('master/order', { type: 'update2', data: dataAPI, dataoption: 0 }, '', function(output) {
                console.log(output)
                if (output.status == 200) {
                    viewOrderDetail(token);
                }
            })
        }else{
            viewOrderDetail(token);
        }
    });
}