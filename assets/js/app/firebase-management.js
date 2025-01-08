/*!
 * Kosmetika — Beauty Store
 * Copyright (c) 2024-2026 Hicham Oussama Saffih. All rights reserved.
 * Distributed under the MIT License — see the LICENSE file at the project root.
 */

"use strict";

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
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app-check.js";

/**
 * Pulled in with a dynamic `import()` rather than a static one. The file is
 * committed, so it is normally there — but a fork may well strip it, and a
 * static import of a missing file fails the *whole* module graph. This module
 * is reached from `main.js` through `utils.js`, so the cart would go down with
 * it. The `try/catch` below is what keeps a missing config to a dead counter.
 */
const CONFIG_MODULE_URL = "./config/firebase.config.js";

/** Keys `initializeApp()` cannot do without. */
const REQUIRED_CONFIG_KEYS = ["apiKey", "authDomain", "projectId", "appId"];

/** Marks a value left untouched in a copy of `firebase.config.example.js`. */
const PLACEHOLDER_VALUE = /^YOUR_/;

/**
 * Firestore handle, or `null` when no usable configuration was found.
 *
 * Started at import time so App Check begins fetching its reCAPTCHA token as
 * early as it did when the config was inlined here. It never rejects: without
 * a configuration the order counters go quiet, nothing else changes.
 *
 * @type {Promise<object|null>}
 */
const firestoreReady = connectToFirestore();

/**
 * @returns {Promise<object|null>} a Firestore instance, or `null` if disabled.
 */
async function connectToFirestore() {
  const config = await loadConfig();
  if (!config) return null;

  const app = initializeApp(config.firebaseConfig);
  setUpAppCheck(app, config.recaptchaV3SiteKey);
  return getFirestore(app);
}

/**
 * @returns {Promise<object|null>} the configuration module, or `null` — and a
 *   console explanation — when it is missing, unreadable or still templated.
 */
async function loadConfig() {
  let config;
  try {
    config = await import(CONFIG_MODULE_URL);
  } catch (error) {
    console.info(
      "Order stats are off: config/firebase.config.js is missing or invalid. " +
        "Copy config/firebase.config.example.js next to it, under that name, to turn them on. " +
        "The cart and the WhatsApp checkout work without it.",
      error,
    );
    return null;
  }

  const missingKeys = REQUIRED_CONFIG_KEYS.filter(
    (key) => !isFilledIn(config.firebaseConfig?.[key]),
  );
  if (missingKeys.length > 0) {
    console.warn(
      `Order stats are off: firebase.config.js has no value for ${missingKeys.join(", ")}. ` +
        "The cart and the WhatsApp checkout work without it.",
    );
    return null;
  }

  return config;
}

/**
 * App Check is optional here: a project that does not enforce it still accepts
 * the writes. One that does will reject them all, hence the warning.
 *
 * @param {object} app
 * @param {string|undefined} siteKey
 */
function setUpAppCheck(app, siteKey) {
  if (!isFilledIn(siteKey)) {
    console.warn(
      "App Check is not set up: recaptchaV3SiteKey is missing from firebase.config.js. " +
        "Writes will be rejected if the project enforces App Check.",
    );
    return;
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  });
}

/**
 * @param {unknown} value
 * @returns {boolean} whether the value is a real setting rather than a blank or
 *   a leftover `YOUR_…` placeholder.
 */
function isFilledIn(value) {
  return (
    typeof value === "string" && value !== "" && !PLACEHOLDER_VALUE.test(value)
  );
}

/** Keeps the hint below to one line per page rather than one per cart line. */
let appCheckWarningShown = false;

/**
 * A refused write almost always means App Check did not vouch for the page,
 * and the raw Firestore error says none of it. Two situations produce it, and
 * the message names both — running the real project locally is as common here
 * as running a clone.
 *
 * @param {{code?: string}} error
 */
function warnAppCheckRejected(error) {
  if (appCheckWarningShown || error?.code !== "permission-denied") return;

  appCheckWarningShown = true;
  console.warn(
    "Firestore refused the write: App Check did not vouch for this page. Two common cases. " +
      "Locally, the domain is not covered by the reCAPTCHA key and you need a debug token. " +
      "On a clone, config/firebase.config.js still points at the original project, which only " +
      "accepts its own domain. Only the counters are affected, the cart and the WhatsApp " +
      "checkout keep working.",
  );
}

// 📥 Read the order counters from Firestore
export async function getOrdersFromFirestore() {
  const db = await firestoreReady;
  if (!db) return [];

  try {
    const ordersCol = collection(db, "product_order_counts");
    const orderSnapshot = await getDocs(ordersCol);
    return orderSnapshot.docs.map((orderDoc) => ({
      id: orderDoc.id,
      ...orderDoc.data(),
    }));
  } catch (error) {
    console.error("Could not read the order counters:", error);
    return [];
  }
}

// 📤 Update one product's order counters
export async function updateProductOrderStats(productOrders) {
  const db = await firestoreReady;
  if (!db) return;

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
        { merge: true },
      );
    } catch (error) {
      console.error(
        `Could not update the counters for product ${productId}:`,
        error,
      );
      warnAppCheckRejected(error);
    }
  }
}
