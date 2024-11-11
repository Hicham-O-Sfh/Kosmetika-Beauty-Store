"use strict";

/**
 * jQuery plugin initialisers (Slick, Owl Carousel, ElevateZoom).
 * `$` is the global jQuery, loaded from vendor/ before the app module runs.
 */

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
