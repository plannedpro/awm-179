<?php
// session_start();
// ob_start();
date_default_timezone_set("Asia/Bangkok");

// require_once('../../include/connect/connect.php');
// require_once('../../include/php/time.php');


//require_once('time.php');
// require_once('main/getdata.php');

function countColumn($tableDB,$condition){
  global $db;
  $check = $db->prepare("SELECT COUNT(*) FROM $tableDB");
  $check->execute($condition);
  $num = $check->fetchColumn();
  return  $num;
} 
function get_client_ip() {
    $ipaddress = '1';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}
function new_token($len){

    $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    $ret_char = "";
    $num = strlen($chars);
    for($i = 0; $i < $len; $i++) {
        $ret_char.= $chars[rand()%$num];
        $ret_char.="";
    }
    return $ret_char;
}

function new_tokenV222($len){

  $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  $ret_char = "";
  $num = strlen($chars);
  for($i = 0; $i < $len; $i++) {
      $ret_char.= $chars[rand()%$num];
      $ret_char.="";
  }
  return $ret_char;
}

function checkloginMaster(){
//     session_start();
// ob_start();
    if(isset($_SESSION["id-user-master"]) && isset($_SESSION["token-user-master"])){
        // echo '<script>window.location="../"</script>';
    }else{
        echo '<script>window.location="../"</script>';
    }
}
function active_show($url){
    $return="";
    if(isset($_GET["show"])){
      if($_GET["show"]==$url){
        $return = "active";
      }
    }
    return $return;
  }
  
  function active_menu($url){
    $return="";
    if(isset($_GET["page"])){
      if($_GET["page"]==$url){
        $return = "active";
      }
    }elseif ($url=="home") {
      $return = "active";
    }
    return $return;
  }

  function active_menu_token($url){
    $return="";
    if(isset($_GET["token"])){
      if($_GET["token"]==$url){
        $return = "active";
      }
    }
    return $return;
  }


  function menu_open($url){
    $return="";
    if(isset($_GET["page"])){
      if($_GET["page"]==$url){
        $return = "menu-open";
      }
    }
    return $return;
  
  }

  function getDataSettingAllToSession(){
    global $db;
    $datareturn = '';
    $data = array();
    $DataArray = array();
    $getdataSettning = $db->prepare("SELECT setKey,setValue  FROM system_setting  ");
    $getdataSettning->execute(array());
    while($dataSelect = $getdataSettning->fetch(PDO::FETCH_ASSOC)){
      array_push($DataArray,$dataSelect);
    }
    $_SESSION['set'] =  $DataArray;
    // $datareturn = $DataArray;
    // return $datareturn;
  }


  function getDataSetting($key){
    global $db;
    $datareturn = '';
    $data = array();
    if(empty($_SESSION['set'])){
      getDataSettingAllToSession();
    }else{
      // ค้นหาว่า setKey อยู่ index ไหน
      $indexSetting = array_search($key,array_column($_SESSION['set'], 'setKey'));
      // ตรวจสอบว่ามีจริงไหม
      if($_SESSION['set'][$indexSetting]['setValue']){  
        // ถ้ามี ส่งค่ากลับ
        $datareturn = $_SESSION['set'][$indexSetting]['setValue'];
      }else{
        //ถ้าไม่มี ส่งค่าว่างกลับไป
        $datareturn = '';
      }
    }
    // $getdataSettning = $db->prepare("SELECT setValue  FROM system_setting WHERE setKey=?  ");
    // $getdataSettning->execute(array($key));
    // $dataSettning = $getdataSettning->fetch(PDO::FETCH_ASSOC);
    // $datareturn = $dataSettning['setValue'];

    
    return $datareturn;
  }


  function countViewPage($from){
    global $db;
    // $seve2 = $db->prepare("INSERT INTO bless_log_count(logFrom,logIp,logDate,logBrowser) VALUES (?,?,?,?) ");
    // $seve2->execute(array($from,get_client_ip(),time(),$_SERVER['HTTP_USER_AGENT']));
  }

  function getDataSQLv1($type,$tablename,$condition){
    global $db;
    $DataArray = array();
    if($type==1){
      $getdata = $db->prepare(''.$tablename.'');
      $getdata->execute($condition);
      while($dataSelect = $getdata->fetch(PDO::FETCH_ASSOC)){
        array_push($DataArray,$dataSelect);
      }
    }
    return $DataArray;
  }

  function new_fileProduct_name($tmp)
{
    $filename = '_ptoduct_' . $_SESSION["id-user-master"] . '_' . new_token(5) . "." . $tmp;
    return $filename;
}
  
  function updateSQL($tablename,$dataupdate,$whereColumn,$condition){
    global $db;
    $update = $db->prepare("UPDATE  $tablename SET $dataupdate WHERE $whereColumn");
    $update->execute($condition);
    return true;
  }
  function insertSQL($table,$insertColumn,$condition){
    global $db;
    $countColimn = explode(",",$insertColumn);
    $value = '';
    for($i=0;$i<count($countColimn);$i++){
        $i>0?  $value.=',' :  null;
        $value.='?';
    }
    $save = $db->prepare("INSERT INTO $table ($insertColumn) VALUES ($value)");
    $save->execute($condition);
    return $save;
  }

  function deleteSQL($tablename,$whereColumn,$condition){
    global $db;
    $update = $db->prepare("DELETE FROM $tablename WHERE $whereColumn");
    $update->execute($condition);
    return true;
  }


  function getDataBannerSlideBarShow(){
    $databanner = getDataSQLv1(1,"SELECT * FROM banner_slider WHERE bn_status=? ORDER BY bn_update  DESC",array(1));
    return $databanner;
  }

  function getDataRecommendedPromotion($max){
    $dataRecommendedPromotion = getDataSQLv1(1,"SELECT * FROM promotions WHERE pro_status=? AND pro_ref=? ORDER BY pro_update  DESC LIMIT ?",array(1,1,$max));
    return $dataRecommendedPromotion;
  }
  
  function getDataPromotionsAll(){
    $dataPromotion = getDataSQLv1(1,"SELECT * FROM promotions WHERE pro_status=? ORDER BY pro_update  DESC",array(1));
    return $dataPromotion;
  }

  function getDataVideoReview($max){ 
    $datavideoreview = getDataSQLv1(1,"SELECT * FROM review WHERE pro_status=? AND pro_type=? ORDER BY pro_update  DESC LIMIT ?",array(1,1,$max));
    return $datavideoreview;
  }

  function getDataImgReview($max){ 
    $dataImgreview = getDataSQLv1(1,"SELECT * FROM review WHERE pro_status=? AND pro_type=? ORDER BY pro_update  DESC LIMIT ?",array(1,2,$max));
    return $dataImgreview;
  }

  function getDataClinic(){ 
    $dataClinic = getDataSQLv1(1,"SELECT * FROM clinic WHERE clinic_status=?  ORDER BY clinic_update  DESC ",array(1));
    return $dataClinic;
  }


  function getDataReviewDatail($url){ 
    $dataReviewDatail = getDataSQLv1(1,"SELECT * FROM review WHERE pro_status=?  AND (pro_token=? OR pro_customUrl=? OR pro_name=?) ",array(1,$url,$url,$url));
    return $dataReviewDatail;
  }

  function change_meta_tags($title,$description,$keywords){
      // This function made by Jamil Hammash
    $output = ob_get_contents();
    if ( ob_get_length() > 0) { ob_end_clean(); }
    $patterns = array("<title>(.*?)</title>","<meta name='description' content='(.*)'>","<meta name='keywords' content='(.*)'>");
    $replacements = array("<title>$title</title>","meta name='description' content='$description'","meta name='keywords' content='$keywords'");

    $output = preg_replace($patterns, $replacements,$output);  
    echo $output;
  }

  function randomReview($num){
    $dataReviewDatail = getDataSQLv1(1,"SELECT * FROM review h1 JOIN (SELECT (RAND() * (SELECT MAX(pro_id) FROM review WHERE pro_status=? AND pro_type=?)) AS pro_id) AS h2 ON h1.pro_id>=h2.pro_id WHERE pro_status=? AND pro_type=? ORDER BY h1.pro_id ASC LIMIT ?",array(1,3,1,3,$num));
    
    return $dataReviewDatail;
  
  }

  function randomBlogs($num){
    $dataReviewDatail = getDataSQLv1(1,"SELECT * FROM blogs h1 
    LEFT JOIN group_ ON h1.blogs_group=group_.group_token
    JOIN (SELECT (RAND() * (SELECT MAX(blogs_id) FROM blogs WHERE blogs_status=? AND blogs_type=?)) AS blogs_id) AS h2 ON h1.blogs_id>=h2.blogs_id WHERE blogs_status=? AND blogs_type=? ORDER BY h1.blogs_id ASC LIMIT ?",array(1,2,1,2,$num));
    return $dataReviewDatail;
  }

  function getAllGroupActiveByType($type){ 
    $dataAllGroup = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status=?  AND group_type=? ",array(1,$type));
    return $dataAllGroup;
  }
  function getAllGroupAdminByType($type){ 
    $dataAllGroup = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status!=?  AND group_type=? ",array(9,$type));
    return $dataAllGroup;
  }

  function getAllGroupAdminByTypeAndActive($type){ 
    $dataAllGroup = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status!=? AND group_status=?  AND group_type=? ",array(9,1,$type));
    return $dataAllGroup;
  }
 
 
  function getAllGroupDetailActiveByTypeAndGroup($type,$group){ 
    $conditionOderBy = '';
    if($type==4 || $type==5){
      $conditionOderBy = ' ORDER BY blogs_topService  ASC';
    }
    $dataAllGroup = getDataSQLv1(1,"SELECT * FROM blogs left join master_account on blogs_updateBy=MasterId  WHERE blogs_status=1  AND blogs_type=? AND blogs_group=? ".$conditionOderBy,array($type,$group));
    return $dataAllGroup;
  }
  function getAllGroupDetailActiveByTypeAndBlogsToken_2($type,$token){ 
    $dataAllGroup = getDataSQLv1(1,"SELECT * FROM blogs left join master_account on blogs_updateBy=MasterId  WHERE blogs_status=1  AND blogs_type=? AND blogs_token=? ",array($type,$token));
    return $dataAllGroup;
  }

  function getAllGroupDetailActiveByGroupUrl($group){ 
    $dataAllGroup = getDataSQLv1(1,"SELECT * FROM blogs 
    LEFT JOIN group_ ON blogs.blogs_group=group_.group_token
    WHERE blogs.blogs_status=1  AND group_.group_customURL=? ",array($group));
    return $dataAllGroup;
  }
  function getAllGroupDetailActiveByGroupUrlAndRanNum($group,$num){ 

    $dataAllGroup = getDataSQLv1(1,"SELECT * FROM blogs 
    LEFT JOIN group_ ON blogs.blogs_group=group_.group_token
    WHERE blogs.blogs_status=?  AND group_.group_customURL=? ORDER BY RAND() LIMIT ?",array(1,$group,$num));
    return $dataAllGroup;
  }
  function getDataGroupTypeURL($url){ 
    if($url==0){
      $data = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status=?  AND group_type=? ",array(1,2));
    }else if($url==3){
      $data = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status=?  AND group_type=? ",array(1,3));
    }else{
      $data = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status=?  AND (group_customURL=? OR group_name=?) ",array(1,$url,$url));
    }
    
    return $data;
  }

  function getDataGroupTypeURL__($url0){ 
    // echo $url0;
    if($url0=='0'){
      $data123 = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status=?  AND group_type=? ",array(1,2));
    }else{
      $data123 = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status=? AND group_type=? AND (group_customURL=?) ",array(1,1,$url0));
    }
    
    return $data123;
  }

  
  function getDataGroupDetailByGroupAndDetailURL($group,$detail){ 
    $dataAllGroup = getDataSQLv1(1,"SELECT * FROM blogs 
    LEFT JOIN group_ ON blogs.blogs_group=group_.group_token
    WHERE blogs.blogs_status=? AND group_.group_status=? AND group_.group_customURL=? AND blogs.blogs_customURL=? ",array(1,1,$group,$detail));
    return $dataAllGroup;
  }

  function getAllTopservice($max){ 
    $Topservice = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status=?  AND group_type=? AND group_refInHome=? ORDER BY group_id asc LIMIT ? ",array(1,1,1,$max));
    return $Topservice;
  } 
  function getTopserviceIn($groupId,$max){ 
    $dataAllGroup = getDataSQLv1(1,"SELECT * FROM blogs WHERE blogs_status=?  AND blogs_type=? AND blogs_group=? ORDER BY blogs_id desc LIMIT ? ",array(1,1,$groupId,$max));
    return $dataAllGroup;
  } 
 
  function getDataRewardsAll(){ 
    $dataImgreview = getDataSQLv1(1,"SELECT * FROM review WHERE pro_status=? AND pro_type=? ORDER BY pro_update  asc",array(1,4));
    return $dataImgreview;
  }

  function getMyService($url){ 
    $Topservice = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_status=?   AND group_customURL=? ",array(1,$url));
    return $Topservice;
  } 


  function checkPathForSEO(){
    global $title,$title_facebook,$domain_,$keywords,$description,$description_facebook,$img_facebook,$url_facebook ;
    $fullURL = explode("/",$_SERVER['REQUEST_URI']);
    // print_r($fullURL);
    $pageURL = isset($fullURL[1])?$fullURL[1]!=""?$fullURL[1]:'home':'home';
    // echo $pageURL;
    if($pageURL=='about'){
        $title="เกี่ยวกับเรา | ".$title;
    }else if($pageURL=='service' || $pageURL=='blogs' || $pageURL=='product'){
        $service = isset($fullURL[2])?$fullURL[2]!=''?$fullURL[2]:'':'';
        if($service!=''){
            $service= urldecode($service);
            // $dataGroup = getMyService($service);
            $dataGroup = getBlogsActiveByGroupUrl($service);
            // $service2 = isset($fullURL[3])?$fullURL[3]!=''?$fullURL[3]:'':'';
            // $service2= urldecode($service2);
            $f = isset($dataGroup[0])?isset($dataGroup[0]['blogs_name'])?$dataGroup[0]['blogs_name']:'|':'|';
            $imgGroup = isset($dataGroup[0])?isset($dataGroup[0]['blogs_img'])?$dataGroup[0]['blogs_img']:getDataSetting('facebook_image'):getDataSetting('facebook_image');
            // if($service2!=''){
            // //     $dataService = getDataGroupDetailByGroupAndDetailURL($service,$service2);
            // //     $ff= isset($dataService[0])?isset($dataService[0]['blogs_name'])?$dataService[0]['blogs_name']:'|':'|';
            // //     $description = isset($dataService[0])?isset($dataService[0]['blogs_'])?$dataService[0]['blogs_']:$description:$description;
            // //     $imgService = isset($dataService[0])?isset($dataService[0]['blogs_img'])?$dataService[0]['blogs_img']:getDataSetting('facebook_image'):getDataSetting('facebook_image');
            // //     $description_facebook=$description;
            // //     $title=$ff." | ".$title;
            // //     $title_facebook=$ff;
            // //     $img_facebook =$imgService;
            // //     $keywords=$description;
            // }else{
            //     $title=$f." | ".$title;
            //     $title_facebook = $f;
            //     $keywords=$title.','.$f;
            //     $img_facebook =$imgGroup;
            //     $description = $f.' - '.$title;
            //     $description_facebook=$description;
            // }
            $title=$f." | ".$title;
            $title_facebook = $f;
            $keywords=$title.','.$f;
            $img_facebook =$imgGroup;
            $description = $f.' - '.$title;
            $description_facebook=$description;

        }else{
            if($pageURL=='service'){
                $title="บริการ | ".$title;
                $title_facebook = 'บริการของเรา';
            }else{
                $title="บทความ | ".$title;
                $title_facebook = 'บทความทั้งหมด';
            }
        }
    }else if($pageURL=='shop'){
      $service2 = isset($fullURL[2])?$fullURL[2]!=''?$fullURL[2]:'':'';
      $service3 = isset($fullURL[3])?$fullURL[3]!=''?$fullURL[3]:0:0;
      $service2= urldecode($service2);
      $title=$service2.' | '.$title;
      $title_facebook=$title;
      $keywords=$title;
      // $img_facebook =$imgGroup;
      $description = $title;
      $description_facebook=$description;
      $pr = getDataProductByProductID($service3);
      foreach($pr AS $pro){
        $priceShow = 1000000;
        $priceDiscount = 0;
        $priceDiscountCehck = 0;
        $priceDiscountPercent = 0;
        $numInStock = 0;
        $numSold = 0;
        if($pro['product_option']==0){
            foreach($pro['option'] AS $option){
                $priceShow = $option['option_price'];
                $priceDiscount = $option['option_priceDiscount'];
                $priceDiscountCehck = $option['option_discount'];
                $priceDiscountPercent=number_format(100-($priceDiscount*100/$priceShow),0);
                $numInStock = $option['option_stock'];
            }
        }else{
            foreach($pro['option'] AS $option){
                $numInStock+= intval($option['option_stock']);
                if($priceShow>=$option['option_price']){
                    $priceShow=$option['option_price'];
                    $priceDiscount=$option['option_priceDiscount'];
                    $priceDiscountCehck = $option['option_discount'];
                    $priceDiscountPercent=number_format(100-($priceDiscount*100/$priceShow),0);


                }
                // $priceDiscountCehck = $option['option_discount'];
            }
            
        }

        
        $img_facebook ="https://".$_SERVER['SERVER_NAME']."/include/img/product/".$pro['product_imgprofile'];
        if($priceDiscountCehck==1){
          $title = "ลด ".$priceDiscountPercent."% เพียง ".$priceDiscount. " บาท - ".$pro['product_name']." - ".$pro['blogs_name']."";
          $description = "ลด ".$priceDiscountPercent."% เพียง ".$priceDiscount. " บาท จากปกติ  ".$priceShow." บาท ".$pro['product_name']." ราคาพิเศษ ".$priceShow. " บาทเท่านั้น! - ".$pro['blogs_name']."";
        }else{
          $title = $pro['product_name']." ราคาพิเศษ ".$priceShow. " บาทเท่านั้น! - ".$pro['blogs_name']."";
          $description = $pro['product_name']." ราคาพิเศษ ".$priceShow. " บาทเท่านั้น! - ".$pro['blogs_name']."";
        }
        $title_facebook=$title;
        $keywords=$description;
        $description_facebook=$description;
        
      }

    }else if($pageURL=='Activity'){
      $title="ข่าวสาร บทความ CSR | ".$title;
    $title_facebook=$title;
    }else if($pageURL=='ContactUs'){
      $title="ติดต่อเรา | ".$title;
      $title_facebook=$title;
    }else if($pageURL=='ContactUs'){
      $title="ติดต่อเรา | ".$title;
      $title_facebook=$title;
    }else if($pageURL=='Cart'){
      $title="ตะกร้าสินค้า | ".$title;
      $title_facebook=$title;
    }else if($pageURL=='Cart'){
      $title="ตะกร้าสินค้า | ".$title;
      $title_facebook=$title;
    }else if($pageURL=='Checkout'){
      $title="ยืนยันคำสั่งซื้อ | ".$title;
      $title_facebook=$title;
      // $description=getDataSetting('ourservices_detailTH');

    }else if($pageURL=='About'){
      $title="เกี่ยวกับ | ".$title;
  $title_facebook=$title;
}
}

// Last Update 2023

function getDataAgent_sales(){ 
  $dataAgent_sales = getDataSQLv1(1,"SELECT * FROM agent_sales WHERE agent_status=1 ORDER BY agent_id  asc",array());
  return $dataAgent_sales;
}
function getDataAward(){ 
  $dataAward = getDataSQLv1(1,"SELECT * FROM award WHERE award_status=1 and award_type=1 ORDER BY award_date  asc",array());
  return $dataAward;
}
function getDataWarranty(){ 
  $dataWarranty = getDataSQLv1(1,"SELECT * FROM award WHERE award_status=1 and award_type=2 ORDER BY award_date  asc",array());
  return $dataWarranty;
}

function getBlogsActiveByGroupUrl($blogs){ 
  $dataBlogs= getDataSQLv1(1,"SELECT * FROM blogs left join group_ on blogs_group=group_token  left join master_account on blogs_updateBy=MasterId  WHERE blogs_status=1  AND blogs_customURL=? ",array($blogs));
  return $dataBlogs;
}

function randomBlogsByGroup($num,$group){
  $dataReviewDatail = getDataSQLv1(1,"SELECT * FROM blogs h1 
  LEFT JOIN group_ ON h1.blogs_group=group_.group_token
  JOIN (SELECT (RAND() * (SELECT MAX(blogs_id) FROM blogs WHERE blogs_status=1 AND blogs_type=?)) AS blogs_id) AS h2 ON h1.blogs_id>=h2.blogs_id WHERE blogs_status=1 AND blogs_type=? ORDER BY h1.blogs_id ASC LIMIT ?",array(2,2,$num));
  return $dataReviewDatail;
}

function getAllGroupDetailActiveByGroupUrlAndRanNumv2($group,$num){ 

  $dataAllGroup = getDataSQLv1(1,"SELECT * FROM blogs 
  LEFT JOIN group_ ON blogs.blogs_group=group_.group_token
  WHERE blogs.blogs_status=1  AND group_.group_token=? ORDER BY RAND() LIMIT ?",array($group,$num));
  return $dataAllGroup;
}

function getDataProductByBrandToken($brandToken){ 
  // $dataProduct= getDataSQLv1(1,"SELECT * FROM blogs left join group_ on blogs_group=group_token  left join master_account on blogs_updateBy=MasterId  WHERE blogs_status=1  AND blogs_customURL=? ",array($blogs));
  $dataProduct = getDataSQLv1(1,"SELECT * FROM products 
  left join master_account on product_lastupdateBy=MasterId 
  left join blogs on blogs_id=product_refbrand
  WHERE blogs_token=? AND product_status=1 ",array($brandToken));
  $dataProducts = array();
  foreach($dataProduct AS $product){
    $dataPriceOption = getDataSQLv1(1,"SELECT * FROM products_option WHERE option_ref=? AND option_status=1",array($product['product_id']));
    $dataImgDetail = getDataSQLv1(1,"SELECT * FROM products_img WHERE img_productId=? AND img_status=1",array($product['product_id']));
    $product['option'] = $dataPriceOption;
    $product['imgDetail'] = $dataImgDetail;
    array_push($dataProducts,$product);
   }
 
  return $dataProducts;
}

function getDataProductByBrandTokenRandom($brandToken){ 
  // $dataProduct= getDataSQLv1(1,"SELECT * FROM blogs left join group_ on blogs_group=group_token  left join master_account on blogs_updateBy=MasterId  WHERE blogs_status=1  AND blogs_customURL=? ",array($blogs));
  $dataProduct = getDataSQLv1(1,"SELECT * FROM products 
  left join master_account on product_lastupdateBy=MasterId 
  left join blogs on blogs_id=product_refbrand
  WHERE blogs_token=? AND product_status=1 ORDER BY RAND() LIMIT 8",array($brandToken));
  $dataProducts = array();
  foreach($dataProduct AS $product){
    $dataPriceOption = getDataSQLv1(1,"SELECT * FROM products_option WHERE option_ref=? AND option_status=1",array($product['product_id']));
    $dataImgDetail = getDataSQLv1(1,"SELECT * FROM products_img WHERE img_productId=? AND img_status=1",array($product['product_id']));
    $product['option'] = $dataPriceOption;
    $product['imgDetail'] = $dataImgDetail;
    array_push($dataProducts,$product);
   }
 
  return $dataProducts;
}

function getDataProductByBrandAllRandom(){ 
  // $dataProduct= getDataSQLv1(1,"SELECT * FROM blogs left join group_ on blogs_group=group_token  left join master_account on blogs_updateBy=MasterId  WHERE blogs_status=1  AND blogs_customURL=? ",array($blogs));
  $dataProduct = getDataSQLv1(1,"SELECT * FROM products 
  left join master_account on product_lastupdateBy=MasterId 
  left join blogs on blogs_id=product_refbrand
  WHERE  product_status=1 ORDER BY RAND() LIMIT 12",array());
  $dataProducts = array();
  foreach($dataProduct AS $product){
    $dataPriceOption = getDataSQLv1(1,"SELECT * FROM products_option WHERE option_ref=? AND option_status=1",array($product['product_id']));
    $dataImgDetail = getDataSQLv1(1,"SELECT * FROM products_img WHERE img_productId=? AND img_status=1",array($product['product_id']));
    $product['option'] = $dataPriceOption;
    $product['imgDetail'] = $dataImgDetail;
    array_push($dataProducts,$product);
   }
 
  return $dataProducts;
}

function getDataProductByProductID($productID){ 
  // $dataProduct= getDataSQLv1(1,"SELECT * FROM blogs left join group_ on blogs_group=group_token  left join master_account on blogs_updateBy=MasterId  WHERE blogs_status=1  AND blogs_customURL=? ",array($blogs));
  $dataProduct = getDataSQLv1(1,"SELECT * FROM products 
  left join master_account on product_lastupdateBy=MasterId 
  left join blogs on blogs_id=product_refbrand
  WHERE product_id=? AND product_status=1 ",array($productID));
  $dataProducts = array();
  foreach($dataProduct AS $product){
    $dataPriceOption = getDataSQLv1(1,"SELECT * FROM products_option WHERE option_ref=? AND option_status=1",array($product['product_id']));
    $dataImgDetail = getDataSQLv1(1,"SELECT * FROM products_img WHERE img_productId=? AND img_status=1",array($product['product_id']));
    $product['option'] = $dataPriceOption;
    $product['imgDetail'] = $dataImgDetail;
    array_push($dataProducts,$product);
   }
 
  return $dataProducts;
}


function checkRoleAdmin(){
  $role=1;
  $dataBx= getDataSQLv1(1,"SELECT * FROM master_account WHERE MasterToken=?  AND MasterStatus=1 ",array($_SESSION["token-user-master"]));
foreach($dataBx AS $d){
  $role=$d['MasterRole'];
}
 


  return $role;
}

?>