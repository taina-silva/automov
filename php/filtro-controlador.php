<?php

require "conexao_sql.php";
require "filtro.php";

$pdo = conectaSql();

$acao = $_GET['acao'];

switch ($acao) {
    case 'buscarMarcas':
        $marcas = Filtro::getMarcas($pdo);
        echo json_encode($marcas);

        break;
    case 'buscarModelos':
        $marca = $_GET['marca'];

        $modelos = Filtro::getModelos($pdo, $marca);
        echo json_encode($modelos);

        break;
    case 'buscarCidades':
        $marca = $_GET['marca'];
        $modelo = $_GET['modelo'];

        $cidades = Filtro::getCidades($pdo, $marca, $modelo);
        echo json_encode($cidades);

        break;
    default:
        echo json_encode(["error" => "Ação não reconhecida"]);
}

?>