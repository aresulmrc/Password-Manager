# 🔐 Basit Şifre Yöneticisi

HTML, CSS (Bootstrap) ve JavaScript (ES Modülleri) ile geliştirilmiş, web sitesi kimlik bilgilerini tarayıcının LocalStorage alanında AES şifrelemesi (CryptoJS kullanarak) ile saklayan basit bir web uygulamasıdır.

## ✨ Temel Özellikler

- 🔑 Kimlik bilgisi ekleme, listeleme, gösterme ve silme.
- 🔎 Web sitesi adına göre filtreleme.
- 🛡️ Kullanıcı adı ve şifreler için AES şifreleme.
- 💾 Verilerin tarayıcı LocalStorage'ında kalıcı olarak saklanması.
- 👁️ Şifre giriş alanı için görünürlük değiştirme.

## 🚀 Projeyi Çalıştırma

Bu proje, JavaScript Modülleri kullandığından bir yerel sunucu üzerinden çalıştırılmalıdır.

**Visual Studio Code ve Live Server Eklentisi ile:**

1.  Projeyi klonlayın veya indirin ve VS Code ile açın.
2.  **"Live Server"** eklentisinin kurulu olduğundan emin olun (Eklentiler panelinden yükleyebilirsiniz).
3.  `index.html` dosyası açıkken:
    - Sağ alt köşedeki **"Go Live"** ⚡ butonuna tıklayın.
    - Veya dosyaya sağ tıklayıp **"Open with Live Server"** seçeneğini kullanın.

## 🛠️ Teknik Genel Bakış

- **Arayüz:** HTML, Bootstrap 5
- **Mantık:** Vanilla JavaScript (ES Modülleri)
  - `ui.js`: DOM manipülasyonu ve arayüz güncellemeleri.
  - `storage.js`: LocalStorage işlemleri (CRUD).
  - `crypto.js`: CryptoJS ile AES şifreleme/şifre çözme.
  - `app.js`: Uygulama başlatma ve olay dinleyicilerinin koordinasyonu.
- **Veri Saklama:** Tarayıcı LocalStorage
- **Şifreleme:** CryptoJS AES (Gizli anahtar istemci tarafındadır)

## 💻 Kullanılan Teknolojiler

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6+ Modüller)
- CryptoJS
- LocalStorage API

## ⚠️ Güvenlik Uyarısı

Bu uygulama, **eğitim amaçlıdır**. İstemci tarafında (kod içinde) bulunan şifreleme anahtarı ve LocalStorage'ın doğası gereği, **hassas verilerin güvenli bir şekilde saklanması için uygun değildir**. Gerçek dünya senaryoları için sunucu taraflı çözümler tercih edilmelidir.

## 📁 Dosya Yapısı

```
Password-Manager/
├── css/
│   └── style.css
├── js/
│   ├── utils/
│   │   ├── commonSites.js
│   │   ├── crypto.js
│   │   └── clearForm.js
│   ├── app.js
│   ├── storage.js
│   └── ui.js
├── index.html
└── README.md
```
