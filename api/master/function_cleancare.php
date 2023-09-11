<?php
function getDataInbox($type,$dataAPI,$dataoption){
    global $dateNow,$browser,$codeReturn;
    $dataInbox =array();
    if($type=='new'){
      $token = time().new_token(20);
      insertSQL('inbox',
      'ib_remarkBy,ib_dateremark,ib_name,ib_phone,ib_time,ib_clinic,ib_msg,ib_date,ib_status,ib_remark,ib_token',
      array(0,0,$dataAPI['name'],$dataAPI['phone'],$dataAPI['time'],$dataAPI['clinic'],$dataAPI['msg'].' (จากหน้า'.$dataAPI['path'].')',time(),1,'',$token));
      
      //ตรวจสอบว่ารับการแจ้งเตือนไหม 
      $alertInLine = getDataSettingByKey('alertInLine');
      $lineAlertToken = getDataSettingByKey('lineAlertToken');
      if($alertInLine==1){
        $url        = 'https://notify-api.line.me/api/notify';
        $token      = $lineAlertToken!=0 ? $lineAlertToken:'cCL7zaqSGmsFcjQ8CzkxerHPY5BW1VdcPzv8ciCpgC2';
        $headers    = [
                        'Content-Type: application/x-www-form-urlencoded',
                        'Authorization: Bearer '.$token
                    ];
        $fields     = "message=มีรายการติดต่อคุณหมอ\nชื่อ : ".$dataAPI['name']."\nโทร : ".$dataAPI['phone']."\nเวลาที่สะดวก : ".$dataAPI['time']."\nสาขา : ".$dataAPI['clinic']."\n\n".$dataAPI['msg']."\n(จากหน้า".$dataAPI['path'].")";
        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $url);
        curl_setopt( $ch, CURLOPT_POST, 1);
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec( $ch );
        curl_close( $ch );
        
        // // var_dump($result);
        // // $result = json_decode($result,TRUE);
  
      }
  

      array_push($dataInbox,array('token'=>$token)); 
  
    }else if($type=='all'){
      $search = '%'.$dataAPI['filter'].'%';
      $dataInboxF = getDataSQLv1(1,"SELECT * FROM inbox 
      WHERE ib_status!=? 
      AND (ib_name LIKE ? OR ib_phone LIKE ? OR ib_email LIKE ? OR ib_subject like ? OR ib_address like ? OR ib_msg LIKE ?  OR ib_remark LIKE ? )
      ORDER BY ib_create_at  DESC",array(9,$search,$search,$search,$search,$search,$search,$search));
      foreach($dataInboxF AS $data){
        if($data['ib_remarkBy']!=0){
          $searchAdmin = getDataSQLv1(1,"SELECT MasterName FROM master_account WHERE MasterId=? ",array($data['ib_remarkBy']));
          $data['admin'] = $searchAdmin[0]['MasterName'];
        }
        array_push($dataInbox,$data);
      }
  
    }else if($type=='updateStatus'){
      $adminId=$_SESSION["id-user-master"];
      $admintoken=$_SESSION["token-user-master"];
      $dataInbox_ = getDataSQLv1(1,"SELECT * FROM inbox  WHERE ib_token=?  ",array($dataAPI['token']));
      if(count($dataInbox_)>0){
        $update = updateSQL('inbox','ib_status=?,ib_remark=?,ib_dateremark=?,ib_remarkBy=?','ib_token=?', array(2,$dataAPI['remark'],$dateNow,$adminId,$dataAPI['token']));
        array_push($dataInbox,array('token'=>$dataAPI['token'])); 
      }
    }else if($type=='delete'){
      $adminId=$_SESSION["id-user-master"];
      $dataInbox_ = getDataSQLv1(1,"SELECT * FROM inbox  WHERE ib_token=?  ",array($dataAPI['token']));
      foreach($dataInbox_ AS $inbox){
        $update = updateSQL('inbox','ib_status=?,ib_delete_at=?,ib_delete_by=?','ib_token=?', array(9,$dateNow,$adminId,$dataAPI['token']));
      }
      array_push($dataInbox,array('token'=>$dataAPI['token'])); 


    }
  
  
    // if(count($dataInbox)>0){
    //   $datareturn=array('status'=>200,'msg'=>'this data','data'=>$dataInbox);
    // }else{
    //   $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
    // }
    // return $datareturn;

    return setDataReturn($codeReturn,$dataInbox);
  
  }
  


  function getDataSettingAll($type,$dataAPI,$dataoption){
    global $dateNow,$browser,$codeReturn;
    $datasetting =array();
    if($type=='all'){
      $datasetting = getDataSQLv1(1,"SELECT *  FROM system_setting WHERE setStatus=1",array());
    }else if($type=='whycleancare'){
      $datasetting = getDataSQLv1(1,"SELECT * FROM blogs left join master_account on blogs_updateBy=MasterId  WHERE blogs_status=1  AND blogs_type=5 AND blogs_group=? ORDER BY blogs_topService  ASC",array('whyourservice'));

    }
    return setDataReturn($codeReturn,$datasetting);
  }


  function getdataSalesMember($type,$dataAPI,$dataoption){
    global $dateNow,$browser,$codeReturn;
    $dataSalesMember = array();
    if($type=='all'){
      $search = '%'.$dataAPI['filter'].'%';
      $dataSalesMember = getDataSQLv1(1,"SELECT * FROM agent_sales 
      left join master_account on agent_updateby=MasterId
      WHERE agent_status!=9 
      AND (agent_title LIKE ? OR agent_name LIKE ? OR agent_phone LIKE ? OR agent_line LIKE ? OR agent_location LIKE ? OR MasterName LIKE ? )
      ORDER BY agent_id  DESC",array($search,$search,$search,$search,$search,$search));
    }else if($type=='Public'){
      $search = '%'.$dataAPI['filter'].'%';
      $dataSalesMember = getDataSQLv1(1,"SELECT * FROM agent_sales 
      left join master_account on agent_updateby=MasterId
      WHERE agent_status=1 
      AND (agent_title LIKE ? OR agent_name LIKE ? OR agent_phone LIKE ? OR agent_line LIKE ? OR agent_location LIKE ? OR MasterName LIKE ? )
      ORDER BY agent_id  ASC",array($search,$search,$search,$search,$search,$search));

    }else if($type=='bytoken'){
      $dataSalesMember = getDataSQLv1(1,"SELECT * FROM agent_sales WHERE agent_token=?",array($dataAPI));
    }else if($type=='update'){
      $adminId=$_SESSION["id-user-master"];
      $admintoken=$_SESSION["token-user-master"];
      $token = $dataAPI['token'];
      $img = 'agent_img.png';
      $agent_sales = getDataSQLv1(1,"SELECT * FROM agent_sales WHERE agent_token=?",array($token));
      if(count($agent_sales)>0){
        if($dataAPI['img']!=''){
          $img = $dataAPI['img'];
        }else{
          $img=$agent_sales[0]['agent_img'];
        }
        $update = updateSQL('agent_sales','agent_title=?,agent_name=?,agent_phone=?,agent_line=?,agent_location=?,agent_img=?,agent_lastupdate=?,agent_updateby=?','agent_token=?',
        array($dataAPI['agent_title'],$dataAPI['agent_name'],$dataAPI['agent_phone'],$dataAPI['agent_line'],$dataAPI['agent_location'],$img, $dateNow,$adminId,$dataAPI['token']));
      }else{
        if($dataAPI['img']!=''){
          $img = $dataAPI['img'];
        }
        $token = new_token(20);
        insertSQL('agent_sales',
        'agent_title,agent_name,agent_phone,agent_line,agent_location,agent_img,agent_lastupdate,agent_token,agent_updateby',
        array($dataAPI['agent_title'],$dataAPI['agent_name'],$dataAPI['agent_phone'],$dataAPI['agent_line'],$dataAPI['agent_location'],$img, $dateNow,$token,$adminId));
      }
      array_push($dataSalesMember,array('token'=>$token));
      
    
    }
  
    // if(count($dataClinic)>0){
    //   $datareturn=array('status'=>200,'msg'=>'this data','data'=>$dataClinic);
    // }else{
    //   $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
    // }
    // return $datareturn;
    return setDataReturn($codeReturn,$dataSalesMember);
  }
  function getdataAward($type,$dataAPI,$dataoption){
    global $dateNow,$browser,$codeReturn;
    $dataSalesMember = array();
    if($type=='all'){
      $search = '%'.$dataAPI['filter'].'%';
      $dataSalesMember = getDataSQLv1(1,"SELECT * FROM award 
      left join master_account on award_updateby=MasterId
      WHERE award_status!=9  AND award_type=1
      AND (award_title LIKE ? OR award_description LIKE ?  OR MasterName LIKE ? )
      ORDER BY award_id  DESC",array($search,$search,$search));
    }else if($type=='Public'){
      // $search = '%'.$dataAPI['filter'].'%';
      // $dataSalesMember = getDataSQLv1(1,"SELECT * FROM agent_sales 
      // left join master_account on agent_updateby=MasterId
      // WHERE agent_status=1 
      // AND (agent_title LIKE ? OR agent_name LIKE ? OR agent_phone LIKE ? OR agent_line LIKE ? OR agent_location LIKE ? OR MasterName LIKE ? )
      // ORDER BY agent_id  ASC",array($search,$search,$search,$search,$search,$search));

    }else if($type=='bytoken'){
      $dataSalesMember = getDataSQLv1(1,"SELECT * FROM award WHERE award_token=?",array($dataAPI));
    }else if($type=='update'){
      $adminId=$_SESSION["id-user-master"];
      $admintoken=$_SESSION["token-user-master"];
      $token = $dataAPI['token'];
      $img = 'agent_img.png';
      $agent_sales = getDataSQLv1(1,"SELECT * FROM award WHERE award_token=?",array($token));
      if(count($agent_sales)>0){
        if($dataAPI['img']!=''){
          $img = $dataAPI['img'];
        }else{
          $img=$agent_sales[0]['award_img'];
        }
        $update = updateSQL('award','award_title=?,award_description=?,award_date=?,award_showYearOnly=?,award_img=?,award_imgShow=?,award_update=?,award_updateby=?,award_type=?','award_token=?',
        array($dataAPI['award_title'],$dataAPI['award_description'],date_format(date_create($dataAPI['award_date']),"Y-m-d"),$dataAPI['award_showYearOnly'],$img,$dataAPI['award_imgShow'], $dateNow,$adminId,$dataAPI['award_type'],$dataAPI['token']));
      }else{
        if($dataAPI['img']!=''){
          $img = $dataAPI['img'];
        }
        $token = new_token(20);
        insertSQL('award',
        'award_title,award_description,award_date,award_showYearOnly,award_img,award_imgShow,award_update,award_updateby,award_type,award_token',
        array($dataAPI['award_title'],$dataAPI['award_description'],date_format(date_create($dataAPI['award_date']),"Y-m-d"),$dataAPI['award_showYearOnly'],$img,$dataAPI['award_imgShow'], $dateNow,$adminId,$dataAPI['award_type'],$token));
      }
      array_push($dataSalesMember,array('token'=>$token));
      
    
    }
  
    // if(count($dataClinic)>0){
    //   $datareturn=array('status'=>200,'msg'=>'this data','data'=>$dataClinic);
    // }else{
    //   $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
    // }
    // return $datareturn;
    return setDataReturn($codeReturn,$dataSalesMember);
  }
  function getDataWarranty($type,$dataAPI,$dataoption){
    global $dateNow,$browser,$codeReturn;
    $dataSalesMember = array();
    if($type=='all'){
      $search = '%'.$dataAPI['filter'].'%';
      $dataSalesMember = getDataSQLv1(1,"SELECT * FROM award 
      left join master_account on award_updateby=MasterId
      WHERE award_status!=9  AND award_type=2
      AND (award_title LIKE ? OR award_description LIKE ?  OR MasterName LIKE ? )
      ORDER BY award_id  DESC",array($search,$search,$search));
    }else if($type=='Public'){
      // $search = '%'.$dataAPI['filter'].'%';
      // $dataSalesMember = getDataSQLv1(1,"SELECT * FROM agent_sales 
      // left join master_account on agent_updateby=MasterId
      // WHERE agent_status=1 
      // AND (agent_title LIKE ? OR agent_name LIKE ? OR agent_phone LIKE ? OR agent_line LIKE ? OR agent_location LIKE ? OR MasterName LIKE ? )
      // ORDER BY agent_id  ASC",array($search,$search,$search,$search,$search,$search));

    }else if($type=='bytoken'){
      $dataSalesMember = getDataSQLv1(1,"SELECT * FROM award WHERE award_token=?",array($dataAPI));
    }else if($type=='update'){
      $adminId=$_SESSION["id-user-master"];
      $admintoken=$_SESSION["token-user-master"];
      $token = $dataAPI['token'];
      $img = 'agent_img.png';
      $agent_sales = getDataSQLv1(1,"SELECT * FROM award WHERE award_token=?",array($token));
      if(count($agent_sales)>0){
        if($dataAPI['img']!=''){
          $img = $dataAPI['img'];
        }else{
          $img=$agent_sales[0]['award_img'];
        }
        $update = updateSQL('award','award_title=?,award_description=?,award_date=?,award_showYearOnly=?,award_img=?,award_imgShow=?,award_update=?,award_updateby=?,award_type=?','award_token=?',
        array($dataAPI['award_title'],$dataAPI['award_description'],date_format(date_create($dataAPI['award_date']),"Y-m-d"),$dataAPI['award_showYearOnly'],$img,$dataAPI['award_imgShow'], $dateNow,$adminId,$dataAPI['award_type'],$dataAPI['token']));
      }else{
        if($dataAPI['img']!=''){
          $img = $dataAPI['img'];
        }
        $token = new_token(20);
        insertSQL('award',
        'award_title,award_description,award_date,award_showYearOnly,award_img,award_imgShow,award_update,award_updateby,award_type,award_token',
        array($dataAPI['award_title'],$dataAPI['award_description'],date_format(date_create($dataAPI['award_date']),"Y-m-d"),$dataAPI['award_showYearOnly'],$img,$dataAPI['award_imgShow'], $dateNow,$adminId,$dataAPI['award_type'],$token));
      }
      array_push($dataSalesMember,array('token'=>$token));
      
    
    }
  
    // if(count($dataClinic)>0){
    //   $datareturn=array('status'=>200,'msg'=>'this data','data'=>$dataClinic);
    // }else{
    //   $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
    // }
    // return $datareturn;
    return setDataReturn($codeReturn,$dataSalesMember);
  }



   
function getDataGroupDetail($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $dataGroupDetail = array();
  if($type=='all'){
    $search = '%'.$dataAPI['filter'].'%';
    $conditionOderBy = ' ORDER BY blogs_id  DESC';
    if($dataAPI['Type']==4 || $dataAPI['Type']==5){
      $conditionOderBy = ' ORDER BY blogs_topService  ASC';
    }
    $dataGroupDetail = getDataSQLv1(1,"SELECT * FROM blogs 
    left join master_account on blogs_updateBy=MasterId 
    WHERE blogs_status!=9
    AND blogs_type=?
    AND blogs_group=?
    AND (blogs_name LIKE ? OR blogs_ LIKE ? OR blogs_customURL LIKE ? OR MasterName LIKE ?  )
    ".$conditionOderBy,array($dataAPI['Type'],$dataAPI['groupToken'],$search,$search,$search,$search));


  }else if($type=='allActive'){
    $search = '%'.$dataAPI['filter'].'%';
    if($dataAPI['blogs']=='0'){
      $dataGroupDetail = getDataSQLv1(1,"SELECT * FROM blogs 
      LEFT JOIN group_ ON (blogs.blogs_group=group_.group_token)
      WHERE blogs.blogs_status=? 
      AND blogs.blogs_type=?
      AND (blogs.blogs_name LIKE ? OR blogs.blogs_customURL LIKE ? OR blogs.blogs_html LIKE ? )
      ORDER BY blogs_update  DESC",array(1,2,$search,$search,$search));
    }else if($dataAPI['blogs']=='3'){
      $dataGroupDetail = getDataSQLv1(1,"SELECT * FROM blogs 
      LEFT JOIN group_ ON (blogs.blogs_group=group_.group_token)
      WHERE blogs.blogs_status=? 
      AND blogs.blogs_type=?
      AND (blogs.blogs_name LIKE ? OR blogs.blogs_customURL LIKE ? OR blogs.blogs_html LIKE ? )
      ORDER BY blogs_update  DESC",array(1,3,$search,$search,$search));
    }else{
      $dataGroupDetail = getDataSQLv1(1,"SELECT * FROM blogs 
      LEFT JOIN group_ ON (blogs.blogs_group=group_.group_token)
      WHERE blogs.blogs_status=? 
      AND (blogs.blogs_type=? OR blogs.blogs_type=?)
      AND group_.group_customURL=?
      AND (blogs.blogs_name LIKE ? OR blogs.blogs_customURL LIKE ? OR blogs.blogs_html LIKE ? )
      ORDER BY blogs_update  DESC",array(1,2,3,$dataAPI['blogs'],$search,$search,$search));
    }
   
  
  }else if($type=='bytoken'){
    $dataGroupDetail = getDataSQLv1(1,"SELECT * FROM blogs WHERE blogs_token=?",array($dataAPI));
  }else if($type=='update'){
    $adminId=$_SESSION["id-user-master"];
    $admintoken=$_SESSION["token-user-master"];

    $token = $dataAPI['token'];
    $groupToken = $dataAPI['groupToken'];
    $groupType = $dataAPI['type'];
    if($groupType==1){
      $img = 'agent_img.png';
    }else if($groupType==2){
      $img = 'agent_img.png';
    }else{
      $img = 'agent_img.png';
    }

    $img2= 'agent_img.png';
    $img3= 'default_bg.png';


    $url = new_token(15);
    if($dataAPI['customUrl']!=''){
      // $url = $dataAPI['customUrl'].'-'.new_token(2);
      $url = $dataAPI['customUrl'];

    }
    $lastTopService = 0;
    $blogsAll = getDataSQLv1(1,"SELECT * FROM blogs WHERE blogs_type=? order by blogs_topService desc limit 1",array($groupType));
    foreach($blogsAll AS $d){
      $lastTopService=$d['blogs_topService'];
    }
    $blogs = getDataSQLv1(1,"SELECT * FROM blogs WHERE blogs_token=?",array($token));
    if(count($blogs)>0){
      if($dataAPI['img']!=''){
        $img = $dataAPI['img'];
      }else{
        $img=$blogs[0]['blogs_img'];
      }

      if(isset($dataAPI['img2'])){
        if($dataAPI['img2']!=''){
          $img2 = $dataAPI['img2'];
        }else{
          $img2=$blogs[0]['blogs_img2'];
        }
      }

      if(isset($dataAPI['img3'])){
        if($dataAPI['img3']!=''){
          $img3 = $dataAPI['img3'];
        }else{
          $img3=$blogs[0]['blogs_img3'];
        }
      }
     


      if($dataAPI['customUrl']!=''){
        $url = $dataAPI['customUrl'];
      }else{
        $url=$blogs[0]['blogs_customURL'];
      }
      $update = updateSQL('blogs','blogs_=?,blogs_name=?,blogs_update=?,blogs_updateBy=?,blogs_html=?,blogs_customURL=?,blogs_img=?,blogs_img2=?,blogs_img3=?','blogs_token=?',
      array($dataAPI['description'],$dataAPI['name'],$dateNow,$adminId,$dataAPI['html'],$url,$img,$img2,$img3,$blogs[0]['blogs_token']));
    }else{
      if($dataAPI['img']!=''){
        $img = $dataAPI['img'];
      }
      if(isset($dataAPI['img2'])){
        if($dataAPI['img2']!=''){
          $img2 = $dataAPI['img2'];
        }
      }
      if(isset($dataAPI['img3'])){
        if($dataAPI['img3']!=''){
          $img3 = $dataAPI['img3'];
        }
      }
     
     
      $token = new_token(20);
      insertSQL('blogs',
      'blogs_topService,blogs_,blogs_name,blogs_update,blogs_updateBy,blogs_html,blogs_customURL,blogs_img,blogs_type,blogs_token,blogs_status,blogs_group,blogs_img2,blogs_img3',
      array($lastTopService+1,$dataAPI['description'],$dataAPI['name'],$dateNow,$adminId,$dataAPI['html'],$url,$img,$groupType,$token,1,$groupToken,$img2,$img3));
    }
    array_push($dataGroupDetail,array('token'=>$token));
    
  
  }else if($type=='Public'){
    $search = '%'.$dataAPI['filter'].'%';
    $dataGroupDetail = getDataSQLv1(1,"SELECT * FROM blogs 
    left join master_account on blogs_updateBy=MasterId 
    WHERE blogs_status=1
    AND blogs_type=?
    AND blogs_group=?
    AND (blogs_name LIKE ? OR blogs_ LIKE ? OR blogs_customURL LIKE ? OR MasterName LIKE ? )
    ORDER BY blogs_id  DESC
    ",array(2,$dataAPI['groupToken'],$search,$search,$search,$search));
  }else if($type=='changeTopService'){
    $blogss = getDataSQLv1(1,"SELECT * FROM blogs WHERE blogs_token=?",array($dataAPI['token']));
    $blogsAll4 = getDataSQLv1(1,"SELECT * FROM blogs WHERE blogs_type=? AND blogs_status!=9",array($dataAPI['type']));

    foreach($blogss AS $blogs){
      $last = $blogs['blogs_topService'];
      // $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($blogs['blogs_topService']-1,$dataAPI['token']));
      foreach($blogsAll4 AS $blogs4){
        if($dataAPI['topservice']=='down'){
          if($blogs4['blogs_token']==$blogs['blogs_token']){
            if($last+1>count($blogsAll4)){
              $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array(count($blogsAll4),$dataAPI['token']));
            }else{
              $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($last+1,$dataAPI['token']));
            }
          }else if($blogs4['blogs_topService']==$last+1){
            $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($blogs4['blogs_topService']-1,$blogs4['blogs_token']));
          }else if($blogs4['blogs_topService']>$last+1){
            // $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($blogs4['blogs_topService']+1,$blogs4['blogs_token']));
          }else if($blogs4['blogs_topService']<$last+1){
            // $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($last+1,$blogs4['blogs_token']));
          }
        }else if($dataAPI['topservice']=='up'){
          if($blogs4['blogs_token']==$blogs['blogs_token']){
            if($last-1<1){
              $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array(1,$dataAPI['token']));
            }else{
              $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($last-1,$dataAPI['token']));
            }
           
          }else if($blogs4['blogs_topService']==$last-1){
            $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($blogs4['blogs_topService']+1,$blogs4['blogs_token']));
          }else if($blogs4['blogs_topService']>$last-1){
            // $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($blogs4['blogs_topService']+1,$blogs4['blogs_token']));
          }else if($blogs4['blogs_topService']<$last-1){
            // $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($last+1,$blogs4['blogs_token']));
          }
        }
      }

      array_push($dataGroupDetail,array('token'=>$blogs));

    }

    // if($dataAPI['topservice']=='down'){
    //   // $blogsAll = getDataSQLv1(1,"SELECT * FROM blogs WHERE blogs_type=4 AND blogs_topService ",array());
    // }
    // foreach($blogss AS $blogs){
      
    //   $update = updateSQL('blogs','blogs_topService=?','blogs_token=?',array($blogs['blogs_topService']-1,$dataAPI['token']));
    //   array_push($dataGroupDetail,array('token'=>$blogs));

    // }
  }

  // if(count($dataGroupDetail)>0){
  //   $datareturn=array('status'=>200,'msg'=>'this data','data'=>$dataGroupDetail);
  // }else{
  //   $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
  // }
  // return $datareturn;

  return setDataReturn($codeReturn,$dataGroupDetail);
}

function getDataGroup($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $dataGroup = array();
  if($type=='all'){
    $search = '%'.$dataAPI['filter'].'%';
    $dataGroup = getDataSQLv1(1,"SELECT * FROM group_ 
    left join master_account on group_updateby=MasterId 
    WHERE group_status!=9
    AND group_type=?
    AND (group_name LIKE ? OR group_html LIKE ? OR group_customURL LIKE ? )
    ORDER BY group_id  DESC ",array($dataAPI['Type'],$search,$search,$search));

  }else if($type=='allActive'){
    // $search = '%'.$dataAPI['filter'].'%';
    // $dataGroup = getDataSQLv1(1,"SELECT * FROM review 
    // WHERE pro_status!=? 
    // AND pro_type=? AND pro_status=?
    // AND (pro_name LIKE ? OR pro_desc LIKE ? OR pro_detail LIKE ? )
    // ORDER BY pro_update  DESC",array(9,$dataAPI['reviewType'],1,$search,$search,$search));
  }else if($type=='bytoken'){
    $dataGroup = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_token=?",array($dataAPI));
  }else if($type=='update'){
    $adminId=$_SESSION["id-user-master"];
    $admintoken=$_SESSION["token-user-master"];

    $token = $dataAPI['token'];
    $groupType = $dataAPI['type'];

    $group_youtubeRefHome = $dataAPI['group_youtubeRefHome'];
    $group_descriptionHome = $dataAPI['group_descriptionHome'];
    $group_subtitleHome = $dataAPI['group_subtitleHome'];
    
    if($groupType==1){
      $img = 'iconservice-1.png';
    }else if($groupType==2){
      $img = 'iconservice-1.png';
    }else if($groupType==3){
      $img = 'iconservice-1.png';
    }

    $url = new_token(15);
    if($dataAPI['customUrl']!=''){
      // $url = $dataAPI['customUrl'].'-'.new_token(2);
      $url = $dataAPI['customUrl'];

    }
    $imggroup_ImgHome = '';
    $imggroup_img2 = '';
    
    $group_ = getDataSQLv1(1,"SELECT * FROM group_ WHERE group_token=?",array($token));
    if(count($group_)>0){
      if($dataAPI['img']!=''){
        $img = $dataAPI['img'];
      }else{
        $img=$group_[0]['group_img'];
      }

      if($dataAPI['group_ImgHome']!=''){
        $imggroup_ImgHome = $dataAPI['group_ImgHome'];
      }else{
        $imggroup_ImgHome=$group_[0]['group_ImgHome'];
      }

      if($dataAPI['group_img2']!=''){
        $imggroup_img2 = $dataAPI['group_img2'];
      }else{
        $imggroup_img2=$group_[0]['group_img2'];
      }
      


      if($dataAPI['customUrl']!=''){
        $url = $dataAPI['customUrl'];
      }else{
        $url=$group_[0]['group_customURL'];
      }
      $update = updateSQL('group_','group_name=?,group_update=?,group_updateby=?,group_html=?,group_customURL=?,group_img=?,group_youtubeRefHome=?,group_descriptionHome=?,group_subtitleHome=?,group_ImgHome=?,group_img2=?','group_token=?',
      array($dataAPI['name'],$dateNow,$adminId,$dataAPI['html'],$url,$img,$group_youtubeRefHome,$group_descriptionHome,$group_subtitleHome,$imggroup_ImgHome,$imggroup_img2,$group_[0]['group_token']));
    }else{
      if($dataAPI['img']!=''){
        $img = $dataAPI['img'];
      }

      if($dataAPI['group_ImgHome']!=''){
        $imggroup_ImgHome = $dataAPI['group_ImgHome'];
      }

      
      if($dataAPI['group_img2']!=''){
        $imggroup_img2 = $dataAPI['group_img2'];
      }


      $token = new_token(20);
      insertSQL('group_',
      'group_name,group_update,group_updateby,group_html,group_customURL,group_img,group_type,group_token,group_status,group_youtubeRefHome,group_descriptionHome,group_subtitleHome,group_ImgHome,group_img2',
      array($dataAPI['name'],$dateNow,$adminId,$dataAPI['html'],$url,$img,$groupType,$token,1,$group_youtubeRefHome,$group_descriptionHome,$group_subtitleHome,$imggroup_ImgHome,$imggroup_img2));
    }
    array_push($dataGroup,array('token'=>$token));
    
   
  }

  // if(count($dataGroup)>0){
  //   $datareturn=array('status'=>200,'msg'=>'this data','data'=>$dataGroup);
  // }else{
  //   $datareturn=array('status'=>404,'msg'=>'you don\'t currently have permission to access this data','data'=>array());
  // }
  // return $datareturn;

  return setDataReturn($codeReturn,$dataGroup);
}



function getDataManageAdmin($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $dataGroup = array();
  if($type=='changeRole'){
    $dataAdmin = updateSQL('master_account','MasterRole=?','MasterId=?',array($dataAPI['newRole'],$dataAPI['MasterId']));

  }
  return setDataReturn($codeReturn,$dataGroup);

}

function getDataManageProduct($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $dataReturn = array();
  if($type=='view'){
    // $dataAdmin = updateSQL('master_account','MasterRole=?','MasterId=?',array($dataAPI['newRole'],$dataAPI['MasterId']));

  }else if($type=='View1'){
    $dataProduct = getDataSQLv1(1,"SELECT * FROM products 
     left join blogs on blogs_id=product_refbrand
     WHERE product_token=?",array($dataAPI['token']));
     foreach($dataProduct AS $product){
      $dataPriceOption = getDataSQLv1(1,"SELECT * FROM products_option WHERE option_ref=? AND option_status=1",array($product['product_id']));
      $dataImgDetail = getDataSQLv1(1,"SELECT * FROM products_img WHERE img_productId=? AND img_status=1",array($product['product_id']));
      $product['option'] = $dataPriceOption;
      $product['imgDetail'] = $dataImgDetail;
      array_push($dataReturn,$product);
     }

  }else if($type=='byBrand'){
    $search = '%'.$dataAPI['search'].'%';
    $conditions = '';
    $arrCondition = array();
    array_push($arrCondition,$search);
    array_push($arrCondition,$search);
    array_push($arrCondition,$search);
    array_push($arrCondition,$search);

    if($dataAPI['token']!='all'){
      array_push($arrCondition,$dataAPI['token']);
      $conditions = ' AND blogs_token=? ';
    }
    $dataProduct = getDataSQLv1(1,"SELECT * FROM products 
    left join master_account on product_lastupdateBy=MasterId 
    left join blogs on blogs_id=product_refbrand
    WHERE (MasterName like ? OR blogs_name like ? OR product_name like ? OR product_no like ?)
    ".$conditions,$arrCondition);

    foreach($dataProduct AS $product){
     $dataPriceOption = getDataSQLv1(1,"SELECT * FROM products_option WHERE option_ref=? AND option_status=1",array($product['product_id']));
     $dataImgDetail = getDataSQLv1(1,"SELECT * FROM products_img WHERE img_productId=? AND img_status=1",array($product['product_id']));
     $product['option'] = $dataPriceOption;
     $product['imgDetail'] = $dataImgDetail;

     $product['sales']  = getDataSQLv1(1,"SELECT * FROM orders_product
     left join products_option on ref_priceToken=option_token
     left join products on product_id=option_ref
     WHERE product_id=?",array($product['product_id']));

    //  $product['sales']  = countColumn('orders_product
    //  left join products_option on ref_priceToken=option_token
    //  left join products on product_id=option_ref
    //   WHERE product_id=?',array($product['product_id']));

     array_push($dataReturn,$product);
    }
  }else if($type=='ByToken'){
    $dataAPI = json_decode($dataAPI);
    foreach($dataAPI AS $pro){

      $dataProduct = getDataSQLv1(1,"SELECT * FROM  products_option
      left join products on option_ref=product_id
      left join blogs on blogs_id=product_refbrand
      WHERE option_token=? AND product_id=?",array($pro->tokenOfPrice,$pro->product));
      // // $dataProducts = array();
      foreach($dataProduct AS $product){
      // //   $dataPriceOption = getDataSQLv1(1,"SELECT * FROM products_option WHERE option_ref=? AND option_status=1",array($product['product_id']));
      // //   $dataImgDetail = getDataSQLv1(1,"SELECT * FROM products_img WHERE img_productId=? AND img_status=1",array($product['product_id']));
      // //   $product['option'] = $dataPriceOption;
      // //   $product['imgDetail'] = $dataImgDetail;
      // //   array_push($dataReturn,$product);
        $product['qty']=$pro->qty;
        array_push($dataReturn,$product);
      }

      // array_push($dataReturn,$pro);

      // array_push($dataReturn,$product);
    }
   
    // $dataReturn = $dataAPI;
  }
  return setDataReturn($codeReturn,$dataReturn);

}


function getDataOrder($type,$dataAPI,$dataoption){
  global $dateNow,$browser,$codeReturn;
  $dataReturn = array();
  if($type=='table'){
    $filterType =  $dataAPI['token'];
    $search = '%'.$dataAPI['search'].'%';
    $start = $dataAPI['start'];
    $end = $dataAPI['end'];

    $condition = '';
    if($filterType=='all'){
    }else if($filterType=='pending'){
      $condition .=" AND order_status=1 ";
    }else if($filterType=='confirmed'){
      $condition .=" AND order_status=2 ";
    }else if($filterType=='completed'){
      $condition .=" AND order_status=3 ";
    }else if($filterType=='reject'){
      $condition .=" AND order_status=0 ";
    }

    $condition .=" AND (";
    $condition .=" orderRunNo like '".$search."'";
    $condition .=" OR cs_name like '".$search."'";
    $condition .=" OR cs_company like '".$search."'";
    $condition .=" OR cs_taxID like '".$search."'";
    $condition .=" OR cs_phone like '".$search."'";
    $condition .=" OR cs_email like '".$search."'";
    $condition .=" OR cs_address like '".$search."'";
    $condition .=" OR cs_other like '".$search."'";
    $condition .=" OR order_deliveryTrackingNo like '".$search."'";
    $condition .=" OR order_deliveryCompany like '".$search."'";
    $condition .=" )";

    $condition2 =" AND ( product_refbrand=0 ";
    foreach($dataoption AS $key=> $idbrand){
      // $key>0?$condition2 .= " OR ":null;
      $condition2 .=" OR product_refbrand='".$idbrand."' ";
    }
    $condition2 .=" )";


    $dataOrder = getDataSQLv1(1,"SELECT * FROM orders WHERE order_status!=9 AND (order_createDate BETWEEN ? AND ?) ".$condition." order  by order_createDate desc ",array($start,$end));
    foreach($dataOrder AS $order){
      $dataProduct = getDataSQLv1(1,"SELECT * FROM orders_product
      left join products_option on ref_priceToken=option_token
      left join products on product_id=option_ref
       WHERE ReforderRunNo=? ".$condition2,array($order['orderRunNo']));
       if(count($dataProduct)>0){
        $order['product']=$dataProduct;
        array_push($dataReturn,$order);
       }
    
    
    }

  }else if($type=='detail'){
    $dataOrder = getDataSQLv1(1,"SELECT * FROM orders WHERE order_token=? ",array($dataAPI['token']));
    foreach($dataOrder AS $order){
      $dataProduct = getDataSQLv1(1,"SELECT * FROM orders_product
      left join products_option on ref_priceToken=option_token
      left join products on product_id=option_ref
       WHERE ReforderRunNo=? ",array($order['orderRunNo']));
      $order['product']=$dataProduct;


      $order['checkSlip'] = getDataSQLv1(1,"SELECT * FROM master_account WHERE MasterId=? ",array($order['order_checkSlipBy']));
      $order['deliveryby'] = getDataSQLv1(1,"SELECT * FROM master_account WHERE MasterId=? ",array($order['order_deliveryby']));

       array_push($dataReturn,$order);
    
    }
  }else if($type=='update1'){
    $adminId=$_SESSION["id-user-master"];

    $dataOrder = getDataSQLv1(1,"SELECT * FROM orders WHERE order_token=? ",array($dataAPI['token']));
    foreach($dataOrder AS $order){
       updateSQL('orders','order_checkSlipBy=?,order_checkSlipAt=?,order_status=?','order_token=?',array($adminId,$dateNow,$dataAPI['action'],$order['order_token']));
       if($dataAPI['action']==0){
        updateReturnStockOnOrderReject($order['orderRunNo']);
        $mail = SendEmailForCustomerOnRejectOrder($order['orderRunNo'],$order['cs_name'],$order['cs_email']);
       }else if($dataAPI['action']==2){
        $mail = SendEmailForCustomerOnConfirmOrder($order['orderRunNo'],$order['cs_name'],$order['cs_email']);
       }
      

       array_push($dataReturn,$order);
    }

    
  }else if($type=='update2'){
    $adminId=$_SESSION["id-user-master"];

    $dataOrder = getDataSQLv1(1,"SELECT * FROM orders WHERE order_token=? ",array($dataAPI['token']));
    foreach($dataOrder AS $order){
       updateSQL('orders','order_deliveryby=?,order_deliveryAt=?,order_deliveryTrackingNo=?,order_deliveryCompany=?,order_status=?','order_token=?',array($adminId,$dateNow,$dataAPI['tracking'],$dataAPI['trackingBy'],$dataAPI['action'],$order['order_token']));
       $mail = SendEmailForCustomerOnShipmented($order['orderRunNo'],$order['cs_name'],$order['cs_email']);
       array_push($dataReturn,$order);


    
    }
  }
  return setDataReturn($codeReturn,$dataReturn);
}



// function updateCutStockOnOrderComplete($orderNo){
//   $dataOrder = getDataSQLv1(1,"SELECT * FROM orders WHERE  orderRunNo=?",array($orderNo));
//   foreach($dataOrder AS $order){
//     $dataProduct = getDataSQLv1(1,"SELECT * FROM orders_product
//     left join products_option on ref_priceToken=option_token
//     left join products on product_id=option_ref
//      WHERE ReforderRunNo=? ",array($order['orderRunNo']));
//      foreach($dataProduct AS $product){
//       $numStockNew = $product['option_stock']-$product['numProduct'];
//       updateSQL('products_option','option_stock=?','option_token=? AND option_ref=?',array($numStockNew,$product['option_token'],$product['option_ref']));
//      }
//   }
// }
 
function updateReturnStockOnOrderReject($orderNo){
  $dataOrder = getDataSQLv1(1,"SELECT * FROM orders WHERE  orderRunNo=?",array($orderNo));
  foreach($dataOrder AS $order){
    $dataProduct = getDataSQLv1(1,"SELECT * FROM orders_product
    left join products_option on ref_priceToken=option_token
    left join products on product_id=option_ref
     WHERE ReforderRunNo=? ",array($order['orderRunNo']));
     foreach($dataProduct AS $product){
      $numStockNew = $product['option_stock']+$product['numProduct'];
      updateSQL('products_option','option_stock=?','option_token=? AND option_ref=?',array($numStockNew,$product['option_token'],$product['option_ref']));
     }
  }
}

  

?>