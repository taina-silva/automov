<?php
header('Content-Type: application/json');
require "../php/conexao_sql.php";

// Estabelece a conexão com o banco de dados
$pdo = conectaSql();

// Verifica se o ID do anúncio foi enviado
if (!isset($_GET['idAnuncio'])) {
    echo json_encode(["error" => "ID do anúncio não fornecido"]);
    exit;
}

$idAnuncio = intval($_GET['idAnuncio']);

// Consulta para obter os interesses pelo ID do anúncio
try {
    $stmt = $pdo->prepare("SELECT Nome, Telefone, Mensagem, DataHora FROM Interesse WHERE IdAnuncio = :idAnuncio");
    $stmt->bindParam(':idAnuncio', $idAnuncio, PDO::PARAM_INT);
    $stmt->execute();
    
    $interesses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($interesses);

} catch (PDOException $e) {
    echo json_encode(["error" => "Erro ao buscar interesses: " . $e->getMessage()]);
}
?>
