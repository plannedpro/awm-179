let ARR_CONFIG = {
    userType:['-','นักเรียน','ครู/บุคลากร','อื่นๆ'],
    userPerfix:['-','เด็กชาย','เด็กหญิง','นาย','นาง','นางสาว'],
    userClass:['อื่นๆ/ไม่ระบุ','อ.1','อ.2','อ.3','ป.1','ป.2','ป.3','ป.4','ป.5','ป.6','ม.1','ม.2','ม.3'],
}
function getDataUserStudent(){
    let tablename = 'users'
    let divname = `show-${tablename}`
    let arrayhead = ['Profile', 'รหัสผู้ใช้', 'ประเภท', 'คำนำหน้า', 'ชื่อ-สกุล', 'ชื่อเล่น', 'ปีการศึกษา', 'ระดับชั้น','Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)


    let dataAPI = {
        search:byId('search-users').value
    }
    connectApi('master/user', { type: `listshow`, data: dataAPI, dataoption: 0 }, '', function(output) {
        // console.log(output)
        if (output.status == 200) {
            let dataUsers = output.data[0].users;
            console.log(dataUsers);
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
            dataUsers.forEach(user=>{
                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                ArrTd[0].innerHTML = `<span class="d-none">include/img/uploads/profile/${user.user_profile}</span><div class="previewImgOntable"><img onclick="viewModelPDFV2('include/img/uploads/profile/','${user.user_profile}','${user.user_sid}')" src="../../include/img/uploads/profile/${user.user_profile}" style="max-width:3rem"></div>`
                ArrTd[0].style.width = `3rem`;
                ArrTd[0].setAttribute('data-filter',user.user_id)
                ArrTd[1].style.width = `3rem`;
                ArrTd[arrayhead.length-2].style.width = `2rem`;
                ArrTd[arrayhead.length-1].style.width = `2rem`;
                ArrTd[1].innerHTML = `<b>${user.user_sid}</b>`;
                ArrTd[2].innerHTML = `${ARR_CONFIG.userType[user.user_type]}`;
                ArrTd[3].innerHTML = `${ARR_CONFIG.userPerfix[user.user_prefix]}`;
                ArrTd[4].innerHTML = `${user.user_fname} ${user.user_lname}`;
                ArrTd[5].innerHTML = `${user.user_nickname}`;
                ArrTd[6].innerHTML = `${!!user.year_digit?user.year_digit:'อื่นๆ/ไม่ระบุ'}`;
                ArrTd[7].innerHTML = `${ARR_CONFIG.userClass[user.user_class]}`;
                if (user.user_status == 1) {
                    ArrTd[arrayhead.length-2].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'lib_users', 'user_status', 0, 'user_id', '${user.user_id}', 'all', '')`);
                } else {
                    ArrTd[arrayhead.length-2].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'lib_users', 'user_status', 1, 'user_id', '${user.user_id}', 'all', '')`);
                }
                ArrTd[arrayhead.length-1].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `AddDataUserStudent('${user.user_id}')`);


                tbody.appendChild(table_row);
            })

            setTable_DataTableForUserSTD(tablename)
            // createParentNode(divname, tablename, PAGE_PERPAGE)



        }
    });
    console.log(dataAPI);
}
function AddDataUserStudent(userId){
    openModal('ModalOther')
    let body = byId(`body-ModalOther`);
    let title = byId(`ModalOther-Title`);
    title.innerHTML = `ข้อมูลผู้ใช้บริการ`;
    console.log(userId);

    connectApi('master/user', { type: `getYear`, data: {}, dataoption: 0 }, '', function(output) {
    // console.log(output)
    if (output.status == 200) {
        body.innerHTML = `<div class="p-4">
        <div class="form-row">
            <div class="col-md-12 mb-3">
                <label class="form-label">ประเภทผู้ใช้</label>
                <!-- <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"> -->
                <div class="form-row">
                    <div class="col-4">
                        <input class="InputGroupcheckbox userType" data-type="1" type="radio" checked id="userType1" name="userType">
                        <label class="LabelGroupCheckbox" for="userType1">
                            นักเรียน
                        </label>
                    </div>
                    <div class="col-4">
                        <input class="InputGroupcheckbox userType" data-type="2" type="radio"  id="userType2" name="userType">
                        <label class="LabelGroupCheckbox" for="userType2">
                            ครู/บุคลากร
                        </label>
                    </div>
                    <div class="col-4">
                        <input class="InputGroupcheckbox userType" data-type="3" type="radio"  id="userType3" name="userType">
                        <label class="LabelGroupCheckbox" for="userType3">
                            อื่น ๆ
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-md-12 mb-3">
                <label class="form-label">รหัสประจำตัวผู้ใช้/รหัสนักเรียน</label>
                <div class="float-right" id="btncheckboxSID">
                    <input class="" type="checkbox" onchange="checkBoxUsedAutoSID()" checked id="usedAutoSID" name="usedAutoSID"> 
                    <label class="" for="usedAutoSID">ให้ระบบสร้างอัตโนมัติ</label>
                    </div>
                <input type="number" onkeyup="checkSIDAuto()"  disabled class="form-control mb-1" id="user_sid" placeholder="">
                <small id="showErrorSID" class=""></small>
            </div>
            <div class="col-md-2 mb-3">
                <label class="form-label">คำนำหน้า</label>
                <select class="form-select" id="user_prefix">
                    <option value="1">เด็กชาย</option>
                    <option value="2">เด็กหญิง</option>
                    <option value="3">นาย</option>
                    <option value="4">นาง</option>
                    <option value="5">นางสาว</option>
                </select>
            </div>
            <div class="col-md-5 mb-3">
                <label class="form-label">ชื่อ</label>
                <input type="text" class="form-control" id="user_fname" placeholder="">
            </div>
            <div class="col-md-5 mb-3">
                <label class="form-label">นามสกุล</label>
                <input type="text" class="form-control" id="user_lname" placeholder="">
            </div>
            <div class="col-md-5 mb-3">
                <label class="form-label">Profile</label><br>
                <label class="formUploadImgCustom m-auto" id="formUploadImgCustom" for="uploadProfile">
                    <img src="../../../include/img/info/nullImgProfile.jpeg"  width="100%" style="max-width:150px">
                </label>
                <div class="areaShowPreviewImgUpload" id="areaShowPreviewImgUpload">
                </div>
                <input type="file"  class="d-none" data-filename="" id="uploadProfile" accept="image/*;capture=camera" onchange="loadFilePreview(this,event)">
               
            </div>
            <div class="col-md-7 mb-3">
                <div class="form-row">
                    <div class="col-md-12 mb-2">
                        <label class="form-label">ชื่อเล่น</label>
                        <input type="text" class="form-control" id="user_nickname" placeholder="">
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">ปีการศึกษา</label>
                        <select class="form-select" id="user_yearStudy">
                            <option value="0">อื่นๆ/ไม่ระบุ</option>
                            
                        </select>
                    </div>
                    <div class="col-md-6 mb-2">
                        <label class="form-label">ระดับชั้น</label>
                        <select class="form-select" id="user_class">
                            <option value="0">อื่นๆ/ไม่ระบุ</option>
                            <option value="13">อ.1</option>
                            <option value="14">อ.2</option>
                            <option value="15">อ.3</option>
                            <option value="1">ป.1</option>
                            <option value="2">ป.2</option>
                            <option value="3">ป.3</option>
                            <option value="4">ป.4</option>
                            <option value="5">ป.5</option>
                            <option value="6">ป.6</option>
                            <option value="7">ม.1</option>
                            <option value="8">ม.2</option>
                            <option value="9">ม.3</option>
                            <option value="10">ม.4</option>
                            <option value="11">ม.5</option>
                            <option value="12">ม.6</option>
                            
                        </select>
                    </div>
                    <div class="col-md-6 mb-2">
                    <label class="form-label">ห้อง</label>
                    <select class="form-select" id="user_room">
                        <option value="0">อื่นๆ/ไม่ระบุ</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                </div>
            </div>
            <div class="col-md-12 mt-3">
                <button onclick="saveDataUserSTD('${userId}')" id="btnsaveDataUserSTD" class="btn w-100 btn-success">บันทึก</button>
            </div>
        </div>
    </div>`;

        let yearHTML = byId('user_yearStudy')
        output.data.forEach(year=>{
            yearHTML.innerHTML +=`<option value="${year.year_id}">${year.year_digit}</option>`;
        })

        if(userId!=0){
            connectApi('master/user', { type: `forEdit`, data: {userId:userId}, dataoption: 0 }, '', function(output) {
                // console.log(output)
                if (output.status == 200) {
                    output.data.forEach(user=>{
                        byId(`userType${user.user_type}`).checked= true;
                        byId(`user_sid`).value = user.user_sid;
                        byId(`btncheckboxSID`).style.display = 'none';
                        byId(`user_prefix`).value = user.user_prefix;
                        byId(`user_fname`).value = user.user_fname;
                        byId(`user_lname`).value = user.user_lname;
                        byId(`user_nickname`).value = user.user_nickname;
                        byId(`user_yearStudy`).value = user.year_id;
                        byId(`user_class`).value = user.user_class;
                        byId(`user_room`).value = user.user_room;
                        byId('formUploadImgCustom').style.display = 'none';
                        let areaShowPreviewImgUpload = byId('areaShowPreviewImgUpload')
                        areaShowPreviewImgUpload.style.display = 'flex';
                        byId('formUploadImgCustom').style.display = 'none';
                        areaShowPreviewImgUpload.innerHTML = `<img src="../../include/img/uploads/profile/${user.user_profile}" width="100%">`;
                        areaShowPreviewImgUpload.setAttribute('onclick', `removeImgProfilePreview()`)
                    })
                }
            });
            }
    }
});

  
  


   
}
function closeAndClearModal(id){
    byId(`body-${id}`).innerHTML=``;
    closeModal(id)
}
function checkBoxUsedAutoSID(){
    let user_sid = byId('user_sid')
    if(byId(`usedAutoSID`).checked == true){
        user_sid.value = '';
        user_sid.disabled=true;
        byId('btnsaveDataUserSTD').disabled = false;
    }else{
        user_sid.disabled=false; 
    }
}
function loadFilePreview(element, event){
    let areaShowPreviewImgUpload = byId('areaShowPreviewImgUpload')

    var reader = new FileReader();
    reader.onload = function() {
        areaShowPreviewImgUpload.style.display = 'flex';
        byId('formUploadImgCustom').style.display = 'none';
        areaShowPreviewImgUpload.innerHTML = `<img src="${reader.result}" width="100%">`;
        areaShowPreviewImgUpload.setAttribute('onclick', `removeImgProfilePreview()`)
    }
    reader.readAsDataURL(event.target.files[0]);
}
function removeImgProfilePreview(){
    let areaShowPreviewImgUpload = byId('areaShowPreviewImgUpload')
    byId('uploadProfile').value = '';
    areaShowPreviewImgUpload.innerHTML = '';
    areaShowPreviewImgUpload.style.display = 'none';
    byId('formUploadImgCustom').style.display = 'flex';
}
function saveDataUserSTD(id){
    let userTypeE = FindAll('.userType:checked')
    let userType=1;
    userTypeE.forEach(t=>{
        userType = t.dataset.type
    })
    let arrCheck = ['user_fname','user_lname'];
    let thisNotError = true;
    if(byId('usedAutoSID').checked==false){
        arrCheck.push('user_sid');
        if(!byId('user_sid').classList.contains("is-valid")){
            thisNotError = false;
        }
    }
    if(checkDataInputRequest(arrCheck) && thisNotError){
        let dataAPI = {
            id:id,
            userType:userType,
            user_prefix:byId('user_prefix').value,
            user_fname:byId('user_fname').value,
            user_lname:byId('user_lname').value,
            user_sid:byId('user_sid').value,
            user_profile:byId(`uploadProfile`).dataset.filename,
            user_nickname:byId('user_nickname').value,
            user_yearStudy:byId('user_yearStudy').value,
            user_class:byId('user_class').value,
            user_room:byId('user_room').value,
        }
        console.log(dataAPI);
        // connectApi('master/user', { type: `addOrUpdate`, data: dataAPI, dataoption: 0 }, '', function(output) {
        //     console.log(output)
        //     if (output.status == 200) {

        //     }
        // });
                const formData = new FormData();
                // formData.append('files[]', file);
               
                if(!!byId(`uploadProfile`).files[0]){
                    formData.append('files[]',byId(`uploadProfile`).files[0]);
                }
                formData.append('id',id);
                formData.append('userType',userType);
                formData.append('user_prefix',byId('user_prefix').value);
                formData.append('user_fname',byId('user_fname').value);
                formData.append('user_lname',byId('user_lname').value);
                formData.append('user_sid',byId('user_sid').value);
                formData.append('user_profile',byId(`uploadProfile`).dataset.filename);
                formData.append('user_nickname',byId('user_nickname').value);
                formData.append('user_yearStudy',byId('user_yearStudy').value);
                formData.append('user_class',byId('user_class').value);
                formData.append('user_room',byId('user_room').value);

                let datafetch = fetch('./../../api/upload/uploadImg_profile.php', {
                        method: 'POST',
                        body: formData
                }).then(response => {
                        return response.text();
                }).then(data => {
                    let datav = JSON.parse(data);
                    console.log(datav)
                    if(datav.status==1){
                        closeAndClearModal('ModalOther');
                        getDataUserStudent();
                    }
                    // byId(`file_other`).dataset.filename=datav[0];
                    
                    // byId('boxpreviewImg').classList.remove('ui', 'loading', 'form')
                });
    }
}
function checkSIDAuto(){
    let sid0 = byId('user_sid');
    let btnsaveDataUserSTD = byId('btnsaveDataUserSTD')
    let sid = sid0.value;
    let showErrorSID = byId('showErrorSID');
    if(sid.length>=5){
        showErrorSID.classList.add('text-info')
        showErrorSID.classList.remove('text-danger')
        showErrorSID.classList.remove('text-success')
        showErrorSID.innerHTML = `กำลังตรวจสอบรหัสนี้...`  ;
        let dataAPI = {
            sid:sid
        }
        connectApi('master/user', { type: `autoCheckSID`, data: dataAPI, dataoption: 0 }, '', function(output) {
            // console.log(output)
            if (output.status == 200) {
                let data = output.data[0]
                if(data.status==1){
                    // ใช้งานได้
                    showErrorSID.classList.remove('text-info')
                    showErrorSID.classList.remove('text-danger')
                    showErrorSID.classList.add('text-success')
                    showErrorSID.innerHTML = `สามารถใช้งานรหัสนี้ได้`  ;
                    sid0.classList.remove('is-invalid')
                    sid0.classList.add('is-valid')
                    btnsaveDataUserSTD.disabled = false;
        
                }else{
                    // ไม่สามารถใช้ได้ พร้อมแนะนำรหัสใหม่
                    showErrorSID.innerHTML = `มีรหัสนี้แล้วในระบบ โปรดเลือกหมายเลขอื่น <b>รหัสแนะนำ ${data.sid}</b>`  ;
                    showErrorSID.classList.remove('text-info')
                    showErrorSID.classList.remove('text-success')
                    showErrorSID.classList.add('text-danger')
                    sid0.classList.add('is-invalid')
                    sid0.classList.remove('is-valid')
                    btnsaveDataUserSTD.disabled = true;

                }
            }
        });
    }else{
        showErrorSID.innerHTML = `รหัสประจำตัว ตัวเลขเท่านั้น ขั้นต่ำ 5 หลัก`  ;
        showErrorSID.classList.remove('text-info')
        showErrorSID.classList.remove('text-success')
        showErrorSID.classList.add('text-danger')
        sid0.classList.add('is-invalid')
        sid0.classList.remove('is-valid')
        btnsaveDataUserSTD.disabled = true;
    }
    
}

function openModalPreviewCardUserSTD(data){
    console.log(data);
    openModal('print')
    byId('print-Title').innerHTML = `พิมพ์บัตรสมาชิก ${data.body.length} ฉบับ`;
    let body = byId(`body-print`);
    let footer = byId(`footer-print`);
    let htmlPagePrint = ``;
    let htmlPagePrint2 = ``;
    let count = 0;
    data.body.forEach(user=>{
        count++;
        htmlPagePrint += `<tr>
            <td width="50mm" style="border: 1px solid #ebebeb;border-collapse: collapse;width: 8cm; table-layout:fixed">
                <div>
                    <div style="text-align: center;border-bottom: 1px solid #ebebeb;margin-top:5px">
                        <table width="100%">
                            <tr>
                            <td><img src="../../include/img/img-school01.png" width="40px"></td>
                            <td>
                                <div><b style="font-size:14px">โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179</b><br><span style="font-size:13px">บัตรสมาชิกห้องสมุด</span></div>
                            </td>
                            </tr>
                        </table>
                </div>
                    <div>
                        <table width="100%">
                            <tr>
                            <td align="center"><div style="width:80px;height: 80px;overflow: hidden;display: flex;align-items: center;"><img src="../../${user[0]}" width="100%"></div><br><div style="font-size:9px;text-align:center">.......................................<bR>ผู้ออกบัตร<br>วันออกบัตร ${moment().format('D/MM/Y')}</div></td>
                            <td>
                                
                                <div style="font-size:12px;"><b>${user[3]}${user[4]}</b></div>
                                <div style="font-size:10px;">รหัสสมาชิก : ${user[1]}</div>
                                <div style="font-size:10px;">ประเภทบัตร : ${user[2]}</div>


                                <div style="font-size:9px;text-align:center"><svg id="barcode_${user[1]}"></svg></div>
                            </td>
                            </tr>
                        </table>
                    </div>
                   
                </div>
            </td>
            <td width="50mm" style="border: 1px solid #ebebeb;border-collapse: collapse;width: 8cm;table-layout:fixed">
            <div>
                <div>
                    <table>
                        <tr>
                            <td align="center">
                            <div style="font-size:13px">
                                โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179<br>
                                ถนน จันทบุรี - สระแก้ว ต.วังน้ำเย็น อ.วังน้ำเย็น จ.สระแก้ว 27210
                                <br>
                                โทรศัพท์ 037 251 447
                            </div>
                            
                            </td>
                        </tr>
                    </table>
                </div>
                
            </div>
            </td>
        </tr>`;

    // if(count%2==0){
    //     htmlPagePrint += `<tr>
    //     <td colspan="3"></td>
    //     </tr>`;
    // }
    // htmlPagePrint2+=`<div style="">
    //     <div>Logo โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179</div>
    //     <div>Body</div>
    //     <div>Footer</div>
    // </div>`

    })
    footer.style.display = 'block';
    body.innerHTML = `<div class="forPrint p-2" style="    line-height: 1.5;" id="printarea">
    <table width="" style="width: 16cm;margin: auto;">
       ${htmlPagePrint}
    </table>
    </div>`;

    data.body.forEach(user=>{
        JsBarcode(`#barcode_${user[1]}`, `${user[1]}`,{
            // format: "pharmacode",
            // lineColor: "#0aa",
            // width: 4,
            height: 40,
            fontSize:12
            // displayValue: false
          });
    })

    footer.innerHTML = `<button class="btn btn-primary" onclick="PrintCardUserSTD()">Print</button>`

}

function PrintCardUserSTD() {
    // document.getElementById("nonPrintable").className += "noPrint";
    // window.print();
    // const section = $("section");
    // const modalBody = $("#body-print").detach();

    // const content = $(".forPrint").detach();
    // section.append(modalBody);
    // window.print();
    // section.empty();
    // section.append(content);
    // $(".modal-body-wrapper").append(modalBody);

    var winPrint = window.open();
    /*var header = '@include("report/header")';*/
    /*var body = '@include("memberpayment/monthlybill")';*/
    var body = document.getElementById('printarea').innerHTML;
    winPrint.document.write(body);
    winPrint.document.close();
    winPrint.focus();
    winPrint.print();
    winPrint.close();


}

function AddDataBook(id){
        openModal('ModalOther')
        let body = byId(`body-ModalOther`);
        let title = byId(`ModalOther-Title`);
        title.innerHTML = `ข้อมูลหนังสือ`;
        // console.log(userId);
    
        connectApi('master/book', { type: `defaultForm`, data: {}, dataoption: 0 }, '', function(output) {
        // console.log(output)
        if (output.status == 200) {
            let data = output.data[0]
            let shelfs = data.shelf;
            let groups = data.group;

            let htmlShelf = '';
            shelfs.forEach(shelf=>{
                htmlShelf+=`<option value="${shelf.shelf_id}">${shelf.shelf_code}</option>`;
            })
            let htmlGroup = '';
            groups.forEach(group=>{
                htmlGroup+=`<option value="${group.group_id}">${group.group_name}</option>`;
            })

            
            body.innerHTML = `<div class="p-4">
            <div class="form-row">
                <div class="col-md-12 mb-3">
                    <label class="form-label">Barcode/ISBN</label>
                    <input type="text" class="form-control mb-1 input_book_barcode" onkeyup="checkbarcode()" id="book_barcode" placeholder="">
                    <small id="showErrorSID" class=""></small>
                </div>
                <div class="col-md-12 mb-3">
                    <label class="form-label">รหัสหนังสือ/รหัสอ้างอิง/เลขทะเบียนหนังสือ</label>
                    <input type="text" class="form-control" id="book_ref" placeholder="">
                </div>
                <div class="col-md-12 mb-3">
                    <label class="form-label">ชื่อหนังสือ</label>
                    <input type="text" class="form-control" id="book_name" placeholder="">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">ปีที่พิมพ์</label>
                    <input type="number" class="form-control" id="book_year" value="${moment().format('Y')}" placeholder="">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">จำนวน (เล่ม)</label>
                    <input type="number" class="form-control" id="book_num" value="1" min="0" placeholder="">
                </div>

                <div class="col-md-5 mb-3">
                    <label class="form-label">ภาพหน้าปก (ถ้ามี)</label><br>
                    <label class="formUploadImgCustom m-auto" id="formUploadImgCustom" for="uploadProfile">
                        <img src="../../../include/img/uploads/book/null.png"  width="100%" style="max-width:150px">
                    </label>
                    <div class="areaShowPreviewImgUpload" id="areaShowPreviewImgUpload">
                    </div>
                    <input type="file"  class="d-none" data-filename="" id="uploadProfile" accept="image/*;capture=camera" onchange="loadFilePreview(this,event)">
                   
                </div>
                <div class="col-md-7 mb-3">
                    <div class="form-row">
                        <div class="col-md-12 mb-2">
                            <label class="form-label">ที่เก็บ/ชั้นวาง</label>
                            <select class="form-select" id="book_shelf_id">
                                <option value="0">อื่นๆ/ไม่ระบุ</option>
                                ${htmlShelf}
                            </select>
                        </div>
                        <div class="col-md-12 mb-2">
                            <label class="form-label">ประเภทหนังสือ</label>
                            <select class="form-select" id="book_group_id">
                                <option value="0">อื่นๆ/ไม่ระบุ</option>
                                ${htmlGroup}
                            </select>
                        </div>
                        <div class="col-md-6 mb-2">
                            <label class="form-label">สถานะ</label>
                            <select class="form-select" id="book_status">
                                <option value="1">ปกติ</option>
                                <option value="0">ไม่พร้อมให้บริการ</option>                                
                            </select>
                        </div>
                       
                    </div>
                </div>
                <div class="col-md-12 mt-3">
                    <button onclick="saveDataBook('${id}')" disabled id="btnsaveDataBook" class="btn w-100 btn-success">บันทึก</button>
                </div>
            </div>
        </div>`;

        // const myModal = byId('modal-ModalOther')
        // const myInput = document.getElementById('myInput')
        $('#modal-ModalOther').on('shown.bs.modal', function() {
            byId(`book_barcode`).focus();
            // console.log(111);
        })
    
            // let yearHTML = byId('user_yearStudy')
            // output.data.forEach(year=>{
            //     yearHTML.innerHTML +=`<option value="${year.year_id}">${year.year_digit}</option>`;
            // })
    
            if(id!=0){
                connectApi('master/book', { type: `forEdit`, data: {id:id}, dataoption: 0 }, '', function(output) {
                    console.log(output)
                    if (output.status == 200) {
                        output.data.forEach(book=>{
                            // byId(`userType${user.user_type}`).checked= true;
                            byId(`book_barcode`).value = book.book_barcode;
                            byId(`book_barcode`).disabled = true;
                            byId(`book_ref`).value = book.book_ref;
                            byId(`book_name`).value = book.book_name;
                            byId(`book_year`).value = book.book_year;
                            byId(`book_num`).value = book.book_num;
                            byId(`book_shelf_id`).value = book.book_shelf_id;
                            byId(`book_group_id`).value = book.book_group_id;
                            byId(`book_status`).value = book.book_status;
                            byId('btnsaveDataBook').disabled =false;

                            // byId(`btncheckboxSID`).style.display = 'none';
                            // byId(`user_prefix`).value = user.user_prefix;
                            // byId(`user_fname`).value = user.user_fname;
                            // byId(`user_lname`).value = user.user_lname;
                            // byId(`user_nickname`).value = user.user_nickname;
                            // byId(`user_yearStudy`).value = user.year_id;
                            // byId(`user_class`).value = user.user_class;
                            // byId(`user_room`).value = user.user_room;
                            // byId('formUploadImgCustom').style.display = 'none';
                            let areaShowPreviewImgUpload = byId('areaShowPreviewImgUpload');
                            areaShowPreviewImgUpload.style.display = 'flex';
                            byId('formUploadImgCustom').style.display = 'none';
                            areaShowPreviewImgUpload.innerHTML = `<img src="../../include/img/uploads/book/${book.book_cover}" width="100%">`;
                            areaShowPreviewImgUpload.setAttribute('onclick', `removeImgProfilePreview()`);
                        })
                    }
                });
            }
        }
    });
    
      
      
    
    
       
    }

    function checkbarcode(){
        // console.log(this.event);
        let book_barcode = byId('book_barcode').value;
        let sid0 = byId('book_barcode');
        let btnsaveDataBook = byId('btnsaveDataBook')

        if (this.event.keyCode === 13) {
        //    console.log(1111);
        }
       

        if(book_barcode.length>=3){
            showErrorSID.classList.add('text-info')
            showErrorSID.classList.remove('text-danger')
            showErrorSID.classList.remove('text-success')
            showErrorSID.innerHTML = `กำลังตรวจสอบรหัสนี้...`  ;
            let dataAPI = {
                barcode:book_barcode
            }
            connectApi('master/book', { type: `chackbarcode`, data: dataAPI, dataoption: 0 }, '', function(output) {
                // console.log(output)
                if (output.status == 200) {
                    showErrorSID.innerHTML = `มีรหัสหนังสือนี้แล้วในระบบ โปรดค้นหาและอัพเดตรายการเดิม หรือเพิ่มเล่มใหม่`  ;
                    showErrorSID.classList.remove('text-info')
                    showErrorSID.classList.remove('text-success')
                    showErrorSID.classList.add('text-danger')
                    sid0.classList.add('is-invalid')
                    sid0.classList.remove('is-valid')
                    btnsaveDataBook.disabled = true;
                }else{
                    
                    showErrorSID.classList.remove('text-info')
                    showErrorSID.classList.remove('text-danger')
                    showErrorSID.classList.add('text-success')
                    showErrorSID.innerHTML = `สามารถเพิ่มรายการนี้ได้`  ;
                    sid0.classList.remove('is-invalid')
                    sid0.classList.add('is-valid')
                    btnsaveDataBook.disabled = false;
                }
            });


    
        }else{
            showErrorSID.innerHTML = `รหัสบาร์โค้ด ขั้นต่ำ 3 หลัก`  ;
            showErrorSID.classList.remove('text-info')
            showErrorSID.classList.remove('text-success')
            showErrorSID.classList.add('text-danger')
            sid0.classList.add('is-invalid')
            sid0.classList.remove('is-valid')
            btnsaveDataBook.disabled = true;
        }
    }

    function saveDataBook(id){
        let arrCheck = ['book_barcode','book_ref','book_name'];
        let thisNotError = true;

        if(checkDataInputRequest(arrCheck) && thisNotError){
                    const formData = new FormData();
                    if(!!byId(`uploadProfile`).files[0]){
                        formData.append('files[]',byId(`uploadProfile`).files[0]);
                    }
                    formData.append('id',id);
                    formData.append('book_barcode',byId('book_barcode').value);
                    formData.append('book_ref',byId('book_ref').value);
                    formData.append('book_name',byId('book_name').value);

                    formData.append('book_year',byId('book_year').value);
                    formData.append('book_num',byId('book_num').value);
                    formData.append('book_shelf_id',byId('book_shelf_id').value);
                    formData.append('book_group_id',byId('book_group_id').value);
                    formData.append('book_status',byId('book_status').value);
    
                    let datafetch = fetch('./../../api/upload/uploadImg_book.php', {
                            method: 'POST',
                            body: formData
                    }).then(response => {
                            return response.text();
                    }).then(data => {
                        let datav = JSON.parse(data);
                        console.log(datav)
                        if(datav.status==1){
                            closeAndClearModal('ModalOther');
                            getDataBookAll();
                        }
                        // byId(`file_other`).dataset.filename=datav[0];
                        
                        // byId('boxpreviewImg').classList.remove('ui', 'loading', 'form')
                    });
        }
    }


function getDataBookAll(){
    let tablename = 'bookall'
    let divname = `show-${tablename}`
    let arrayhead = ['Images', 'Barcode/ISBN', 'ชื่อหนังสือ', 'ประเภท/หมวดหมู่', 'ชั้นวาง/ที่เก็บ', 'เลขทะเบียน', 'ปีที่พิมพ์', 'จำนวน', 'พิมพ์บาร์โค้ด','Status', 'Edit']
    createDataTable(tablename, divname, arrayhead)


    let dataAPI = {
        search:byId('search-bookall').value
    }
    connectApi('master/book', { type: `listshow`, data: dataAPI, dataoption: 0 }, '', function(output) {
        console.log(output)
        if (output.status == 200) {
 
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
            output.data.forEach(book=>{
                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                ArrTd[0].innerHTML = `<span class="d-none">include/img/uploads/book/${book.book_cover}</span><div class="previewImgOntable"><img onclick="viewModelPDFV2('include/img/uploads/book/','${book.book_cover}','${book.book_name}')" src="../../include/img/uploads/book/${book.book_cover}" style="max-width:3rem"></div>`
                ArrTd[0].style.maxWidth = `3rem`;
                ArrTd[0].setAttribute('data-filter',book.book_id)
                ArrTd[1].style.maxWidth = `3rem`;
                ArrTd[arrayhead.length-2].style.maxWidth = `2rem`;
                ArrTd[arrayhead.length-1].style.maxWidth = `2rem`;
                ArrTd[arrayhead.length-3].style.maxWidth = `1.5rem`;
                ArrTd[1].innerHTML = `<b>${book.book_barcode}</b>`;
                ArrTd[2].innerHTML = `<b>${book.book_name}</b>`;
                ArrTd[3].innerHTML = `${!!book.group_name?book.group_name:`ไม่ระบุ`}`;
                ArrTd[4].innerHTML = `${!!book.shelf_code?book.shelf_code:`ไม่ระบุ`}`; 
                ArrTd[5].innerHTML = `${book.book_ref}`;

                ArrTd[6].innerHTML = `${book.book_year}`;
                ArrTd[7].innerHTML = `${book.book_num}`;
                ArrTd[8].innerHTML = `<input class="inputOnDataTable" id="inputshowNumOfPrint_${book.book_barcode}" type="number" value="${book.book_num}">`;
                if (book.book_status == 1) {
                    ArrTd[arrayhead.length-2].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'lib_book', 'book_status', 0, 'book_id', '${book.book_id}', 'all', '')`);
                } else {
                    ArrTd[arrayhead.length-2].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'lib_book', 'book_status', 1, 'book_id', '${book.book_id}', 'all', '')`);
                }
                ArrTd[arrayhead.length-1].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `AddDataBook('${book.book_id}')`);


                tbody.appendChild(table_row);
            })

            setTable_DataTableForBook(tablename)
            // createParentNode(divname, tablename, PAGE_PERPAGE)



        }
    });
    console.log(dataAPI);
}

function openModalPreviewCardBook(data){
    console.log(data);
    openModal('print')
    byId('print-Title').innerHTML = `พิมพ์ Barcode ติดหนังสือ ${data.body.length} เรื่อง`;
    let body = byId(`body-print`);
    let footer = byId(`footer-print`);
    let htmlPagePrint = ``;
    let htmlPagePrint2 = ``;
    let count = 0;
    data.body.forEach(user=>{
        count++;
        let numPrint = parseInt(byId(`inputshowNumOfPrint_${user[1]}`).value);
        for(let b=0;b<numPrint;b++){
        htmlPagePrint += `<div style="font-size:9px;text-align:center;height: 7rem;">
            <div><small>โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179</small></div>
            <div><b>${user[2]}</b></div>
            <svg id="barcode_${user[1]}"></svg></div>`;
        }

    // if(count%2==0){
    //     htmlPagePrint += `<tr>
    //     <td colspan="3"></td>
    //     </tr>`;
    // }
    // htmlPagePrint2+=`<div style="">
    //     <div>Logo โรงเรียนอนุบาลวังน้ำเย็นมิตรภาพที่ 179</div>
    //     <div>Body</div>
    //     <div>Footer</div>
    // </div>`

    })
    footer.style.display = 'block';
    body.innerHTML = `<div class="forPrint p-2" style="    line-height: 1.5;" id="printarea">
    <div style="    column-count: 4;
    -webkit-column-count: 4;
    -moz-column-count: 4;
    display: grid;
    grid-template-columns: repeat(4,1fr);">${htmlPagePrint}</div>
       
    
    </div>`;

    data.body.forEach(user=>{
        JsBarcode(`#barcode_${user[1]}`, `${user[1]}`,{
            // format: "pharmacode",
            // lineColor: "#0aa",
            // width: 4,
            marginTop: 2,
            height: 30,
            fontSize:10
            // displayValue: false
          });
    })

    footer.innerHTML = `<button class="btn btn-primary" onclick="PrintCardBarcode()">Print</button>`

}
function PrintCardBarcode() {
    var winPrint = window.open();
    /*var header = '@include("report/header")';*/
    /*var body = '@include("memberpayment/monthlybill")';*/
    var body = document.getElementById('printarea').innerHTML;
    winPrint.document.write(body);
    winPrint.document.close();
    winPrint.focus();
    winPrint.print();
    winPrint.close();


}

function updateNumBook_print(bookId){
    // console.log(bookId);
    byId(`showNumOfPrint_${bookId}`).innerHTML = byId(`inputshowNumOfPrint_${bookId}`).value;
}


let boxGraphCheckIn;
function createGraphCheckInLast30(data,dataAPI){
    // console.log(data);
    let arrLastMonth = [];
    let arrLastMonth_temp = [];
    let arrInprocess = [];
    let arrCompleted = [];
    let durationDay = days_between(new Date(dataAPI.start),new Date(dataAPI.end));
   //console.log(durationDay);
//    console.log(data);
//    data.forEach(log=>{
//     arrLastMonth.push(log.DD+' 09:00');
//     arrInprocess.push(log.num);
//    })

    for(let i=0;i<durationDay;i++){
    arrLastMonth.push(moment(dataAPI.start).add(i, 'days').startOf('day').format('Do MMM'))
    arrLastMonth_temp.push(moment(dataAPI.start).add(i, 'days').endOf('day').format('YYYY-MM-DD'))
    arrInprocess.push(0)
  }
  ////console.log(data);
  let countToday =0;
  data.forEach(log => {
      let count = 0;
      arrLastMonth_temp.forEach(day=>{
          if(log.DD==day){
              arrInprocess[count] = log.num;
              if(moment().format('YYYY-MM-DD')==day){
                  countToday+=log.num;
              }
          }
          
          count++;
      })
  })
//   console.log(arrLastMonth);
//   if(data.length==0){
//     let count = 0;
//     arrLastMonth.forEach(y=>{
//         arrInprocess[count] = 0;
//         count++
//     })
//   }
//   console.log(data);

    // console.log(arrLastMonth);

    // console.log(arrInprocess);

    var options = {
        series: [ {
                name: `ผู้ใช้บริการ`,
                data: arrInprocess
            }],
        chart: {
            height: 250,
            type: 'area', // bar line 
              toolbar: {
                show: false
              }, zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              }
        },
       

        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '8px',
                colors: ["#6f309e","#ffffff"]
            }
        },
        xaxis: {
            categories: arrLastMonth,
            type: 'category', // category , datetime
            position: 'bottom',
            tickAmount: durationDay>30?30:durationDay,
            tickPlacement: 'between',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#6f309e',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            labels: {
                datetimeFormatter: {
                  year: 'yyyy',
                  month: 'MMM \'yy',
                  day: 'dd MMM',
                  hour: 'HH:mm'
                }
                // ,formatter: function (value, timestamp) {
                //     // console.log(timestamp);
                //     return moment(timestamp).format('D MMM YY')

                //     // return new Date(timestamp) // The formatter function overrides format property
                //   }, 
              },
            tooltip: {
                enabled: false,
            },
         
        },
        yaxis: {
            // title: {
            //     text: 'Create New Ticket'
            //   },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function(val) {
                    return `${addCommas(parseFloat(val).toFixed(0))} คน`;
                }
            }
        },
        title: {
            text: `สถิติการเข้าใช้บริการห้องสมุด`,
            floating: true,
            offsetY: 0,
            align: 'left',
            style: {
                fontFamily:  'Noto Sans Thai',
                color: '#444'
            }
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 1
          },
        opposite: true,
        subtitle: {
            text: `ในช่วง ${moment(dataAPI.start).format('DD MMM YYYY')} ถึง ${moment(dataAPI.end).format('DD MMM YYYY')}`,
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 15,
            floating: false,
            style: {
              fontSize:  '12px',
              fontWeight:  'normal',
              fontFamily:  'Noto Sans Thai',
              color:  '#9699a2'
            },
        },
          fill: {
            opacity: 1
          }
          ,colors:[ '#6f309e','#26a0fc', '#3591D0','#BCBCBC']
    };
    boxGraphCheckIn?boxGraphCheckIn.destroy():null;
    boxGraphCheckIn = new ApexCharts(Find("#boxGraphCheckInLast30"), options);
    boxGraphCheckIn.render();
    // boxGraphCheckInLast30.updateSeries([{
     
    // }])

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


  // let FILTER_DATE__START = parseInt(Math.floor(moment().subtract(2, 'month').startOf('month') / 1000))
// let FILTER_DATE__END = parseInt(Math.floor(moment().endOf('month') / 1000))
let SELECT_FILTER_DATE__START = moment().subtract(30, 'day').startOf('day').format('YYYY-MM-DD H:mm:s');
let SELECT_FILTER_DATE__END = moment().startOf('end').format('YYYY-MM-DD H:mm:s');
function getDataCheckInreport(){
    let tablename = 'CheckInreport'
    let divname = `show-${tablename}`
    let arrayhead = ['วันที่', 'รหัสผู้ใช้', 'ชื่อ - นามสกุล','ประเภท', 'จำนวน']
    createDataTable(tablename, divname, arrayhead)

    let tablename2 = 'CheckInreport2'
    let divname2 = `show-${tablename2}`
    let arrayhead2 = ['วันที่', 'รหัสผู้ใช้', 'ชื่อ - นามสกุล','ประเภท', 'ระดับชั้น']
    createDataTable(tablename2, divname2, arrayhead2)
    let dataAPI = {
        start :SELECT_FILTER_DATE__START,
        end:SELECT_FILTER_DATE__END,
        search:byId('search-CheckInreport').value
    }
    let showNumCheckInToday = byId('showNumCheckInToday')
    let showNumCheckInThisWeek = byId('showNumCheckInThisWeek')
    let showNumCheckInThisMonth = byId('showNumCheckInThisMonth')
    // 
    boxGraphCheckIn?boxGraphCheckIn.destroy():null;
    byId('boxGraphCheckInLast30').innerHTML = '';
    // console.log(dataAPI);
    connectApi('master/checkin', { type: 'logCheckIn', data: dataAPI, dataoption: 0 }, '', function(output) {
        // console.log(output)
        if(output.status==200){
            let last30 = output.data[0].last30;
            let logs = output.data[0].logs;
            let detail = output.data[0].detail;
            
            createGraphCheckInLast30(last30,dataAPI);

            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);

            let table2 = byId(`table-${tablename2}`)
            let tbody2 = resetDataTbodyBeforeCreateTable(tablename2)
            table2.appendChild(tbody2);

            let countToday = 0;
            let countThsiWeek = 0;
            let countthisMonth = 0;
            let arrSID=[];
            let arrSID2=[];
            let arrSID3=[];


            logs.forEach(checkin=>{
                // moment(dataAPI.start).startOf('week').format('YYYY-MM-DD')
                if(moment().format('YYYY-MM-DD')==moment(checkin.DD).format('YYYY-MM-DD')){
                    if(!arrSID3.includes(checkin.user_sid)){
                        arrSID3.push(checkin.user_sid)
                        countToday++;
                    }
                }
                let s = moment().startOf('week').format('YYYY-MM-DD')
                for(let w=0;w<7;w++){
                    // loop 7 วัน เริ่มจากต้นสัปดาห์
                    if(moment(s).add(w, 'days').startOf('day').format('YYYY-MM-DD')==moment(checkin.DD).format('YYYY-MM-DD')){
                        if(!arrSID2.includes(checkin.user_sid)){
                            arrSID2.push(checkin.user_sid)
                            countThsiWeek++;
                        }
                    }
                    
                    
                }
                if(moment().format('YYYY-MM')==moment(checkin.DD).format('YYYY-MM')){
                    if(!arrSID.includes(checkin.user_sid)){
                        arrSID.push(checkin.user_sid)
                        countthisMonth++;
                    }
                }


                
                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                // ArrTd[0].innerHTML = `${moment(checkin.DD).format('D MMM YY')}`;
                ArrTd[0].innerHTML = `${checkin.DD}`;

                ArrTd[1].innerHTML = `${checkin.user_sid}`;
                ArrTd[4].innerHTML = `${addCommas(checkin.num)}`;
                // ArrTd[2].innerHTML = `${ARR_CONFIG.userPerfix[checkin.user_prefix]}${checkin.user_fname} ${checkin.user_lname}`;
                ArrTd[2].innerHTML = `${checkin.user_fname} ${checkin.user_lname}`;
                ArrTd[3].innerHTML = `${ARR_CONFIG.userType[checkin.user_type]}`;
                tbody.appendChild(table_row);
            })

            showNumCheckInToday.innerHTML = addCommas(countToday);
            showNumCheckInThisMonth.innerHTML = addCommas(countthisMonth);
            showNumCheckInThisWeek.innerHTML = addCommas(countThsiWeek);


            // console.log(detail);
            detail.forEach(checkin=>{
                let table_row2 = createE('tr');
                let ArrTd2 = createTd(arrayhead2.length, table_row2)
                // ArrTd[0].innerHTML = `${moment(checkin.DD).format('D MMM YY')}`;
                ArrTd2[0].innerHTML = `${checkin.checkin_time}`;
                ArrTd2[1].innerHTML = `${checkin.user_sid}`;
                ArrTd2[2].innerHTML = `${checkin.user_fname}  ${checkin.user_lname}`;
                ArrTd2[3].innerHTML = `${ARR_CONFIG.userType[checkin.user_type]}`;
                // ArrTd[4].innerHTML = `${ARR_CONFIG.userType[checkin.user_type]}`;
                ArrTd2[4].innerHTML = `${ARR_CONFIG.userClass[checkin.user_class]} ${checkin.user_room!=0?`/${checkin.user_room}`:``}`;

                tbody2.appendChild(table_row2);
            })

            // setTable_DataTableV2(tablename)
            createParentNode(divname, tablename, PAGE_PERPAGE)
            setTable_DataTableV2(tablename2)

        }
    });
}

function checkBarcodeSID_ForBorrow(){
    let section1 = byId('showResultScanBarcode_section1');
    section1.innerHTML = '';
    let dataAPI={
        sid:byId('inputScanBarcodeSTD').value
    }
    // console.log(dataAPI);
    connectApi('master/borrow', { type: 'checkBarcodeSID_ForBorrow', data: dataAPI, dataoption: 0 }, '', function(output) {
        // console.log(output)
        if(output.status==200){
            byId('showResultScanBarcode_section0').style.display = 'none';
            byId('inputScanBarcodeSTD').disabled =true;
            output.data.forEach(user=>{
                section1.innerHTML = `<div class="text-left">ข้อมูลผู้ยืม</div>
                <div class="showResultScanBarcode">
                    <div class="tagUserType"><small>ประเภทบัตร</small><br>${ARR_CONFIG.userType[user.user_type]}</div>
                    <div class="imgprofile">
                        <div class="img">
                            <img src="../../include/img/uploads/profile/${user.user_profile}"
                                onclick="viewModelPDFV2('include/img/uploads/profile/','${user.user_profile}','${ARR_CONFIG.userPerfix[user.user_prefix]}${user.user_fname} ${user.user_lname}')"
                                width="100%" alt="" srcset="">
                        </div>
                        <div class="sid">
                        ${user.user_sid}
                        </div>
                    </div>
                    <div class="datauser">
                        <div class="title">${ARR_CONFIG.userPerfix[user.user_prefix]}${user.user_fname} ${user.user_lname}</div>
                        <div class="history">
                            <div class="boxHistoryEasy">
                                <div class="form-row">
                                    <div class="col-md-4">
                                        <div class="box1 checkin">
                                            <div class="ttitle">เข้าใช้บริการ ในปีนี้</div>
                                            <div class="tnum">${addCommas(user.checkin.length)}</div>
                                            <div class="tsubtitle">ครั้ง</div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="box1 borrow">
                                            <div class="ttitle">ยืมแล้ว</div>
                                            <div class="tnum">2</div>
                                            <div class="tsubtitle">เล่ม</div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="box1 pending">
                                            <div class="ttitle">ค้าง/รอคืน</div>
                                            <div class="tnum">0</div>
                                            <div class="tsubtitle">เล่ม</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="btnGroupConfirmAfterScan d-flex" class="btnGroupConfirmAfterScan_s1">
                            <a href="?page=borrow" class="w-25"><button
                                    class="btn btn-light w-100 btn-sm">แสกนใหม่</button></a>
                            <button class="btn btn-primary w-75 btn-sm" id="btnconfirmSID_ForBorrow" onclick="confirmSID_ForBorrow('${user.user_id}')">ยืนยัน/ทำรายการต่อ</button>
                        </div>
                    </div>
                </div>`;
                byId('btnconfirmSID_ForBorrow').focus();
            })

        }else{
            byId('inputScanBarcodeSTD').value = '';
            section1.innerHTML = `<div class="text-center mt-3"><img src="../../include/img/notfound.png" width="250px"><br>ไม่พบข้อมูล</div>`;
        }
    })
}
let ARR_BOOK_FOR_BORROW = [];
function confirmSID_ForBorrow(user_id){
    ARR_BOOK_FOR_BORROW = [];
    byId('btnconfirmSID_ForBorrow').style.display = 'none';
    let secsion2 = byId('showResultScanBarcode_section2')
    secsion2.innerHTML = `<label for="inputScanBarcodeSTD">2.ป้อนรหัสบาร์โค้ด หรือแสกนบาร์โค้ดหนังสือ</label>
    <input type="text" class="form-control inputScanBarcode book" onkeyup="checkBarcodeBook_forBorrow('${user_id}')" id="inputScanBarcodeBook">`;
    $('#inputScanBarcodeBook').focus();
    byId('showResultScanBarcode_section3').innerHTML = '<div class="text-left">ข้อมูลหนังสือ</div><div id="showResultScanBarcode_sectionnnnn3" class="showResultScanBarcode p-1 d-block"></div>';
}
function checkBarcodeBook_forBorrow(user_id){
    let section3 = byId('showResultScanBarcode_sectionnnnn3')

    if (this.event.keyCode === 13) {
        let dataAPI={
            barcode:byId('inputScanBarcodeBook').value
        }
        // console.log(ARR_BOOK_FOR_BORROW);
        // console.log(dataAPI);
        connectApi('master/borrow', { type: 'checkBarcodeBook_forBorrow', data: dataAPI, dataoption: 0 }, '', function(output) {
            // console.log(output)
            if(output.status==200){
                output.data.forEach(book=>{
                    if(!ARR_BOOK_FOR_BORROW.includes(parseInt(book.book_id))){
                        section3.insertAdjacentHTML('beforeend',`<div class="item" id="item_book_${book.book_id}">
                        <input type="hidden" class="bookItem_Forborrow" value="${book.book_id}">
                        <input type="hidden" id="bookItem_name_${book.book_id}" value="${book.book_name}">
                        <input type="hidden" id="bookItem_cover_${book.book_id}" value="${book.book_cover}">
                            <div class="img">
                                <img src="../../include/img/uploads/book/${book.book_cover}"
                                    onclick="viewModelPDFV2('include/img/uploads/book/','${book.book_cover}','${book.book_name}')"
                                    width="100%" alt="" srcset="">
                            </div>
                            <div class="databook">
                                <div class="name">${book.book_name}</div>
                                <div class="detail">
                                    <div class="">หมวดหมู่ : ${book.group_name}</div>
                                    <div class="">ปีที่พิมพ์ : ${book.book_year}</div>
                                    <div class="">สถานที่เก็บ/ชั้น : ${book.shelf_code}</div>
                                </div>
                            </div>
                            <div class="option">
                                <span class="btnDeleteBookOption" onclick="removeItemBook_forBorrow('${book.book_id}','${user_id}')"><i class="fas fa-times"></i></span>
                            </div>
                        </div>`);
                        ARR_BOOK_FOR_BORROW.push(parseInt(book.book_id));
                        byId('inputScanBarcodeBook').value =''
                        $('#inputScanBarcodeBook').focus();
                    }else{
                        Swal.fire({
                            icon: 'warning',
                            title: 'มีรายการนี้แล้ว',
                            showCancelButton: false,
                            confirmButtonText: 'ตกลง',
                        }).then((result) => { 
                            $('#inputScanBarcodeBook').focus();
                        });
                    }

                    checkBookItem_select(user_id)
                   
                })
            }else{
                // byId('inputScanBarcodeBook').value = '';
                // section3.innerHTML = `<div class="text-center mt-3"><img src="../../include/img/notfound.png" width="250px"><br>ไม่พบข้อมูล</div>`;
            }
        });
    }
}

function removeItemBook_forBorrow(book_id,user_id){
    byId(`item_book_${book_id}`).remove();
    ARR_BOOK_FOR_BORROW = ARR_BOOK_FOR_BORROW.filter(item => item !== parseInt(book_id))
    checkBookItem_select(user_id);
    byId('inputScanBarcodeBook').value =''
    $('#inputScanBarcodeBook').focus();
}
function checkBookItem_select(user_id){
    let section4 = byId('showResultScanBarcode_section4')
    section4.innerHTML = '';
    let items = FindAll('.bookItem_Forborrow');
    // console.log(items);
    if(items.length>0){
        section4.innerHTML = `<label for="">3.ข้อมูลการยืม</label>
        <div class="form-row">
            <div class="col-6">
                <label for="inputDateStart">วันที่ยืม</label>
                <input type="text" class="form-control" id="inputDateStart">
            </div>
            <div class="col-6">
                <label for="inputDueDate">กำหนดคืน <small class="text-secondary">(Defalut 7
                        วัน)</small></label>
                <input type="text" class="form-control" id="inputDueDate">
            </div>
        </div>`;

        SELECT_FILTER_DATE__START = moment().format('YYYY-MM-DD');
        SELECT_FILTER_DATE__END =moment().add(7, 'day').format('YYYY-MM-DD');
        $('#inputDateStart').daterangepicker({
            opens: 'left',
            startDate: new Date(SELECT_FILTER_DATE__START),
            singleDatePicker: true,
            autoApply: true,
            drops: 'auto',
            "locale": {
                "format": "ddd DD/MM/YY",
                "separator": " ถึง ",
                "applyLabel": "ตกลง",
                "cancelLabel": "ยกเลิก",
                "fromLabel": "จาก",
                "toLabel": "ถึง",
                "customRangeLabel": "เลือกช่วงเวลาเอง",
                "weekLabel": "W",
                "daysOfWeek": arrWeek,
                "monthNames": arrMonthThaiFull,
                "firstDay": 0
            },
        }, function(start,end){
            SELECT_FILTER_DATE__START = moment(start).format('YYYY-MM-DD');
            // SELECT_FILTER_DATE__END = moment(end).format('YYYY-MM-DD H:mm:s');
        });
        $('#inputDueDate').daterangepicker({
            opens: 'left',
            startDate: new Date(SELECT_FILTER_DATE__END),
            singleDatePicker: true,
            autoApply: true,
            drops: 'auto',
            "locale": {
                "format": "ddd DD/MM/YY",
                "separator": " ถึง ",
                "applyLabel": "ตกลง",
                "cancelLabel": "ยกเลิก",
                "fromLabel": "จาก",
                "toLabel": "ถึง",
                "customRangeLabel": "เลือกช่วงเวลาเอง",
                "weekLabel": "W",
                "daysOfWeek": arrWeek,
                "monthNames": arrMonthThaiFull,
                "firstDay": 0
            },
        }, function(start,end){
            SELECT_FILTER_DATE__END = moment(start).format('YYYY-MM-DD');
            // SELECT_FILTER_DATE__END = moment(end).format('YYYY-MM-DD H:mm:s');
        });
        let section5 = byId('showResultScanBarcode_section5');
        section5.innerHTML = `<div class="d-flex gap-2">
        <a href="?page=borrow" class=""><button type="button"
                class="btn btn-secondary w-100">ยกเลิก</button></a>
            <button type="button" class="btn btn-success w-100" onclick="confirmBorrowBook('${user_id}')">บันทึกข้อมูลการยืม</button>
        </div>`;
    }else{
        byId('showResultScanBarcode_section5').innerHTML = '';
        section4.innerHTML = '';
    }

   
}
function confirmBorrowBook(user_id){
    let arrBook = [];
    let items = FindAll('.bookItem_Forborrow');
    items.forEach(book=>{
        arrBook.push(book.value)
    })
    let dataAPI = {
        user:user_id,
        arrBook:arrBook,
        arrBookClipboard:ARR_BOOK_FOR_BORROW,
        dateStart:SELECT_FILTER_DATE__START,
        dueDate:SELECT_FILTER_DATE__END
    }
    console.log(dataAPI);

    Swal.fire({
        icon: "warning",
        html: `ยืนยันการทำราย`,
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ย้อนกลับ',
    }).then((result) => {
        if (result.isConfirmed) {
            connectApi('master/borrow', { type: 'confirmBorrow', data: JSON.stringify(dataAPI), dataoption: 0 }, '', function(output) {
                console.log(output)
                if(output.status==200){
                    Swal.fire({
                        icon: "success",
                        html: "ทำรายการสำเร็จ",
                        confirmButtonText: 'ตกลง',
                    }).then((result) => {
                        // location.reload()
                    })
                }
            })
        } 
    })



    

}