/*!
 * Kosmetika — Beauty Store
 * Copyright (c) 2024-2026 Hicham Oussama Saffih. All rights reserved.
 * Distributed under the MIT License — see the LICENSE file at the project root.
 */

"use strict";

/** Single access point to the product catalogue. Read-only, Promise-based. */

import products from "./products.js";

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
 * Hero picture URL — the showcase visual headlining the product details page,
 * falling back to the main picture for products without one.
 * @param {object} product
 * @returns {string}
 */
export function getHeroPicUrl(product) {
  return product.pics?.find((pic) => pic.isHero)?.url ?? getMainPicUrl(product);
}

/**
 * Human-readable product title, e.g. "Gucci® - Bloom - Acqua Di Fiori (100ml)".
 * @param {object} product
 * @returns {string}
 */
export function getProductTitle(product) {
  return `${product.brand} - ${product.name} (${product.volumeMl}ml)`;
}
