const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  window.location.href = "../php/logout.php";
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idAnuncio = urlParams.get("idAnuncio");

  if (!idAnuncio) {
      alert("ID do anúncio não especificado.");
      return;
  }

  function carregarInteresses() {
      fetch(`../php/get-interesses.php?idAnuncio=${idAnuncio}`)
          .then(response => response.json())
          .then(data => {
              const interestList = document.querySelector(".interest-list");
              interestList.innerHTML = "";

              if (data.error) {
                  interestList.innerHTML = `<p>${data.error}</p>`;
                  return;
              }

              if (data.length === 0) {
                  interestList.innerHTML = "<p>Nenhum interesse encontrado para este anúncio.</p>";
                  return;
              }

              data.forEach(interesse => {
                  const item = document.createElement("div");
                  item.classList.add("interest-item");

                  item.innerHTML = `
                      <h4>Nome: ${interesse.nome}</h4>
                      <p><strong>Telefone:</strong> ${interesse.telefone}</p>
                      <p><strong>Mensagem:</strong> ${interesse.mensagem}</p>
                      <p><small><strong>Data:</strong> ${new Date(interesse.dataHora).toLocaleString()}</small></p>
                  `;
                  interestList.appendChild(item);
                  interestList.appendChild(document.createElement("hr"));
              });
          })
          .catch(error => {
              console.error("Erro ao carregar interesses:", error);
              document.querySelector(".interest-list").innerHTML = "<p>Erro ao carregar interesses.</p>";
          });
  }

  carregarInteresses();
});
