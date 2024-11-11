<?php
include 'conexao_sql.php';

$marca = $_GET['marca'];
$query = "SELECT DISTINCT Modelo FROM Anuncio WHERE Marca = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $marca);
$stmt->execute();
$result = $stmt->get_result();

$modelos = [];
while ($row = $result->fetch_assoc()) {
    $modelos[] = $row['Modelo'];
}

echo json_encode($modelos);
?>
