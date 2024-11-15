"use strict";

/**
 * jQuery plugin initialisers (Slick, Owl Carousel, ElevateZoom).
 * `$` is the global jQuery, loaded from vendor/ before the app module runs.
 */

// Slick

/**
 * How many columns each breakpoint is meant to show, widest first.
 * `breakpoint: null` = the default (desktop XL and above) settings.
 */
const PRODUCT_SLIDES_PER_BREAKPOINT = [
  { breakpoint: null, slides: 5 },
  { breakpoint: 1200, slides: 4 },
  { breakpoint: 992, slides: 3 },
  { breakpoint: 768, slides: 2 },
  { breakpoint: 480, slides: 1 },
];

/**
 * Build the Slick options for a product row.
 *
 * Slick sizes every slide at `listWidth / slidesToShow`. So when a row holds
 * fewer slides than `slidesToShow`, the track only covers a fraction of the
 * container and the cards end up squeezed on one side — that is exactly what
 * broke the home tabs on desktop (5 or 6 products = only 3 slides once they are
 * stacked 2 by 2, against `slidesToShow: 5`), while tablet/mobile looked fine
 * because there `slidesToShow` happened to be <= the slide count.
 * Capping `slidesToShow` at the real slide count keeps the row full-width for
 * any number of products, and the carousel comes back on its own as soon as
 * there are more products than columns.
 *
 * @param {number} slideCount number of Slick slides (products / `rows`).
 * @param {{rows?: number, centerMode?: boolean}} [options]
 */
function buildProductSlickSettings(slideCount, options = {}) {
  const { rows = 1, centerMode = false } = options;
  const fit = (slides) => Math.max(1, Math.min(slides, slideCount));
  const [base, ...responsive] = PRODUCT_SLIDES_PER_BREAKPOINT;

  return {
    centerMode,
    centerPadding: "0",
    rows,
    arrows: true,
    slidesToShow: fit(base.slides),
    slidesToScroll: fit(base.slides),
    prevArrow:
      '<button class="prev_arrow"><i class="fa fa-angle-left"></i></button>',
    nextArrow:
      '<button class="next_arrow"><i class="fa fa-angle-right"></i></button>',
    responsive: responsive.map(({ breakpoint, slides }) => ({
      breakpoint,
      settings: {
        slidesToShow: fit(slides),
        slidesToScroll: fit(slides),
      },
    })),
  };
}

export function applySlickForSectionRelatedProducts() {
  $(".product_row1").each(function () {
    const $row = $(this);
    $row.slick(
      buildProductSlickSettings($row.children().length, { centerMode: true }),
    );
  });
}

export function applySlickForSectionHomeTabs(homeProductsTab) {
  const $tab = $(homeProductsTab);
  const rows = 2;

  // With `rows: 2` Slick packs the cards 2 by 2, so a tab of N products is
  // ceil(N / 2) slides — that count, not N, is what drives the layout.
  $tab.slick(
    buildProductSlickSettings(Math.ceil($tab.children().length / rows), {
      rows,
    }),
  );
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
