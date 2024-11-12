<?php

require "../php/conexao_sql.php";

function getAnuncianteId($pdo)
{
    if (!isset($_SESSION['user'])) {
        return null;
    }

    $email = $_SESSION['user'];
    $stmt = $pdo->prepare("SELECT id FROM anunciante WHERE email = ?");
    $stmt->execute([$email]);
    return $stmt->fetchColumn();
}
