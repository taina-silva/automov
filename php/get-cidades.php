<?php

require "../php/conexao_sql.php";

$pdo = conectaSql();

$marca = $_GET['marca'] ?? '';
$modelo = $_GET['modelo'] ?? '';

try {
    $stmt = $pdo->prepare(
      <<<SQL
      SELECT DISTINCT cidade
      FROM anuncio
      WHERE marca = ? AND modelo = ?
      SQL
    );

    $stmt->execute([$marca, $modelo]);
    $cidades = $stmt->fetchAll(PDO::FETCH_OBJ);

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($cidades);
  } 
  catch (Exception $e) {
    exit('Falha inesperada: ' . $e->getMessage());
  }

?>