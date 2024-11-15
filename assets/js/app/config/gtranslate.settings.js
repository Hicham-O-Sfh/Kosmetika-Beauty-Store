// GTranslate widget configuration.
// Must load BEFORE vendor/gtranslate.js, which reads window.gtranslateSettings on load.
window.gtranslateSettings = {
  default_language: "fr",
  native_language_names: true,
  detect_browser_language: true,
  languages: ["fr", "de", "en", "ar"],
  wrapper_selector: ".gtranslate_wrapper",
  horizontal_position: "left",
  vertical_position: "bottom",
  flag_style: "3d",
  alt_flags: { en: "usa" },
};
