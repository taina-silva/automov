<?php

require "conexao_sql.php";

class RegistroInteresseResponse
{
    public $success;
    public $message;

    function __construct($success, $message)
    {
        $this->success = $success;
        $this->message = $message;
    }
}

function registrarInteresse($pdo, $nome, $telefone, $mensagem, $idAnuncio)
{
    try {
        $stmt = $pdo->prepare("INSERT INTO interesse (nome, telefone, mensagem, idAnuncio) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nome, $telefone, $mensagem, $idAnuncio]);

        return $pdo->lastInsertId();
    } 
    catch (Exception $e) {
        return new RegistroInteresseResponse(false, 'Falha ao registrar interesse: ' . $e->getMessage());
    }
}

$nome = $_POST['nome'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';
$idAnuncio = $_POST['idAnuncio'] ?? '';

$pdo = conectaSql();

$idInteresse = registrarInteresse($pdo, $nome, $telefone, $mensagem, $idAnuncio);
if (is_object($idInteresse)) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($idInteresse);
    exit;
}

$response = new RegistroInteresseResponse(true, 'Interesse registrado com sucesso.');
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);

?>
