<?php 
/*
date_default_timezone_set("Asia/Bangkok");
if(!isset($_SESSION)){ session_start();}
ob_start();

// $emp_token=$_SESSION["emp_token"];
// $emp_fname=$_SESSION["emp_fname"];

$browser = $_SERVER['HTTP_USER_AGENT'];

// str_replace(" ","_","Hello world!");

$nameFromEmailAccount = array('view');
$type = $_POST["type"];
$filename = $_POST["filename"];
$data = $_POST["data"];
$path = $_POST["path"];


$date = date('Y/m/d H:i:s');
$month = date('YF');
// $ip = get_client_ip();

$ip = $_SERVER['REMOTE_ADDR'];
// $details = json_decode(file_get_contents("http://ipinfo.io/{$ip}/json"));
// $ip =  $details->ip.' '.$details->ip; // -> "Mountain View"


// $ip = $_SERVER['REMOTE_ADDR'];

    $file = '../logs/'.$type.'_'.$month.'_'.$nameFromEmailAccount[0].'.txt';

    $content = $date.' =>'.$data.' =>ip:'.$ip.' =>Browser:'.$browser.' |#|#|';


  // $file = '../logs/account/'.$nameFromEmailAccount.'.txt';
    // $in = $_SERVER['REMOTE_ADDR'];
    // $da = date('d/F/Y h:i:s A');
    // $bs = $_SERVER['HTTP_USER_AGENT'];
    // $userid = '000';
    // $url = $_SERVER['SCRIPT_NAME'];
    // $yt = '0000';
    // $com = $_SERVER['SystemRoot'];

// $file = '../logs/account/'.$nameFromEmailAccount[0].'.txt';
// $content = 'dfdfdf->'.$_POST['type'];

$fp = fopen($file,'a');
fwrite($fp,$content."\r\n") ;

echo $file;


function get_client_ip() {
	$ipaddress = '';
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

  */
?>