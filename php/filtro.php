<?php

class Filtro
{

  static function getMarcas($pdo)
  {
    $stmt = $pdo->query(
        <<<SQL
        SELECT DISTINCT marca
        FROM anuncio
        SQL
      );
  
    $marcas = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $marcas;
  }

  static function getModelos($pdo, $marca)
  {
    $stmt = $pdo->prepare(
        <<<SQL
        SELECT DISTINCT modelo
        FROM anuncio
        WHERE marca = ?
        SQL
      );
  
    $stmt->execute([$marca]);
    $modelos = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $modelos;
  }

  static function getCidades($pdo, $marca, $modelo)
  {
    $stmt = $pdo->prepare(
        <<<SQL
        SELECT DISTINCT cidade
        FROM anuncio
        WHERE marca = ? AND modelo = ?
        SQL
      );
  
    $stmt->execute([$marca, $modelo]);
    $cidades = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $cidades;
  }
}
