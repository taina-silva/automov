document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const fotosInput = document.getElementById("fotos");
    const logoutBtn = document.getElementById("logout-btn");

    // Função para verificar o número de fotos
    function validarFotos(event) {
        const arquivos = fotosInput.files;
        if (arquivos.length < 3) {
            alert("Você deve selecionar no mínimo 3 fotos.");
            event.preventDefault();  // Impede o envio do formulário
        }
    }

    // Adicionar evento de submit ao formulário
    form.addEventListener("submit", (event) => {
        validarFotos(event);
    });

    // Lidar com o logout (simplesmente um exemplo de redirecionamento)
    logoutBtn.addEventListener("click", () => {
        window.location.href = "login.html"; // Substitua pela rota de logout real
    });


    // Validação de campos (exemplo de ano, para adicionar mais validações conforme necessário)
    const anoInput = document.getElementById("ano");
    anoInput.addEventListener("input", () => {
        const ano = parseInt(anoInput.value);
        if (ano < 1900 || ano > new Date().getFullYear()) {
            anoInput.setCustomValidity("Por favor, insira um ano válido entre 1900 e o ano atual.");
        } else {
            anoInput.setCustomValidity("");
        }
    });
});
