// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// App Check avec ReCaptcha v3
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app-check.js";

// ✅ Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCboMJ_pDDLiB0Kw7V6wws0BRuHFc4Qzz8",
  authDomain: "kosmetika-db.firebaseapp.com",
  projectId: "kosmetika-db",
  storageBucket: "kosmetika-db.firebasestorage.app",
  messagingSenderId: "829504996432",
  appId: "1:829504996432:web:d41522bc3028a1eeeb3d55",
  measurementId: "G-3PFTL1CG5Y",
};

// 🔧 Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔐 Protection App Check (ReCaptcha v3)
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld58mYrAAAAAAVQ9RshkoduL9smednpQ_FJx_f5"),
  isTokenAutoRefreshEnabled: true,
});

// 📥 Récupérer les commandes depuis Firestore
export async function getOrdersFromFirestore() {
  try {
    const ordersCol = collection(db, "product_order_counts");
    const orderSnapshot = await getDocs(ordersCol);
    const orderList = orderSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orderList;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return [];
  }
}

// 📤 Mettre à jour les stats de commande d’un produit
export async function updateProductOrderStats(productOrders) {
  for (const product of productOrders) {
    const productId = product.productId + "";
    const quantityOrdered = product.quantity;
    const productRef = doc(db, "product_order_counts", productId);

    try {
      await setDoc(
        productRef,
        {
          total_orders: increment(1),
          total_quantity: increment(quantityOrdered),
        },
        { merge: true }
      );
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour des stats pour le produit ${productId}:`,
        error
      );
    }
  }
}
