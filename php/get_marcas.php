<?php
include 'conexao_sql.php';

$query = "SELECT DISTINCT Marca FROM Anuncio";
$result = mysqli_query($conn, $query);

$marcas = [];
while ($row = mysqli_fetch_assoc($result)) {
    $marcas[] = $row['Marca'];
}

echo json_encode($marcas);
?>
