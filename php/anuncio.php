<?php

class Anuncio
{

  static function create($pdo, $marca, $modelo, $ano, $cor, $quilometragem, $descricao, $valor, $estado, $cidade, $idAnunciante)
  {
    $stmt = $pdo->prepare(
        <<<SQL
        INSERT INTO anuncio (marca, modelo, ano, cor, quilometragem, descricao, valor, estado, cidade, idAnunciante)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        SQL
    );

    $stmt->execute([$marca, $modelo, $ano, $cor, $quilometragem, $descricao, $valor, $estado, $cidade, $idAnunciante]);

    return $pdo->lastInsertId();
  }

  static function get($pdo, $marca, $modelo, $cidade)
  {
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

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);

    $anuncios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $anuncios;
  }

  static function getById($pdo, $id)
  {
    $stmt = $pdo->prepare(
        <<<SQL
        SELECT *
        FROM anuncio
        WHERE idAnunciante = ?
        LIMIT 20
        SQL
    );

    $stmt->execute([$id]);
    $anuncios = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $anuncios;
  }

  static function getFotos($pdo, $id)
  {
    $stmt = $pdo->prepare(
        <<<SQL
        SELECT *
        FROM foto
        WHERE idAnuncio = ?
        SQL
    );

    $stmt->execute([$id]);
    $fotos = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $fotos;
  }

  static function remove($pdo, $id)
  {
    $stmt = $pdo->prepare(
        <<<SQL
        DELETE 
        FROM anuncio
        WHERE id = ?
        LIMIT 1
        SQL
    );

    $stmt->execute([$id]);
  }
}
