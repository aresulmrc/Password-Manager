// js/app.js
import {
  togglePassword,
  savePassword,
  displayPasswords,
  handleSiteInput,
} from "./ui.js";
document.addEventListener("DOMContentLoaded", () => {
  displayPasswords();

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", displayPasswords);
  }

  const siteInput = document.getElementById("site");
  if (siteInput) {
    siteInput.addEventListener("input", handleSiteInput);
  }

  const toggleBtn = document.getElementById("togglePasswordBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", togglePassword);
  }

  const passwordForm = document.getElementById("passwordForm");
  if (passwordForm) {
    passwordForm.addEventListener("submit", (event) => {
      event.preventDefault();
      savePassword();
    });
  }
});
