// js/ui.js

import { encrypt, decrypt } from "./utils/crypto.js";
import {
  getPasswords,
  addPassword,
  deletePassword as deletePasswordFromStorage,
} from "./storage.js";

// Şifre görünürlüğünü değiştir
export function togglePassword() {
  const input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
}

// Yeni şifre kaydet
export function savePassword() {
  const site = document.getElementById("site").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!site || !username || !password) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  const entry = {
    site,
    username: encrypt(username),
    password: encrypt(password),
  };

  addPassword(entry);
  clearForm();
  displayPasswords();
}

// Formu temizle
function clearForm() {
  document.getElementById("site").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

// Kayıtlı şifreleri ekranda göster
export function displayPasswords() {
  const list = document.getElementById("passwordList");
  const search = document.getElementById("search").value.toLowerCase();
  list.innerHTML = "";

  getPasswords()
    .filter((item) => item.site.toLowerCase().includes(search))
    .forEach((item, index) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center";

      li.innerHTML = `
        <div>
          <strong>${item.site}</strong><br>
          👤 ${decrypt(item.username)}<br>
          🔑 <span class="text-warning">******</span>
        </div>
        <div>
          <button class="btn btn-sm btn-success me-1" data-index="${index}" data-action="show">Göster</button>
          <button class="btn btn-sm btn-danger" data-index="${index}" data-action="delete">Sil</button>
        </div>
      `;

      list.appendChild(li);
    });
}

// Şifreyi göster
function revealPassword(index) {
  const saved = getPasswords();
  const password = decrypt(saved[index].password);
  alert("Şifre: " + password);
}

// Şifre kaydını sil
function deletePassword(index) {
  deletePasswordFromStorage(index);
  displayPasswords();
}

// Liste üzerindeki butonlara olay bağla (event delegation)
document.addEventListener("click", function (e) {
  const action = e.target.dataset.action;
  const index = e.target.dataset.index;
  if (action === "show") {
    revealPassword(index);
  } else if (action === "delete") {
    deletePassword(index);
  }
});
