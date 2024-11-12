const goToLoginBtn = document.querySelector(".go-to-login-container .internal-btn");
goToLoginBtn.onclick = function () {
  window.location.href = "login.html";
};

window.onload = function () {
  const anuncio = JSON.parse(localStorage.getItem('anuncio'));
  const fotos = JSON.parse(localStorage.getItem('fotos'));

  if (anuncio) {
    document.getElementById('anuncio-marca').textContent = anuncio.marca + " " + anuncio.modelo;
    document.getElementById('anuncio-ano').textContent = anuncio.ano;
    document.getElementById('anuncio-cidade').textContent = anuncio.cidade;
    document.getElementById('anuncio-valor').textContent = "R$ " + anuncio.valor;

    const carousel = document.querySelector('#registro-interesse-carousel .carousel-inner');
    const carouselItems = fotos.map((foto, index) => {
      return `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <img src="${foto}" alt="${foto}" class="d-block w-100">
        </div>
      `;
    }).join('');
    carousel.innerHTML = carouselItems;
  } else {
    alert("Dados do anúncio não encontrados. Redirecionando para a página anterior.");
    window.history.back();
  }
}

document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);

    formData.append('idAnuncio', JSON.parse(localStorage.getItem('anuncio')).id);

    try {
      const response = await fetch("./php/interesse-controlador.php?acao=registrar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar interesse");
      }

      const result = await response.json();
      const message = document.getElementById("message");
      message.textContent = result.message;

      if (result.success) {
        message.style.color = "green";
        form.reset(); 
      } else {
        message.style.color = "red";
      }
    } catch (error) {
      const message = document.getElementById("message");
      message.textContent = "Erro inesperado. Por favor, tente novamente.";
      message.style.color = "red";
    }
  });