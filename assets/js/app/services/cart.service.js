"use strict";

/**
 * Cart state — persisted in localStorage under the "panier" key.
 * Pure data layer: no DOM, no rendering.
 */

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

/**
 * retrieves userCart from local storage
 * and convert it to array
 * @returns array of cart items: userCart
 */
export function retrieveUserCartFromLocalStorage() {
  var rawUserCart = localStorage.getItem("panier");
  var userCart = JSON.parse(rawUserCart);
  return Array.from(userCart ?? []);
}
