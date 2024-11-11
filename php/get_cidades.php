<?php
include 'conexao_sql.php';

$marca = $_GET['marca'];
$modelo = $_GET['modelo'];
$query = "SELECT DISTINCT Cidade FROM Anuncio WHERE Marca = ? AND Modelo = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $marca, $modelo);
$stmt->execute();
$result = $stmt->get_result();

$cidades = [];
while ($row = $result->fetch_assoc()) {
    $cidades[] = $row['Cidade'];
}

echo json_encode($cidades);
?>
