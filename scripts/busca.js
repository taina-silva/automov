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
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta da requisição");
      }
      return response.json();
    })
    .then((data) => {
      const marcaSelect = document.getElementById("marca");
      marcaSelect.innerHTML = '<option value="">Selecione a marca</option>';
      data.forEach((marca) => {
        const option = document.createElement("option");
        option.value = marca.marca;
        option.textContent = marca.marca;
        marcaSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar marcas:", error);
    });
}

function loadModelos(marca) {
  if (!marca) return;

  fetch(`./php/get-modelos.php?marca=${marca}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta da requisição");
      }
      return response.json();
    })
    .then((data) => {
      const modeloSelect = document.getElementById("modelo");
      modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
      data.forEach((modelo) => {
        const option = document.createElement("option");
        option.value = modelo.modelo;
        option.textContent = modelo.modelo;
        modeloSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar modelos:", error);
    });
}

function loadCidades(marca, modelo) {
  if (!modelo) return;

  fetch(`./php/get-cidades.php?marca=${marca}&modelo=${modelo}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta da requisição");
      }
      return response.json();
    })
    .then((data) => {
      const cidadeSelect = document.getElementById("cidade");
      cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';
      data.forEach((cidade) => {
        const option = document.createElement("option");
        option.value = cidade.cidade;
        option.textContent = cidade.cidade;
        cidadeSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar cidades:", error);
    });
}

function loadAnuncios() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const cidade = document.getElementById("cidade").value;

  fetch(
    `./php/get-anuncios.php?marca=${marca}&modelo=${modelo}&cidade=${cidade}`
  )
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.getElementById("cards-container");
      const index = 0;

      data.forEach((anuncio) => {
        const cardHTML = generateStaticVehicleCard(anuncio, index);
        cardsContainer.innerHTML += cardHTML;

        index++;
      });
    });
}

function generateStaticVehicleCard(anuncio, i) {
  const carouselId = `index-carousel-${i}`;
  const cardHTML = `
      <div class="internal-card">
          <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="./assets/images/car-1.png" class="d-block w-100">
              </div>
              <div class="carousel-item">
                <img src="./assets/images/car-2.png" class="d-block w-100">
              </div>
              <div class="carousel-item">
                <img src="./assets/images/car-3.png" class="d-block w-100">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
          <div class="internal-card-body">
              <h5 class="internal-card-title"> ${anuncio.marca}</h5>
              <p class="internal-card-text"><b>Ano:</b> ${anuncio.ano}</p>
              <p class="internal-card-text"><b>Cidade:</b> ${anuncio.cidade}</p>
              <p class="internal-card-text"><b>Preço:</b> R$ ${anuncio.valor}</p>
          </div>
          <div class="internal-card-footer">
              <button class="internal-btn internal-btn-block">Registrar interesse</button>
          </div>
      </div>
    `;

  return cardHTML;
}
