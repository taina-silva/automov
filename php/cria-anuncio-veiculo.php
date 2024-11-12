<?php

require "../php/conexao_sql.php";

class CriaAnuncioVeiculoResponse
{
    public $success;
    public $message;

    function __construct($success, $message)
    {
        $this->success = $success;
        $this->message = $message;
    }
}

function criarAnuncio($pdo, $marca, $modelo, $ano, $cor, $quilometragem, $descricao, $valor, $estado, $cidade, $idAnunciante)
{
    try {
        $stmt = $pdo->prepare("INSERT INTO anuncio (marca, modelo, ano, cor, quilometragem, descricao, valor, estado, cidade, idAnunciante) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$marca, $modelo, $ano, $cor, $quilometragem, $descricao, $valor, $estado, $cidade, $idAnunciante]);

        return $pdo->lastInsertId();
    } 
    catch (Exception $e) {
        return new CriaAnuncioVeiculoResponse(false, 'Falha ao criar anúncio: ' . $e->getMessage());
    }
}

function salvarFotos($pdo, $idAnuncio, $arquivos) {
    $diretorioDestino = 'uploads/';

    foreach ($arquivos['name'] as $key => $nomeArquivo) {
        if ($arquivos['error'][$key] === UPLOAD_ERR_OK) {
            $caminhoTemporario = $arquivos['tmp_name'][$key];
            $caminhoDestino = $diretorioDestino . uniqid() . '-' . basename($nomeArquivo);

            if (move_uploaded_file($caminhoTemporario, $caminhoDestino)) {
                $sql = "INSERT INTO fotos (id_anuncio, caminho) VALUES (:idAnuncio, :caminho)";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':idAnuncio', $idAnuncio, PDO::PARAM_INT);
                $stmt->bindParam(':caminho', $caminhoDestino, PDO::PARAM_STR);
                $stmt->execute();
            } else {
                echo "Erro ao mover o arquivo $nomeArquivo.";
            }
        } else {
            echo "Erro no upload do arquivo $nomeArquivo.";
        }
    }
}


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

$pdo = conectaSql();

$idAnunciante = getAnuncianteId($pdo);

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


if (!$idAnunciante) {
    $response = new CriaAnuncioVeiculoResponse(false, 'Anunciante não encontrado.');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);
    exit;
}

$idAnuncio = criarAnuncio($pdo, $marca, $modelo, $ano, $cor, $quilometragem, $descricao, $valor, $estado, $cidade, $idAnunciante);
if (is_object($idAnuncio)) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($idAnuncio);
    exit;
}

if ($fotos && count($fotos['name']) >= 3) {
    salvarFotos($pdo, $idAnuncio, $fotos);
}

$response = new CriaAnuncioVeiculoResponse(true, 'Anúncio criado com sucesso.');
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);

?>
