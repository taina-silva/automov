<?php

require "../php/conexao_sql.php";

$pdo = conectaSql();

try {
    $stmt = $pdo->prepare(
      <<<SQL
      SELECT DISTINCT cidade
      FROM anuncio
      WHERE Marca = ? AND Modelo = ?
      SQL
    );

    $stmt->execute([$marca]);
    $cidades = $stmt->fetchAll(PDO::FETCH_OBJ);

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($cidades);
  } 
  catch (Exception $e) {
    exit('Falha inesperada: ' . $e->getMessage());
  }

?>