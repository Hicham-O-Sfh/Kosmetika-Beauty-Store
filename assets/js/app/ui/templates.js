"use strict";

/**
 * HTML template builders — pure functions returning markup strings.
 * No DOM access, no side effects.
 */

import {
  getMainPicUrl,
  getProductTitle,
  PRODUCT_STATUS,
} from "../data/products.repository.js";

/** A product is out of stock when its status says so. Kept orderable anyway. */
export function isOutOfStock(product) {
  return product.status === PRODUCT_STATUS.OUT_OF_STOCK;
}

/**
 * Build the "Marque / Qualité / Catégorie" info block shown on the product page.
 * UI text stays in French, the underlying data stays structured.
 */
export function getSecondaryInfoHtml(product) {
  const category =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);
  return `<b>Marque:</b> ${product.brand}. <br> <b>Qualité:</b> ${product.quality}. <br> <b>Catégorie:</b> ${category}.`;
}

/** Small inline "Épuisé" badge (used next to the product title on its page). */
export function outOfStockBadge(product) {
  return isOutOfStock(product)
    ? `<span class="badge" style="background-color: #dc3545; color: #fff; font-size: 0.7em; vertical-align: middle;">Épuisé</span>`
    : "";
}

/**
 * "Épuisé" badge pinned to the top-left corner of the product photo.
 * Absolutely positioned so it never shifts the card's title/price alignment.
 * `.product_thumb` is already `position: relative` in style.css, so this anchors
 * to the thumb on every breakpoint (mobile/tablet/desktop).
 */
export function outOfStockThumbBadge(product) {
  return isOutOfStock(product)
    ? `<span class="badge" style="position: absolute; top: 6px; left: 6px; z-index: 5; font-size: 10px; padding: 3px 6px; background-color: #dc3545; color: #fff;">Épuisé</span>`
    : "";
}

/** Friendly, reassuring out-of-stock notice shown on the product page. */
export function outOfStockAlertHtml() {
  return `
    <div class="alert alert-warning" role="alert">
      Ce parfum est <b>momentanément épuisé (hors stock)</b> 😅
      <br />
      mais pas de
      panique ! Tu peux quand même l'ajouter au panier et passer commande normalement.
      On reste en contact direct avec toi sur <b>WhatsApp</b> 💬 (là où se finalise ta
      commande) et on te tient au courant en toute transparence :
      <br />
      le délai sera juste un peu plus long, rien de méchant 😉.
      <br />
      Merci pour ta patience 💖
    </div>
  `;
}

/** Product card shared by the 3 home-page tabs. */
export function renderProductCard(prod) {
  return `
    <div class="custom-col-5">
      <div class="single_product">
        <div class="product_thumb">
          ${outOfStockThumbBadge(prod)}
          <a
            class="primary_img"
            href="product-details.html?productId=${prod.id}">
            <img src="${getMainPicUrl(prod)}" alt="" />
          </a>
        </div>
        <div class="product_content">
          <h3>
            <a href="product-details.html?productId=${prod.id}">
              ${getProductTitle(prod)}
            </a>
          </h3>
          <span class="current_price">${prod.price} Dhs</span>
        </div>
      </div>
    </div>
  `;
}
