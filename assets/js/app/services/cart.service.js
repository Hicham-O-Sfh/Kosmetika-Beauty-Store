/*!
 * Kosmetika — Beauty Store
 * Copyright (c) 2024-2026 Hicham Oussama Saffih. All rights reserved.
 * Distributed under the MIT License — see the LICENSE file at the project root.
 */

"use strict";

/** Cart state — persisted in localStorage under the "panier" key. */

export function isValidNumberInputValue(value) {
  return !isNaN(value) && parseInt(value) >= 1 && value <= 50;
}

export function saveCartInLocalStorage(cart) {
  localStorage.setItem("panier", JSON.stringify(cart));
}

export function emptyCartInLocalStorage() {
  localStorage.setItem("panier", JSON.stringify([]));
}

export function addOrderToCart(orderToAdd) {
  var userCart = retrieveUserCartFromLocalStorage();
  var relatedOrderFromCart = userCart.find(
    (order) => order.productId === orderToAdd.productId,
  );
  if (relatedOrderFromCart) {
    relatedOrderFromCart.quantity += +orderToAdd.quantity;
  } else {
    userCart.push(orderToAdd);
  }
  saveCartInLocalStorage(userCart);
}

/** @returns {object[]} the cart items stored in localStorage */
export function retrieveUserCartFromLocalStorage() {
  var rawUserCart = localStorage.getItem("panier");
  var userCart = JSON.parse(rawUserCart);
  return Array.from(userCart ?? []);
}
