/**
 * replace image background with pure white (remove.bg)
 * bulk create 500 x 500 version (imageresizer.com)
 * bulk create 600 x 600 version (imageresizer.com)
 * enhance image quality (canva)
 */

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
    ref: "Crystal Noir (100ml)",
    price: 100,
    description:
      "Diamond Crystal Noir s'inspire de l'emblématique parfum Versace Crystal Noir, offrant une alternative élégante et raffinée. Ses notes florales et orientales créent une fragrance envoûtante, parfaite pour ceux qui recherchent un parfum sophistiqué et séduisant, à la hauteur de l'original.",
    secondDescription: `
        <b>Marque:</b> Diamond®.
        <br>
        <b>Qualité:</b> Eau de parfum.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/Versace-Diamond-Crystal-Noir-BIG.png",
        smallPicUrl: "assets/img/product/Versace-Diamond-Crystal-Noir-SM.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/dyamond-crystal-noir-2-BIG.png",
        smallPicUrl: "assets/img/product/dyamond-crystal-noir-2-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/Dyamond-crystal-noir-BIG.png",
        smallPicUrl: "assets/img/product/Dyamond-crystal-noir-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/diamond-crystal-noir-3-BIG.png",
        smallPicUrl: "assets/img/product/diamond-crystal-noir-3-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/Versace-Diamond-Crystal-Noir-BIG.png",
        smallPicUrl: "assets/img/product/Versace-Diamond-Crystal-Noir-SM.png",
      },
    ],
  },
  {
    id: 2,
    ref: "Ana Lmalik (100ml)",
    price: 299,
    description:
      "Découvrez Ana Lmalik, une fragrance royale qui incarne la grandeur et le raffinement. Ce parfum puissant et sophistiqué allie des notes orientales riches à des accords épicés et boisés, créant un sillage captivant et mémorable. Idéal pour ceux qui recherchent une signature olfactive affirmée et élégante, Ana Lmalik se porte avec assurance, de jour comme de nuit. Laissez-vous envelopper par son aura majestueuse et laissez une empreinte royale partout où vous allez.",
    secondDescription: `
      <b>Marque:</b> Ard Al Zaafaran®.
      <br>
      <b>Qualité:</b> Eau de parfum.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/i-am-king-BIG.png",
        smallPicUrl: "assets/img/product/i-am-king-SM.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/i-am-king-2-BIG.jpg",
        smallPicUrl: "assets/img/product/i-am-king-2-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/i-am-king-client-BIG.png",
        smallPicUrl: "assets/img/product/i-am-king-client-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/i-am-king-BIG.png",
        smallPicUrl: "assets/img/product/i-am-king-SM.jpg",
      },
    ],
  },
  {
    id: 3,
    ref: "Yara (100ml)",
    price: 300,
    description:
      "Lattafa Yara est une fragrance délicate et envoûtante qui combine subtilement des notes florales et fruitées, créant une harmonie olfactive douce et rafraîchissante. Idéale pour ceux qui cherchent une touche de légèreté et d’élégance au quotidien, elle laisse un sillage raffiné et captivant. Parfait pour toutes les occasions, Yara évoque la fraîcheur et la modernité avec une allure irrésistible. Un parfum qui sublime chaque moment et attire tous les regards.",
    secondDescription: `
      <b>Marque:</b> Lattafa®.
      <br>
      <b>Qualité:</b> Eau de parfum.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/6291108730515_1-BIG.png",
        smallPicUrl: "assets/img/product/6291108730515_1-SM.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/latafaYara-BIG.jpg",
        smallPicUrl: "assets/img/product/latafaYara-SM.jpg",
      },
      {
        bigPicUrl: "assets/img/product/latafaYara2-BIG.png",
        smallPicUrl: "assets/img/product/latafaYara2-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/6291108730515_1-BIG.png",
        smallPicUrl: "assets/img/product/6291108730515_1-SM.png",
      },
    ],
  },
  {
    id: 4,
    ref: "Gharam wa Hob (100ml)",
    price: 100,
    description:
      "Manassik Gharam wa Hob est une eau de parfum captivante qui incarne la passion et le romantisme. Avec des notes orientales chaleureuses et des accords floraux envoûtants, cette fragrance évoque une histoire d'amour intense et profonde. Parfaite pour ceux qui recherchent un parfum riche en émotions, Gharam wa Hob enveloppe son porteur d'un sillage sensuel et sophistiqué. Idéal pour les moments spéciaux, il transforme chaque instant en une véritable déclaration de séduction et de mystère.",
    secondDescription: `
      <b>Marque:</b> Manassik®.
      <br>
      <b>Qualité:</b> Eau de parfum.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/8439627615236_3.jpg",
        smallPicUrl: "assets/img/product/8439627615236_3.jpeg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/8439627615236_2.jpg",
        smallPicUrl: "assets/img/product/8439627615236_2.jpeg",
      },
      {
        bigPicUrl: "assets/img/product/8439627615236_1.jpg",
        smallPicUrl: "assets/img/product/8439627615236_1.jpeg",
      },
      {
        bigPicUrl: "assets/img/product/8439627615236_3.jpg",
        smallPicUrl: "assets/img/product/8439627615236_3.jpeg",
      },
    ],
  },
  {
    id: 5,
    ref: "Aqua (100ml)",
    price: 100,
    description:
      "Aqua 🌊 est une fragrance fraîche et vivifiante, inspirée par l'énergie pure de l'océan. Avec des notes marines et des touches d'agrumes 🍋, ce parfum léger et rafraîchissant vous enveloppe d'une sensation de liberté et de pureté 🌿, idéale pour toutes vos journées.",
    secondDescription: `
      <b>Marque:</b> Aqua®.
      <br>
      <b>Qualité:</b> Eau de parfum.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/aqua-img-1-BIG.png",
        smallPicUrl: "assets/img/product/aqua-img-1-SM.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/aqua-img-2-SM.png",
        smallPicUrl: "assets/img/product/aqua-img-2-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/aqua-img-3-SM.png",
        smallPicUrl: "assets/img/product/aqua-img-3-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/aqua-img-1-BIG.png",
        smallPicUrl: "assets/img/product/aqua-img-1-SM.png",
      },
    ],
  },
  {
    id: 6,
    ref: "Exchange (50ml)",
    price: 100,
    description:
      "Allerv Exchange est un parfum masculin luxueux, inspiré par la sophistication de Bleu de Chanel. Avec ses notes fraîches et boisées, il incarne l'élégance et la modernité. Idéal pour l'homme sûr de lui, ce parfum laisse un sillage raffiné et intemporel, parfait pour toutes les occasions. 🌟",
    secondDescription: `
      <b>Marque:</b> Allerv®. 
      <br>
      <b>Qualité:</b> Eau de parfum.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/allery-exchange-img-2-BIG.png",
        smallPicUrl: "assets/img/product/allery-exchange-img-2-BIG.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/allery-exchange-img-3-BIG.png",
        smallPicUrl: "assets/img/product/allery-exchange-img-3-BIG.png",
      },
      {
        bigPicUrl: "assets/img/product/allery-exchange-img-1-BIG.png",
        smallPicUrl: "assets/img/product/allery-exchange-img-1-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/allery-exchange-img-2-BIG.png",
        smallPicUrl: "assets/img/product/allery-exchange-img-2-BIG.png",
      },
    ],
  },
  {
    id: 7,
    ref: "Raghba (100ml)",
    price: 100,
    description:
      "Lattafa Raghba pour Femme est une fragrance délicieusement sucrée qui enveloppe de ses notes gourmandes de <b>miel</b> 🍯 et de vanille. Séduisante et envoûtante, elle laisse un sillage irrésistible, parfait pour celles qui veulent captiver à chaque instant. Un parfum d’<b>excellence</b>, alliant douceur et <b>séduction</b>, idéal pour les moments spéciaux.",
    secondDescription: `
      <b>Marque:</b> Lattafa®. 
      <br>
      <b>Qualité:</b> Eau de parfum.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/raghba-img-1-BIG.png",
        smallPicUrl: "assets/img/product/raghba-img-1-SM.png",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/raghba-img-3-BIG.png",
        smallPicUrl: "assets/img/product/raghba-img-3-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/raghba-img-2-BIG.png",
        smallPicUrl: "assets/img/product/raghba-img-2-SM.png",
      },
      {
        bigPicUrl: "assets/img/product/raghba-img-1-BIG.png",
        smallPicUrl: "assets/img/product/raghba-img-1-SM.png",
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
