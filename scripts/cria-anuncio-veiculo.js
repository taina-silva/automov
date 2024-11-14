const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  window.location.href = "./php/logout.php";
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
};

document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);

    const fotosInput = document.getElementById("fotos");
    const arquivos = fotosInput.files;

    if (arquivos.length < 1) {
      alert("Você deve selecionar no mínimo 3 fotos.");
      return;
    }

    try {
      const response = await fetch(
        "./php/anuncio-controlador.php?acao=cadastrar",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar anúncio");
      }

      const result = await response.json();
      const message = document.getElementById("fail-msg");
      message.textContent = result.message;

      if (result.success) {
        message.style.color = "green";
        form.reset();
      } else {
        message.style.color = "red";
      }
    } catch (error) {
      //const message = document.getElementById("message");
      //message.textContent = "Erro inesperado. Por favor, tente novamente.";
      //message.style.color = "red";
    }
  });

