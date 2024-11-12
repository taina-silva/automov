const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  window.location.href = "./php/logout.php";
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
};

window.onload = function () {
  const anuncio = JSON.parse(localStorage.getItem("anuncio"));
  const fotos = JSON.parse(localStorage.getItem("fotos"));

  if (anuncio === null) {
    alert("ID do anúncio não especificado.");
    return;
  }

  const marca = document.getElementById("anuncio-marca");
  const modelo = document.getElementById("anuncio-modelo");
  const ano = document.getElementById("anuncio-ano");
  const cor = document.getElementById("anuncio-cor");
  const quilometragem = document.getElementById("anuncio-quilometragem");
  const descricao = document.getElementById("anuncio-descricao");
  const valor = document.getElementById("anuncio-valor");
  const estado = document.getElementById("anuncio-estado");
  const cidade = document.getElementById("anuncio-cidade");

  marca.innerHTML = `<strong>Marca:</strong> ${anuncio.marca}`;
  modelo.innerHTML = `<strong>Modelo:</strong> ${anuncio.modelo}`;
  ano.innerHTML = `<strong>Ano:</strong> ${anuncio.ano}`;
  cor.innerHTML = `<strong>Cor:</strong> ${anuncio.cor}`;
  quilometragem.innerHTML = `<strong>Quilometragem:</strong> ${anuncio.quilometragem} km`;
  descricao.innerHTML = `<strong>Descrição:</strong> ${anuncio.descricao}`;
  valor.innerHTML = `<strong>Valor:</strong> R$ ${anuncio.valor}`;
  estado.innerHTML = `<strong>Estado:</strong> ${anuncio.estado}`;
  cidade.innerHTML = `<strong>Cidade:</strong> ${anuncio.cidade}`;

  const divFotos = document.querySelector(".fotos");
  divFotos.innerHTML = "";
  fotos.forEach((foto) => {
    const imgElement = document.createElement("img");
    imgElement.src = foto;
    imgElement.alt = foto;
    divFotos.appendChild(imgElement);
  });
};
