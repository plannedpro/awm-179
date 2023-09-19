function getDataInbox(type) {
    let tablename = 'Inbox'
    let divname = `show-${tablename}`
    let arrayhead = ['Create', 'Contact', 'Subject', 'AttachFile', 'Remark', 'Status', 'Delete']
    createDataTable(tablename, divname, arrayhead)
    let search = byId(`search-${tablename}`).value
    let dataAPI = {
            filter: search
        }
        //console.log(type)
    connectApi('master/inbox', { type: type, data: dataAPI, dataoption: 0 }, '', function(output) {
        console.log(output)
        if (output.status == 200) {
            let obj = output.data;
            let divname = `show-${tablename}`
            let table = byId(`table-${tablename}`)
            let tbody = resetDataTbodyBeforeCreateTable(tablename)
            table.appendChild(tbody);
            for (let i = 0; i < obj.length; i++) {
                let pro = obj[i]
                let table_row = createE('tr');
                let ArrTd = createTd(arrayhead.length, table_row)
                ArrTd[0].innerHTML = `<b><i class="fas fa-user"></i> ${pro.ib_name}</b><br><small>${moment(pro.ib_create_at).format('H:mm DD/MM/YY')}</small>`
                ArrTd[1].innerHTML = `<b><i class="fas fa-phone-alt"></i> ${pro.ib_phone}</b><br><small><i class="fas fa-envelope"></i> ${pro.ib_email}</small><br><small><i class="fas fa-map-marker-alt"></i> ${pro.ib_address}</small>`
                ArrTd[2].innerHTML = `<b>${pro.ib_subject}</b><br><small>${pro.ib_msg}</small>`;
                ArrTd[4].innerHTML = `${!!pro.ib_remark?pro.ib_remark:''}`;
                if (!!pro.ib_AttachFile) {
                    ArrTd[3].innerHTML = `<span  onclick="viewModelPDFV2('AttachFile/', '${pro.ib_AttachFile}', '${pro.ib_subject} - <small>${pro.ib_AttachFile}</small>')" class="badge text-bg-secondary cursor-pointer">${pro.ib_AttachFile}</span>`;
                } else {
                    ArrTd[3].innerHTML = ``;
                }
                if (pro.ib_status == 1) {
                    ArrTd[5].innerHTML = CreateButtonInCellTable('MARK AS READ <i class="fas fa-envelope-open-text"></i>', 'danger', `markAsReadInbox('${pro.ib_token}')`);
                } else {
                    ArrTd[5].innerHTML = `อ่าน/ดำเนินการแล้ว <br><small><i class="fas fa-user-shield"></i> ${pro.admin}</small><br><small><i class="far fa-clock"></i> ${moment(pro.ib_dateremark).format('H:mm DD/MM/YY')}</small>`;
                }
                ArrTd[6].innerHTML += CreateButtonInCellTable('DELETE', 'warning', `deleteInboxConfirm(this,'${pro.ib_token}')`);
                tbody.appendChild(table_row);
            }
            createParentNode(divname, tablename, 20)
                // DataInboxToTable(output.data, type, tablename)
        } else {
            createColumnPageNouFound(9, tablename)
        }
    })
}


function deleteInboxConfirm(e, token) {
    Swal.fire({
        icon: 'warning',
        html: `<div><span class="text-danger">โปรดระวัง การดำเนินการนี้ ไม่สามารถย้อนกลับได้</span>
            <br><br><span>ต้องการลบ?</span></span>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            // ChangeStatusTo(e, 'banner_slider', 'bn_status', 9, 'bn_token', token, 'all', '')
            // ChangeStatusTo(e, 'inbox', 'ib_status', 9, 'ib_token', token, 'all', '')
            let dataAPI = {
                token: token
            }
            connectApi('master/inbox', { type: 'delete', data: dataAPI, dataoption: 0 }, '', function(output) {
                console.log(output)
                if (output.status == 200) {
                    getDataInbox('all');
                }
            })
        }
    });
}

function markAsReadInbox(token) {
    Swal.fire({
        title: 'บันทึกการติดต่อกลับหาลูกค้า',
        text: 'ระบุข้อความ เช่น ลูกค้าต้องการทราบราคา....',
        confirmButtonText: 'ยืนยัน',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        input: 'textarea',
        inputPlaceholder: 'บันทึกการติดต่อกลับหาลูกค้า',
        inputAttributes: {
            'aria-label': 'บันทึกการติดต่อกลับหาลูกค้า'
        },
        inputValidator: (value) => {
            if (value) {
                // //console.log(value)
                // activeStatusWork(toType, workId, type, token, 'finish', value)
                let dataAPI = {
                    token: token,
                    remark: value
                }
                connectApi('master/inbox', { type: 'updateStatus', data: dataAPI, dataoption: 0 }, '', function(output) {
                    //console.log(output)
                    if (output.status == 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'สำเร็จ',
                            confirmButtonText: 'ตกลง',
                        }).then((result) => {
                            getDataInbox('all');
                            getDataNumNotify('numNotify');
                        });
                    } else {
                        showError(output.msg)
                    }
                })


            } else {
                return 'โปรดระบุข้อมูลให้ครบถ้วน!'
            }
        }
    }).then((result) => {
        if (!result.isConfirmed) {
            getDataInbox('all')
        }
    })
}