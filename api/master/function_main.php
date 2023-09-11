<?php

date_default_timezone_set("Asia/Bangkok");
require_once('../../include/php/connect.php');
// require_once('../../include/php/time.php');

if(!isset($_SESSION)){ session_start();}
ob_start();

$dateNow = date('Y-m-d  H:i:s',time());
$browser = $_SERVER['HTTP_USER_AGENT'];
$codeReturn =404;


function checkTextSQL2($data){
  $data = str_replace("'","",$data);
  $data = str_replace("?","",$data);
  $data = str_replace("=","",$data);
  $data = str_replace("%","",$data);
  return $data;
}
function TransactionId($len){
      $chars = "0123456789";
      $ret_char = "";
      $num = strlen($chars);
      for($i = 0; $i < $len; $i++) {
          $ret_char.= $chars[rand()%$num];
          $ret_char.="";
      }
      $ret_char=time()."".$ret_char;
      return $ret_char;
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
function new_token_uppercase($len){
    $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $ret_char = "";
    $num = strlen($chars);
    for($i = 0; $i < $len; $i++) {
        $ret_char.= $chars[rand()%$num];
        $ret_char.="";
    }
    return $ret_char;
  }
function new_otp($len){
  $chars = "123456789";
  $ret_char = "";
  $num = strlen($chars);
  for($i = 0; $i < $len; $i++) {
      $ret_char.= $chars[rand()%$num];
      $ret_char.="";
  }
  return $ret_char;
}
function sensorNumber($number,$numDigit){
  $numcut = $numDigit-4;
  $x = "";
  for($i=1;$i<=$numcut;$i++){
    $x=$x."x";
  }
  $number=$x.substr($number,  $numcut, $numDigit-1);
  return $number;
}
function ConvertTimeToArray($time){
  $timeArray = array('dateOld'=>$time,'date'=>thai_date_short_v5($time),'time'=>time_tableTime($time),'full'=>thai_date_short_v4($time),'short'=>time_tableDate($time));
  return $timeArray;
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

  function countColumn($tableDB,$condition){
    global $db;
    $check = $db->prepare("SELECT COUNT(*) FROM $tableDB");
    $check->execute($condition);
    $num = $check->fetchColumn();
    return  $num;
  } 
  function setDataReturn($code,$data){
    if(count($data)>0){
      $datareturn = array('status'=>200,'msg'=>'you don\'t currently have permission to access this data','data'=>$data);
    }else{
      $datareturn = array('status'=>$code!=0?$code:403,'msg'=>'you don\'t currently have permission to access this data','data'=>$data);
    }
    return $datareturn;
  }

  function encrypt($key, $payload) {
    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
    $encrypted = openssl_encrypt($payload, 'aes-256-cbc', $key, 0, $iv);
    return base64_encode($encrypted . '::' . $iv);
  }
  
  function decrypt($key, $data) {
    list($encrypted_data, $iv) = explode('::', base64_decode($data), 2);
    return openssl_decrypt($encrypted_data, 'aes-256-cbc', $key, 0, $iv);
  }

  function getDataSettingByKey($key){
    $getdataSettning = getDataSQLv1(1,"SELECT * FROM system_setting WHERE setKey=?",array($key));
    if(count($getdataSettning)>0){
      return $getdataSettning[0]['setValue'];
    }else{
      return 0;
    }
  }

  // function MasterSetStatus($tableDB,$columnstatus,$newstatus,$columnwhere,$id,$type,$search){
  //   global $db;
  //   $olll = array($tableDB,$columnstatus,$newstatus,$columnwhere,$id,$type,$search);
  //   $adminId=$_SESSION["id-user-master"];
  //   $admintoken=$_SESSION["token-user-master"];
  //   $datareturn = array();
  //   if($adminId && $admintoken){
  //     $data =array(); 
  //     $getdata = $db->prepare("SELECT *  FROM $tableDB WHERE $columnwhere = ? ");
  //     $getdata->execute(array($id));
  //     $dataservice = $getdata->fetch(PDO::FETCH_ASSOC);  
  //     if($dataservice){
  //       $update_status = $db->prepare("UPDATE $tableDB SET $columnstatus=? WHERE $columnwhere=?");
  //       $update_status->execute(array($newstatus,$id));
  //       if($update_status){
  //         array_push($datareturn,array('status'=>1,'msg'=>'ดำเนินการสำเร็จ','data'=>$olll));  
  //       }else{
  //         array_push($datareturn,array('status'=>0,'msg'=>'Error','data'=>$olll));  
  //       }
       
  //     }else{
  //       array_push($datareturn,array('status'=>0,'msg'=>'0you don\'t currently have permission to access this data','data'=>array()));
  //     }
  //   }else{
  //     array_push($datareturn,array('status'=>0,'msg'=>'you don\'t currently have permission to access this data','data'=>array()));
  //   }
  //   return $datareturn;
  // }

?>