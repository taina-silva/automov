<?php

function verificarSessao()
{ 
  if (!isset($_SESSION['loggedIn'])) {
    header("Location: ../index.html");
    exit();  
  }
}
