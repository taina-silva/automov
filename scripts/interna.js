window.onload = function () {
  generateStaticAdsCards(5);
};

function generateStaticAdsCards(numCards) {
  const cardContainer = document.getElementById("cards-container");

  for (let i = 0; i < numCards; i++) {
    const carouselId = `interna-carousel-${i}`;
    const cardHTML = `
              <div class="internal-card" id="card-${i}">
                  <h5 class="internal-ad-title">Anúncio ${i + 1}</h5>
                  <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="../assets/images/car-1.png" class="d-block w-100">
                      </div>
                      <div class="carousel-item">
                        <img src="../assets/images/car-2.png" class="d-block w-100">
                      </div>
                      <div class="carousel-item">
                        <img src="../assets/images/car-3.png" class="d-block w-100">
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
                    <div>
                        <p class="internal-card-text"><b>Marca:</b> Ford</p>
                        <p class="internal-card-text"><b>Modelo:</b> Fiesta</p>
                        <p class="internal-card-text"><b>Ano:</b> 2018</p>
                    </div>
                    <div class="dropup">
                      <button class="internal-btn dropdown-toggle" type="button" id="dropupLeftButton"
                          data-bs-toggle="dropdown" aria-expanded="false">
                          Opções
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropupLeftButton">
                          <li><button class="dropdown-item" data-card-index="${i}" data-action="detalhes">Ver detalhes</button></li>
                          <li><button class="dropdown-item" data-card-index="${i}" data-action="interesses">Ver interesses</button></li>
                          <li><button class="dropdown-item" data-card-index="${i}" data-action="deletar">Deletar</button></li>
                      </ul>
                    </div>
                  </div>
              </div>
            `;

    cardContainer.innerHTML += cardHTML;
  }
}

document
  .getElementById("cards-container")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("dropdown-item")) {
      const cardIndex = event.target.getAttribute("data-card-index");
      const action = event.target.getAttribute("data-action");

      if (action === "detalhes") {
        detalhesCard(cardIndex);
      } else if (action === "interesses") {
        mostrarInteresses(cardIndex);
      } else if (action === "deletar") {
        deletarCard(cardIndex);
      }
    }
  });

function detalhesCard(index) {
  window.location.href = "anuncio-detalhado.html";
}

function mostrarInteresses(index) {
  window.location.href = "lista-interesses.html";
}

function deletarCard(index) {
  const cardElement = document.getElementById(`card-${index}`);
  if (cardElement) cardElement.remove();
}

const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  window.location.href = "login.html";
};

const novoAnunctionBtn = document.querySelector("#novo-anuncio-btn");
novoAnunctionBtn.onclick = function () {
  window.location.href = "cria-anuncio-veiculo.html";
};
