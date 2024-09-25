window.onload = function () {
  generateStaticVehicleCards(5);
  implementInterestButtons();
};

function generateStaticVehicleCards(numCards) {
  const cardContainer = document.getElementById("cards-container");

  for (let i = 0; i < numCards; i++) {
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
              <h5 class="internal-card-title">Ford Fiesta</h5>
              <p class="internal-card-text"><b>Ano:</b> 2018</p>
              <p class="internal-card-text"><b>Cidade:</b> São Paulo</p>
              <p class="internal-card-text"><b>Preço:</b> R$ 45.000</p>
          </div>
          <div class="internal-card-footer">
              <button class="internal-btn internal-btn-block">Registrar interesse</button>
          </div>
      </div>
    `;

    cardContainer.innerHTML += cardHTML;
  }
}

function implementInterestButtons() {
  const interestButtons = document.querySelectorAll(
    ".internal-card-footer .internal-btn"
  );
  for (var button of interestButtons) {
    button.onclick = function () {
      window.location.href = "./pages/registro-interesse.html";
    };
  }
}

const goToLoginBtn = document.querySelector(
  ".go-to-login-container .internal-btn"
);
goToLoginBtn.onclick = function () {
  window.location.href = "./pages/login.html";
};
