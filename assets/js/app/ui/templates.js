/*!
 * Kosmetika — Beauty Store
 * Copyright (c) 2024-2026 Hicham Oussama Saffih. All rights reserved.
 * Distributed under the MIT License — see the LICENSE file at the project root.
 */

"use strict";

/** HTML template builders — pure functions returning markup strings. */

import {
  getMainPicUrl,
  getProductTitle,
  PRODUCT_STATUS,
} from "../data/products.repository.js";

/** A product is out of stock when its status says so. Kept orderable anyway. */
export function isOutOfStock(product) {
  return product.status === PRODUCT_STATUS.OUT_OF_STOCK;
}

/** Build the "Marque / Qualité / Catégorie" info block of the product page. */
export function getSecondaryInfoHtml(product) {
  const category =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);
  return `<b>Marque:</b> ${product.brand}. <br> <b>Qualité:</b> ${product.quality}. <br> <b>Catégorie:</b> ${category}.`;
}

/** Small inline "Épuisé" badge (used next to the product title on its page). */
export function outOfStockBadge(product) {
  return isOutOfStock(product)
    ? `<span class="badge badge-out-of-stock">Épuisé</span>`
    : "";
}

/** "Épuisé" badge pinned to the top-left corner of the product photo. */
export function outOfStockThumbBadge(product) {
  return isOutOfStock(product)
    ? `<span class="badge badge-out-of-stock-thumb">Épuisé</span>`
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

/** Shown on `product-details.html` when `?productId=` matches no product. */
export function productNotFoundHtml() {
  return `
    <div class="col-12">
      <div class="alert alert-warning text-center" role="alert">
        <b>Oups, ce parfum est introuvable</b> 🧐
        <br />
        Le lien est sûrement incomplet ou plus tout jeune 😅
        <br />
        Retrouve toute la collection dans le <a href="shop.html">catalogue</a>,
        ou laisse-toi tenter par les suggestions juste en dessous 👇
      </div>
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
            href="product-details.html?productId=${prod.id}"
            tabindex="-1"
            aria-hidden="true">
            <img
              src="${getMainPicUrl(prod)}"
              alt="${getProductTitle(prod)}"
              width="600"
              height="600" />
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
