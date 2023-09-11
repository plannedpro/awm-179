<?php
function checkloginMaster($login__ip,$login__username,$login__password){
  $tokenlogin=$_SESSION["tokenlogin"];
  global $db;
  $datareturn = array();
     if($tokenlogin){
      $data=array();
      $getdata = $db->prepare("SELECT * FROM master_account WHERE MasterMail=?");
      $getdata->execute(array($login__username));
      $dataMaster = $getdata->fetch(PDO::FETCH_ASSOC);
      if($dataMaster){
        $MasterToken=$dataMaster["MasterToken"];
        $password = md5(md5($login__password.$MasterToken)."tiw");
        if($password===$dataMaster["MasterPass"]){
          $_SESSION["id-user-master"]=$dataMaster["MasterId"];
          // $_SESSION["user-role"]=$dataMaster["MasterId"];
          $_SESSION["token-user-master"]=$MasterToken;
            array_push($datareturn,array('status'=>1,'msg'=>'welcome','data'=>array()));
        }else{
          $_SESSION["id-user-master"]=NULL;
          $_SESSION["token-user-master"]=NULL;
            array_push($datareturn,array('status'=>0,'msg'=>'ข้อมูลไม่ถูกต้อง','data'=>array()));
        }
      }else{
        $_SESSION["id-user-master"]=NULL;
        $_SESSION["token-user-master"]=NULL;
        array_push($datareturn,array('status'=>0,'msg'=>'ข้อมูลไม่ถูกต้อง','data'=>array()));
      }

     }else{
      // session_unregister("id-user-master");
      // session_unregister("token-user-master");
      array_push($datareturn,array('status'=>0,'msg'=>'you don\'t currently have permission to access this data','data'=>array()));
     }

     return $datareturn;
}
function getDataSetting($type,$dataArray){
  global $db;
  $adminId=$_SESSION["id-user-master"];
  $admintoken=$_SESSION["token-user-master"];
  $datareturn = array();
  $data = array();
  if($adminId && $admintoken){
      $getdataSettning = $db->prepare("SELECT *  FROM system_setting WHERE setGroup=? AND setStatus=1");
      $getdataSettning->execute(array($type));
      while($dataSettning = $getdataSettning->fetch(PDO::FETCH_ASSOC)){ 
        array_push($data,array(
          'setDetail'=>$dataSettning['setDetail'],
          'setGroup'=>$dataSettning['setGroup'],
          'setId'=>$dataSettning['setId'],
          'setKey'=>$dataSettning['setKey'],
          'setName'=>$dataSettning['setName'],
          'setType'=>$dataSettning['setType'],
          'setValue'=>$dataSettning['setValue'],
          'setValue2'=>$dataSettning['setValue2'],
          'setUpdate'=>$dataSettning['setUpdate'],
        ));
      }
    array_push($datareturn,array('status'=>1,'msg'=>'you don\'t currently have permission to access this data','data'=>$data));
  }else{
    array_push($datareturn,array('status'=>0,'msg'=>'you don\'t currently have permission to access this data','data'=>array()));
  }
  return $datareturn;
  
}
function getDataBless($type,$search){
  global $db;
  $adminId=$_SESSION["id-user-master"];
  $admintoken=$_SESSION["token-user-master"];
  $datareturn = array();
  $data = array();
  
  if($adminId && $admintoken){
 
      
      if($type=='9'){
        $getdataBless = $db->prepare("SELECT *  FROM bless_msg ORDER BY blessId DESC");
        $getdataBless->execute(array());
      }else{
        $getdataBless = $db->prepare("SELECT *  FROM bless_msg WHERE blessStatus=? ORDER BY blessId DESC");
        $getdataBless->execute(array($type));
      }
      if($search!=''){
        if($type=='9'){
          $search = "%".$search."%";
          $getdataBless = $db->prepare("SELECT *  FROM bless_msg 
          WHERE (blessMsg LIKE ?  OR blessEmail LIKE ?  OR blessName LIKE ?) 
          ORDER BY blessId DESC");
          $getdataBless->execute(array($search,$search,$search));
        }else{
          $search = "%".$search."%";
          $getdataBless = $db->prepare("SELECT *  FROM bless_msg 
          WHERE (blessMsg LIKE ?  OR blessEmail LIKE ?  OR blessName LIKE ?) AND blessStatus=?
          ORDER BY blessId DESC");
          $getdataBless->execute(array($search,$search,$search,$type));
        }
       
      }
     
      while($dataBless = $getdataBless->fetch(PDO::FETCH_ASSOC)){ 
        array_push($data,array(
          'blessId'=>$dataBless['blessId'],
          'blessMsg'=>$dataBless['blessMsg'],
          'blessEmail'=>$dataBless['blessEmail'],
          'blessName'=>$dataBless['blessName'],
          'blessCreate'=>ConvertTimeToArray($dataBless['blessCreate']),
          'blesstype'=>$dataBless['blesstype'],
          'blessStatus'=>$dataBless['blessStatus'],
          'blessUpdate'=>ConvertTimeToArray($dataBless['blessUpdate']),
          'blessFbclid'=>$dataBless['blessFbclid']
        ));
      }
    array_push($datareturn,array('status'=>1,'msg'=>'you don\'t currently have permission to access this data','data'=>$data));
  }else{
    array_push($datareturn,array('status'=>0,'msg'=>'you don\'t currently have permission to access this data','data'=>array()));
  }
  return $datareturn;
}

function getDataNumInMenu($type){
  global $db;
  $adminId=$_SESSION["id-user-master"];
  $admintoken=$_SESSION["token-user-master"];
  $datareturn = array();
  if($adminId && $admintoken){
    if($type=='all'){
      // $bless_all = checkNumInMenuOne('bless_msg','blessStatus','all','0');
      
      $data = array(
        'bless'=>array(
          'all'=>checkNumInMenuOne('bless_msg','blessStatus','all','0'),
          'new'=>checkNumInMenuOne('bless_msg','blessStatus','1','1'),
          'show'=>checkNumInMenuOne('bless_msg','blessStatus','1','2'),
          'hidden'=>checkNumInMenuOne('bless_msg','blessStatus','1','0')
          )
      );

      array_push($datareturn,array('status'=>1,'msg'=>'0you don\'t currently have permission to access this data','data'=>$data));
    }
  }else{
    array_push($datareturn,array('status'=>0,'msg'=>'you don\'t currently have permission to access this data','data'=>array()));
  }
  return $datareturn;
}
function checkNumInMenuOne($tableDB,$columnWhere,$type,$status){
  global $db;
  if($type=='all'){
    $check = $db->prepare("SELECT count(*) FROM $tableDB ");
    $check->execute(array());
  }else{
    $check = $db->prepare("SELECT count(*) FROM $tableDB WHERE $columnWhere=? ");
    $check->execute(array($status));
  }
  $num = $check->fetchColumn();
  if($num){
    $numReruen=$num;
  }else{
    $numReruen=0;
  }
  return $numReruen;
}
function getDataAccount($type,$dataAPI,$dataoption){
  // global $db;
  $adminId=$_SESSION["id-user-master"];
  $admintoken=$_SESSION["token-user-master"];
  $datareturn = array();
  $data = array();
  $dataMyAccount = array();

  if($adminId && $admintoken){     
      if($type=='add'){
        $MasterToken=new_token(12);
        $password = md5(md5($dataAPI[1].$MasterToken)."tiw");
        // $seve2 = $db->prepare("INSERT INTO master_account(MasterPass,MasterMail,MasterName,MasterPhone,MasterStatus,MasterType,MasterToken,MasterRegis,MasterUpdate) VALUES (?,?,?,?,?,?,?,?,?) ");
        // $seve2->execute(array($password,$dataAPI[0],$dataAPI[2],$dataAPI[3],1,1,$MasterToken,time(),time()));

        insertSQL('master_account',
        'MasterPass,MasterMail,MasterName,MasterPhone,MasterStatus,MasterType,MasterToken,MasterRegis,MasterUpdate',
        array($password,$dataAPI[0],$dataAPI[2],$dataAPI[3],1,1,$MasterToken,time(),time()));


      }
      if($type=='update'){

        // $getdataMasterAccunt0 = $db->prepare("SELECT *  FROM master_account WHERE MasterId=?");
        // $getdataMasterAccunt0->execute(array($dataAPI[4]));
        // $dataMasterAccunt0 = $getdataMasterAccunt0->fetch(PDO::FETCH_ASSOC);
        $getdataMasterAccunt0 = getDataSQLv1(1,"SELECT * FROM master_account WHERE MasterId=?",array($dataAPI[4]));
      // }
        if(count($getdataMasterAccunt0)>0){
          $dataMasterAccunt0 = $getdataMasterAccunt0[0];
          $token = $dataMasterAccunt0['MasterToken'];
          if($dataAPI[1]!=''){
            $newpass = md5(md5($dataAPI[1].$token)."tiw");
          }else{
            $newpass = $dataMasterAccunt0['MasterPass'];
          }
          $update_status = updateSQL('master_account','MasterMail=?,MasterName=?,MasterPhone=?,MasterPass=?','MasterId=?',array($dataAPI[0],$dataAPI[2],$dataAPI[3],$newpass,$dataAPI[4]));

        }
      
      }
      if($type=='search'){
        $search = "%".$dataAPI."%";
        // $getdataMasterAccunt->execute(array($search,$search,$search));
        $getdataMasterAccunt = getDataSQLv1(1,"SELECT *  
        FROM master_account 
        WHERE MasterMail LIKE ?  
        OR MasterName LIKE ?  
        OR MasterPhone LIKE ?
        ORDER BY MasterId DESC",array($search,$search,$search));
      }else {
        // $getdataMasterAccunt = $db->prepare("SELECT *  FROM master_account ORDER BY MasterId  DESC");
        // $getdataMasterAccunt->execute(array());
        $getdataMasterAccunt = getDataSQLv1(1,"SELECT * FROM master_account ORDER BY MasterId  DESC",array());
      }
        // while($dataMasterAccunt = $getdataMasterAccunt->fetch(PDO::FETCH_ASSOC)){ 
        foreach($getdataMasterAccunt AS $dataMasterAccunt){
          if($dataMasterAccunt['MasterId']==$adminId){
            $dataMyAccount = array(
              'MasterId'=>$dataMasterAccunt['MasterId'],
              'MasterMail'=>$dataMasterAccunt['MasterMail'],
              'MasterName'=>$dataMasterAccunt['MasterName'],
              'MasterPhone'=>$dataMasterAccunt['MasterPhone'],
              'MasterStatus'=>$dataMasterAccunt['MasterStatus'],
              'MasterType'=>$dataMasterAccunt['MasterType'],
              'MasterToken'=>$dataMasterAccunt['MasterToken'],
              'MasterRole'=>$dataMasterAccunt['MasterRole'],
              'MasterRegis'=>ConvertTimeToArray($dataMasterAccunt['MasterRegis']),
              'MasterUpdate'=>ConvertTimeToArray($dataMasterAccunt['MasterUpdate']),
            );
          }
          array_push($data,array(
            'MasterId'=>$dataMasterAccunt['MasterId'],
            'MasterMail'=>$dataMasterAccunt['MasterMail'],
            'MasterName'=>$dataMasterAccunt['MasterName'],
            'MasterPhone'=>$dataMasterAccunt['MasterPhone'],
            'MasterStatus'=>$dataMasterAccunt['MasterStatus'],
            'MasterType'=>$dataMasterAccunt['MasterType'],
            'MasterToken'=>$dataMasterAccunt['MasterToken'],
            'MasterRole'=>$dataMasterAccunt['MasterRole'],
            'MasterRegis'=>ConvertTimeToArray($dataMasterAccunt['MasterRegis']),
            'MasterUpdate'=>ConvertTimeToArray($dataMasterAccunt['MasterUpdate']),
          ));
        }
  }

  if(count($data)>0){
    $datareturn=array('status'=>200,'msg'=>'this data','data'=>$data,'Myaccount'=>$dataMyAccount);
  }else{
    $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array(),'Myaccount'=>$dataMyAccount);
  }




  return $datareturn;
}

function getDataBanner($type,$dataAPI,$dataoption){
  $adminId=$_SESSION["id-user-master"];
  $admintoken=$_SESSION["token-user-master"];
  $databanner = array();
  if($type=='all'){
    $databanner = getDataSQLv1(1,"SELECT * FROM banner_slider WHERE bn_status!=? ORDER BY bn_update  DESC",array(9));

  }else if($type=='new'){
    $token = new_token(10);
    insertSQL('banner_slider',
    'bn_title,bn_token,bn_file,bn_update,bn_updateBy,bn_link,bn_status',array('',$token,'banner-eg.jpg',time(),$adminId,'',0));
    array_push($databanner,array('token'=>$token));
  }else if($type=='save'){
    $banner = getDataSQLv1(1,"SELECT * FROM banner_slider WHERE bn_token=? ",array($dataAPI['token']));
    if(count($banner)>0){
      $img = $banner[0]['bn_file'];
      if($dataAPI['img']!=''){
        $img=$dataAPI['img'];
      }
      $update = updateSQL('banner_slider','bn_title=?,bn_link=?,bn_file=?,bn_update=?,bn_updateBy=?','bn_token=?',
      array($dataAPI['name'],$dataAPI['link'],$img,time(),$adminId,$dataAPI['token']));
    }

    array_push($databanner,array('token'=>$dataAPI['token']));

  }

  if(count($databanner)>0){
    $datareturn=array('status'=>200,'msg'=>'this data','data'=>$databanner);
  }else{
    $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
  }
  return $datareturn;

}

function getDataPromotions($type,$dataAPI,$dataoption){
 
  $dataPromotions = array();
  if($type=='all'){
    $search = '%'.$dataAPI['filter'].'%';
    $dataPromotions = getDataSQLv1(1,"SELECT * FROM promotions 
    WHERE pro_status!=? 
    AND (pro_name LIKE ? OR pro_desc LIKE ? )
    ORDER BY pro_update  DESC",array(9,$search,$search));
  }else if($type=='allActive'){
    $search = '%'.$dataAPI['filter'].'%';
    $dataPromotions = getDataSQLv1(1,"SELECT * FROM promotions 
    WHERE pro_status!=?  AND pro_status=?
    AND (pro_name LIKE ? OR pro_desc LIKE ? )
    ORDER BY pro_update  DESC",array(9,1,$search,$search));
  }else if($type=='bytoken'){
    $dataPromotions = getDataSQLv1(1,"SELECT * FROM promotions WHERE pro_token=?",array($dataAPI));
  }else if($type=='update'){
    $adminId=$_SESSION["id-user-master"];
    $admintoken=$_SESSION["token-user-master"];

    $token = $dataAPI['token'];
    $img = 'promotion.png';
    
    $Promotions = getDataSQLv1(1,"SELECT * FROM promotions WHERE pro_token=?",array($token));
    if(count($Promotions)>0){
      if($dataAPI['img']!=''){
        $img = $dataAPI['img'];
      }else{
        $img=$Promotions[0]['pro_img'];
      }
      $update = updateSQL('promotions','pro_name=?,pro_desc=?,pro_img=?,pro_update=?,pro_updateBy=?','pro_token=?',
      array($dataAPI['name'],$dataAPI['detail'],$img,time(),$adminId,$Promotions[0]['pro_token']));
    }else{
      if($dataAPI['img']!=''){
        $img = $dataAPI['img'];
      }
      $token = new_token(20);
      insertSQL('promotions',
      'pro_name,pro_desc,pro_img,pro_detail,pro_update,pro_updateBy,pro_status,pro_ref,pro_token',
      array($dataAPI['name'],$dataAPI['detail'],$img,'',time(),$adminId,1,0,$token));
    }
    array_push($dataPromotions,array('token'=>$token));
    
  
  }

  if(count($dataPromotions)>0){
    $datareturn=array('status'=>200,'msg'=>'this data','data'=>$dataPromotions);
  }else{
    $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
  }
  return $datareturn;
}

function getDataVideoReview($type,$dataAPI,$dataoption){
 
  $dataVideoReview = array();
  if($type=='all'){
    $search = '%'.$dataAPI['filter'].'%';
    $dataVideoReview = getDataSQLv1(1,"SELECT * FROM review 
    WHERE pro_status!=? 
    AND pro_type=? 
    AND (pro_name LIKE ? OR pro_desc LIKE ? OR pro_detail LIKE ? OR pro_desc2 LIKE ? )
    ORDER BY pro_update  DESC",array(9,$dataAPI['reviewType'],$search,$search,$search,$search));
  }else if($type=='allActive'){
    $search = '%'.$dataAPI['filter'].'%';
    $dataVideoReview = getDataSQLv1(1,"SELECT * FROM review 
    WHERE pro_status!=? 
    AND pro_type=? AND pro_status=?
    AND (pro_name LIKE ? OR pro_desc LIKE ? OR pro_detail LIKE ? OR pro_desc2 LIKE ?  )
    ORDER BY pro_update  DESC",array(9,$dataAPI['reviewType'],1,$search,$search,$search,$search));
  }else if($type=='bytoken'){
    $dataVideoReview = getDataSQLv1(1,"SELECT * FROM review WHERE pro_token=?",array($dataAPI));
  }else if($type=='update'){
    $adminId=$_SESSION["id-user-master"];
    $admintoken=$_SESSION["token-user-master"];

    $token = $dataAPI['token'];
    $pro_type = $dataAPI['reviewType'];
    if($pro_type==1){
      $img = 'youtube-p.png';
    }else if($pro_type==2){
      $img = 'review11.png';
    }else if($pro_type==3){
      $img = 'review43.png';
    }

    $url = new_token(15);
    if($dataAPI['customUrl']!=''){
      // $url = $dataAPI['customUrl'].'-'.new_token(2);
      $url = $dataAPI['customUrl'];
    }
    
    
    $VideoReview = getDataSQLv1(1,"SELECT * FROM review WHERE pro_token=?",array($token));
    if(count($VideoReview)>0){
      if($dataAPI['img']!=''){
        $img = $dataAPI['img'];
      }else{
        $img=$VideoReview[0]['pro_img'];
      }
      if($dataAPI['customUrl']!=''){
        $url = $dataAPI['customUrl'];
      }else{
        $url=$VideoReview[0]['pro_customUrl'];
      }
      $update = updateSQL('review','pro_customUrl=?,pro_name=?,pro_desc=?,pro_img=?,pro_detail=?,pro_update=?,pro_updateBy=?','pro_token=?',
      array($url,$dataAPI['name'],$dataAPI['detail'],$img,$dataAPI['detail2'],time(),$adminId,$VideoReview[0]['pro_token']));
      
      if($pro_type==3){
        $update = updateSQL('review','pro_desc2=?','pro_token=?', array($dataAPI['pro_desc2'],$VideoReview[0]['pro_token']));
      }
    
    }else{
      if($dataAPI['img']!=''){
        $img = $dataAPI['img'];
      }
      $token = new_token(20);
      insertSQL('review',
      'pro_customUrl,pro_name,pro_desc,pro_img,pro_detail,pro_update,pro_updateBy,pro_status,pro_type,pro_token',
      array($url,$dataAPI['name'],$dataAPI['detail'],$img,$dataAPI['detail2'],time(),$adminId,1,$pro_type,$token));

      if($pro_type==3){
        $update = updateSQL('review','pro_desc2=?','pro_token=?', array($dataAPI['pro_desc2'],$token));
      }

    }
    array_push($dataVideoReview,array('token'=>$token));
    
  
  }

  if(count($dataVideoReview)>0){
    $datareturn=array('status'=>200,'msg'=>'this data','data'=>$dataVideoReview);
  }else{
    $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
  }
  return $datareturn;
}












function getDataMainAdmin($type,$dataAPI,$dataoption){
  $dataAdmin=array();
  if($type=='numNotify' || $type='dashboard'){ 
    $newInbox = countColumn('inbox WHERE ib_status=1',array());
    $ourbrand = countColumn('blogs WHERE blogs_group=? AND blogs_status=1',array('ourbrand'));
    // $imgReview = countColumn('review WHERE pro_status=? AND pro_type=?',array(1,2));
    // $videoReview = countColumn('review WHERE pro_status=? AND pro_type=?',array(1,1));
    // $Review = countColumn('review WHERE pro_status=? AND pro_type=?',array(1,3));
    // $reward = countColumn('review WHERE pro_status=? AND pro_type=?',array(1,4));

    // $service = countColumn('group_ WHERE group_status=? AND group_type=?',array(1,1));
    // $blogs = countColumn('group_ WHERE group_status=? AND group_type=?',array(1,2));
    // $clinic = countColumn('clinic WHERE clinic_status=?',array(1));
    // $banner_slider = countColumn('banner_slider WHERE bn_status=?',array(1));
    // $blogsType2 = countColumn('blogs WHERE  blogs_status=? AND blogs_type=?',array(1,2));

    
    array_push($dataAdmin,array(
      'inbox'=>$newInbox,
      'ourbrand'=>$ourbrand,
      // 'imagereview'=>$imgReview,
      // 'videoreview'=>$videoReview,
      // 'review'=>$Review,
      // 'service'=>$service,
      // 'blogs'=>$blogs,
      // 'blogsType2'=>$blogsType2,
      // 'reward'=>$reward,
      // 'clinic'=>$clinic,
      // 'banner'=>$banner_slider
    ));
  }else if($type=='changeRole'){
    
    // $dataAdmin = updateSQL('master_account','MasterRole=?','MasterId=?',array($dataAPI['newRole'],$dataAPI['MasterId']));

    $dataAdmin = $dataAPI;

  }



  if(count($dataAdmin)>0){
    $datareturn=array('status'=>200,'msg'=>'this data','data'=>$dataAdmin);
  }else{
    $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
  }
  return $datareturn;

}















 ?>