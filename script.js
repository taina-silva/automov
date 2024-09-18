function generateStaticVehicleCards(numCards) {
    console.log('here')

  const cardHTML = `
            <div class="col mb-4">
                <div class="card">
                    <img src="./assets/images/car.png" class="card-img-top" alt="Carro" />
                    <div class="card-body">
                        <h5 class="card-title">Ford Fiesta</h5>
                        <p class="card-text">Ano: 2018</p>
                        <p class="card-text">Cidade: São Paulo</p>
                        <p class="card-text">Preço: R$ 45.000</p>
                    </div>
                </div>
            </div>`;

  const cardContainer = document.getElementById("cards-container");

  for (let i = 0; i < numCards; i++) {
    cardContainer.innerHTML += cardHTML;
  }
}

window.onload = function() {
    generateStaticVehicleCards(4); 
};
