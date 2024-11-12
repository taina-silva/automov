const goToLoginBtn = document.querySelector(
  ".go-to-login-container .internal-btn"
);
goToLoginBtn.onclick = function () {
  window.location.href = "./login.html";
};

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
  fetch("./php/filtro-controlador.php?acao=buscarMarcas")
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

  fetch(`./php/filtro-controlador.php?acao=buscarModelos&marca=${marca}`)
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

  fetch(
    `./php/filtro-controlador.php?acao=buscarCidades&marca=${marca}&modelo=${modelo}`
  )
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
    `./php/anuncio-controlador.php?acao=buscar&marca=${marca}&modelo=${modelo}&cidade=${cidade}`
  )
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.getElementById("cards-container");
      cardsContainer.innerHTML = "";

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
      const fileName = foto.caminho.split("/").pop();
      const filePath = `./uploads/${fileName}`;

      return `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="${filePath}" alt="${fileName}" class="d-block w-100">
      </div>
    `;
    })
    .join("");

  const cardHTML = `
      <div class="internal-card">
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
              <h5 class="internal-card-title"> ${anuncio.marca} ${anuncio.modelo}</h5>
              <p class="internal-card-text"><b>Ano:</b> ${anuncio.ano}</p>
              <p class="internal-card-text"><b>Cidade:</b> ${anuncio.cidade}</p>
              <p class="internal-card-text"><b>Preço:</b> R$ ${anuncio.valor}</p>
          </div>
          <div class="internal-card-footer">
              <button class="internal-btn internal-btn-block" onclick='registrarInteresse(${anuncioJson}, ${fotosJson})'>Registrar interesse</button>
          </div>
      </div>
    `;

  return cardHTML;
}

function registrarInteresse(anuncio, fotos) {
  localStorage.setItem("anuncio", JSON.stringify(anuncio));
  localStorage.setItem("fotos", JSON.stringify(fotos));

  window.location.href = "./registro-interesse.html";
}
