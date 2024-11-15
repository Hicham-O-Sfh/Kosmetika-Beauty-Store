// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
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
  appId: "1:829504996432:web:9066fc5a2f45b532eb3d55",
  measurementId: "G-N3HXK87V2S",
};

// 🔧 Initialisation Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Protection App Check (ReCaptcha v3)
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcbWmkrAAAAAOjP-7t9vnBRqvaCieACmvgVvMjD"),
  isTokenAutoRefreshEnabled: true,
});
const db = getFirestore(app);

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

    try {
      const productRef = doc(db, "product_order_counts", productId);
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
