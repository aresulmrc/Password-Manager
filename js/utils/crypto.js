// js/utils/crypto.js

const secretKey = "Seckey1379";

// Şifreleme fonksiyonu
export function encrypt(text) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Şifre çözme fonksiyonu
export function decrypt(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "Çözümlenemedi";
  }
}
