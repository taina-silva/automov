window.onload = function () {
  generateStaticVehicleCards(5);
  implementInterestButtons();
};

function generateStaticVehicleCards(numCards) {
  const cardHTML = `
              <div class="internal-card">
                  <img src="./assets/images/car.png" class="internal-card-img" alt="Carro" />
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

  const cardContainer = document.getElementById("cards-container");

  for (let i = 0; i < numCards; i++) {
    cardContainer.innerHTML += cardHTML;
  }
}

function implementInterestButtons() {
  const interestButtons = document.querySelectorAll(".internal-card-footer .internal-btn");
  for (var button of interestButtons) {
    button.onclick = function () {
      window.location.href="./pages/registro-interesse.html";
    };
  }
}

const goToLoginBtn = document.querySelector(".go-to-login-container .internal-btn");
goToLoginBtn.onclick = function () {
  window.location.href = "./pages/login.html";
};