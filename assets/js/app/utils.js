/*!
 * Kosmetika — Beauty Store
 * Copyright (c) 2024-2026 Hicham Oussama Saffih. All rights reserved.
 * Distributed under the MIT License — see the LICENSE file at the project root.
 */

"use strict";

import {
  FACEBOOK,
  FACEBOOK_LINK,
  INSTAGRAM,
  INSTAGRAM_LINK,
  TEL_NUMBER_LINK,
  TIKTOK,
  TIKTOK_LINK,
  WHATSAPP_NUMBER,
  WHATSAPP_NUMBER_LINK,
} from "./config/site.config.js";
import {
  getAllProducts,
  getMainPicUrl,
  getProduct,
  getProductTitle,
  getSecondaryPicUrl,
  PRODUCT_STATUS,
} from "./data/products.repository.js";
import { updateProductOrderStats } from "./firebase-management.js";
import {
  addOrderToCart,
  emptyCartInLocalStorage,
  isValidNumberInputValue,
  retrieveUserCartFromLocalStorage,
  saveCartInLocalStorage,
} from "./services/cart.service.js";
import {
  applyElevateZoom,
  applyOwlCarousel,
  applySlickForSectionHomeTabs,
  applySlickForSectionRelatedProducts,
} from "./ui/plugins.js";
import {
  getSecondaryInfoHtml,
  isOutOfStock,
  outOfStockAlertHtml,
  outOfStockBadge,
  outOfStockThumbBadge,
  productNotFoundHtml,
  renderProductCard,
} from "./ui/templates.js";

/**
 * Product id carried by the `?productId=` query string.
 * `null` when the parameter is missing or malformed.
 * @returns {number|null}
 */
export function getCurrentDisplayedProductId() {
  const url = new URL(window.location.href);
  const productId = Number(url.searchParams.get("productId"));
  return Number.isInteger(productId) && productId > 0 ? productId : null;
}

/**
 * Build visual cart display on page init
 */
export function buildVisualCart() {
  var userCart = retrieveUserCartFromLocalStorage();
  var subTotal = 0;
  $("#subtotal").html(`${subTotal} Dhs`);

  // add cart items quantity to the quantity tag html element (green circle)
  $("#cart-quantity").html(userCart.length);

  // empty & clean cart display, to fill it properly
  $("#cart-items").empty("");

  // make the confiramtion submit button not visible
  $("#whatsapp-button").addClass("d-none");
  $("#cart-items").removeClass("cart-items-border");

  // loop over all added orders in cart, and display each one correctly
  Array.from(userCart).forEach((order) => {
    getProduct(order.productId)
      .then((mappedProductFromDb) => {
        // Entry pointing at nothing: drop it instead of crashing on
        // `undefined` at every page load.
        if (!mappedProductFromDb) {
          const cleanedCart = retrieveUserCartFromLocalStorage().filter(
            (item) => item.productId !== order.productId,
          );
          saveCartInLocalStorage(cleanedCart);
          $("#cart-quantity").html(cleanedCart.length);
          return;
        }

        const productMainPic = getMainPicUrl(mappedProductFromDb);
        subTotal += order.quantity * mappedProductFromDb.price;
        $("#cart-items").append(
          `
          <div class="cart_item" data-product-id="${order.productId}">
            <div class="cart_img">
              <a
                href="product-details.html?productId=${mappedProductFromDb.id}"
                tabindex="-1"
                aria-hidden="true">
                <img src="${productMainPic}" alt="${getProductTitle(mappedProductFromDb)}"/>
              </a>
            </div>
            <div class="cart_info">
              <a href="product-details.html?productId=${mappedProductFromDb.id}">${getProductTitle(mappedProductFromDb)}</a>
              <span class="quantity">quantité: ${order.quantity}</span>
              <span class="price_cart">${mappedProductFromDb.price} Dhs</span>
            </div>
            <div class="cart_remove">
              <button
                type="button"
                class="remove-from-cart"
                aria-label="Retirer ${getProductTitle(mappedProductFromDb)} du panier">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        `,
        );

        // calcul subtotal
        $("#subtotal").html(`${subTotal} Dhs`);
        $("#whatsapp-button").removeClass("d-none");
        $("#cart-items").addClass("cart-items-border");
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du panier :", error);
        new Notyf().error({
          message: "Impossible de charger un article du panier.",
        });
      });
  });
}

/** Replace the whole product block with a friendly "introuvable" message. */
function showProductNotFound() {
  $(".product_details .row").html(productNotFoundHtml());
}

export function projectProductInPage() {
  // get productId from query string
  const productId = getCurrentDisplayedProductId();

  // page opened without a usable `?productId=` — nothing to fetch
  if (productId === null) {
    showProductNotFound();
    return;
  }

  getProduct(productId)
    .then((product) => {
      // well-formed id, but no such product in the catalogue
      if (!product) {
        showProductNotFound();
        return;
      }

      $("#product-name").html(
        `${getProductTitle(product)} ${outOfStockBadge(product)}`,
      );
      $("#product-price").html(`${product.price} Dhs`);
      $("#product-description").html(product.descriptionHtml);
      $("#second-product-description").html(getSecondaryInfoHtml(product));

      // Out-of-stock notice — the product stays orderable
      if (isOutOfStock(product)) {
        $(".product_d_right .product_desc").after(outOfStockAlertHtml());
      }

      // product's pictures & zoom management
      const productMainPic = getMainPicUrl(product);
      const productTitle = getProductTitle(product);
      product.pics.forEach((pic, index) => {
        $("#gallery_01").append(
          `
        <li>
          <a
            href="#"
            class="elevatezoom-gallery active"
            data-update=""
            data-image="${pic.url}"
            data-zoom-image="${pic.url}">
            <img
              src="${pic.url}"
              alt="${productTitle} — photo ${index + 1}"/>
          </a>
        </li>
        `,
        );
      });
      applyOwlCarousel();

      $("#zoom1").prop("src", productMainPic);
      $("#zoom1").prop("alt", productTitle);
      $("#zoom1").data("zoom-image", productMainPic);
      applyElevateZoom();

      // disable the skeleton loader
      $(".big-image-skeleton").removeClass("big-image-skeleton");
      $(".text-skeleton").removeClass("text-skeleton");
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du produit :", error);
      new Notyf().error({ message: "Impossible de charger ce produit." });
    });
}

export function projectRelatedProductsInPage() {
  getAllProducts(6)
    .then((products) => {
      $("#related-products-section").empty();
      products.forEach((prod) => {
        $("#related-products-section").append(
          `
          <div class="custom-col-5">
            <div class="single_product">
              <div class="product_thumb">
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
                <div class="price_box">
                  <span class="current_price">${prod.price} Dhs</span>
                </div>
              </div>
            </div>
          </div>
          `,
        );
      });
      $(".product_section").removeClass("d-none");
      applySlickForSectionRelatedProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function projectDataInFooter() {
  projectContactInfoInFooter();
  projectBestSellingProductsInFooter();
}

export function projectContactInfoInFooter() {
  // Phone number
  $(".phone-number").text(WHATSAPP_NUMBER);
  $(".phone-number").attr("href", TEL_NUMBER_LINK);

  // WhatsApp
  $("#whatsapp-footer").text(WHATSAPP_NUMBER);
  $("#whatsapp-footer").attr("href", WHATSAPP_NUMBER_LINK);
  $(".whatsapp-number").text(WHATSAPP_NUMBER);
  $(".whatsapp-number").attr("href", WHATSAPP_NUMBER_LINK);

  // Instagram
  $("#instagram-footer").text(INSTAGRAM);
  $("#instagram-footer").attr("href", INSTAGRAM_LINK);
  $(".instagram-account").text(INSTAGRAM);
  $(".instagram-account").attr("href", INSTAGRAM_LINK);

  // Facebook
  $("#facebook-footer").text(FACEBOOK);
  $("#facebook-footer").attr("href", FACEBOOK_LINK);
  $(".facebook-account").text(FACEBOOK);
  $(".facebook-account").attr("href", FACEBOOK_LINK);

  // TikTok
  $("#tikTok-footer").text(TIKTOK);
  $("#tikTok-footer").attr("href", TIKTOK_LINK);
  $(".tikTok-account").text(TIKTOK);
  $(".tikTok-account").attr("href", TIKTOK_LINK);
}

export function projectBestSellingProductsInFooter() {
  $("#footer-best-selling-products").html(`
    <h3>✅ Produits les plus vendus</h3>
  `);
  const bestSellingProductsIds = [1, 16];
  bestSellingProductsIds.forEach((productId) => {
    getProduct(productId)
      .then((product) => {
        $("#footer-best-selling-products").append(
          `
          <div class="simple_product_items">
            <div class="simple_product_thumb">
              <a
                href="product-details.html?productId=${product.id}"
                tabindex="-1"
                aria-hidden="true">
                <img
                src="${getMainPicUrl(product)}"
                alt="${getProductTitle(product)}"
                width="600" height="600" loading="lazy"/>
              </a>
            </div>
            <div class="simple_product_content">
              <div class="product_name">
                <h3>
                  <a href="product-details.html?productId=${product.id}">
                    ${getProductTitle(product)}
                  </a>
                </h3>
              </div>
              <div class="product_price">
                <span class="current_price">${product.price} Dhs</span>
              </div>
            </div>
          </div>
          `,
        );
      })
      .catch((error) =>
        console.log("Error while fetching best selling products", error),
      );
  });
}

export function projectProductsInHomeTabs() {
  // Each home tab shows the products carrying its status.
  const homeTabs = [
    { selector: "#featured-products-tab", status: PRODUCT_STATUS.FEATURED },
    { selector: "#arrivals-products-tab", status: PRODUCT_STATUS.NEW_ARRIVALS },
    { selector: "#onsale-products-tab", status: PRODUCT_STATUS.ONSALE },
  ];

  getAllProducts()
    .then((products) => {
      homeTabs.forEach(({ selector, status }) => {
        const $tab = $(selector);
        $tab.empty();
        products
          .filter((prod) => prod.status === status)
          .forEach((prod) => $tab.append(renderProductCard(prod)));
        applySlickForSectionHomeTabs($tab);
      });
    })
    .catch((error) => console.log(error));
}

export function projectAllProductsInShopPage() {
  getAllProducts()
    .then((products) => {
      $("#shop-products-container").empty();

      Array.from(products).forEach((prod) => {
        const productMainPic = getMainPicUrl(prod);
        $("#shop-products-container").append(
          `
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="single_product">
              <div class="product_thumb">
                ${outOfStockThumbBadge(prod)}
                <a
                  class="primary_img"
                  href="product-details.html?productId=${prod.id}"
                  tabindex="-1"
                  aria-hidden="true">
                  <img
                    src="${productMainPic}"
                    alt="${getProductTitle(prod)}"
                    width="600"
                    height="600"
                    loading="lazy" />
                </a>
                <a
                  class="secondary_img"
                  href="product-details.html?productId=${prod.id}"
                  tabindex="-1"
                  aria-hidden="true">
                  <img
                    src="${getSecondaryPicUrl(prod)}"
                    alt="${getProductTitle(prod)} — autre vue"
                    width="600"
                    height="600"
                    loading="lazy" />
                </a>
              </div>
              <div class="product_content">
                <h3>
                  <a href="product-details.html?productId=${prod.id}">
                    ${getProductTitle(prod)}
                  </a>
                </h3>
                <div class="price_box">
                  <span class="current_price">${prod.price} Dhs</span>
                </div>
                <div class="product_hover">
                  <div class="price_box">
                    <span class="current_price">${prod.price} Dhs</span>
                  </div>
                  <div class="product_desc">
                    <p>
                      ${prod.descriptionHtml.slice(0, 150)}...
                    </p>
                  </div>
                </div>
              </div>
          </div>
        `,
        );
      });
    })
    .catch((error) => console.log(error));
}

export function bindContactPageEvents() {
  $("#send-to-whatsapp").click(function (e) {
    e.preventDefault();
    const $currentForm = $("#contact-form").get(0);
    if ($currentForm.reportValidity()) {
      // if message is written (form is valid)
      // then redirect & send in our WhatsApp discussion
      const encodedMessage = encodeURIComponent($("#message-text-area").val());
      const whatsappURL = WHATSAPP_NUMBER_LINK;
      window.open(`${whatsappURL}?text=${encodedMessage}`);
    }
  });
}

/**
 * Bind automatically removeFromCart event
 * in all existing & new added related elements
 */
export function bindCartEvent() {
  $("body").on("click", ".remove-from-cart", function () {
    // get cart item from client storage
    var userCart = retrieveUserCartFromLocalStorage();
    // get cart item from DOM
    var cartItemToDelete = $(this).closest(".cart_item").get(0);

    // remove cart item from client storage
    const idToDelete = Number(cartItemToDelete.dataset.productId);
    userCart = userCart.filter((order) => order.productId !== idToDelete);
    saveCartInLocalStorage(userCart);

    // remove & update the cart in the DOM
    buildVisualCart();
  });

  $("#whatsapp-button").click(function (e) {
    e.preventDefault();
    const cartItems = retrieveUserCartFromLocalStorage();
    let whatsappMessageRecipe = "";
    let total = 0;

    const promises = cartItems.map(async (cartItem) => {
      return getProduct(cartItem.productId).then((productFromDb) => {
        const productRef = getProductTitle(productFromDb);
        total += +cartItem.quantity * +productFromDb.price;
        whatsappMessageRecipe += `- (${productRef}) x ${cartItem.quantity} = (${productFromDb.price} Dhs) x ${cartItem.quantity}\n`;
      });
    });

    Promise.all(promises).then(async () => {
      whatsappMessageRecipe += `\n\n --------------------------------------------------\n`;
      whatsappMessageRecipe += `\t Total = ${total} Dhs`;
      const encodedMessage = encodeURIComponent(whatsappMessageRecipe);
      const whatsappURL = WHATSAPP_NUMBER_LINK;
      window.open(`${whatsappURL}?text=${encodedMessage}`);
      await updateProductOrderStats(cartItems);
      emptyCartInLocalStorage();
      buildVisualCart();
    });
  });
}

export function bindProductDetailsPageEvents() {
  // quantity input validation
  $("#product-quantity").on("input", function () {
    $("#button-add-to-cart").prop(
      "disabled",
      !isValidNumberInputValue($(this).val()),
    );
  });

  // Add to cart
  $("#button-add-to-cart").click(function () {
    const productId = getCurrentDisplayedProductId();
    const quantity = +$("#product-quantity").val();
    const orderToAdd = {
      productId: productId,
      quantity: quantity,
    };

    addOrderToCart(orderToAdd);

    // update the cart display on DOM
    buildVisualCart();

    var notyf = new Notyf();
    notyf.success({
      message: "HOP!! Au panier!",
      dismissible: true,
      ripple: true,
      position: {
        x: "right",
        y: "top",
      },
    });
  });
}
