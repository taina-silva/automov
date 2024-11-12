document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);

    try {
      const response = await fetch("./php/cadastro.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      const result = await response.json();

      const message = document.getElementById("fail-msg");
      message.textContent = result.message;

      if (result.success) {
        window.location.href = "./login.html";
      } else {
        message.style.color = "red";
      }
    } catch (error) {
      const message = document.getElementById("fail-msg");
      message.textContent = "Erro inesperado. Por favor, tente novamente.";
      message.style.color = "red";
    }
  }
);