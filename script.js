window.onload = function () {
  generateStaticVehicleCards(4);
  implementInterestButtons();
};

function generateStaticVehicleCards(numCards) {
  const cardHTML = `
            <div class="card-item">
                <div class="card">
                    <img src="./assets/images/car.png" class="card-img" alt="Carro" />
                    <div class="card-body">
                        <h5 class="card-title">Ford Fiesta</h5>
                        <p class="card-text"><b>Ano:</b> 2018</p>
                        <p class="card-text"><b>Cidade:</b> São Paulo</p>
                        <p class="card-text"><b>Preço:</b> R$ 45.000</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-block">Registrar interesse</button>
                    </div>
                </div>
            </div>`;

  const cardContainer = document.getElementById("cards-container");

  for (let i = 0; i < numCards; i++) {
    cardContainer.innerHTML += cardHTML;
  }
}

function implementInterestButtons() {
  const interestButtons = document.querySelectorAll(".card-footer .btn");
  for (var button of interestButtons) {
    button.onclick = function () {
      window.location.href="./pages/registro-interesse.html";
    };
  }
}