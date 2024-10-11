"use strict";

import {
  getAllProductsFromDatabase,
  getProductFromDatabase,
} from "../js/database.management.js";

/*---pluggin dynamic usage---*/
// Slick
export function applySlickForSectionRelatedProducts() {
  $(".product_row1").slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 5,
    arrows: true,
    prevArrow:
      '<button class="prev_arrow"><i class="fa fa-angle-left"></i></button>',
    nextArrow:
      '<button class="next_arrow"><i class="fa fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  });
}

export function applySlickForSectionHomeTabs(homeProductsTab) {
  $(homeProductsTab).slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 5,
    arrows: true,
    rows: 2,
    prevArrow:
      '<button class="prev_arrow"><i class="fa fa-angle-left"></i></button>',
    nextArrow:
      '<button class="next_arrow"><i class="fa fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  });
}

// OwlCarousel
export function applyOwlCarousel() {
  $(".single-product-active").owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    loop: true,
    nav: true,
    items: 3,
    margin: 10,
    dots: false,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      320: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  });
}

// ElevateZoom
export function applyElevateZoom() {
  $("#zoom1").elevateZoom({
    gallery: "gallery_01",
    responsive: true,
    cursor: "crosshair",
    zoomType: "inner",
  });
  setTimeout(function () {
    $(".zoomWindow").css("border-radius", "20px");
  }, 100);
}

export function isValidNumberInputValue(value) {
  return !isNaN(value) && parseInt(value) > 0;
}

// Cart management
export function saveCartInLocalStorage(cart) {
  localStorage.setItem("panier", JSON.stringify(cart));
}

export function addOrderToCart(orderToAdd) {
  var userCart = retrieveUserCartFromLocalStorage();
  var relatedOrderFromCart = userCart.find(
    (order) => order.productId === orderToAdd.productId
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

export function getCurrentDisplayedProductId() {
  const url = new URL(window.location.href);
  const productId = +url.searchParams.get("productId");
  return productId;
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
    getProductFromDatabase(order.productId)
      .then((mappedProductFromDb) => {
        const productMainPic = mappedProductFromDb.pics.find(
          (pic) => pic.isMain === true
        ).bigPicUrl;
        subTotal += order.quantity * mappedProductFromDb.price;
        $("#cart-items").append(
          `
          <div class="cart_item" id="${order.productId}">
            <div class="cart_img">
              <a href="product-details.html?productId=${mappedProductFromDb.id}">
                <img src="${productMainPic}" alt=""/>
              </a>
            </div>
            <div class="cart_info">
              <a href="product-details.html?productId=${mappedProductFromDb.id}">${mappedProductFromDb.ref}</a>
              <span class="quantity">quantité: ${order.quantity}</span>
              <span class="price_cart">${mappedProductFromDb.price} Dhs</span>
            </div>
            <div class="cart_remove">
              <a href="#">
                <i class="ion-android-close remove-from-cart"></i>
              </a>
            </div>
          </div>
        `
        );

        // calcul subtotal
        $("#subtotal").html(`${subTotal} Dhs`);
        $("#whatsapp-button").removeClass("d-none");
        $("#cart-items").addClass("cart-items-border");
      })
      .catch((error) => {
        alert("Erreur lors du chargement du panier", error);
      });
  });
}

export function projectProductInPage() {
  // get productId from query string
  const productId = getCurrentDisplayedProductId();

  getProductFromDatabase(productId)
    .then((product) => {
      $("#product-name").html(product.ref);
      $("#product-price").html(`${product.price} Dhs`);
      $("#product-description").html(product.description);
      $("#second-product-description").html(product.secondDescription);

      // product's pictures & zoom management
      const productMainPic = product.pics.find(
        (pic) => pic.isMain === true
      ).bigPicUrl;
      product.pics.forEach((pic) => {
        $("#gallery_01").append(
          `
        <li>
          <a
            href="#"
            class="elevatezoom-gallery active"
            data-update=""
            data-image="${pic.bigPicUrl}"
            data-zoom-image="${pic.bigPicUrl}">
            <img
              src="${pic.bigPicUrl}"
              alt=""/>
          </a>
        </li>
        `
        );
      });
      applyOwlCarousel();

      $("#zoom1").prop("src", productMainPic);
      $("#zoom1").data("zoom-image", productMainPic);
      applyElevateZoom();

      // disable the skeleton loader
      $(".big-image-skeleton").removeClass("big-image-skeleton");
      $(".text-skeleton").removeClass("text-skeleton");
    })
    .catch((error) => {
      alert("Erreur lors du chargement du produit :", error);
    });
}

export function projectRelatedProductsInPage() {
  getAllProductsFromDatabase(6)
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
                  href="product-details.html?productId=${prod.id}">
                  <img 
                    src="${
                      prod.pics.find((pic) => pic.isMain === true).bigPicUrl
                    }" alt="" />
                </a>
              </div>
              <div class="product_content">
                <h3>
                  <a href="product-details.html?productId=${prod.id}">
                    ${prod.ref}
                  </a>
                </h3>
                <div class="price_box">
                  <span class="current_price">${prod.price} Dhs</span>
                </div>
              </div>
            </div>
          </div>
          `
        );
      });
      $(".product_section").removeClass("d-none");
      applySlickForSectionRelatedProducts();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function projectBestSellingProductsInFooter() {
  $("#footer-best-selling-products").html(`
    <h3>✅ Produits les plus vendus</h3>
  `);
  const bestSellingProductsIds = [2, 3];
  bestSellingProductsIds.forEach((productId) => {
    getProductFromDatabase(productId)
      .then((product) => {
        $("#footer-best-selling-products").append(
          `
          <div class="simple_product_items">
            <div class="simple_product_thumb">
              <a href="product-details.html?productId=${product.id}">
                <img 
                src="${
                  product.pics.find((pic) => pic.isMain === true).bigPicUrl
                }" 
                alt=""/>
              </a>
            </div>
            <div class="simple_product_content">
              <div class="product_name">
                <h3>
                  <a href="product-details.html?productId=${product.id}">
                    ${product.ref}
                  </a>
                </h3>
              </div>
              <div class="product_price">
                <span class="current_price">${product.price} Dhs</span>
              </div>
            </div>
          </div>
          `
        );
      })
      .catch((error) =>
        console.log("Error while fetching best selling products", error)
      );
  });
}

export function projectProductsInHomeTabs() {
  // fill featured products tab
  getAllProductsFromDatabase(12)
    .then((products) => {
      const $featuredProductsTab = $("#featured-products-tab");
      $featuredProductsTab.empty();
      products.forEach((prod) => {
        $featuredProductsTab.append(
          `
          <div class="custom-col-5">
            <div class="single_product">
              <div class="product_thumb">
                <a 
                  class="primary_img" 
                  href="product-details.html?productId=${prod.id}">
                  <img 
                    src="${
                      prod.pics.find((pic) => pic.isMain === true).bigPicUrl
                    }" alt="" />
                </a>
              </div>
              <div class="product_content">
                <h3>
                  <a href="product-details.html?productId=${prod.id}">
                    ${prod.ref}
                  </a>
                </h3>
                <span class="current_price">${prod.price} Dhs</span>
              </div>
            </div>
          </div>
        `
        );
      });
      applySlickForSectionHomeTabs($featuredProductsTab);
    })
    .catch((error) => console.log(error));

  // fill arrivals products tab
  getAllProductsFromDatabase(12)
    .then((products) => {
      const $arrivalsProductsTab = $("#arrivals-products-tab");
      $arrivalsProductsTab.empty();
      products.forEach((prod) => {
        $arrivalsProductsTab.append(
          `
          <div class="custom-col-5">
            <div class="single_product">
              <div class="product_thumb">
                <a
                  class="primary_img"
                  href="product-details.html?productId=${prod.id}">
                  <img
                    src="${
                      prod.pics.find((pic) => pic.isMain === true).bigPicUrl
                    }" alt="" />
                </a>
              </div>
              <div class="product_content">
                <h3>
                  <a href="product-details.html?productId=${prod.id}">
                    ${prod.ref}
                  </a>
                </h3>
                <span class="current_price">${prod.price} Dhs</span>
              </div>
            </div>
          </div>
        `
        );
      });
      applySlickForSectionHomeTabs($arrivalsProductsTab);
    })
    .catch((error) => console.log(error));

  // fill onsale products tab
  getAllProductsFromDatabase(12)
    .then((products) => {
      const $onsaleProductsTab = $("#onsale-products-tab");
      $onsaleProductsTab.empty();
      products.forEach((prod) => {
        $onsaleProductsTab.append(
          `
          <div class="custom-col-5">
            <div class="single_product">
              <div class="product_thumb">
                <a
                  class="primary_img"
                  href="product-details.html?productId=${prod.id}">
                  <img
                    src="${
                      prod.pics.find((pic) => pic.isMain === true).bigPicUrl
                    }" alt="" />
                </a>
              </div>
              <div class="product_content">
                <h3>
                  <a href="product-details.html?productId=${prod.id}">
                    ${prod.ref}
                  </a>
                </h3>
                <span class="current_price">${prod.price} Dhs</span>
              </div>
            </div>
          </div>
        `
        );
      });
      applySlickForSectionHomeTabs($onsaleProductsTab);
    })
    .catch((error) => console.log(error));
}

export function projectAllProductsInShopPage() {
  getAllProductsFromDatabase()
    .then((products) => {
      $("#shop-products-container").empty();

      Array.from(products).forEach((prod) => {
        const productMainPic = prod.pics.find(
          (pic) => pic.isMain === true
        ).bigPicUrl;
        $("#shop-products-container").append(
          `
          <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="single_product">
              <div class="product_thumb">
                <a 
                  class="primary_img" 
                  href="product-details.html?productId=${prod.id}">
                  <img src="${productMainPic}" alt="" />
                </a>
                <a
                  class="secondary_img"
                  href="product-details.html?productId=${prod.id}">
                  <img src="${prod.pics[1].bigPicUrl}" alt="" />
                </a>
              </div>
              <div class="product_content">
                <h3>
                  <a href="product-details.html?productId=${prod.id}">
                    ${prod.ref}
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
                      ${prod.description.slice(0, 150)}...
                    </p>
                  </div>
                </div>
              </div>
          </div>
        `
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
      const whatsappURL = "https://wa.me/2120666201740";
      window.open(`${whatsappURL}?text=${encodedMessage}`);
    }
  });
}

/**
 * Bind automatically removeFromCart event
 * in all existing & new added related elements
 */
export function bindCartEvent() {
  $("body").on("click", ".ion-android-close.remove-from-cart", function () {
    // get cart item from client storage
    var userCart = retrieveUserCartFromLocalStorage();
    // get cart item from DOM
    var cartItemToDelete = $(this).parent().closest(".cart_item").get(0);

    // remove cart item from client storage
    userCart = userCart.filter(
      (order) => order.productId != cartItemToDelete.id
    );
    saveCartInLocalStorage(userCart);

    // remove & update the cart in the DOM
    buildVisualCart();
  });

  $("#whatsapp-button").click(function (e) {
    e.preventDefault();
    const cartItems = retrieveUserCartFromLocalStorage();
    let whatsappMessageRecipe = "";
    let total = 0;

    const promises = cartItems.map((cartItem) => {
      return getProductFromDatabase(cartItem.productId).then(
        (productFromDb) => {
          const productRef = productFromDb.ref.split("\n")[0];
          total += +cartItem.quantity * +productFromDb.price;
          whatsappMessageRecipe += `- (${productRef}) x ${cartItem.quantity} = (${productFromDb.price} Dhs) x ${cartItem.quantity}\n`;
        }
      );
    });

    Promise.all(promises).then(() => {
      whatsappMessageRecipe += `\n\n --------------------------------------------------\n`;
      whatsappMessageRecipe += `\t Total = ${total} Dhs`;
      const encodedMessage = encodeURIComponent(whatsappMessageRecipe);
      const whatsappURL = "https://wa.me/2120666201740";
      window.open(`${whatsappURL}?text=${encodedMessage}`);
    });
  });
}

export function bindProductDetailsPageEvents() {
  // quantity input validation
  $("#product-quantity").on("input", function () {
    $("#button-add-to-cart").prop(
      "disabled",
      !isValidNumberInputValue($(this).val())
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
  });
}
