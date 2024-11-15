"use strict";

/**
 * Products repository — the single access point to the catalogue.
 *
 * The data lives in `products.js` (a plain array). This module exposes a small
 * read API plus safe accessors, so the rest of the app never touches the raw
 * product shape directly.
 *
 * The `getProduct` / `getAllProducts` functions return Promises even though the
 * data is local and synchronous: it keeps the calling code (`.then(...)`)
 * unchanged and leaves the door open for a real backend later.
 */

import products from "./products.js";

// Re-exported so the rest of the app gets the status enum from the single
// catalogue access point rather than reaching into products.js directly.
export { PRODUCT_STATUS } from "./products.js";

/** Deep clone, so callers can never mutate the source catalogue. */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * @param {number} id
 * @returns {Promise<object|undefined>} a deep clone of the matching product
 */
export function getProduct(id) {
  return new Promise((resolve, reject) => {
    try {
      const product = products.find((prod) => prod.id === id);
      resolve(product ? clone(product) : undefined);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * @param {number} [maxItems=Infinity] cap on the number of products returned
 * @returns {Promise<object[]>} a deep clone of the catalogue, capped at maxItems
 */
export function getAllProducts(maxItems = Infinity) {
  return new Promise((resolve, reject) => {
    try {
      resolve(clone(products).slice(0, maxItems));
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Main picture URL, with a safe fallback on the first picture.
 * Prevents the "TypeError → blank page" crash when a product has no `isMain`.
 * @param {object} product
 * @returns {string}
 */
export function getMainPicUrl(product) {
  const pics = product.pics ?? [];
  return pics.find((pic) => pic.isMain)?.url ?? pics[0]?.url ?? "";
}

/**
 * Secondary ("hover") picture URL, falling back to the main picture when a
 * product has a single photo.
 * @param {object} product
 * @returns {string}
 */
export function getSecondaryPicUrl(product) {
  return product.pics?.[1]?.url ?? getMainPicUrl(product);
}

/**
 * Human-readable product title, e.g. "Gucci® - Bloom - Aqua Di Fiori (100ml)".
 * Single source of truth for how a product is labelled across the UI.
 * @param {object} product
 * @returns {string}
 */
export function getProductTitle(product) {
  return `${product.brand} - ${product.name} (${product.volumeMl}ml)`;
}
