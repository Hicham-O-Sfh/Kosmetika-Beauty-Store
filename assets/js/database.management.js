/**
 * remove background and replace it with pute white (canva)
 * save under 1.06 size : 600 x 600 (canva)
 * enhance image quality, only if really needed ! (canva)
 */

export const WHATSAPP_NUMBER = "+212 0700 6484 01";
export const WHATSAPP_NUMBER_LINK = "";
export const INSTAGRAM = "islam.beauty.store";
export const INSTAGRAM_LINK = "";
export const FACEBOOK = "ISLAM BEAUTY STORE";
export const FACEBOOK_LINK = "";
export const TIKTOK = "ISLAM BEAUTY STORE";
export const TIKTOK_LINK = "";

export const PRODUCT_STATUS = Object.freeze({
  OUT_OF_STOCK: -1,
  NORMAL: 0,
  FEATURED: 1,
  NEW_ARRIVALS: 2,
  ONSALE: 3,
});

export const MAIN_DATABASE = new Set([
  {
    id: 1,
    ref: `Gucci® - Bloom - Aqua Di Fiori 
          <br>
          (100ml)`,
    price: 100,
    description:
      "<b>Gucci® - Bloom - Aqua Di Fiori</b> est une fragrance florale fraîche et délicate 🌸. Avec ses notes de <b>jasmin</b>, de <b>tubéreuse</b> et une touche verte rafraîchissante, elle évoque un jardin en pleine éclosion. Parfaite pour celles qui recherchent une <b>fraîcheur naturelle</b> et une <b>élégance subtile</b> ✨. Un parfum qui célèbre la beauté de la nature et la féminité dans sa forme la plus pure.",
    secondDescription: `
      <b>Marque:</b> Gucci®. 
      <br>
      <b>Qualité:</b> Eau de toilette.
      <br>
      <b>Catégorie:</b> Femme.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/gucci-bloom-img-6.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/aqua-bloom-img-3.png",
      },
      {
        bigPicUrl: "assets/img/product/aqua-bloom-img-2.png",
      },
      {
        bigPicUrl: "assets/img/product/aqua-bloom-img-4.png",
      },
      {
        bigPicUrl: "assets/img/product/aqua-bloom-img-5.png",
      },
    ],
  },
  {
    id: 2,
    ref: `Ard Al Zaafaran® - Ana Lmalik 
          <br>
          (100ml)`,
    price: 299,
    description:
      "<b>Ard Al Zaafaran® - Ana Lmalik</b> est une fragrance <b>royale</b> qui allie des notes <b>orientales</b> et <b>boisées</b> pour un sillage <b>captivant</b> 👑. Parfait pour une <b>signature élégante</b> de jour comme de nuit 🌙. Laissez une <b>empreinte royale</b> partout où vous allez.",
    secondDescription: `
      <b>Marque:</b> Ard Al Zaafaran®.
      <br>
      <b>Qualité:</b> Eau de parfum.
      <br>
      <b>Catégorie:</b> Homme.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/i-am-king-BIG.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/i-am-king-2-BIG.jpg",
      },
      {
        bigPicUrl: "assets/img/product/i-am-king-client-BIG.png",
      },
    ],
  },
  {
    id: 3,
    ref: `Lattafa® - Yara 
          <br>
          (100ml)`,
    price: 300,
    description:
      "<b>Lattafa® - Yara</b> est une fragrance <b>délicate</b> et <b>envoûtante</b> qui combine subtilement des notes <b>florales</b> et <b>fruitées</b> 🍓. Elle offre une harmonie <b>douce</b> et <b>rafraîchissante</b>, parfaite pour une touche de <b>légèreté</b> et d'<b>élégance</b> au quotidien ✨. Avec son sillage <b>raffiné</b>, elle sublime chaque moment et attire tous les regards.",
    secondDescription: `
      <b>Marque:</b> Lattafa®.
      <br>
      <b>Qualité:</b> Eau de parfum.
      <br>
      <b>Catégorie:</b> Femme.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/6291108730515_1-BIG.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/latafaYara-BIG.jpg",
      },
      {
        bigPicUrl: "assets/img/product/latafaYara2-BIG.png",
      },
    ],
  },
  {
    id: 4,
    ref: `Manassik® - Gharam wa Hob 
          <br>
          (100ml)`,
    price: 100,
    description:
      "<b>Manassik® - Gharam wa Hob</b> est une eau de parfum <b>captivante</b> qui incarne la <b>passion</b> et le <b>romantisme</b> 💖. Ses notes <b>orientales chaleureuses</b> et <b>florales</b> créent un sillage <b>sensuel</b> et <b>mystérieux</b>. Idéal pour les moments <b>spéciaux</b>, ce parfum riche en <b>émotions</b> est une véritable déclaration de <b>séduction</b>.",
    secondDescription: `
      <b>Marque:</b> Manassik®.
      <br>
      <b>Qualité:</b> Eau de parfum.
      <br>
      <b>Catégorie:</b> Femme.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/8439627615236_3.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/8439627615236_2.jpg",
      },
      {
        bigPicUrl: "assets/img/product/8439627615236_1.jpg",
      },
    ],
  },
  {
    id: 16,
    ref: `Manasik® - Muski Oud
          <br> 
          (100ml)`,
    price: 100,
    description:
      "<b>Manasik® - Muski Oud</b> fusionne la profondeur du <b>musc</b> et l'intensité de l'<b>oud</b> pour offrir une expérience olfactive audacieuse et envoûtante 🖤. Ce parfum révèle des notes <b>orientales</b> riches et captivantes, parfaites pour ceux qui recherchent une présence affirmée et mystérieuse. Une touche de <b>luxure</b> et de <b>sophistication</b>, idéale pour marquer chaque instant d'un sillage <b>profond</b> et <b>durable</b> 🌟.",
    secondDescription: `
        <b>Marque:</b> Manasik®.
        <br>
        <b>Qualité:</b> Eau de parfum.
        <br>
        <b>Catégorie:</b> Femme.
        `,
    pics: [
      {
        bigPicUrl: "assets/img/product/manasik-muski-oud-1.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/manasik-muski-oud-2.png",
      },
      {
        bigPicUrl: "assets/img/product/manasik-muski-oud-3.png",
      },
    ],
  },
  {
    id: 6,
    ref: `Allerv® - Exchange
          <br>
          (50ml)`,
    price: 100,
    description:
      "<b>Allerv® - Exchange</b> est un parfum masculin <b>luxueux</b>, inspiré par la sophistication de <b>Bleu de Chanel</b> ✨. Avec ses notes <b>fraîches</b> et <b>boisées</b>, il incarne l'<b>élégance</b> et la <b>modernité</b>. Parfait pour l'homme <b>sûr de lui</b>, il laisse un sillage <b>raffiné</b> et <b>intemporel</b>, idéal pour toutes les occasions 🌟.",
    secondDescription: `
      <b>Marque:</b> Allerv®. 
      <br>
      <b>Qualité:</b> Eau de parfum.
      <br>
      <b>Catégorie:</b> Homme.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/allery-exchange-img-2-BIG.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/allery-exchange-img-3-BIG.png",
      },
    ],
  },
  {
    id: 7,
    ref: `Lattafa® - Raghba 
          <br>
          (100ml)`,
    price: 100,
    description:
      "<b>Lattafa® - Raghba</b> pour Femme, est une fragrance délicieusement sucrée qui enveloppe de ses notes gourmandes de <b>miel</b> 🍯 et de vanille. Séduisante et envoûtante, elle laisse un sillage irrésistible, parfait pour celles qui veulent captiver à chaque instant. Un parfum d'<b>excellence</b>, alliant douceur et <b>séduction</b>, idéal pour les moments spéciaux.",
    secondDescription: `
      <b>Marque:</b> Lattafa®. 
      <br>
      <b>Qualité:</b> Eau de parfum.
      <br>
      <b>Catégorie:</b> Femme.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/raghba-img-1-BIG.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/raghba-img-3-BIG.png",
      },
      {
        bigPicUrl: "assets/img/product/raghba-img-2-BIG.png",
      },
    ],
  },
  {
    id: 8,
    ref: `Manassik® - Loves Musk 
          <br>
          (100ml)`,
    price: 100,
    description:
      "<b>Manassik® - Loves Musk</b> est une fragrance envoûtante qui célèbre la pureté et la douceur du <b>musc</b> 🌸. Avec ses notes chaleureuses et sensuelles ❤️‍🔥, elle laisse un sillage <b>élégant</b> et <b>raffiné</b>, idéal pour les moments de <b>séduction</b>. Un parfum qui incarne la <b>passion</b> et l'<b>intimité</b>, parfait pour ceux qui veulent se démarquer avec subtilité.",
    secondDescription: `
      <b>Marque:</b> Manassik®. 
      <br>
      <b>Qualité:</b> Eau de parfum.
      <br>
      <b>Catégorie:</b> Femme.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/loves-musk-img2.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/loves-musk-img1.png",
      },
    ],
  },
  {
    id: 5,
    ref: `Aqua® - Aqua 
          <br>
          (33ml)`,
    price: 100,
    description:
      "<b>Aqua®</b> 🌊 est une fragrance <b>fraîche</b> et <b>vivifiante</b>, inspirée par l'énergie de l'<b>océan</b>. Ses notes <b>marines</b> et <b>d'agrumes</b> 🍋 offrent une sensation de <b>liberté</b> et de <b>pureté</b> 🌿, parfaite pour toutes vos journées.",
    secondDescription: `
      <b>Marque:</b> Aqua®.
      <br>
      <b>Qualité:</b> Eau de parfum.
      <br>
      <b>Catégorie:</b> Femme.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/aqua-img-1-BIG.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/aqua-img-2-BIG.png",
      },
      {
        bigPicUrl: "assets/img/product/aqua-img-3-BIG.png",
      },
    ],
  },
  {
    id: 9,
    ref: `Manassik® - Assalah 
          <br>
          (100ml)`,
    price: 100,
    description:
      "<b>Manassik® - Assalah</b> est une eau de parfum masculine de <b>luxe</b> 🐎, incarnant la <b>virilité</b> et l'<b>élégance</b> à travers son design inspiré par la noblesse des chevaux. Ses notes riches et boisées créent un sillage puissant et <b>raffiné</b>, parfait pour l'homme sûr de lui et moderne. Un parfum de <b>beauté</b> intemporelle, conçu pour ceux qui veulent marquer leur présence avec distinction. #luxe #beauté #virilité",
    secondDescription: `
      <b>Marque:</b> Manassik®. 
      <br>
      <b>Qualité:</b> Eau de parfum.
      <br>
      <b>Catégorie:</b> Homme.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/manassik-assalah-img-1.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/manassik-assalah-img-3.png",
      },
      {
        bigPicUrl: "assets/img/product/Manassik-assalah-img-2.png",
      },
    ],
  },
  {
    id: 10,
    ref: `Diamond® - Crystal Noir 
          <br> 
          (100ml)`,
    price: 100,
    description:
      "<b>Diamond® - Crystal Noir</b> s'inspire du célèbre parfum <b>Versace Crystal Noir</b>, offrant une alternative <b>élégante</b> et <b>raffinée</b> ✨. Ses notes <b>florales</b> et <b>orientales</b> créent une fragrance <b>envoûtante</b>, parfaite pour ceux qui recherchent un parfum <b>sophistiqué</b> et <b>séduisant</b>, à la hauteur de l'original.",
    secondDescription: `
        <b>Marque:</b> Diamond®.
        <br>
        <b>Qualité:</b> Eau de parfum.
        <br>
        <b>Catégorie:</b> Femme.
        `,
    pics: [
      {
        bigPicUrl: "assets/img/product/Versace-Diamond-Crystal-Noir-BIG.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/dyamond-crystal-noir-2-BIG.png",
      },
      {
        bigPicUrl: "assets/img/product/Dyamond-crystal-noir-BIG.png",
      },
      {
        bigPicUrl: "assets/img/product/diamond-crystal-noir-3-BIG.png",
      },
    ],
  },
  {
    id: 11,
    ref: `Khalis® - Ameerat Al Arab 
          <br> 
          (100ml)`,
    price: 100,
    description:
      "<b>Khalis Perfumes® - Ameerat Al Arab</b> est une fragrance luxueuse qui incarne la <b>grâce</b> et la <b>féminité</b> 🌹. Ses notes riches et <b>orientales</b>, composées de <b>musc</b>, <b>oud</b>, et de touches florales, créent un sillage <b>élégant</b> et <b>envoûtant</b>. Parfait pour celles qui veulent laisser une empreinte royale et <b>sophistiquée</b> à chaque instant. Un parfum digne d'une princesse, à porter en toute occasion spéciale.",
    secondDescription: `
        <b>Marque:</b> Khalis Perfumes®.
        <br>
        <b>Qualité:</b> Eau de parfum.
        <br>
        <b>Catégorie:</b> Femme.
        `,
    pics: [
      {
        bigPicUrl: "assets/img/product/amirat-al-arab-img-1.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/amirat-al-arab-img-4.png",
      },
      {
        bigPicUrl: "assets/img/product/amirat-al-arab-img-2.png",
      },
      {
        bigPicUrl: "assets/img/product/amirat-al-arab-img-5.png",
      },
      {
        bigPicUrl: "assets/img/product/amirat-al-arab-img-3.png",
      },
    ],
  },
  {
    id: 12,
    ref: `Lattafa Perfumes® - Ethra'a 
          <br> 
          (100ml)`,
    price: 100,
    description:
      "<b>Lattafa Perfumes® - Ethra'a</b> est une fragrance orientale riche et sophistiquée ✨. Composée de notes <b>florales</b> et <b>épicées</b>, elle crée un sillage envoûtant et <b>luxueux</b>, parfait pour celles qui recherchent une touche de <b>grâce</b> et de <b>mystère</b> 🌹. Ce parfum allie parfaitement la <b>finesse</b> des traditions orientales à une <b>élégance moderne</b>, idéal pour les occasions spéciales où vous souhaitez vous démarquer.",
    secondDescription: `
        <b>Marque:</b> Lattafa Perfumes®.
        <br>
        <b>Qualité:</b> Eau de parfum.
        <br>
        <b>Catégorie:</b> Femme.
        `,
    pics: [
      {
        bigPicUrl: "assets/img/product/ethrae-img-1.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/ethrae-img-2.png",
      },
    ],
  },
  {
    id: 13,
    ref: `Cosmo® - Black Afgan 
          <br> 
          (100ml)`,
    price: 100,
    description:
      "<b>Cosmo® - Black Afgan</b> est un parfum masculin de <b>luxe</b> et d'<b>élégance</b>, inspiré par les riches notes de l'<b>Oud</b> 🖤. Cette fragrance <b>orientale</b> puissante et envoûtante allie des accords <b>boisés</b> et <b>épicés</b>, créant un sillage <b>intense</b> et <b>raffiné</b>. Parfait pour l'homme qui veut affirmer son style avec une touche de mystère et de distinction 🌟. Un parfum qui ne passe pas inaperçu.",
    secondDescription: `
        <b>Marque:</b> Cosmo®.
        <br>
        <b>Qualité:</b> Eau de parfum.
        <br>
        <b>Catégorie:</b> Homme.
        `,
    pics: [
      {
        bigPicUrl: "assets/img/product/black-afgan-2.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/black-afgan-1.png",
      },
    ],
  },
  {
    id: 14,
    ref: `Al Fakhr Perfumes® - Cheikh Zaid 
          <br> 
          (100ml)`,
    price: 100,
    description:
      "<b>Al Fakhr Perfumes® - Cheikh Zaid</b> est une fragrance <b>orientale</b> luxueuse, inspirée par la noblesse et la puissance du <b>Oud</b> 🌿. Avec ses notes riches et <b>boisées</b>, ce parfum évoque l'<b>élégance</b> et la <b>sophistication</b>, parfait pour ceux qui cherchent à affirmer leur présence avec un sillage <b>intense</b> et mémorable. Un parfum digne des plus grands, alliant tradition et modernité 🌟.",
    secondDescription: `
        <b>Marque:</b> Al Fakhr Perfumes®.
        <br>
        <b>Qualité:</b> Eau de parfum.
        <br>
        <b>Catégorie:</b> Homme.
        `,
    pics: [
      {
        bigPicUrl: "assets/img/product/Check-Zaid-img1.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/Check-Zaid-img2.png",
      },
      {
        bigPicUrl: "assets/img/product/Check-Zaid-img3.png",
      },
    ],
  },
  {
    id: 15,
    ref: `Manasik® - Malikat Al Arab (Rose) 
          <br> 
          (100ml)`,
    price: 100,
    description:
      "Plongez dans un monde de <b>luxure florale</b> avec <b>Manasik® - Malikat Al Arab - Rose</b> 🌹. Ce parfum capture l'essence de la <b>rose</b>, enveloppant la peau d'une touche de <b>féminité</b> et de <b>raffinement</b>. Les notes florales s'accordent parfaitement pour créer un sillage <b>sophistiqué</b> et <b>romantique</b>, idéal pour la femme qui souhaite exprimer sa <b>royauté</b> à travers chaque geste. Un véritable hommage à l'<b>élégance orientale</b> 🌸.",
    secondDescription: `
        <b>Marque:</b> Manasik®.
        <br>
        <b>Qualité:</b> Eau de parfum.
        <br>
        <b>Catégorie:</b> Femme.
        `,
    pics: [
      {
        bigPicUrl: "assets/img/product/malikat-al-arab-img1.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/malikat-al-arab-img3.png",
      },
      {
        bigPicUrl: "assets/img/product/malikat-al-arab-img2.png",
      },
      {
        bigPicUrl: "assets/img/product/malikat-al-arab-img4.png",
      },
    ],
  },
  {
    id: 17,
    ref: `Lattafa® - Qimmah
          <br> 
          (100ml)`,
    price: 100,
    description:
      "<b>Lattafa® - Qimmah</b> est l'incarnation de la <b>noblesse</b> et de la <b>grandeur</b> 🌌. Ce parfum unique associe des notes orientales et épicées, créant un sillage à la fois <b>élégant</b> et <b>audacieux</b>, parfait pour ceux qui souhaitent affirmer leur <b>présence</b>. Avec sa profondeur boisée et ses touches épicées, <b>Qimmah</b> exprime la force et la distinction à chaque instant, laissant une empreinte <b>inoubliable</b> 🌟.",
    secondDescription: `
        <b>Marque:</b> Lattafa®.
        <br>
        <b>Qualité:</b> Eau de parfum.
        <br>
        <b>Catégorie:</b> Femme.
        `,
    pics: [
      {
        bigPicUrl: "assets/img/product/Qimmah-img-1.webp",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/Qimmah-img-2.png",
      },
      {
        bigPicUrl: "assets/img/product/Qimmah-img-3.png",
      },
    ],
  },
]);

export function getProductFromDatabase(idProduct) {
  return new Promise((resolve, reject) => {
    try {
      const productFromDB = Array.from(MAIN_DATABASE).find(
        (prod) => prod.id === idProduct
      );
      resolve(JSON.parse(JSON.stringify(productFromDB)));
    } catch (error) {
      reject(error);
    }
  });
}

export function getAllProductsFromDatabase(maxItems) {
  return new Promise((resolve, reject) => {
    try {
      const clonedDataBase = Array.from(
        JSON.parse(JSON.stringify([...MAIN_DATABASE]))
      ).slice(0, maxItems);
      resolve(clonedDataBase);
    } catch (error) {
      reject(error);
    }
  });
}
