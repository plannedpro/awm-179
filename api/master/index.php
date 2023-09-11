<?php
session_start();
ob_start();
require_once('vendor/autoload.php');
require_once('function_main.php');
require_once('function2.php');
// require_once('function.php');
// require_once('email.php');
// require_once('function_cleancare.php');




// require_once('../_PHPMailer/src/Exception.php');
// require_once('../_PHPMailer/src/PHPMailer.php');
// require_once('../_PHPMailer/src/SMTP.php');


// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;
// use PHPMailer\PHPMailer\Exception; 


// use \Slim\App;
// $app = new App();
// \Slim\Slim::registerAutoloader();
// $app = new \Slim\Slim();
$app = new \Slim\Slim();



$app->get("/", function() {
    echo "API WEB PLANNEDPRO CREATIVE SOLUTIONS";
});
$app->post("/", function() {
    echo "API WEB PLANNEDPRO CREATIVE SOLUTIONS";
});

$app->notFound(function () use ($app) {
   echo "NOT FOUND 404";
});

$app->group('/company', function () use ($app) {
    $app->get('/add', function () {
       echo "add";
    });
    $app->get('/create', function ($request, $response) {
        echo "create";
    });

});


$app->group('/checkin', function () use ($app) {

  $app->post("/scan",function() use($app){
    $json = $app->request->getBody();
    $app->response->setStatus(200);
    $contentType = $app->response->headers->get('Content-Type');
    $app->response->headers->set('Content-Type', 'application/json');
    $data = json_decode($json,true);
    $type =checkTextSQL($data["type"]);
    $dataAPI =checkTextSQL($data["data"]);
    $dataoption =checkTextSQL($data["dataoption"]);
    $result = checkin($type,$dataAPI,$dataoption);
    // $result = array(1,2);
    echo json_encode($result);
  });


  
  
  
});





$app->run();





function checkTextSQL($data){
  // $data = str_replace("'","",$data);
  // $data = str_replace("?","",$data);
  // $data = str_replace("=","",$data);
  // $data = str_replace("%","",$data);
  // $data = str_replace("'","",$data);
  // $data = str_replace("?","",$data);
  // $data = str_replace("=","",$data);
  // $data = str_replace("%","",$data);
  return $data;
}
function checkTextSQLv2($data){
  // $data = str_replace("'","",$data);
  // $data = str_replace("?","",$data);
  // $data = str_replace("=","",$data);
  // $data = str_replace("%","",$data);
  // $data = str_replace("'","",$data);
  // $data = str_replace("?","",$data);
  // $data = str_replace("=","",$data);
  // $data = str_replace("%","",$data);
  return $data;
}

function checkTextSQLv3($data){
  $data = str_replace("'","",$data);
  $data = str_replace("?","",$data);
  $data = str_replace(";","",$data);
  $data = str_replace("%","",$data);
  return $data;
}

// function sendmail($from,$arrTo,$subject,$bodyHtml){
//   $test = array($from,$arrTo,$subject,$bodyHtml);
//   $mail = new PHPMailer\PHPMailer\PHPMailer();
//   $mail->IsSMTP(); 
// //   $mail->Host = "ssl://smtp.cleancareth.com";
//   $mail->Host = "ssl://mail.cleancareth.com";
//   $mail->SMTPAuth = true; 
//   $mail->Username = "noreply@cleancareth.com";
//   $mail->Password = "n0reply@Email";
//   $mail->Port = 465;
//   $mail->CharSet = 'UTF-8';
//   foreach($arrTo AS $to){
//       $mail->AddAddress($to['mail'],$to['name']);
//   }
//   // foreach($arrCC AS $cc){
//   //     $mail->AddCC($cc['mail'],$cc['name']);
//   // }

//   $mail->addBcc('noreply@cleancareth.com','Order');


//   // ใส่ Email ที่ต้องการให้ reply กลับ ที่นี่ 
//   $mail->AddReplyTo('noreply@cleancareth.com','Admin');

//   $mail->setFrom('noreply@cleancareth.com',$from);
// //   $mail->WordWrap = 50; 
//   $mail->IsHTML(true);
//   $mail->Subject = $subject;
//   $mail->Body = $bodyHtml;
//   if($mail->Send()){
//     $data=true;
//   }else{
//     $data=false;
//   }
//   return $data;
// }



 ?>