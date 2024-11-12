<?php

require "../php/conexao_sql.php";

// Use PDO for database connection
$pdo = conectaSql();

$marca = $_GET['marca'] ?? '';
$modelo = $_GET['modelo'] ?? '';
$cidade = $_GET['cidade'] ?? '';

// Start the query with a basic condition to ensure no empty WHERE clause
$query = "SELECT * FROM anuncio WHERE 1=1";
$params = [];

if ($marca) {
    $query .= " AND marca = :marca";
    $params[':marca'] = $marca;
}

if ($modelo) {
    $query .= " AND modelo = :modelo";
    $params[':modelo'] = $modelo;
}

if ($cidade) {
    $query .= " AND cidade = :cidade";
    $params[':cidade'] = $cidade;
}

$query .= " ORDER BY dataHora DESC LIMIT 20";

// Prepare the statement
$stmt = $pdo->prepare($query);

// Execute the query with parameters
$stmt->execute($params);

// Fetch the results
$anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return the results as a JSON response
echo json_encode($anuncios);

?>
