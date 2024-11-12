<?php

require "../php/conexao_sql.php";

$pdo = conectaSql();

$marca = $_GET['marca'] ?? '';
$modelo = $_GET['modelo'] ?? '';
$cidade = $_GET['cidade'] ?? '';

$query = "SELECT * FROM Anuncio WHERE 1=1";
$params = [];
$types = "";

if ($marca) {
    $query .= " AND Marca = ?";
    $params[] = $marca;
    $types .= "s";
}

if ($modelo) {
    $query .= " AND Modelo = ?";
    $params[] = $modelo;
    $types .= "s";
}

if ($cidade) {
    $query .= " AND Cidade = ?";
    $params[] = $cidade;
    $types .= "s";
}

$query .= " ORDER BY DataHora DESC LIMIT 20";
$stmt = $conn->prepare($query);

if ($params) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$anuncios = [];
while ($row = $result->fetch_assoc()) {
    $anuncios[] = $row;
}

echo json_encode($anuncios);
?>
