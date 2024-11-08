const cadastroForm = document.forms.form;
cadastroForm.onsubmit = function (e) {
  e.preventDefault();
  tryCadastro(cadastroForm);
}

async function tryCadastro(form) {
    try {
      const response = await fetch("../php/cadastro.php", {
        method: "post",
        body: {
          nome: form.nome.value,
          cpf: form.cpf.value.replace(/[.-]/g, ''),
          email: form.nome.value,
          senha: form.senha.value,
          telefone: form.telefone.value,
        },
      });
      console.log(response);
      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();

      if (result.success)
        window.location = 'login.html';
      else {
        const message = document.querySelector("#fail-msg");
        message.textContent = result.message;
      }
    }
    catch (e) {
      const message = document.querySelector("#fail-msg");
      message.textContent = 'Falha inesperada. Entre em contato o administrador do sistema.';
    }
  }