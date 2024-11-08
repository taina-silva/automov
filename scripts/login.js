const cadastroForm = document.forms.form;
cadastroForm.onsubmit = function (e) {
  e.preventDefault();
  tryLogin(cadastroForm);
}

async function tryLogin(form) {
  try {
    const response = await fetch("../php/login.php", {
      method: "post",
      body: {
        email: form.email.value,
        senha: form.senha.value,
      },
    });

    console.log(response);

    if (!response.ok) throw new Error(response.statusText);

    const result = await response.json();
    console.log(result);

    if (result.success) window.location = result.location;
    else {
      const message = document.querySelector("#fail-msg");
      message.textContent = "Dados incorretos. Por favor, tente novamente.";
      form.senha.value = "";
      form.senha.focus();
    }
  } catch (e) {
    const message = document.querySelector("#fail-msg");
    message.textContent =
      "Falha inesperada. Entre em contato o administrador do sistema.";
  }
}
