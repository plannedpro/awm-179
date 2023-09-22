<?php

/** *//** *//** *//** *//*
$host="localhost";
$user="plannedp_clinic";
$pass = "ZQkycG91Er";
$db_name="plannedp_clinic";
/**//*/** *//** *//** *//** *//** *//** *//*
$host="localhost";
$user="root";
$pass = "";
$db_name="cleancare";

/**//** *//** *//** *//*
$host="localhost";
$user="plannedp_demo";
$pass = "ZQkycG91Er";
$db_name="plannedp_demo";
/**//**//** *//** *//*
$host="localhost";
$user="root";
$pass = "";
$db_name="project_lib";
/**/
/** */
$host="localhost";
$user="plannedp_awm179";
$pass = "IpMQgcB8n";
$db_name="plannedp_awm179";
/**/
try{
    $db= new PDO('mysql:host='.$host.';dbname='.$db_name.';charset=utf8',$user,$pass);
    $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $db->query("set names utf8");
    // echo 'connected';
}catch(PDOException $ex){
    echo $ex->getMessage();
    // echo 'not connect';

}


/*
mysql_query("SET NAMES UTF8");
mysql_query("SET character_set_results=utf8");
mysql_query("SET character_set_client=utf8");
mysql_query("SET character_set_connection=utf8");
mysql_query("SET NAMES UTF8");
*/





?>
