<?php

require "conexao_sql.php";

class CadastroResponse
{
  public $success;
  public $message;

  function __construct($success, $message)
  {
    $this->success = $success;
    $this->message = $message;
  }
}

function cadastrarAnunciante($pdo, $nome, $cpf, $email, $senha, $telefone)
{
  $sql = <<<SQL
    INSERT INTO anunciante (nome, cpf, email, senha, telefone)
    VALUES (?, ?, ?, ?, ?)
    SQL;

  try {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM anunciante WHERE email = ? OR cpf = ?");
    $stmt->execute([$email, $cpf]);

    if ($stmt->fetchColumn() > 0) {
      return new CadastroResponse(false, 'Email ou CPF já cadastrado.');
    }

    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    $cpf = str_replace(['.', '-'], '', $cpf);
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $cpf, $email, $senhaHash, $telefone]);

    return new CadastroResponse(true, 'Cadastro realizado com sucesso.');
  } 
  catch (Exception $e) {
    return new CadastroResponse(false, 'Falha inesperada: ' . $e->getMessage());
  }
}

$nome = $_POST['nome'] ?? '';
$cpf = $_POST['cpf'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$telefone = $_POST['telefone'] ?? '';

$pdo = conectaSql();

$response = cadastrarAnunciante($pdo, $nome, $cpf, $email, $senha, $telefone);

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);

?>
