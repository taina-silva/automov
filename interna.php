<?php

require "./php/conexao_sql.php";
require "./php/verifica-sessao.php";

session_start();

verificarSessao();
$pdo = conectaSql();

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./styles/common/general.css">
    <link rel="stylesheet" type="text/css" href="./styles/common/navbar.css">
    <link rel="stylesheet" type="text/css" href="./styles/common/cards.css">
    <link rel="stylesheet" type="text/css" href="./styles/interna.css">

    <title>AutoMov - Lista de Anúncios</title>
</head>

<body>
    <nav class="internal-navbar">
        <div class="internal-container">
            <img src="./assets/logo/logo.png" alt="AutoMov" class="logo">
            <button id="logout-btn" class="internal-btn">Logout</button>
        </div>
    </nav>

    <div class="ads-container">
        <h3>Seus Anúncios</h3>
        <button id="novo-anuncio-btn" class="internal-btn">Criar novo anúncio</button>
    </div>

    <div class="internal-container">
        <div id="cards-container" class="internal-cards-grid"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./scripts/interna.js"></script>
</body>

</html>