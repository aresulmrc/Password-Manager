// js/ui.js

import { encrypt, decrypt } from "./utils/crypto.js";
import { getPasswords, addPassword, deletePassword } from "./storage.js";
import { clearForm } from "./utils/clearForm.js";
import { commonSites } from "./utils/commonSites.js";

// DOM Elements
const siteInput = document.getElementById("site");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const passwordList = document.getElementById("passwordList");
const searchInput = document.getElementById("search");
const siteSuggestions = document.getElementById("siteSuggestions");

const MASKED = "******";

// --- Ana Fonksiyonlar ---

// Şifre giriş alanı görünürlüğünü değiştir
export function togglePassword() {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

// Yeni şifre kaydet
export function savePassword() {
  const site = siteInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!site || !username || !password) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  addPassword({
    site,
    username: encrypt(username),
    password: encrypt(password),
  });

  clearForm("passwordForm");
  hideSiteSuggestions();
  displayPasswords();
}

// Kayıtlı şifreleri listele ve filtrele
export function displayPasswords() {
  const search = searchInput.value.toLowerCase();
  passwordList.innerHTML = ""; // Listeyi temizle

  getPasswords()
    .filter((entry) => entry.site.toLowerCase().includes(search))
    .forEach((entry, i) => {
      passwordList.appendChild(createPasswordListItem(entry, i)); // Yardımcı fonksiyon kullan
    });
}

// --- Yardımcı Fonksiyonlar (UI Elemanları Oluşturma) ---

// Tek bir şifre listesi öğesi (<li>) oluşturur
function createPasswordListItem(entry, index) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center flex-wrap";

  const passwordSpanId = `password-${index}`;

  li.innerHTML = `
    <div>
      <strong>${entry.site}</strong><br>
      👤 ${decrypt(entry.username)}<br>
      🔑 <span id="${passwordSpanId}">${MASKED}</span>
    </div>
    <div>
      <button class="btn btn-sm btn-outline-secondary" data-action="toggle" data-index="${index}" <!-- aria-controls kaldırıldı -->Göster</button>
      <button class="btn btn-sm btn-danger" data-action="delete" data-index="${index}">Sil</button>
    </div>
  `;
  return li;
}

// --- Event Listener ve Handler Fonksiyonları ---

// Şifre listesindeki buton tıklamalarını yönetir (Event Delegation)
function handlePasswordListClick(event) {
  const button = event.target.closest("button[data-action]"); // Sadece data-action olan butonları hedefle
  if (!button) return; // Buton değilse veya data-action yoksa çık

  const action = button.dataset.action;
  const index = Number(button.dataset.index); // İndeksi sayıya çevir

  if (isNaN(index)) return; // Geçerli bir index değilse çık

  if (action === "toggle") {
    handleTogglePasswordVisibility(index, button);
  } else if (action === "delete") {
    handleDeletePasswordEntry(index);
  }
}

// Şifre görünürlüğünü değiştirir (Göster/Gizle)
function handleTogglePasswordVisibility(index, button) {
  const passwordSpanId = `password-${index}`;
  const span = document.getElementById(passwordSpanId);
  if (!span) return; // İlgili span bulunamazsa çık

  const entries = getPasswords();
  if (index < 0 || index >= entries.length) return; // Geçersiz index kontrolü

  const isMasked = span.textContent === MASKED;

  if (isMasked) {
    span.textContent = decrypt(entries[index].password);
    button.textContent = "Gizle";
    button.classList.replace("btn-outline-secondary", "btn-warning");
  } else {
    span.textContent = MASKED;
    button.textContent = "Göster";
    button.classList.replace("btn-warning", "btn-outline-secondary");
  }
}

// Şifre kaydını siler
function handleDeletePasswordEntry(index) {
  if (confirm("Kaydı silmek istediğinizden emin misiniz?")) {
    deletePassword(index);
    displayPasswords(); // Listeyi güncelle
  }
}

// Ana event listener'ı ata
passwordList.addEventListener("click", handlePasswordListClick);

// --- Site Adı Öneri Sistemi ---
export function handleSiteInput() {
  const query = siteInput.value.trim().toLowerCase();
  if (!query) {
    hideSiteSuggestions();
    return;
  }
  const matches = commonSites.filter((site) =>
    site.toLowerCase().includes(query)
  );
  showSiteSuggestions(matches.slice(0, 5));
}

function showSiteSuggestions(suggestions) {
  siteSuggestions.innerHTML = "";
  if (suggestions.length === 0) {
    hideSiteSuggestions();
    return;
  }
  suggestions.forEach((site) => {
    const item = document.createElement("a");
    item.href = "#";
    item.className = "list-group-item list-group-item-action";
    item.textContent = site;
    item.addEventListener("click", (e) => {
      e.preventDefault();
      siteInput.value = site;
      hideSiteSuggestions();
    });
    siteSuggestions.appendChild(item);
  });
  siteSuggestions.style.display = "block";
}

export function hideSiteSuggestions() {
  siteSuggestions.innerHTML = "";
  siteSuggestions.style.display = "none";
}

// Dışarı tıklanınca öneri kutusunu gizle
document.addEventListener("click", (e) => {
  // Öneri kutusu varsa, tıklanan hedef öneri kutusu veya site input'u değilse gizle
  if (
    siteSuggestions &&
    siteSuggestions.style.display === "block" && // Sadece görünürse kontrol et
    !siteSuggestions.contains(e.target) &&
    e.target !== siteInput
  ) {
    hideSiteSuggestions();
  }
});
