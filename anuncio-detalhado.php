<?php

require "./php/conexao_sql.php";
require "./php/verifica-sessao.php";

session_start();
verificarSessao();

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./styles/common/general.css">
    <link rel="stylesheet" type="text/css" href="./styles/common/form.css">
    <link rel="stylesheet" type="text/css" href="./styles/common/navbar.css">
    <link rel="stylesheet" type="text/css" href="./styles/anuncio-detalhado.css">

    <title>AutoMov - Detalhes do Anúncio</title>
</head>

<body>
    <nav class="internal-navbar">
        <div class="internal-container">
            <img src="./assets/logo/logo.png" alt="AutoMov" class="logo">
            <button id="logout-btn" class="internal-btn">Logout</button>
        </div>
    </nav>

    <div class="internal-container">
        <div class="internal-form-card">
            <h2 class="mb-4 text-center">Detalhes do Veículo</h2>
            <div class="detalhes">
                <p id="anuncio-marca"></p>
                <p id="anuncio-modelo"></p>
                <p id="anuncio-ano"></p>
                <p id="anuncio-cor"></p>
                <p id="anuncio-quilometragem"></p>
                <p id="anuncio-descricao"></p>
                <p id="anuncio-valor"></p>
                <p id="anuncio-estado"></p>
                <p id="anuncio-cidade"></p>
            </div>
            <div class="fotos">
            </div>
        </div>
    </div>

    <script src="./scripts/anuncio-detalhado.js"></script>
</body>

</html>