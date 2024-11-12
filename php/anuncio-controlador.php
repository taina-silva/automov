<?php

require "conexao_sql.php";
require "anuncio.php";

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

$pdo = conectaSql();

$acao = $_GET['acao'];

switch ($acao) {
    case 'cadastrar':
        $marca = $_POST['marca'] ?? '';
        $modelo = $_POST['modelo'] ?? '';
        $ano = $_POST['ano'] ?? '';
        $cor = $_POST['cor'] ?? '';
        $quilometragem = $_POST['quilometragem'] ?? '';
        $descricao = $_POST['descricao'] ?? '';
        $valor = $_POST['valor'] ?? '';
        $estado = $_POST['estado'] ?? '';
        $cidade = $_POST['cidade'] ?? '';
        $fotos = $_FILES['fotos'] ?? null;

        $idAnunciante = getAnuncianteId($pdo);

        if (!$idAnunciante) {
            $response = new CadastroResponse(false, 'Anunciante não encontrado.');
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
            exit;
        }

        $idAnuncio = Anuncio::create($pdo, $marca, $modelo, $ano, $cor, $quilometragem, $descricao, $valor, $estado, $cidade, $idAnunciante);
        if (is_object($idAnuncio)) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($idAnuncio);
            exit;
        }

        if ($fotos && count($fotos['name']) >= 1) {
            salvarFotos($pdo, $idAnuncio, $fotos);
        }

        $response = new CadastroResponse(true, 'Anúncio criado com sucesso.');
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($response);

        break;
    case 'buscar':
        $marca = $_GET['marca'] ?? '';
        $modelo = $_GET['modelo'] ?? '';
        $cidade = $_GET['cidade'] ?? '';

        $anuncios = Anuncio::get($pdo, $marca, $modelo, $cidade);
        echo json_encode($anuncios);

        break;
    case 'buscarPorId':
        $idAnunciante = getAnuncianteId($pdo);

        if (!$idAnunciante) {
            echo json_encode([]);
            exit;
        }

        $anuncios = Anuncio::getById($pdo, $idAnunciante);
        echo json_encode($anuncios);

        break;
    case 'buscarFotos':
        $idAnuncio = $_GET['idAnuncio'] ?? '';

        $fotos = Anuncio::getFotos($pdo, $idAnuncio);
        echo json_encode($fotos);

        break;
    case 'remover':
        $idAnuncio = $_GET['idAnuncio'] ?? '';

        $result = Anuncio::remove($pdo, $idAnuncio);
        echo json_encode($result);

        break;
    default:
        echo json_encode(["error" => "Ação não reconhecida"]);
}

function getAnuncianteId($pdo)
{
    session_start();
    if (!isset($_SESSION['user'])) {
        return null;
    }

    $email = $_SESSION['user'];
    $stmt = $pdo->prepare("SELECT id FROM anunciante WHERE email = ?");
    $stmt->execute([$email]);
    return $stmt->fetchColumn();
}

function salvarFotos($pdo, $idAnuncio, $arquivos) {
    $diretorioDestino = '../uploads/';

    foreach ($arquivos['name'] as $key => $nomeArquivo) {
        $caminhoTemporario = $arquivos['tmp_name'][$key];
        $caminhoDestino = $diretorioDestino . uniqid() . '-' . basename($nomeArquivo);

        $sql = "INSERT INTO foto (idAnuncio, caminho) VALUES (:idAnuncio, :caminho)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':idAnuncio', $idAnuncio, PDO::PARAM_INT);
        $stmt->bindParam(':caminho', $caminhoDestino, PDO::PARAM_STR);
        $stmt->execute();

        // TODO: precisa arrumar
        
        // if ($arquivos['error'][$key] === UPLOAD_ERR_OK) {
        //     $caminhoTemporario = $arquivos['tmp_name'][$key];
        //     $caminhoDestino = $diretorioDestino . uniqid() . '-' . basename($nomeArquivo);

        //     if (move_uploaded_file($caminhoTemporario, $caminhoDestino)) {
        //         $sql = "INSERT INTO foto (idAnuncio, caminho) VALUES (:idAnuncio, :caminho)";
        //         $stmt = $pdo->prepare($sql);
        //         $stmt->bindParam(':idAnuncio', $idAnuncio, PDO::PARAM_INT);
        //         $stmt->bindParam(':caminho', $caminhoDestino, PDO::PARAM_STR);
        //         $stmt->execute();
        //     } else {
        //         echo "Erro ao mover o arquivo $nomeArquivo.";
        //     }
        // } else {
        //     echo "Erro no upload do arquivo $nomeArquivo.";
        // }
    }
}

?>