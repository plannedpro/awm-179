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
  }else if($type=='manageGroup_showAll'){
    $data = getDataSQLv1(1,'SELECT count(DISTINCT `book_barcode`) as num, g.group_name
    ,g.group_remark,g.group_status,group_id
    FROM lib_book_group  as g
    left join lib_book as book on book.book_group_id = g.group_id
    where (book.book_status=1 OR book.book_status is null) group BY 
    g.group_name,group_id
    ,g.group_remark,g.group_status order by g.group_name asc',array());
  }else if($type=='manageGroup_showByID'){
    $data = getDataSQLv1(1,'SELECT * FROM lib_book_group where group_id=?',array($dataAPI['id']));
  }else if($type=='manageGroup_save'){
    if($dataAPI['id']!=0){
      $dataGroup = getDataSQLv1(1,'SELECT * FROM lib_book_group where group_id=?',array($dataAPI['id']));
      if(count($dataGroup)>0){
        // update
        updateSQL('lib_book_group','group_name=?,group_remark=?','group_id=?',array($dataAPI['name'],$dataAPI['remark'],$dataAPI['id']));
      }else{
        //insert
        insertSQL('lib_book_group','group_name,group_remark,group_school,group_status',array($dataAPI['name'],$dataAPI['remark'],$school,1));
      }
    }else{
      // insert
      insertSQL('lib_book_group','group_name,group_remark,group_school,group_status',array($dataAPI['name'],$dataAPI['remark'],$school,1));
    }
    array_push($data,$dataAPI);
  }else if($type=='manageShelf_showAll'){
    $data = getDataSQLv1(1,'SELECT count(DISTINCT `book_barcode`) as num, g.shelf_code
    ,g.shelf_remark,g.shelf_status,shelf_id
    FROM lib_book_shelf  as g
    left join lib_book as book on book.book_shelf_id = g.shelf_id
    where (book.book_status=1 OR book.book_status is null) group BY 
    g.shelf_code,shelf_id
    ,g.shelf_remark,g.shelf_status order by g.shelf_code asc',array());
  }else if($type=='manageShelf_showByID'){
    $data = getDataSQLv1(1,'SELECT * FROM lib_book_shelf where shelf_id=?',array($dataAPI['id']));
  }else if($type=='manageShelf_save'){
    if($dataAPI['id']!=0){
      $dataGroup = getDataSQLv1(1,'SELECT * FROM lib_book_shelf where shelf_id=?',array($dataAPI['id']));
      if(count($dataGroup)>0){
        // update
        updateSQL('lib_book_shelf','shelf_code=?,shelf_remark=?','shelf_id=?',array($dataAPI['name'],$dataAPI['remark'],$dataAPI['id']));
      }else{
        //insert
        insertSQL('lib_book_shelf','shelf_code,shelf_remark,shelf_school,shelf_status',array($dataAPI['name'],$dataAPI['remark'],$school,1));
      }
    }else{
      // insert
      insertSQL('lib_book_shelf','shelf_code,shelf_remark,shelf_school,shelf_status',array($dataAPI['name'],$dataAPI['remark'],$school,1));
    }
    array_push($data,$dataAPI);
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
      where checkin_status=1 and checkin_user=? and year(checkin_time)=year(CURDATE()) and month(checkin_time)=month(CURDATE())',array($user['user_id']));
      
      $user['borrow'] =  getDataSQLv1(1,'SELECT * FROM lib_borrow as borrow 
      left join lib_borrow_book as bbook on bbook.bb_borrow_id=borrow.borrow_id
      left join lib_book as book on bbook.bb_book_id=book.book_id
      where borrow.borrow_user_id=?',array($user['user_id']));
      
      
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
  }else if($type=='checkBarcodeSID_ForReturn'){
    $dataBook =  getDataSQLv1(1,'SELECT * FROM lib_borrow as borrow 
    left join lib_borrow_book as bbook on bbook.bb_borrow_id=borrow.borrow_id
    left join lib_book as book on bbook.bb_book_id=book.book_id
    left join lib_users  as users on users.user_id=borrow.borrow_user_id
    left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    where book.book_barcode=? AND bbook.bb_status=1
    order by book.book_name asc',array($dataAPI['book']));
    foreach($dataBook AS $book){

      array_push($data,$book);
    }
  }else if($type=='confirmReceive'){
    $dataBook =  getDataSQLv1(1,'SELECT * FROM lib_borrow as borrow 
    left join lib_borrow_book as bbook on bbook.bb_borrow_id=borrow.borrow_id
    left join lib_book as book on bbook.bb_book_id=book.book_id
    left join lib_users  as users on users.user_id=borrow.borrow_user_id
    left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    where book.book_barcode=? AND bbook.bb_id=? AND bbook.bb_status=1
    order by book.book_name asc',array($dataAPI['book'],$dataAPI['bb_id']));
    foreach($dataBook AS $book){
      updateSQL('lib_borrow_book','bb_return=?,bb_received=?,bb_status=?','bb_id=?',array($dateNow,$Admin,2,$book['bb_id']));
      array_push($data,$book);
    }
  }else if($type=='getDataHistoryBorrow'){
    $searchBy=$dataAPI['searchBy'];
    $search=$dataAPI['search'];
    $conditionsSearch = '';
    if($search!=''){
      if($searchBy==1){
      $conditionsSearch = " AND users.user_sid ='".$search."' ";
      }else if($searchBy==2){
        $conditionsSearch = " AND book.book_barcode ='".$search."' ";
      }
    }
    if($dataAPI['status1']==1){
      $conditionsSearch .= " AND bbook.bb_status=1 ";
    }else {
      $conditionsSearch .= " AND (bbook.bb_status=1  OR bbook.bb_status=2) ";
    }
    $dataBook =  getDataSQLv1(1,'SELECT 
    count(bbook.bb_borrow_id) as num
    ,DATEDIFF(borrow.borrow_duedate,borrow.borrow_startdate) as datediff
    ,borrow.borrow_no
    ,borrow.borrow_create_doc
    ,borrow.borrow_startdate
    ,borrow.borrow_duedate
    ,users.user_fname
    ,users.user_lname
    ,users.user_prefix
    ,users.user_sid
    ,users.user_profile
    ,users.user_type
    ,users.user_class
    FROM lib_borrow as borrow 
    left join lib_borrow_book as bbook on bbook.bb_borrow_id=borrow.borrow_id
    left join lib_book as book on bbook.bb_book_id=book.book_id
    left join lib_users  as users on users.user_id=borrow.borrow_user_id
    where (bbook.bb_status!=0) '.$conditionsSearch.'
    group by borrow.borrow_no
    ,borrow.borrow_create_doc
    ,borrow.borrow_startdate
    ,borrow.borrow_duedate
    ,users.user_fname
    ,users.user_lname
    ,users.user_prefix
    ,users.user_sid
    ,users.user_profile
    ,users.user_type
    ,users.user_class
    order by borrow.borrow_no desc',array());
    foreach($dataBook AS $book){
      $book['pending'] =  getDataSQLv1(1,'SELECT bbook.bb_id FROM lib_borrow as borrow 
      left join lib_borrow_book as bbook on bbook.bb_borrow_id=borrow.borrow_id
      where borrow.borrow_no=? AND bbook.bb_status=1 ',array($book['borrow_no']));
      array_push($data,$book);
    }
  }else if($type=='getDataHistoryBorrow_ByBorrowNo'){
    $dataBook =  getDataSQLv1(1,'SELECT * FROM lib_borrow as borrow 
    left join lib_users  as users on users.user_id=borrow.borrow_user_id
    left join lib_school as school on users.user_school=school.school_id
    left join lib_yearStudy as years on users.user_year=years.year_id
    left join master_account as ad on ad.MasterId=borrow.borrow_create_by
    where borrow.borrow_no=?',array($dataAPI['borrow_no']));

    
    // $dataBook =  getDataSQLv1(1,'SELECT * FROM lib_borrow as borrow 
    // left join lib_borrow_book as bbook on bbook.bb_borrow_id=borrow.borrow_id
    // left join lib_book as book on bbook.bb_book_id=book.book_id
    // left join lib_users  as users on users.user_id=borrow.borrow_user_id
    // left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    // left join lib_book_group as g on g.group_id=book.book_group_id
    // left join lib_school as school on users.user_school=school.school_id
    // left join lib_yearStudy as years on users.user_year=years.year_id
    // where borrow.borrow_no=? order by book.book_name asc',array($dataAPI['borrow_no']));
    foreach($dataBook AS $book){
      $book['borrow'] =  getDataSQLv1(1,'SELECT * FROM lib_borrow_book as bbook 
      left join lib_book as book on bbook.bb_book_id=book.book_id
      left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
      left join lib_book_group as g on g.group_id=book.book_group_id
      left join master_account as ad on ad.MasterId=bbook.bb_received
      where bbook.bb_borrow_id=?',array($book['borrow_id']));

      // $book['admin'] =  getDataSQLv1(1,'SELECT * FROM lib_users  as users where bbook.bb_borrow_id=?',array($book['borrow_id']));
      // updateSQL('lib_borrow_book','bb_return=?,bb_received=?,bb_status=?','bb_id=?',array($dateNow,$Admin,2,$book['bb_id']));
      array_push($data,$book);
    }
  }else if($type=='historyByUserIdAndStatusShow'){
    $conditionType = '';
    if($dataAPI['type']==1){
      // ทั้งหมด
     
    }else if($dataAPI['type']==2){
      // คืนแล้ว
      $conditionType = " AND bbook.bb_status=2 ";
    }else if($dataAPI['type']==3){
      // รอคืน
      $conditionType = " AND bbook.bb_status=1 ";
    }
    $borrows = getDataSQLv1(1,'SELECT * FROM lib_borrow_book as bbook 
    left join lib_borrow as borrow on bbook.bb_borrow_id=borrow.borrow_id
    left join lib_book as book on bbook.bb_book_id=book.book_id
    left join lib_users  as users on users.user_id=borrow.borrow_user_id
    left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    left join master_account as ad on ad.MasterId=bbook.bb_received
    where users.user_sid=? '.$conditionType,array($dataAPI['user_sid']));
    foreach($borrows AS $borrow){
      
      array_push($data,$borrow);
    }

  }else if($type=='getDataHistoryBorrowByDate'){

    $search=$dataAPI['search'];
    
    $conditionsSearch = " AND DATE_FORMAT(borrow_create_doc, \"%Y-%m-%d\")='".$dataAPI['date']."'";
    if($search!=''){
      $conditionsSearch .= " AND users.user_sid ='".$search."' ";
    }
    
    $dataBook =  getDataSQLv1(1,'SELECT 
    count(bbook.bb_borrow_id) as num
    ,DATEDIFF(borrow.borrow_duedate,borrow.borrow_startdate) as datediff
    ,borrow.borrow_no
    ,borrow.borrow_create_doc
    ,borrow.borrow_startdate
    ,borrow.borrow_duedate
    ,users.user_fname
    ,users.user_lname
    ,users.user_prefix
    ,users.user_sid
    ,users.user_profile
    ,users.user_type
    ,users.user_class
    FROM lib_borrow as borrow 
    left join lib_borrow_book as bbook on bbook.bb_borrow_id=borrow.borrow_id
    left join lib_book as book on bbook.bb_book_id=book.book_id
    left join lib_users  as users on users.user_id=borrow.borrow_user_id
    where (bbook.bb_status!=0) '.$conditionsSearch.'
    group by borrow.borrow_no
    ,borrow.borrow_create_doc
    ,borrow.borrow_startdate
    ,borrow.borrow_duedate
    ,users.user_fname
    ,users.user_lname
    ,users.user_prefix
    ,users.user_sid
    ,users.user_profile
    ,users.user_type
    ,users.user_class
    order by borrow.borrow_no desc',array());
    foreach($dataBook AS $book){
      $book['pending'] =  getDataSQLv1(1,'SELECT bbook.bb_id FROM lib_borrow as borrow 
      left join lib_borrow_book as bbook on bbook.bb_borrow_id=borrow.borrow_id
      where borrow.borrow_no=? AND bbook.bb_status=1 ',array($book['borrow_no']));
      array_push($data,$book);
    }
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


function MasterDashboard($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $school =1;
  $Admin = $_SESSION["id-user-master"];
  $data=array();
  if($type=='all'){
    $logBorrow = getDataSQLv1(1,'SELECT
    DATE_FORMAT(borrow_create_doc, "%Y-%m-%d") as DD,count(`borrow_id`) as num 
    FROM  lib_borrow  
    WHERE borrow_status=1  AND (borrow_create_doc BETWEEN ? AND ?)
    group by DATE_FORMAT(borrow_create_doc, "%Y-%m-%d")
    ',array($dataAPI['start'],$dataAPI['end']));

    $pending = getDataSQLv1(1,'SELECT * FROM lib_borrow_book as bbook 
    left join lib_borrow as borrow on bbook.bb_borrow_id=borrow.borrow_id
    left join lib_book as book on bbook.bb_book_id=book.book_id
    left join lib_users  as users on users.user_id=borrow.borrow_user_id
    left join lib_book_shelf as shelf on shelf.shelf_id=book.book_shelf_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    left join master_account as ad on ad.MasterId=bbook.bb_received
    where bbook.bb_status=1',array());

    $top5Book = getDataSQLv1(1,'SELECT count(`borrow_id`) as num,book_name,group_name FROM lib_borrow_book as bbook 
    left join lib_borrow as borrow on bbook.bb_borrow_id=borrow.borrow_id
    left join lib_book as book on bbook.bb_book_id=book.book_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    where (borrow_create_doc BETWEEN ? AND ?) group by book_name,group_name order by count(`borrow_id`) desc limit 5 ',array($dataAPI['start'],$dataAPI['end']));

    $top5User = getDataSQLv1(1,'SELECT count(`borrow_user_id`) as num,user_fname,user_lname,user_type,user_class,user_sid FROM lib_borrow as borrow 
    left join lib_users  as users on users.user_id=borrow.borrow_user_id
    where (borrow_create_doc BETWEEN ? AND ?) group by user_fname,user_lname,user_type,user_class,user_sid order by count(`borrow_user_id`) desc limit 5 ',array($dataAPI['start'],$dataAPI['end']));


    $UserClass = getDataSQLv1(1,'SELECT count(`borrow_user_id`) as num,user_class FROM lib_borrow as borrow 
    left join lib_users  as users on users.user_id=borrow.borrow_user_id
    where (borrow_create_doc BETWEEN ? AND ?) AND user_class!=0 group by user_class order by count(`borrow_user_id`)',array($dataAPI['start'],$dataAPI['end']));

    $byBookGroup= getDataSQLv1(1,'SELECT count(`borrow_id`) as num,group_name FROM lib_borrow_book as bbook 
    left join lib_borrow as borrow on bbook.bb_borrow_id=borrow.borrow_id
    left join lib_book as book on bbook.bb_book_id=book.book_id
    left join lib_book_group as g on g.group_id=book.book_group_id
    where (borrow_create_doc BETWEEN ? AND ?) group by group_name order by count(`borrow_id`) desc limit 10 ',array($dataAPI['start'],$dataAPI['end']));


    $data = array('logBorrow'=>$logBorrow,'pending'=>$pending,'top5book'=>$top5Book,'top5user'=>$top5User,'userClass'=>$UserClass,'byBookGroup'=>$byBookGroup );
  }
  return setDataReturn($codeReturn,$data);
}
?>