// js/storage.js

// LocalStorage'a kayıtlı verileri getir
export function getPasswords() {
  return JSON.parse(localStorage.getItem("passwords") || "[]");
}

// Yeni bir kayıt ekle
export function addPassword(entry) {
  const saved = getPasswords();
  saved.push(entry);
  localStorage.setItem("passwords", JSON.stringify(saved));
}

// Belirli bir kaydı sil
export function deletePassword(index) {
  const saved = getPasswords();
  saved.splice(index, 1);
  localStorage.setItem("passwords", JSON.stringify(saved));
}
