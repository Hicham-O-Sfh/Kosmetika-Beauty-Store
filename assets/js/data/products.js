"use strict";

/**
 * Product catalogue — single source of truth.
 *
 * Edit products here; the rest of the app reads them through
 * `products.repository.js`. Order in this array = display order.
 *
 * Field notes:
 *  - `name` / `brand` / `volumeMl` replace the former HTML `ref` string.
 *  - `quality` / `category` replace the former HTML `secondDescription`.
 *  - `category` is a lowercase, unaccented key ("femme" | "homme").
 *  - `descriptionHtml` is intentionally rich HTML (editorial copy).
 *  - `pics[].url` (was `bigPicUrl`); exactly one picture must have `isMain: true`.
 *  - `status` uses PRODUCT_STATUS; currently all FEATURED (see repository/home tabs).
 */

export const PRODUCT_STATUS = Object.freeze({
  OUT_OF_STOCK: "OUT_OF_STOCK",
  NORMAL: "NORMAL",
  FEATURED: "FEATURED",
  NEW_ARRIVALS: "NEW_ARRIVALS",
  ONSALE: "ONSALE",
});

export default [
  {
    id: 1,
    name: "Bloom - Aqua Di Fiori",
    brand: "Gucci®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de toilette",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Gucci® - Bloom - Aqua Di Fiori</b> est une fragrance florale fraîche et délicate 🌸. Avec ses notes de <b>jasmin</b>, de <b>tubéreuse</b> et une touche verte rafraîchissante, elle évoque un jardin en pleine éclosion. Parfaite pour celles qui recherchent une <b>fraîcheur naturelle</b> et une <b>élégance subtile</b> ✨. Un parfum qui célèbre la beauté de la nature et la féminité dans sa forme la plus pure.",
    pics: [
      { url: "assets/img/product/gucci-bloom-img-6.jpg", isMain: true },
      { url: "assets/img/product/aqua-bloom-img-3.png" },
      { url: "assets/img/product/aqua-bloom-img-2.png" },
      { url: "assets/img/product/aqua-bloom-img-4.png" },
      { url: "assets/img/product/aqua-bloom-img-5.png" },
    ],
  },
  {
    id: 2,
    name: "Ana Lmalik",
    brand: "Ard Al Zaafaran®",
    volumeMl: 100,
    price: 299,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "homme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Ard Al Zaafaran® - Ana Lmalik</b> est une fragrance <b>royale</b> qui allie des notes <b>orientales</b> et <b>boisées</b> pour un sillage <b>captivant</b> 👑. Parfait pour une <b>signature élégante</b> de jour comme de nuit 🌙. Laissez une <b>empreinte royale</b> partout où vous allez.",
    pics: [
      { url: "assets/img/product/i-am-king-BIG.png", isMain: true },
      { url: "assets/img/product/i-am-king-2-BIG.jpg" },
      { url: "assets/img/product/i-am-king-client-BIG.png" },
    ],
  },
  {
    id: 3,
    name: "Yara",
    brand: "Lattafa®",
    volumeMl: 100,
    price: 300,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Lattafa® - Yara</b> est une fragrance <b>délicate</b> et <b>envoûtante</b> qui combine subtilement des notes <b>florales</b> et <b>fruitées</b> 🍓. Elle offre une harmonie <b>douce</b> et <b>rafraîchissante</b>, parfaite pour une touche de <b>légèreté</b> et d'<b>élégance</b> au quotidien ✨. Avec son sillage <b>raffiné</b>, elle sublime chaque moment et attire tous les regards.",
    pics: [
      { url: "assets/img/product/6291108730515_1-BIG.png", isMain: true },
      { url: "assets/img/product/latafaYara-BIG.jpg" },
      { url: "assets/img/product/latafaYara2-BIG.png" },
    ],
  },
  {
    id: 4,
    name: "Gharam wa Hob",
    brand: "Manassik®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Manassik® - Gharam wa Hob</b> est une eau de parfum <b>captivante</b> qui incarne la <b>passion</b> et le <b>romantisme</b> 💖. Ses notes <b>orientales chaleureuses</b> et <b>florales</b> créent un sillage <b>sensuel</b> et <b>mystérieux</b>. Idéal pour les moments <b>spéciaux</b>, ce parfum riche en <b>émotions</b> est une véritable déclaration de <b>séduction</b>.",
    pics: [
      { url: "assets/img/product/8439627615236_3.jpg", isMain: true },
      { url: "assets/img/product/8439627615236_2.jpg" },
      { url: "assets/img/product/8439627615236_1.jpg" },
    ],
  },
  {
    id: 16,
    name: "Muski Oud",
    brand: "Manasik®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Manasik® - Muski Oud</b> fusionne la profondeur du <b>musc</b> et l'intensité de l'<b>oud</b> pour offrir une expérience olfactive audacieuse et envoûtante 🖤. Ce parfum révèle des notes <b>orientales</b> riches et captivantes, parfaites pour ceux qui recherchent une présence affirmée et mystérieuse. Une touche de <b>luxure</b> et de <b>sophistication</b>, idéale pour marquer chaque instant d'un sillage <b>profond</b> et <b>durable</b> 🌟.",
    pics: [
      { url: "assets/img/product/manasik-muski-oud-1.png", isMain: true },
      { url: "assets/img/product/manasik-muski-oud-2.png" },
      { url: "assets/img/product/manasik-muski-oud-3.png" },
    ],
  },
  {
    id: 6,
    name: "Exchange",
    brand: "Allerv®",
    volumeMl: 50,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "homme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Allerv® - Exchange</b> est un parfum masculin <b>luxueux</b>, inspiré par la sophistication de <b>Bleu de Chanel</b> ✨. Avec ses notes <b>fraîches</b> et <b>boisées</b>, il incarne l'<b>élégance</b> et la <b>modernité</b>. Parfait pour l'homme <b>sûr de lui</b>, il laisse un sillage <b>raffiné</b> et <b>intemporel</b>, idéal pour toutes les occasions 🌟.",
    pics: [
      { url: "assets/img/product/allery-exchange-img-2-BIG.png", isMain: true },
      { url: "assets/img/product/allery-exchange-img-3-BIG.png" },
    ],
  },
  {
    id: 7,
    name: "Raghba",
    brand: "Lattafa®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Lattafa® - Raghba</b> pour Femme, est une fragrance délicieusement sucrée qui enveloppe de ses notes gourmandes de <b>miel</b> 🍯 et de vanille. Séduisante et envoûtante, elle laisse un sillage irrésistible, parfait pour celles qui veulent captiver à chaque instant. Un parfum d'<b>excellence</b>, alliant douceur et <b>séduction</b>, idéal pour les moments spéciaux.",
    pics: [
      { url: "assets/img/product/raghba-img-1-BIG.png", isMain: true },
      { url: "assets/img/product/raghba-img-3-BIG.png" },
      { url: "assets/img/product/raghba-img-2-BIG.png" },
    ],
  },
  {
    id: 8,
    name: "Loves Musk",
    brand: "Manassik®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Manassik® - Loves Musk</b> est une fragrance envoûtante qui célèbre la pureté et la douceur du <b>musc</b> 🌸. Avec ses notes chaleureuses et sensuelles ❤️‍🔥, elle laisse un sillage <b>élégant</b> et <b>raffiné</b>, idéal pour les moments de <b>séduction</b>. Un parfum qui incarne la <b>passion</b> et l'<b>intimité</b>, parfait pour ceux qui veulent se démarquer avec subtilité.",
    pics: [
      { url: "assets/img/product/loves-musk-img2.png", isMain: true },
      { url: "assets/img/product/loves-musk-img1.png" },
    ],
  },
  {
    id: 5,
    name: "Aqua",
    brand: "Aqua®",
    volumeMl: 33,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Aqua®</b> 🌊 est une fragrance <b>fraîche</b> et <b>vivifiante</b>, inspirée par l'énergie de l'<b>océan</b>. Ses notes <b>marines</b> et <b>d'agrumes</b> 🍋 offrent une sensation de <b>liberté</b> et de <b>pureté</b> 🌿, parfaite pour toutes vos journées.",
    pics: [
      { url: "assets/img/product/aqua-img-1-BIG.png", isMain: true },
      { url: "assets/img/product/aqua-img-2-BIG.png" },
      { url: "assets/img/product/aqua-img-3-BIG.png" },
    ],
  },
  {
    id: 9,
    name: "Assalah",
    brand: "Manassik®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "homme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Manassik® - Assalah</b> est une eau de parfum masculine de <b>luxe</b> 🐎, incarnant la <b>virilité</b> et l'<b>élégance</b> à travers son design inspiré par la noblesse des chevaux. Ses notes riches et boisées créent un sillage puissant et <b>raffiné</b>, parfait pour l'homme sûr de lui et moderne. Un parfum de <b>beauté</b> intemporelle, conçu pour ceux qui veulent marquer leur présence avec distinction. #luxe #beauté #virilité",
    pics: [
      { url: "assets/img/product/manassik-assalah-img-1.jpg", isMain: true },
      { url: "assets/img/product/manassik-assalah-img-3.png" },
      { url: "assets/img/product/Manassik-assalah-img-2.png" },
    ],
  },
  {
    id: 10,
    name: "Crystal Noir",
    brand: "Diamond®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Diamond® - Crystal Noir</b> s'inspire du célèbre parfum <b>Versace Crystal Noir</b>, offrant une alternative <b>élégante</b> et <b>raffinée</b> ✨. Ses notes <b>florales</b> et <b>orientales</b> créent une fragrance <b>envoûtante</b>, parfaite pour ceux qui recherchent un parfum <b>sophistiqué</b> et <b>séduisant</b>, à la hauteur de l'original.",
    pics: [
      { url: "assets/img/product/Versace-Diamond-Crystal-Noir-BIG.png", isMain: true },
      { url: "assets/img/product/dyamond-crystal-noir-2-BIG.png" },
      { url: "assets/img/product/Dyamond-crystal-noir-BIG.png" },
      { url: "assets/img/product/diamond-crystal-noir-3-BIG.png" },
    ],
  },
  {
    id: 11,
    name: "Ameerat Al Arab",
    brand: "Khalis®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Khalis Perfumes® - Ameerat Al Arab</b> est une fragrance luxueuse qui incarne la <b>grâce</b> et la <b>féminité</b> 🌹. Ses notes riches et <b>orientales</b>, composées de <b>musc</b>, <b>oud</b>, et de touches florales, créent un sillage <b>élégant</b> et <b>envoûtant</b>. Parfait pour celles qui veulent laisser une empreinte royale et <b>sophistiquée</b> à chaque instant. Un parfum digne d'une princesse, à porter en toute occasion spéciale.",
    pics: [
      { url: "assets/img/product/amirat-al-arab-img-1.png", isMain: true },
      { url: "assets/img/product/amirat-al-arab-img-4.png" },
      { url: "assets/img/product/amirat-al-arab-img-2.png" },
      { url: "assets/img/product/amirat-al-arab-img-5.png" },
      { url: "assets/img/product/amirat-al-arab-img-3.png" },
    ],
  },
  {
    id: 12,
    name: "Ethra'a",
    brand: "Lattafa Perfumes®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Lattafa Perfumes® - Ethra'a</b> est une fragrance orientale riche et sophistiquée ✨. Composée de notes <b>florales</b> et <b>épicées</b>, elle crée un sillage envoûtant et <b>luxueux</b>, parfait pour celles qui recherchent une touche de <b>grâce</b> et de <b>mystère</b> 🌹. Ce parfum allie parfaitement la <b>finesse</b> des traditions orientales à une <b>élégance moderne</b>, idéal pour les occasions spéciales où vous souhaitez vous démarquer.",
    pics: [
      { url: "assets/img/product/ethrae-img-1.png", isMain: true },
      { url: "assets/img/product/ethrae-img-2.png" },
    ],
  },
  {
    id: 13,
    name: "Black Afgan",
    brand: "Cosmo®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "homme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Cosmo® - Black Afgan</b> est un parfum masculin de <b>luxe</b> et d'<b>élégance</b>, inspiré par les riches notes de l'<b>Oud</b> 🖤. Cette fragrance <b>orientale</b> puissante et envoûtante allie des accords <b>boisés</b> et <b>épicés</b>, créant un sillage <b>intense</b> et <b>raffiné</b>. Parfait pour l'homme qui veut affirmer son style avec une touche de mystère et de distinction 🌟. Un parfum qui ne passe pas inaperçu.",
    pics: [
      { url: "assets/img/product/black-afgan-2.png", isMain: true },
      { url: "assets/img/product/black-afgan-1.png" },
    ],
  },
  {
    id: 14,
    name: "Cheikh Zaid",
    brand: "Al Fakhr Perfumes®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "homme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Al Fakhr Perfumes® - Cheikh Zaid</b> est une fragrance <b>orientale</b> luxueuse, inspirée par la noblesse et la puissance du <b>Oud</b> 🌿. Avec ses notes riches et <b>boisées</b>, ce parfum évoque l'<b>élégance</b> et la <b>sophistication</b>, parfait pour ceux qui cherchent à affirmer leur présence avec un sillage <b>intense</b> et mémorable. Un parfum digne des plus grands, alliant tradition et modernité 🌟.",
    pics: [
      { url: "assets/img/product/Check-Zaid-img1.png", isMain: true },
      { url: "assets/img/product/Check-Zaid-img2.png" },
      { url: "assets/img/product/Check-Zaid-img3.png" },
    ],
  },
  {
    id: 15,
    name: "Malikat Al Arab (Rose)",
    brand: "Manasik®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "Plongez dans un monde de <b>luxure florale</b> avec <b>Manasik® - Malikat Al Arab - Rose</b> 🌹. Ce parfum capture l'essence de la <b>rose</b>, enveloppant la peau d'une touche de <b>féminité</b> et de <b>raffinement</b>. Les notes florales s'accordent parfaitement pour créer un sillage <b>sophistiqué</b> et <b>romantique</b>, idéal pour la femme qui souhaite exprimer sa <b>royauté</b> à travers chaque geste. Un véritable hommage à l'<b>élégance orientale</b> 🌸.",
    pics: [
      { url: "assets/img/product/malikat-al-arab-img1.png", isMain: true },
      { url: "assets/img/product/malikat-al-arab-img3.png" },
      { url: "assets/img/product/malikat-al-arab-img2.png" },
      { url: "assets/img/product/malikat-al-arab-img4.png" },
    ],
  },
  {
    id: 17,
    name: "Qimmah",
    brand: "Lattafa®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: "FEATURED",
    descriptionHtml:
      "<b>Lattafa® - Qimmah</b> est l'incarnation de la <b>noblesse</b> et de la <b>grandeur</b> 🌌. Ce parfum unique associe des notes orientales et épicées, créant un sillage à la fois <b>élégant</b> et <b>audacieux</b>, parfait pour ceux qui souhaitent affirmer leur <b>présence</b>. Avec sa profondeur boisée et ses touches épicées, <b>Qimmah</b> exprime la force et la distinction à chaque instant, laissant une empreinte <b>inoubliable</b> 🌟.",
    pics: [
      { url: "assets/img/product/Qimmah-img-1.webp", isMain: true },
      { url: "assets/img/product/Qimmah-img-2.png" },
      { url: "assets/img/product/Qimmah-img-3.png" },
    ],
  },
];
