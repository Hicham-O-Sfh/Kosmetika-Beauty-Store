/*!
 * Kosmetika — Beauty Store
 * Copyright (c) 2024-2026 Hicham Oussama Saffih. All rights reserved.
 * Distributed under the MIT License — see the LICENSE file at the project root.
 */

"use strict";

/**
 * Reference for `firebase.config.js`, which sits next to this file and is
 * committed — it holds the deployed store's own project. This file exists to
 * document where each value comes from and to be a clean starting point: copy
 * it over `firebase.config.js` and fill in your own project.
 *
 * These keys are public by design — they identify the project, they do not
 * grant access to it. Access is controlled by `firestore.rules` at the
 * repository root and by App Check.
 *
 * Firebase Console → Project settings → General → Your apps → SDK setup.
 * Any value still starting with `YOUR_` is treated as unset: the order
 * counters stay disabled and the rest of the site works normally.
 */
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

/**
 * reCAPTCHA v3 site key backing App Check.
 * Firebase Console → App Check → Apps → your web app.
 *
 * Left unset, App Check is skipped: fine against a project that does not
 * enforce it, but every write is rejected as soon as enforcement is on.
 */
export const recaptchaV3SiteKey = "YOUR_RECAPTCHA_V3_SITE_KEY";
