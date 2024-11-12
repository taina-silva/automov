const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  window.location.href = "../php/logout.php";
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
};

const form = document.querySelector("form");
const fotosInput = document.getElementById("fotos");

form.onsubmit = function (e) {
  validarFotos(e);
  tryCriaAnuncioVeiculo(form);
};

function validarFotos(event) {
  const arquivos = fotosInput.files;
  // TODO: não consegui colocar 3 fotos
  if (arquivos.length < 1) {
    alert("Você deve selecionar no mínimo 3 fotos.");
    event.preventDefault();
  }
}

async function tryCriaAnuncioVeiculo(form) {
  try {
    const formData = new FormData(form);

    formData.append("marca", document.getElementById("marca").value);
    formData.append("modelo", document.getElementById("modelo").value);
    formData.append("ano", document.getElementById("ano").value);

    for (let i = 0; i < arquivos.length; i++) {
      formData.append("fotos[]", arquivos[i]);
    }

    const response = await fetch("../php/cria-anuncio-veiculo.php", {
      method: "post",
      body: formData,
    });

    console.log(response);
    if (!response.ok) throw new Error(response.statusText);

    const result = await response.json();
    const message = document.querySelector("#msg");

    console.log(result);

    message.textContent = result.message;
  } catch (e) {
    const message = document.querySelector("#msg");
    message.textContent =
      "Falha inesperada. Entre em contato o administrador do sistema.";
  }
}
