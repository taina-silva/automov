const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function () {
  window.location.href = "../php/logout.php";
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
};