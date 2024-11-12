<?php

require "../php/conexao_sql.php";

$pdo = conectaSql();

try {
    $stmt = $pdo->prepare(
      <<<SQL
      SELECT DISTINCT modelo
      FROM anuncio
      WHERE marca = ?
      SQL
    );

    $stmt->execute([$marca]);
    $modelos = $stmt->fetchAll(PDO::FETCH_OBJ);

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($modelos);
  } 
  catch (Exception $e) {
    exit('Falha inesperada: ' . $e->getMessage());
  }

?>