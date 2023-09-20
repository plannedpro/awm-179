<?php 
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set("Asia/Bangkok");
// require_once('../../include/php/connect.php');
require_once('../master/function_main.php');
// require_once('../api/rental/mail/email_template.php');
$dateNow = date('Y-m-d H:i:s',time());


if(!isset($_SESSION)){ session_start();}
  ob_start();
$myUser = $_SESSION['id-user-master'];
$school =1;
  $dataReturn = array();
  $d=array();
  $userId = $_POST['id'];
  $userId_profile = 'null.png';


if(isset($_FILES['files'])){
    $path = '../../include/img/uploads/book/';
    $path__ = 'img/uploads/book/';
    
    $all_files = count($_FILES['files']);
    // for ($i = 0; $i < $all_files; $i++) {  
      $file_name = $_FILES['files']['name'][0];
      $file_tmp = $_FILES['files']['tmp_name'][0];
      $file_type = $_FILES['files']['type'][0];
      $file_size = $_FILES['files']['size'][0];
      $tmp = explode('.', $_FILES['files']['name'][0]);
			$file_ext = strtolower(end($tmp));
       $file_name = new_file_name($file_ext);
      
      $file = $path . $file_name;
        if(move_uploaded_file($file_tmp, $file)){$userId_profile = $file_name;}
    // }

  }


  
  if($userId!=0){
    $books =  getDataSQLv1(1,'SELECT * FROM lib_book as book
    left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    where book.book_id=?
    order by book.book_name asc',array($userId));
    foreach($books AS $book){
        if($userId_profile=='null.png'){
          $userId_profile = $book['book_cover'];
        }
        $update = updateSQL('lib_book','book_isbn=?,book_ref=?,book_barcode=?,book_name=?,book_year=?,book_shelf_id=?,book_group_id=?,book_num=?,book_cover=?,book_status=?',
        'book_id=?', array($_POST['book_barcode'],$_POST['book_ref'],$_POST['book_barcode'],$_POST['book_name'],$_POST['book_year'],$_POST['book_shelf_id'],$_POST['book_group_id'],$_POST['book_num'],$userId_profile,$_POST['book_status'],$userId));


    }

    //   $users =  getDataSQLv1(1,'SELECT * FROM lib_users  as users
    //   left join lib_school as school on users.user_school=school.school_id
    //   left join lib_yearStudy as years on users.user_year=years.year_id
    //   where users.user_id=? order by users.user_sid limit 1
    //   ',array($userId));
    //   // update
    //   foreach($users AS $user){
    //     if($userId_profile=='null.png'){
    //       $userId_profile = $user['user_profile'];
    //     }
    //     $update = updateSQL('lib_users','user_prefix=?,user_sid=?,user_fname=?,user_lname=?,user_nickname=?,user_profile=?,user_class=?,user_year=?,user_room=?,user_type=?',
    //     'user_id=?', array($_POST['user_prefix'],$_POST['user_sid'],$_POST['user_fname'],$_POST['user_lname'],$_POST['user_nickname'],$userId_profile,$_POST['user_class'],$_POST['user_yearStudy'],$_POST['user_room'],$_POST['userType'],$userId));
    //   }

      $dataReturn = array('status'=>1,'code'=>$_POST['book_barcode']);
  }else{
    //insert

      insertSQL('lib_book','book_school,book_isbn,book_ref,book_barcode,book_name,book_year,book_shelf_id,book_group_id,book_num,book_cover,book_lastupdate,book_status'
      ,array($school,$_POST['book_barcode'],$_POST['book_ref'],$_POST['book_barcode'],$_POST['book_name'],$_POST['book_year'],$_POST['book_shelf_id'],$_POST['book_group_id'],$_POST['book_num'],$userId_profile,$dateNow,$_POST['book_status']));
      $dataReturn = array('status'=>1,'code'=>$_POST['book_barcode']);
  }



// echo json_encode($_POST);
echo json_encode($dataReturn);


function new_file_name($tmp){
	$filename = date('Ymd-His',time())."-".new_token(5).".".$tmp;
	return $filename;
}
// function new_token($len){
//   $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   $ret_char = "";
//   $num = strlen($chars);
//   for($i = 0; $i < $len; $i++) {
//       $ret_char.= $chars[rand()%$num];
//       $ret_char.="";
//   }
//   return $ret_char;
// }



?>