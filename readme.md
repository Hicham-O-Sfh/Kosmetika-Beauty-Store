# ✨ Kosmetika Beauty Store

**Kosmetika Beauty Store** is a modern, responsive e-commerce web application for beauty products, built from scratch with HTML, JavaScript, Firebase, and the latest security best practices (including Firebase App Check).  
The project demonstrates clean code, secure data handling, and production-ready architecture for a real-world e-commerce scenario.

![Kosmetika Demo Banner](assets/img/demo-banner.png)

---

## 🚀 Features

- 🔒 **Firebase App Check** (reCAPTCHA v3, debug support)
- 🛡️ **Secure by Design**: Strict Firestore rules (type checks, anti-tampering), no secrets on frontend
- 📦 **Firestore Cloud Sync**: Store products, orders, and analytics by product ID
- 🛒 **Product Catalog & Orders**  
  - Add/remove products  
  - Live stock, quantity selector, dynamic cart
- 💬 **WhatsApp Checkout**  
  - One-click order confirmation  
  - Pre-filled WhatsApp message with order details
- 📊 **Live Analytics**  
  - Firestore updates:  
    - `total_orders` (per product)  
    - `total_quantity` (per product)
- 🌍 **i18n/Internationalization**: GTranslate instant language switch
- 🎉 **Modern UI/UX**  
  - Responsive, smooth animations, mobile-first  
  - Product carousel (Owl Carousel)  
  - Image zoom (elevateZoom)  
  - Beautiful notifications (Notyf)  
  - FontAwesome icons
- ⚡ **Instant Feedback & Error Handling**  
  - User-friendly popups and alerts  
  - Validations client & server side
- 🧩 **Modular & Scalable**  
  - Clean code split into modules  
  - Ready for features: authentication, payment, advanced analytics, etc.


---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES Modules), CSS3, Bootstrap 5
- **Backend**: [Firebase Firestore](https://firebase.google.com/docs/firestore), [Firebase App Check](https://firebase.google.com/docs/app-check)
- **Security**: App Check (reCAPTCHA v3), strict Firestore rules
- **UI/UX Plugins**:
  - [Owl Carousel](https://owlcarousel2.github.io/OwlCarousel2/) – responsive carousel
  - [elevateZoom](https://www.elevateweb.co.uk/image-zoom/) – image zoom
  - [Notyf](https://github.com/caroso1222/notyf) – elegant notifications
  - [GTranslate](https://gtranslate.io/) – instant language switcher
  - FontAwesome – iconography
- **Other tools**: [GTranslate](https://gtranslate.io/), FontAwesome, [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
---

## 🧑‍💻 Project Structure

├── assets/
│ ├── css/
│ ├── fonts/
│ ├── img/
│ ├── video/
│ ├── js/
│ │ ├── database-management.js
│ │ ├── firebase-management.js
│ │ ├── utils.js
│ │ └── main.js
│ └── ...
├── index.html
├── contact-us.html
├── faq.html
├── shop.html
├── product-details.html
└── README.md

- **`firebase-management.js`**: Firebase/App Check/Firestore logic
- **`main.js`**: App logic, UI handlers, and business logic
- **Plugins**: All vendor JS (carousel, zoom, notyf, etc...).

---

## 🚦 Security

- **App Check** is enforced in both code and Firestore rules
- **No secret keys** are exposed on the frontend
- **Firestore rules** control both field types and logical consistency
- **Best practices** for safe local development (debug token) and production

---

## 🚀 Getting Started (Local Dev)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/hicham-o-sfh/Kosmetika-Beauty-Store.git
   cd Kosmetika-Beauty-Store
   ```
2. **Configure Firebase:**
   - In `assets/js/firebase-management.js`, paste your Firebase config and reCAPTCHA site key.
3. **Enable App Check (debug):**
   - Before running locally, add your debug token in Firebase Console > App Check > Debug Tokens.
   - In `index.html`, before main JS, add:
     ```html
     <script>
       window.FIREBASE_APPCHECK_DEBUG_TOKEN = "YOUR_DEBUG_TOKEN";
     </script>
     ```
4. **Start local server:**
   - Using VS Code Live Server (or similar):
     ```
     npx live-server
     ```
5. **Enjoy!**

---

## 🌐 Live Demo

[**Try the deployed app on GitHub Pages →**](https://hicham-o-sfh.github.io/Kosmetika-Beauty-Store/)

---

## 📖 Firestore Rules Example

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /product_order_counts/{productId} {
      allow read: if true;
      allow create: if
        request.resource.data.keys().hasOnly(['total_orders', 'total_quantity']) &&
        request.resource.data.total_orders is int &&
        request.resource.data.total_quantity is int &&
        request.resource.data.total_orders == 1 &&
        request.resource.data.total_quantity >= 0;
      allow update: if
        request.resource.data.keys().hasOnly(['total_orders', 'total_quantity']) &&
        request.resource.data.total_orders is int &&
        request.resource.data.total_quantity is int &&
        request.resource.data.total_orders == resource.data.total_orders + 1 &&
        request.resource.data.total_quantity >= resource.data.total_quantity;
      allow delete: if false;
    }
  }
}
```

🤝 Contributing
Pull requests, issues, and suggestions are always welcome!

⭐ Why this project?
This repository demonstrates real-world fullstack web app security, clean Firebase usage, and solid web development practices for portfolio and interview purposes.