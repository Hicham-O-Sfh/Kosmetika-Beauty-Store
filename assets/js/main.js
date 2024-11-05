import {
  bindCartEvent,
  bindContactPageEvents,
  bindProductDetailsPageEvents,
  buildVisualCart,
  projectAllProductsInShopPage,
  projectDataInFooter,
  projectProductInPage,
  projectProductsInHomeTabs,
  projectRelatedProductsInPage,
} from "../js/utils.js";

(function ($) {
  "use strict";

  /*---background image---*/
  function dataBackgroundImage() {
    $("[data-bgimg]").each(function () {
      var bgImgUrl = $(this).data("bgimg");
      $(this).css({
        "background-image": "url(" + bgImgUrl + ")", // + meaning concat
      });
    });
  }

  $(window).on("load", function () {
    dataBackgroundImage();
  });

  /*---stickey menu---*/
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $(".sticky-header").removeClass("sticky");
    } else {
      $(".sticky-header").addClass("sticky");
    }
  });

  /*---slider activation---*/
  $(".slider_area").owlCarousel({
    animateOut: "fadeOut",
    autoplay: true,
    loop: true,
    nav: false,
    autoplayTimeout: 9000,
    items: 1,
    dots: false,
  });

  /*---product row 2 activation---*/
  $(".product_row2").slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 4,
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
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
        },
      },
    ],
  });

  /*---testimonial active activation---*/
  $(".testimonial_active").owlCarousel({
    autoplay: true,
    loop: true,
    nav: false,
    autoplay: false,
    autoplayTimeout: 8000,
    items: 1,
    dots: true,
  });

  /*--- Magnific Popup---*/
  $(".instagram_pupop").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /*--- Magnific Popup Video---*/
  $(".video_popup").magnificPopup({
    type: "iframe",
    removalDelay: 300,
    mainClass: "mfp-fade",
  });

  /*--- Magnific Popup Video---*/
  $(".port_popup").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /*---  Custom Scroll Up ---*/
  const scrollBtn = document.getElementById("scrollUpBtn");
  // Show/hide on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollBtn.style.display = "block";
      requestAnimationFrame(() => (scrollBtn.style.opacity = "1"));
    } else {
      scrollBtn.style.opacity = "0";
      setTimeout(() => {
        if (scrollBtn.style.opacity === "0") scrollBtn.style.display = "none";
      }, 300);
    }
  });
  // Smooth scroll to top
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /*---slider-range here---*/
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 500,
    values: [0, 500],
    slide: function (event, ui) {
      $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    },
  });
  $("#amount").val(
    "$" +
      $("#slider-range").slider("values", 0) +
      " - $" +
      $("#slider-range").slider("values", 1)
  );

  /*---tooltip---*/
  $('[data-bs-toggle="tooltip"]').tooltip();

  /*---Tooltip Active---*/
  $(
    ".action_links ul li a,.quick_button a,.social_sharing ul li a,.product_d_action a,.priduct_social a"
  ).tooltip({
    animated: "fade",
    placement: "top",
    container: "body",
  });

  /*---categories slideToggle---*/
  $(".categories_title").on("click", function () {
    $(this).toggleClass("active");
    $(".categories_menu_toggle").slideToggle("medium");
  });

  /*----------  Category more toggle  ----------*/

  $(".categories_menu_toggle li.hidden").hide();
  $("#more-btn").on("click", function (e) {
    e.preventDefault();
    $(".categories_menu_toggle li.hidden").toggle(500);
    var htmlAfter =
      '<i class="fa fa-minus" aria-hidden="true"></i> Less Categories';
    var htmlBefore =
      '<i class="fa fa-plus" aria-hidden="true"></i> More Categories';

    if ($(this).html() == htmlBefore) {
      $(this).html(htmlAfter);
    } else {
      $(this).html(htmlBefore);
    }
  });

  /*---mini cart activation---*/
  $(".cart_link > a").on("click", function () {
    $(".mini_cart,.off_canvars_overlay").addClass("active");
  });

  $(".mini_cart_close > a,.off_canvars_overlay").on("click", function () {
    $(".mini_cart,.off_canvars_overlay").removeClass("active");
  });

  /*---canvas menu activation---*/
  $(".canvas_open").on("click", function () {
    $(".Offcanvas_menu_wrapper,.off_canvars_overlay").addClass("active");
  });

  $(".canvas_close,.off_canvars_overlay").on("click", function () {
    $(".Offcanvas_menu_wrapper,.off_canvars_overlay").removeClass("active");
  });

  /*---Off Canvas Menu---*/
  var $offcanvasNav = $(".offcanvas_main_menu"),
    $offcanvasNavSubMenu = $offcanvasNav.find(".sub-menu");
  $offcanvasNavSubMenu
    .parent()
    .prepend(
      '<span class="menu-expand"><i class="fa fa-angle-down"></i></span>'
    );

  $offcanvasNavSubMenu.slideUp();

  $offcanvasNav.on("click", "li a, li .menu-expand", function (e) {
    var $this = $(this);
    if (
      $this
        .parent()
        .attr("class")
        .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
      ($this.attr("href") === "#" || $this.hasClass("menu-expand"))
    ) {
      e.preventDefault();
      if ($this.siblings("ul:visible").length) {
        $this.siblings("ul").slideUp("slow");
      } else {
        $this.closest("li").siblings("li").find("ul:visible").slideUp("slow");
        $this.siblings("ul").slideDown("slow");
      }
    }
    if (
      $this.is("a") ||
      $this.is("span") ||
      $this.attr("clas").match(/\b(menu-expand)\b/)
    ) {
      $this.parent().toggleClass("menu-open");
    } else if (
      $this.is("li") &&
      $this.attr("class").match(/\b('menu-item-has-children')\b/)
    ) {
      $this.toggleClass("menu-open");
    }
  });

  $(document).ready(function () {
    const url = new URL(window.location.href);
    const raw = url.pathname.split("/").pop(); // ex: "index.html", "contact-us.html", ""
    const page = (raw || "index").replace(/\.html?$/i, ""); // => "index", "product-details", "shop", "contact-us"

    /* all pages */
    buildVisualCart();
    bindCartEvent();
    projectDataInFooter();

    switch (page) {
      case "product-details": {
        bindProductDetailsPageEvents();
        projectProductInPage();
        projectRelatedProductsInPage();
        break;
      }

      case "index": {
        projectRelatedProductsInPage();
        projectProductsInHomeTabs();
        break;
      }

      case "shop": {
        projectAllProductsInShopPage();
        break;
      }

      case "contact-us": {
        bindContactPageEvents();
        break;
      }
    }
  });
})(jQuery);
