<?php

require "../php/conexao_sql.php";

$pdo = conectaSql();

try {
    $stmt = $pdo->query(
      <<<SQL
      SELECT DISTINCT marca 
      FROM anuncio
      SQL
    );

    $marcas = $stmt->fetchAll(PDO::FETCH_OBJ);
    
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($marcas);
} 
    catch (Exception $e) {
    exit('Falha inesperada: ' . $e->getMessage());
}

?>
