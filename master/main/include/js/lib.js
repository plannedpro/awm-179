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
                <button onclick="saveDataUserSTD('${userId}')" class="btn w-100 btn-success">บันทึก</button>
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
                }else{
                    // ไม่สามารถใช้ได้ พร้อมแนะนำรหัสใหม่
                    showErrorSID.innerHTML = `มีรหัสนี้แล้วในระบบ โปรดเลือกหมายเลขอื่น <b>รหัสแนะนำ ${data.sid}</b>`  ;
                    showErrorSID.classList.remove('text-info')
                    showErrorSID.classList.remove('text-success')
                    showErrorSID.classList.add('text-danger')
                    sid0.classList.add('is-invalid')
                    sid0.classList.remove('is-valid')
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
    body.innerHTML = `<div class="forPrint p-2" id="printarea">
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
                    <label class="form-label">รหัสหนังสือ/รหัสอ้างอิง</label>
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
                    <button onclick="saveDataBook('${id}')" class="btn w-100 btn-success">บันทึก</button>
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
        let book_barcode = byId('book_barcode')
        if (this.event.keyCode === 13) {
        //    console.log(1111);
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
    let arrayhead = ['Images', 'Barcode/ISBN', 'ชื่อหนังสือ', 'ประเภท/หมวดหมู่', 'ชั้นวาง/ที่เก็บ', 'รหัสอ้างอิง', 'ปีที่พิมพ์', 'จำนวน','Status', 'Edit']
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
                ArrTd[0].style.width = `3rem`;
                ArrTd[0].setAttribute('data-filter',book.book_id)
                ArrTd[1].style.width = `3rem`;
                ArrTd[arrayhead.length-2].style.width = `2rem`;
                ArrTd[arrayhead.length-1].style.width = `2rem`;
                ArrTd[1].innerHTML = `<b>${book.book_barcode}</b>`;
                ArrTd[2].innerHTML = `<b>${book.book_name}</b>`;
                ArrTd[3].innerHTML = `<b>${book.group_name}</b>`;
                ArrTd[4].innerHTML = `<b>${book.shelf_code}</b>`; 
                ArrTd[5].innerHTML = `<b>${book.book_ref}</b>`;

                ArrTd[6].innerHTML = `<b>${book.book_year}</b>`;
                ArrTd[7].innerHTML = `<b>${book.book_num}</b>`;
      


            //     ArrTd[2].innerHTML = `${ARR_CONFIG.userType[user.user_type]}`;
            //     ArrTd[3].innerHTML = `${ARR_CONFIG.userPerfix[user.user_prefix]}`;
            //     ArrTd[4].innerHTML = `${user.user_fname} ${user.user_lname}`;
            //     ArrTd[5].innerHTML = `${user.user_nickname}`;
            //     ArrTd[6].innerHTML = `${!!user.year_digit?user.year_digit:'อื่นๆ/ไม่ระบุ'}`;
            //     ArrTd[7].innerHTML = `${ARR_CONFIG.userClass[user.user_class]}`;
                if (book.book_status == 1) {
                    ArrTd[arrayhead.length-2].innerHTML = CreateButtonInCellTable('ACTIVE <i class="fas fa-power-off"></i>', 'success', `ChangeStatusTo(this,'lib_book', 'book_status', 0, 'book_id', '${book.book_id}', 'all', '')`);
                } else {
                    ArrTd[arrayhead.length-2].innerHTML = CreateButtonInCellTable('<i class="fas fa-power-off"></i> INACTIVE', 'danger', `ChangeStatusTo(this,'lib_book', 'book_status', 1, 'book_id', '${book.book_id}', 'all', '')`);
                }
                ArrTd[arrayhead.length-1].innerHTML += CreateButtonInCellTable('<i class="fas fa-edit"></i> EDIT', 'warning', `AddDataBook('${book.book_id}')`);


                tbody.appendChild(table_row);
            })

            setTable_DataTableV2(tablename)
            // createParentNode(divname, tablename, PAGE_PERPAGE)



        }
    });
    console.log(dataAPI);
}