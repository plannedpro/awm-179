<?php 
// include('../../api/master/function_main.php');
$admin = $_SESSION['id-user-master'];
// print_r($_POST);
if(isset($_POST['product_name']) && isset($_POST['product_token'])){


   $token = $_POST['product_token'];
   $product_refbrand = intval($_POST['product_refbrand']);
   $product_name = $_POST['product_name'];
   $product_no = $_POST['product_no'];
   $product_detail = $_POST['product_detail'];
   $ProductNumOption = intval($_POST['ProductNumOption']);

   $dateNow = date('Y-m-d  H:i:s',time());
  
    $dataProduct = getDataSQLv1(1,"SELECT * FROM products WHERE product_token=?",array($token));
    if(count($dataProduct)>0){
        // update
        updateSQL('products','product_refbrand=?,product_name=?,product_detail=?,product_option=?,product_no=?,product_lastupdate=?,product_lastupdateBy=?','product_token=?',array($product_refbrand,$product_name,$product_detail,$ProductNumOption,$product_no,$dateNow,$admin,$token));
    }else{
        //insert
        insertSQL('products','product_refbrand,product_name,product_detail,product_option,product_no,product_lastupdate,product_lastupdateBy,product_token'
        ,array($product_refbrand,$product_name,$product_detail,$ProductNumOption,$product_no,$dateNow,$admin,$token));
    }


    $dataProduct = getDataSQLv1(1,"SELECT * FROM products WHERE product_token=?",array($token));
    foreach($dataProduct AS $pro){
        updateSQL('products_option','option_status=?','option_ref=?',array(0,$pro['product_id']));

        if($_POST['ProductNumOption']==0){
            $Product_price_token = $_POST['Product_price_token'];
            $price = $_POST['product_price'];
            $stock = $_POST['product_stock'];
            $priceDiscount = isset($_POST['product_price_promo_check'])?1:0;
            $priceAfterDiscount = isset($_POST['product_price_promo'])?$_POST['product_price_promo']:$price;
            $dataOption = getDataSQLv1(1,"SELECT * FROM products_option WHERE option_token=? AND option_ref=?",array($Product_price_token,$pro['product_id']));
            if(count($dataOption)>0){
                updateSQL('products_option','option_name=?,option_price=?,option_priceDiscount=?,option_discount=?,option_stock=?,option_status=?','option_token=? AND option_ref=?'
                ,array('Default',$price,$priceAfterDiscount,$priceDiscount,$stock,1,$Product_price_token,$pro['product_id']));
            }else{
                insertSQL('products_option','option_ref,option_name,option_price,option_priceDiscount,option_discount,option_stock,option_token'
                ,array($pro['product_id'],'Default',$price,$priceAfterDiscount,$priceDiscount,$stock,$Product_price_token));
            }
        }else{
            // มี option มากกว่า 1
            foreach($_POST['Product_price_tokenOption'] AS $key => $opToken){
                $Product_price_token = $opToken;
                $price = $_POST['product_option_price'][$key];
                $name = $_POST['product_option_name'][$key];
                $stock = $_POST['product_option_stock'][$key];
                $priceAfterDiscount = isset($_POST['product_option_pricePromo'][$key])?$_POST['product_option_pricePromo'][$key]!=0 && $_POST['product_option_pricePromo'][$key]!=''?$_POST['product_option_pricePromo'][$key]:$price:$price;
                $priceDiscount = $priceAfterDiscount!=$price || $_POST['product_option_pricePromo'][$key]!=0?1:0;
                $dataOption = getDataSQLv1(1,"SELECT * FROM products_option WHERE option_token=? AND option_ref=?",array($opToken,$pro['product_id']));
                if(count($dataOption)>0){
                    updateSQL('products_option','option_name=?,option_price=?,option_priceDiscount=?,option_discount=?,option_stock=?,option_status=?','option_token=? AND option_ref=?'
                    ,array($name,$price,$priceAfterDiscount,$priceDiscount,$stock,1,$Product_price_token,$pro['product_id']));
                }else{
                    insertSQL('products_option','option_ref,option_name,option_price,option_priceDiscount,option_discount,option_stock,option_token'
                    ,array($pro['product_id'],$name,$price,$priceAfterDiscount,$priceDiscount,$stock,$Product_price_token));
                }
            }
    
        }
    
    
    
    
    
    
        $path = '../../include/img/products/';
        if(isset($_FILES['imgProductMain'])){
            $fileMain = $_FILES['imgProductMain'];
            $file_tmp = $fileMain['tmp_name'];
            $tmp = explode('.', $fileMain['name']);
            $file_ext = strtolower(end($tmp));
            $file_name = $product_no.new_fileProduct_name($file_ext);
            $file = $path . $file_name;
            if (move_uploaded_file($file_tmp, $file)) {
                updateSQL('products','product_imgprofile=?','product_token=?',array($file_name,$token));
            }
        }

        if(isset($_FILES['imgProductDetail'])){
            // $fileMain = $_FILES['imgProductDetail'];
            // print_r($_FILES['imgProductDetail']);
            updateSQL('products_img','img_status=?','img_productId=?',array(0,$pro['product_id']));

            foreach($_FILES['imgProductDetail']['tmp_name'] AS $key =>$file_tmp){
                $tokenImg = $_POST['imgDetail'][$key];
                $imgPreview = $_POST['imgPreview_img'][$key];

                $file_name_upload =0;
                if(!!$file_tmp){
                    $tmp = explode('.', $_FILES['imgProductDetail']['name'][$key]);
                    $file_ext = strtolower(end($tmp));
                    $file_name = $product_no.new_fileProduct_name($file_ext);
                    $file = $path . $file_name;
                    if (move_uploaded_file($file_tmp, $file)) {
                        $file_name_upload= $file_name;
                        // if(count($dataImg)>0){
                        //     updateSQL('products_img','img_name=?,img_status=?','img_token=?',array($file_name,1,$tokenImg));
                        // }else{
                        //     insertSQL('products_img','img_name,img_productId,img_token',array($file_name,$pro['product_id'],$tokenImg));
                        // }
                    //    if($tokenImg) 
                    }
                }



                $dataImg = getDataSQLv1(1,"SELECT * FROM products_img WHERE img_token=? AND img_productId=?",array($tokenImg,$pro['product_id']));
                 if(count($dataImg)>0){
                    if($file_name_upload==0){
                        $file_name_upload=$dataImg[0]['img_name'];
                    }

                    if($imgPreview!=''){
                        updateSQL('products_img','img_name=?,img_status=?','img_token=?',array($file_name_upload,1,$tokenImg));
                    }else{
                        if(unlink($path.$dataImg[0]['img_name'])){
                            deleteSQL('products_img','img_token=?',array($tokenImg));
                        }
                    }
                    
                }else{
                    if($file_name_upload!=0){
                        insertSQL('products_img','img_name,img_productId,img_token',array($file_name_upload,$pro['product_id'],$tokenImg));
                    }
                    
                }


               

               
               
            }
            // for ($i = 0; $i < $all_files; $i++) {
            // $fileMain = $_FILES['imgProductMain'];
            // $file_tmp = $fileMain['tmp_name'];
            // $tmp = explode('.', $fileMain['name']);
            // $file_ext = strtolower(end($tmp));
            // $file_name = $product_no.new_fileProduct_name($file_ext);
            // $file = $path . $file_name;
            // if (move_uploaded_file($file_tmp, $file)) {
            //     updateSQL('products','product_imgprofile=?','product_token=?',array($file_name,$token));
            // }
        }


        echo "<script> Swal.fire({
            icon: 'success',
            html: `<div>ดำเนินการสำเร็จ</div>`,
            showCancelButton: true,
            confirmButtonText: 'กลับหน้ารวมสินค้า',
            cancelButtonText: 'แก้ไขต่อ'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location='?page=blogs-detail-product&token=".$_GET['token']."&productname=".$_GET['productname']."';
            }
        });</script>";

    }




   

}


$p_reftype = $_GET['token'];


// if(isset($_GET['productToken'])){
//     $dataProduct = getDataSQLv1(1,"SELECT * FROM products
//     left join blogs on blogs_id=product_refbrand
//     WHERE product_token=?",array($_GET['productToken']));
//     foreach($dataProduct AS $product){
//         $p_reftype=$product['blogs_token'];
//         $p_name=$product['product_name'];
//         $p_no=$product['product_no'];
//         $p_detail=$product['product_detail'];

//     }
// }

?>

<div class="content-header px-0">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">
                    <a href="?page=blogs-detail-product&token=<?=$_GET['token']?>&productname=<?=$_GET['productname']?>">
                            <button type="button" class="btn btn-secondary"><i
                                    class="fas fa-chevron-left"></i> ย้อนกลับ</button>
                        </a>
                        จัดการ <i class="fas fa-caret-right"></i>
                        <?=urldecode($_GET['productname'])?> <b id="productname____"></b></h1>
                        
                    </div>

                </div>
            </div>
        </div>

        <div class="container-fluid mb-5">
            <form class="row" enctype="multipart/form-data" action="" method="POST" id="formManageProduct">
                <div class="col-md-7">
                    <div class="card ">
                        <div class="card-header">
                            ข้อมูลทั่วไป 
                            <input type="hidden" name="product_token" id="product_token" value="">
                            <input type="hidden" name="product_action" id="product_action" value="">
                        </div>
                        <div class="card-body">
                                
                                <div class="form-group">
                                    <label for="product_name">ชื่อสินค้า</label>
                                    <small class="float-end text-secondary" id="txtCountText-productname">0/120</small>
                                    <input type="text" value="" class="form-control" onkeyup="counttextLimit(this,'productname',120)" id="product_name" name="product_name">
                                    <small id="emailHelp" class="form-text text-muted text-right">ระบุชื่อสินค้า ความยาวไม่ควรเกิน 120 ตัวออักษร</small>
                                </div>
                                <div class="form-group">
                                    <label for="product_no">รหัสสินค้า <small>เช่น HABY-Fresh-Marine-200ML </small></label>
                                    <small class="float-end text-secondary" id="txtCountText-productno">0/50</small>
                                    <input type="text" value=""  class="form-control" onkeyup="counttextLimit(this,'productno',50)" id="product_no" name="product_no">
                                    <small id="emailHelp" class="form-text text-muted text-right">*ไม่ควรมีเว้นว่าง</small>
                                </div>
                                <div class="form-group">
                                    <label for="product_refbrand">หมวดหมู่ / แบรนด์</label>
                                    <?php  $dataBrand44 = getAllGroupDetailActiveByTypeAndGroup(4, 'ourbrand'); ?>
                                    <select name="product_refbrand" id="product_refbrand" class="form-control">
                                        <?php foreach($dataBrand44 AS $brand){  ?>
                                        <option <?=$brand['blogs_token']==$p_reftype?'selected':''?> value="<?=$brand['blogs_id']?>"><?=$brand['blogs_name']?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="textarea-product_detail">รายละเอียดสินค้า</label>
                                    <textarea name="product_detail" id="textarea-product_detail" class="form-control" cols="30" rows="3"></textarea>
                                </div>
                        </div>

                    </div>
                </div>
                <div class="col-md-5">
                    <div class="card mb-4">
                        <div class="card-header">
                            ข้อมูลการขาย <input type="hidden" name="ProductNumOption" id="ProductNumOption">
                        </div>
                        <div class="card-body">
                            
                            <div class="groupPrice" id="groupPrice"></div>
                            <div class="groupPriceoption" id="groupPriceoption"></div>
                            <div class="text-right">
                                <button type="button" onclick="addProductOption(0,'','','',0,'')" class="btn btn-sm btn-secondary"><i class="fas fa-plus"></i> เพิ่มตัวเลือกสินค้า</button>
                            </div>
                            
                           
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            ภาพสินค้า
                        </div>
                        <div class="card-body">
                            <div class="form-row">
                                <div class="col-md-6 flexCenter">
                                    <div class="boxImgProfileProduct" id="boxImgProfileProduct">
                                        <div class="preview" id="imgProduct_preview"></div>
                                        <dic onclick="clickElement('#imgProduct_main')" class="clickforUpload" id="imgProduct_select">
                                            <i class="fas fa-file-image"></i>
                                        </dic>
                                        <input class="d-none" type="file" accept="image/*" onchange="previewImgOnClickSelectFileTo(this,'imgProduct_select','imgProduct_preview')" name="imgProductMain" id="imgProduct_main">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-row" id="imgOtherDetail"></div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card mb-4">
                        <div class="card-header">
                            ข้อมูลอื่น ๆ
                        </div>
                    </div> -->
                </div>

                <div class="btnGroupSave">
                    <!-- <button type="button" class="btn btn-secondary">Cancel</button> -->
                    <button type="button" name="btnSubmit" onclick="saveDataProduct()" class="btn btn-success"><i class="far fa-save"></i> Save / Update</button>
                </div>
            </form>

        </div>
        </div>
        </div>



<script type="text/javascript">
$(window).ready(() => {
    checkNumGroupPrice(0,'','',0,'');
    createInputImageDetail([]);
    createTextareaEditor('product_detail');
    checkAndCreateDataToken();
    getdataProductdefault();


});
</script>



