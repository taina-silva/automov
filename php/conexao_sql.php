<?php

function conectaSql()
{
  // $db_host = "localhost";
  // $db_username = "admin";
  // $db_password = "123123";
  // $db_name = "automov";

  $db_host = "sql110.infinityfree.com";
  $db_username = "if0_37101055";
  $db_password = "YZhi3brj8q1foY";
  $db_name = "if0_37101055_ppi";

  $options = [
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
  ];

  try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_username, $db_password, $options);
    return $pdo;
  } 
  catch (Exception $e) {
    exit('Ocorreu uma falha na conexão com o MySQL: ' . $e->getMessage());
  }
}

?>

