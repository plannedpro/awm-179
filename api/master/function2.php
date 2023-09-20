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
          $getdataMasterAccunt0 = getDataSQLv1(1,"SELECT * FROM master_account WHERE MasterId=?",array($dataAPI[5]));
        // }
          if(count($getdataMasterAccunt0)>0){
            $dataMasterAccunt0 = $getdataMasterAccunt0[0];
            $token = $dataMasterAccunt0['MasterToken'];
            if($dataAPI[1]!=''){
              $newpass = md5(md5($dataAPI[1].$token)."tiw");
            }else{
              $newpass = $dataMasterAccunt0['MasterPass'];
            }
            $update_status = updateSQL('master_account','MasterMail=?,MasterName=?,MasterPhone=?,MasterPass=?,MasterType=?','MasterId=?',array($dataAPI[0],$dataAPI[2],$dataAPI[3],$newpass,$dataAPI[4],$dataAPI[5]));
  
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
  
  
function checkin($type,$dataAPI,$dataoption){
    global $dateNow,$browser,$codeReturn;
    $data=array();

    if($type=='checkin'){
        $users = findDataUserBySIDActiveOnly($dataAPI['sid']);
        foreach($users as $std){
            insertSQL('lib_checkin','checkin_school,checkin_user,checkin_time',array($std['school_id'],$std['user_id'],$dateNow));
            array_push($data,$std);
        }
    }else if($type=='last30AndToday'){
       $last30 = getDataSQLv1(1,'SELECT DATE_FORMAT(checkin_time, "%Y-%m-%d") as DD,count(DISTINCT `checkin_user`) as num 
       FROM lib_checkin where checkin_status=1 and (checkin_time between ? AND ?) group BY DATE_FORMAT(checkin_time, "%Y-%m-%d")
        ',array($dataAPI['start'],$dataAPI['end']));

        array_push($data,array('last30'=>$last30));

    }

    return setDataReturn($codeReturn,$data);
}
function findDataUserBySID($SID){
    $users =  getDataSQLv1(1,'SELECT * FROM lib_users  as users
    left join lib_school as school on users.user_school=school.school_id
    left join lib_yearStudy as years on users.user_year=years.year_id
    where users.user_sid=? order by users.user_sid limit 1
    ',array($SID));
    return $users;
}
function findDataUserBySIDActiveOnly($SID){
  $users =  getDataSQLv1(1,'SELECT * FROM lib_users  as users
  left join lib_school as school on users.user_school=school.school_id
  left join lib_yearStudy as years on users.user_year=years.year_id
  where users.user_sid=? and users.user_status=1 order by users.user_sid limit 1
  ',array($SID));
  return $users;
}


function getdataUser($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $school =1;
  $data=array();
  if($type=='listshow'){
    
    
    $searchSomething=' ';
    if($dataAPI['search']!=''){
      $search = "%".$dataAPI['search']."%";
      $searchSomething = " where (user_sid = '".$dataAPI['search']."'";
      $searchSomething .= " OR user_fname like '".$search."'";
      $searchSomething .= " OR user_lname like '".$search."'";
      $searchSomething .= " OR user_nickname like '".$search."'";
      $searchSomething .= " OR years.year_digit like '".$search."'";


      $searchSomething .= " )";

    }

      $users =  getDataSQLv1(1,'SELECT * FROM lib_users  as users
      left join lib_school as school on users.user_school=school.school_id
      left join lib_yearStudy as years on users.user_year=years.year_id
      '.$searchSomething.'
      order by users.user_sid ',array());
      $dataUser = array();
      foreach($users AS $user){
        array_push($dataUser,$user);
      }
 
      array_push($data,array('users'=>$dataUser));
  }else if($type=='autoCheckSID'){
    $FindLastSIDA =  getDataSQLv1(1,'SELECT user_sid FROM lib_users  where user_status=1 and user_sid=?',array($dataAPI['sid'])); 
    if(count($FindLastSIDA)>0){
      $FindLastSID =  getDataSQLv1(1,'SELECT user_sid FROM lib_users  where user_status=1 order by user_sid desc limit 1',array()); 
      $SID=count($FindLastSID)>0?$FindLastSID[0]['user_sid']+1:'00001';
      array_push($data,array('status'=>0,'sid'=>$SID));
    }else{
      $SID=$dataAPI['sid'];
      array_push($data,array('status'=>1,'sid'=>$SID));
    }
    
  }else if($type=='forEdit'){
    $data =  getDataSQLv1(1,'SELECT * FROM lib_users  as users
    left join lib_school as school on users.user_school=school.school_id
    left join lib_yearStudy as years on users.user_year=years.year_id
    where users.user_id=?
    order by users.user_sid ',array($dataAPI['userId']));
   
  }else if($type=='getYear'){
    $data =  getDataSQLv1(1,'SELECT * FROM lib_yearStudy where year_status=1 order by year_digit desc',array());
  }

  return setDataReturn($codeReturn,$data);

}

function manageDataBook($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $school =1;
  $data=array();
  if($type=='defaultForm'){
    $shelf =  getDataSQLv1(1,'SELECT * FROM lib_book_shelf where shelf_status=1 order by shelf_code asc',array());
    $group =  getDataSQLv1(1,'SELECT * FROM lib_book_group where group_status=1 order by group_name asc',array());
    array_push($data,array('shelf'=>$shelf,'group'=>$group));
  }else if($type=='listshow'){
    $searchSomething=' ';
    if($dataAPI['search']!=''){
      $searchSomething = " WHERE (book.book_barcode = '".$dataAPI['search']."') ";
    }


    $books =  getDataSQLv1(1,'SELECT * FROM lib_book as book
    left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    '.$searchSomething.'
    order by book.book_name asc',array());
    foreach($books AS $book){
      array_push($data,$book);
    }
  }else if($type=='forEdit'){
    $data =  getDataSQLv1(1,'SELECT * FROM lib_book as book
    left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    where book.book_id=?
    order by book.book_name asc',array($dataAPI['id']));
  }else if($type=='chackbarcode'){
    $data =  getDataSQLv1(1,'SELECT * FROM lib_book as book
    left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    where book.book_barcode=?
    order by book.book_name asc',array($dataAPI['barcode']));
  }
  return setDataReturn($codeReturn,$data);
}

function MasterCheckin($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $school =1;
  $data=array();
  if($type=='logCheckIn'){
    $searchSomething=' ';
    if($dataAPI['search']!=''){
      // $search = "%".$dataAPI['search']."%";
      $searchSomething = " AND (user_sid = '".$dataAPI['search']."') ";
      // $searchSomething .= " OR user_fname like '".$search."'";
      // $searchSomething .= " OR user_lname like '".$search."'";
      // $searchSomething .= " OR user_nickname like '".$search."'";
      // $searchSomething .= " OR years.year_digit like '".$search."'";


      // $searchSomething .= " )";

    }

    $last30 = getDataSQLv1(1,'SELECT DATE_FORMAT(checkin_time, "%Y-%m-%d") as DD,count(DISTINCT `checkin_user`) as num
    FROM lib_checkin 
    left join lib_users as users on lib_checkin.checkin_user = users.user_id
    where checkin_status=1 and (checkin_time between ? AND ?) '.$searchSomething.' group BY DATE_FORMAT(checkin_time, "%Y-%m-%d")
     ',array($dataAPI['start'],$dataAPI['end']));

    $joinser = getDataSQLv1(1,'SELECT DATE_FORMAT(checkin_time, "%Y-%m-%d") as DD,count(`checkin_user`) as num,
    user_fname,user_lname,user_prefix,user_sid,user_type
    FROM lib_checkin 
    left join lib_users on lib_checkin.checkin_user = lib_users.user_id
    where checkin_status=1 and (checkin_time between ? AND ?) '.$searchSomething.' group BY DATE_FORMAT(checkin_time, "%Y-%m-%d"),
    user_fname,user_lname,user_prefix,user_sid,user_type
    order by DATE_FORMAT(checkin_time, "%Y-%m-%d") desc,count(`checkin_user`) desc
    ',array($dataAPI['start'],$dataAPI['end']));


    $detail = getDataSQLv1(1,'SELECT * FROM lib_checkin 
    left join lib_users as users on lib_checkin.checkin_user = users.user_id
    left join lib_school as school on users.user_school=school.school_id
    left join lib_yearStudy as years on users.user_year=years.year_id
    where checkin_status=1 and (checkin_time between ? AND ?) '.$searchSomething,array($dataAPI['start'],$dataAPI['end']));


     array_push($data,array('last30'=>$last30,'logs'=>$joinser,'detail'=>$detail));

  }
  return setDataReturn($codeReturn,$data);
}


function MasterBorrow($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $school =1;
  $Admin = $_SESSION["id-user-master"];
  $data=array();
  if($type=='checkBarcodeSID_ForBorrow'){
    $datauser =  getDataSQLv1(1,'SELECT * FROM lib_users  as users
    left join lib_school as school on users.user_school=school.school_id
    left join lib_yearStudy as years on users.user_year=years.year_id
    where users.user_sid=?
    order by users.user_sid limit 1',array($dataAPI['sid']));
    foreach($datauser AS $user){
      $user['checkin'] = getDataSQLv1(1,'SELECT checkin_time FROM lib_checkin 
      where checkin_status=1 and checkin_user=? and year(checkin_time)=year(CURDATE())',array($user['user_id']));
      array_push($data,$user);
    }
  }else if($type=='checkBarcodeBook_forBorrow'){
    $dataBook =  getDataSQLv1(1,'SELECT * FROM lib_book as book
    left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    where book.book_barcode=?
    order by book.book_name asc',array($dataAPI['barcode']));
    foreach($dataBook AS $book){

      array_push($data,$book);
    }
  }else if($type=='confirmBorrow'){
    $dataAPI = json_decode($dataAPI);
    $borrow_no = genRanningNo();
    $token = new_token(6);
    insertSQL('lib_borrow',
    'borrow_no,borrow_token,borrow_user_id,borrow_create_doc,borrow_create_by,borrow_startdate,borrow_duedate,borrow_status',
    array($borrow_no,$token,$dataAPI->user,$dateNow,$Admin,$dataAPI->dateStart,$dataAPI->dueDate,1));
    $borrows = getDataSQLv1(1,'SELECT  * FROM  lib_borrow  WHERE borrow_no = ? and borrow_token=?',array($borrow_no,$token));
    foreach($borrows AS $borrow){
      foreach($dataAPI->arrBookClipboard AS $book){
        insertSQL('lib_borrow_book','bb_borrow_id,bb_book_id',array($borrow['borrow_id'],$book));
      }
      array_push($data,$borrow);
    }
    // array_push($data,$borrow_no);
  }
  return setDataReturn($codeReturn,$data);
}

function genRanningNo(){
  $NowYear = date('y');
  $NowMonth = date('m');
  $search = $NowYear.$NowMonth."%";
  $assign_work = getDataSQLv1(1,'SELECT * FROM  lib_borrow  WHERE borrow_no LIKE ? ORDER BY borrow_no DESC limit 1',array($search));
  if(count($assign_work)>0){
    $DocNoLast = $assign_work[0]['borrow_no'];
    $last = substr($DocNoLast,-4);
    $last+=1;
  }else{
    $last=1;
  }
  $new=sprintf("%04d",$last);
  $return = $NowYear.$NowMonth.$new;
  return $return;
}

?>