document.addEventListener("DOMContentLoaded", function () {
    loadMarcas();

    document.getElementById("marca").addEventListener("change", function () {
        loadModelos(this.value);
    });

    document.getElementById("modelo").addEventListener("change", function () {
        loadCidades(document.getElementById("marca").value, this.value);
    });

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        loadAnuncios();
    });
});

function loadMarcas() {
    fetch("./php/get-marcas.php")
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error("Erro na resposta da requisição");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const marcaSelect = document.getElementById("marca");
            marcaSelect.innerHTML = '<option value="">Selecione a marca</option>';
            data.forEach(marca => {
                const option = document.createElement("option");
                option.value = marca;
                option.textContent = marca;
                marcaSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar marcas:", error);
        });
}

function loadModelos(marca) {
    if (!marca) return;
    fetch(`./php/get-modelos.php?marca=${marca}`)
        .then(response => response.json())
        .then(data => {
            const modeloSelect = document.getElementById("modelo");
            modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
            data.forEach(modelo => {
                const option = document.createElement("option");
                option.value = modelo;
                option.textContent = modelo;
                modeloSelect.appendChild(option);
            });
        });
}

function loadCidades(marca, modelo) {
    if (!modelo) return;
    fetch(`./php/get-cidades.php?marca=${marca}&modelo=${modelo}`)
        .then(response => response.json())
        .then(data => {
            const cidadeSelect = document.getElementById("cidade");
            cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';
            data.forEach(cidade => {
                const option = document.createElement("option");
                option.value = cidade;
                option.textContent = cidade;
                cidadeSelect.appendChild(option);
            });
        });
}

function loadAnuncios() {
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const cidade = document.getElementById("cidade").value;

    fetch(`./php/get-anuncios.php?marca=${marca}&modelo=${modelo}&cidade=${cidade}`)
        .then(response => response.json())
        .then(data => {
            const cardsContainer = document.getElementById("cards-container");
            cardsContainer.innerHTML = "";

            data.forEach(anuncio => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <h4>${anuncio.marca} ${anuncio.modelo} - ${anuncio.ano}</h4>
                    <p>Quilometragem: ${anuncio.quilometragem} km</p>
                    <p>Cor: ${anuncio.cor}</p>
                    <p>Localização: ${anuncio.cidade}, ${anuncio.estado}</p>
                    <p>Valor: R$ ${anuncio.valor}</p>
                `;
                cardsContainer.appendChild(card);
            });
        });
}
