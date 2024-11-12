<?php

require "../php/conexao_sql.php";
require "../php/verifica-sessao.php";

session_start();
verificarSessao();

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../styles/common/general.css">
    <link rel="stylesheet" type="text/css" href="../styles/common/navbar.css">
    <link rel="stylesheet" type="text/css" href="../styles/common/form.css">
    <link rel="stylesheet" href="../styles/cria-anuncio-veiculo.css">

    <title>AutoMov - Criação de Anúncio</title>
</head>

<body>
    <nav class="internal-navbar">
        <div class="internal-container">
            <img src="../assets/logo/logo.png" alt="AutoMov" class="logo">
            <button id="logout-btn" class="internal-btn">Logout</button>
        </div>
    </nav>

    <div class="internal-container">
        <div class="internal-form-card">
            <h2>Criação de Anúncio de Veículo</h2>
            <form id= "form" action="../php/cria-anuncio-veiculo.php" method="post" enctype="multipart/form-data">

                <label for="marca">Marca do veículo:</label>
                <input type="text" id="marca" name="marca" required>

                <label for="modelo">Modelo:</label>
                <input type="text" id="modelo" name="modelo" required>

                <label for="ano">Ano de Fabricação:</label>
                <input type="number" id="ano" name="ano" min="1900" max="2024" required>

                <label for="cor">Cor:</label>
                <input type="text" id="cor" name="cor" required>

                <label for="quilometragem">Quilometragem:</label>
                <input type="number" id="quilometragem" name="quilometragem" required>

                <label for="descricao">Descrição:</label>
                <textarea id="descricao" name="descricao" rows="4" cols="50" required></textarea>

                <label for="valor">Valor:</label>
                <input type="number" id="valor" name="valor" required>

                <label for="estado">Estado:</label>
                <select id="estado" name="estado" required>
                    <option value="" disabled selected>Selecione o estado</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RR">RR</option>
                    <option value="RO">RO</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                </select>

                <label for="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" required>

                <label for="fotos">Fotos do veículo (mínimo 3):</label>
                <input type="file" id="fotos" name="fotos[]" multiple>

                <p id="message" class="message"></p>
                <input type="submit" class="internal-btn mt-4" value="Criar Anúncio">
            </form>
        </div>
    </div>

    <script src="../scripts/cria-anuncio-veiculo.js"></script>
</body>

</html>