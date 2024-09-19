window.onload = function () {
  generateStaticVehicleCards(4);
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
                </div>
            </div>`;

  const cardContainer = document.getElementById("cards-container");

  for (let i = 0; i < numCards; i++) {
    cardContainer.innerHTML += cardHTML;
  }
}

const loginButton = document.getElementById("go-to-login-button");
loginButton.addEventListener("click", function () {
  window.location.href='login.html';
});