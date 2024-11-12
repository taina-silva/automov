<?php

require "conexao_sql.php";
require "interesse.php";

class RegistroResponse
{
    public $success;
    public $message;

    function __construct($success, $message)
    {
        $this->success = $success;
        $this->message = $message;
    }
}

$pdo = conectaSql();

$acao = $_GET['acao'];

switch ($acao) {
    case 'registrar':
        $nome = $_POST['nome'] ?? '';
        $telefone = $_POST['telefone'] ?? '';
        $mensagem = $_POST['mensagem'] ?? '';
        $idAnuncio = $_POST['idAnuncio'] ?? '';

        $idInteresse = Interesse::create($pdo, $nome, $telefone, $mensagem, $idAnuncio);
        if (is_object($idInteresse)) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($idInteresse);
            exit;
        }

        $response = new RegistroResponse(true, 'Registro de interesse realizado com sucesso.');
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($response);

        break;
    case 'buscar':
        $idAnuncio = $_GET['idAnuncio'] ?? '';

        $interesses = Interesse::get($pdo, $idAnuncio);
        echo json_encode($interesses);

        break;
    default:
        echo json_encode(["error" => "Ação não reconhecida"]);
}

?>