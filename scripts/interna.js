window.onload = function () {
  generateStaticAdsCards(5);
};

function generateStaticAdsCards(numCards) {
  const cardHTML = `
              <div class="internal-card">
                  <img src="../assets/images/car.png" class="internal-card-img" alt="Carro" />
                  <div class="internal-card-body">
                      <div>
                          <h5 class="internal-card-title">Ford Fiesta</h5>
                          <p class="internal-card-text"><b>Ano:</b> 2018</p>
                          <p class="internal-card-text"><b>Cidade:</b> São Paulo</p>
                          <p class="internal-card-text"><b>Preço:</b> R$ 45.000</p>
                      </div>
                      <div class="dropup">
                          <button class="internal-btn dropdown-toggle" type="button" id="dropupLeftButton"
                              data-bs-toggle="dropdown" aria-expanded="false">
                              Opções
                          </button>
                          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropupLeftButton">
                              <li><a class="dropdown-item" href="#">Visualizar</a></li>
                              <li><a class="dropdown-item" href="#">Interesses</a></li>
                              <li><a class="dropdown-item" href="#">Deletar</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
            `;

  const cardContainer = document.getElementById("cards-container");

  for (let i = 0; i < numCards; i++) {
    cardContainer.innerHTML += cardHTML;
  }
}

const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  window.location.href = "login.html";
};