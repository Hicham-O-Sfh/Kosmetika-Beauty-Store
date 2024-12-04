/*!
 * Kosmetika — Beauty Store
 * Copyright (c) 2024-2026 Hicham Oussama Saffih. All rights reserved.
 * Distributed under the MIT License — see the LICENSE file at the project root.
 */

"use strict";

/**
 * Firebase configuration of the deployed store. Committed on purpose: GitHub Pages
 * serves the site straight from this repository, so an ignored file would ship a
 * production site with no Firebase at all.
 *
 * These keys are public by design — they name the project, they do not open it.
 * What keeps the counters safe is `firestore.rules` plus App Check, whose reCAPTCHA
 * key only accepts the store's own domain.
 *
 * **Cloning this project?** Replace every value below with your own — see
 * `firebase.config.example.js` for where each one comes from. Left as-is, the site
 * points at the original project and every write is rejected by App Check.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyCboMJ_pDDLiB0Kw7V6wws0BRuHFc4Qzz8",
  authDomain: "kosmetika-db.firebaseapp.com",
  projectId: "kosmetika-db",
  storageBucket: "kosmetika-db.firebasestorage.app",
  messagingSenderId: "829504996432",
  appId: "1:829504996432:web:9066fc5a2f45b532eb3d55",
  measurementId: "G-N3HXK87V2S",
};

/** reCAPTCHA v3 site key backing App Check. */
export const recaptchaV3SiteKey = "6LfRonUtAAAAANnfxpZA1Fsli2-pE5azp78iO8Tp";
