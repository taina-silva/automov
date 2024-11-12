<?php

require "conexao_sql.php";

class LoginResponse
{
  public $success;
  public $location;

  function __construct($success, $location)
  {
    $this->success = $success;
    $this->location = $location;
  }
}

function verificarCredenciais($pdo, $email, $senha)
{
  $sql = <<<SQL
    SELECT senha as senhaHash
    FROM anunciante
    WHERE email = ?
    SQL;

  try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    $senhaHash = $stmt->fetchColumn();

    if (!$senhaHash) 
      return false; 

    if (!password_verify($senha, $senhaHash))
      return false;
      
    return true;
  } 
  catch (Exception $e) {
    exit('Falha inesperada: ' . $e->getMessage());
  }
}

$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

$pdo = conectaSql();

if (verificarCredenciais($pdo, $email, $senha)) {
  $cookieParams = session_get_cookie_params();
  $cookieParams['httponly'] = true;
  session_set_cookie_params($cookieParams);
  
  session_start();

  $_SESSION['loggedIn'] = true;
  $_SESSION['user'] = $email;

  $response = new LoginResponse(true, 'interna.php');
} 
else
  $response = new LoginResponse(false, ''); 

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);

?>