function saveLogs_web(type, contant) {
    let dataArray = {
        type: type,
        filename: 'filename',
        data: contant,
        path: BASEPATH
    }
    console.log(contant)
    $.ajax({
        type: 'post',
        url: BASEPATH + 'include/php/savelogsfile.php',
        data: dataArray,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "text",
        success: function(result) {
            // console.log('success')
            // console.log(result)
        },
        beforeSend: function() {
            // console.log('save..')
        },
        error: function(data, errorThrown) {
            console.log('request failed : ' + errorThrown);


        }

    });

}

let arrNameVideo = [{}, {
    name: 'Maekampong',
    nameTH: 'บ้านแม่กำปอง',
    URL: 'https://drive.google.com/file/d/10OFUFFOvhHxjgYVBE141j1eVvx9bXn6k/preview',
    URLYoutube: 'https://www.youtube.com/embed/k8blltmB3iI'
}, {
    name: 'PongKwao',
    nameTH: 'บ้านโป่งกวาว',
    URL: 'https://drive.google.com/file/d/1tl9ZykzqNNwYg6sYLttxuMoMamFmnAvf/preview',
    URLYoutube: 'https://www.youtube.com/embed/J9WHB3_Wstw'
}, {
    name: 'Patan',
    nameTH: 'บ้านป่าตาล',
    URL: 'https://drive.google.com/file/d/1lCp4J0Dr0k7PnkzbqbwiFLLNeXsfDsU9/preview',
    URLYoutube: 'https://www.youtube.com/embed/fb-qwe4T-7M'
}, ]

let ArrJsonList = [];
$(window).ready(() => {
    ArrJsonList = [];
ArrJsonList.push({
    title:'ท่องเที่ยวและการทำโฮมสเตย์',
    URLYoutube:'https://www.youtube.com/embed/uzmvwYXDDQc',
    numInfo:1
})
ArrJsonList.push({
    title:'ล่องแก่ง',
    URLYoutube:'https://www.youtube.com/embed/c8nncuj5NJk',
    numInfo:1
})
ArrJsonList.push({
    title:'นวดเท้า',
    URLYoutube:'https://www.youtube.com/embed/X-nCOb-akfs',
    numInfo:1
})
ArrJsonList.push({
    title:'หมอนรองคอทำจากไผ่จืด',
    URLYoutube:'https://www.youtube.com/embed/-in0WXW9ho0',
    numInfo:2
})
ArrJsonList.push({
    title:'กว๊านช้าง เลี้ยงช้าง เดินป่า ',
    URLYoutube:'https://www.youtube.com/embed/pBwmp4v1zko',
    numInfo:2
})
ArrJsonList.push({
    title:'ทอผ้าบอเปอโข่',
    URLYoutube:'https://www.youtube.com/embed/QAbU8grElAs',
    numInfo:1
})
ArrJsonList.push({
    title:'จักสานหวายไผ่หวาย',
    URLYoutube:'https://www.youtube.com/embed/mRKb5IHndww',
    numInfo:1
})
ArrJsonList.push({
    title:'การทำขนม',
    URLYoutube:'https://www.youtube.com/embed/OUPizgFq7E8',
    numInfo:1
})
ArrJsonList.push({
    title:'การทำเครื่องดื่ม',
    URLYoutube:'https://www.youtube.com/embed/0NZI7ovstGg',
    numInfo:4
})
ArrJsonList.push({
    title:'ของที่ระลึก',
    URLYoutube:'https://www.youtube.com/embed/UTfTC9ndSwE',
    numInfo:6
})
ArrJsonList.push({
    title:'นวดหน้าและนวดแก้อาการ Office Syndrome ',
    URLYoutube:'https://www.youtube.com/embed/Vl034hMX65I',
    numInfo:4
})
ArrJsonList.push({
    title:'การขายออนไลน์',
    URLYoutube:'https://www.youtube.com/embed/aTf9BIQfypk',
    numInfo:2
})
// ArrJsonList.push({
//     title:'การเลี้ยงไส้เดือน',
//     URLYoutube:'https://www.youtube.com/embed/_PsMuJiRhVc',
//     numInfo:2
// })
// ArrJsonList.push({
//     title:'ตำบลบวกค้าง',
//     URLYoutube:'https://www.youtube.com/embed/_PsMuJiRhVc',
//     numInfo:3
// })

console.log(ArrJsonList);
});



function viewVideoOnModal(id) {
    // console.log(id)
    // console.log(arrNameVideo)
    saveLogs_web('view', `View Video Clip (${ArrJsonList[id-1].title})`)
    openModal('playvideoFromGoogleDrive')

    let body = byId('body-playvideoFromGoogleDrive');
    byId('title-playvideoFromGoogleDrive').innerHTML = ArrJsonList[id-1].title
    byId('btnCloseModalVideo').setAttribute('onclick', `closeModalVideo(${id})`)
        // body.innerHTML = `<div class="#showVideoFromGoogleDrive">
        //             <iframe src="${arrNameVideo[id].URL}" width="100%" height="560px" allow="autoplay"></iframe>
        //         </div>`;
    body.innerHTML = `<iframe width="100%" height="560" src="${ArrJsonList[id-1].URLYoutube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;





}

function closeModalVideo(id) {
    saveLogs_web('view', `Close Modal Video (${ArrJsonList[id-1].name})`)
    $('iframe').attr('src', $('iframe').attr('src'));
    byId('body-playvideoFromGoogleDrive').innerHTML = '';
}

// $('iframe').attr('src', $('iframe').attr('src'));
// uzmvwYXDDQc
function clickForViewImgImgInfographic(id){
   
    let body = byId('ShowModal_img-body');
    let title = byId('ShowModal_img-title');
    title.innerHTML = ArrJsonList[id-1].title;

    body.innerHTML= '';
    body.innerHTML = `<img src="${BASEPATH}include/img/info/nullImg.png" width="100%">`;
    // for(let i=1;i<=ArrJsonList[id-1].numInfo;i++){
    //     body.innerHTML += `<img src="${BASEPATH}assets/images/web/info/info${id}_${i}.png" width="100%">`;
    // }


}