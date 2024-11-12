<?php

class Interesse
{

  static function create($pdo, $nome, $telefone, $mensagem, $idAnuncio)
  {
    $stmt = $pdo->prepare(
        <<<SQL
        INSERT INTO interesse (nome, telefone, mensagem, idAnuncio)
        VALUES (?, ?, ?, ?)
        SQL
    );

    $stmt->execute([$nome, $telefone, $mensagem, $idAnuncio]);

    return $pdo->lastInsertId();
  }

  static function get($pdo, $id)
  {
    $stmt = $pdo->prepare(
        <<<SQL
        SELECT *
        FROM interesse
        WHERE idAnuncio = ?
        LIMIT 20
        SQL
    );

    $stmt->execute([$id]);
    $anuncios = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $anuncios;
  }
}
