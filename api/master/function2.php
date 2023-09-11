<?php 
function checkin($type,$dataAPI,$dataoption){
    global $dateNow,$browser,$codeReturn;
    $data=array();

    if($type=='checkin'){
        $users = findDataUserBySID($dataAPI['sid']);
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

?>