// js/app.js

import { togglePassword, savePassword, displayPasswords } from "./ui.js";

// Sayfa yüklendiğinde kayıtları göster
document.addEventListener("DOMContentLoaded", () => {
  displayPasswords();

  // Olay dinleyicileri
  document.getElementById("search").addEventListener("input", displayPasswords);
  document
    .getElementById("password")
    .nextElementSibling.addEventListener("click", togglePassword);
  document
    .querySelector("button.btn-primary")
    .addEventListener("click", savePassword);
});
