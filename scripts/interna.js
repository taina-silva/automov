const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  window.location.href = "./php/logout.php";
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
};

const novoAnuncioBtn = document.querySelector("#novo-anuncio-btn");
novoAnuncioBtn.onclick = function () {
  window.location.href = "cria-anuncio-veiculo.php";
};

window.onload = function () {
  loadAnuncios();
};

function loadAnuncios() {
  fetch(`./php/anuncio-controlador.php?acao=buscarPorId`)
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.getElementById("cards-container");
      let index = 0;

      data.forEach((anuncio) => {
        fetch(
          `./php/anuncio-controlador.php?acao=buscarFotos&idAnuncio=${anuncio.id}`
        )
          .then((response) => response.json())
          .then((fotos) => {
            const cardHTML = gerarCardAnuncio(anuncio, fotos, index);
            cardsContainer.innerHTML += cardHTML;

            index++;
          });
      });
    });
}

function gerarCardAnuncio(anuncio, fotos, i) {
  const anuncioJson = JSON.stringify(anuncio).replace(/'/g, "\\'");
  const fotosJson = JSON.stringify(fotos.map((foto) => foto.caminho));

  const carouselId = `index-carousel-${i}`;
  const carouselItems = fotos
    .map((foto, index) => {
      return `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="${foto.caminho}" alt="${foto.caminho}" class="d-block w-100">
      </div>
    `;
    })
    .join("");

  const cardHTML = `
      <div class="internal-card" id="card-${i}">
          <h5 class="internal-ad-title">Anúncio ${i + 1}</h5>
          <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
          <div class="internal-card-body">
            <div>
                <p class="internal-card-text"><b>Marca:</b> ${anuncio.marca}</p>
                <p class="internal-card-text"><b>Modelo:</b> ${
                  anuncio.modelo
                }</p>
                <p class="internal-card-text"><b>Ano:</b> ${anuncio.ano}</p>
            </div>
            <div class="dropup">
              <button class="internal-btn dropdown-toggle" type="button" id="dropupLeftButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Opções
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropupLeftButton">
                  <li><button class="dropdown-item" data-card-index="${i}" data-action="detalhes" onclick='detalhes(${anuncioJson}, ${fotosJson})'>Ver detalhes</button></li>
                  <li><button class="dropdown-item" data-card-index="${i}" data-action="interesses" onclick='interesses(${anuncioJson})'>Ver interesses</button></li>
                  <li><button class="dropdown-item" data-card-index="${i}" data-action="deletar" onclick='remover(${anuncioJson})'>Deletar</button></li>
              </ul>
            </div>
          </div>
      </div>
    `;

  return cardHTML;
}

function detalhes(anuncio, fotos) {
  localStorage.setItem("anuncio", JSON.stringify(anuncio));
  localStorage.setItem("fotos", JSON.stringify(fotos));

  window.location.href = "anuncio-detalhado.php";
}

function interesses(anuncio) {
  localStorage.setItem("anuncio", JSON.stringify(anuncio));
  window.location.href = "lista-interesses.php";
}

function remover(anuncio) {
  fetch(
    `./php/anuncio-controlador.php?acao=remover&idAnuncio=${anuncio.id}`
  ).then((_) => window.location.reload());
}
