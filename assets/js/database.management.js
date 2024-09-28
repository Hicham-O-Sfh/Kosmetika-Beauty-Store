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
    ref: "Toros De Arenas, Splendeur, 100ml",
    price: 100,
    description:
      "Découvrez Toros De Arenas, une fragrance captivante qui évoque la richesse des dunes dorées et l'élégance intemporelle. Ce parfum allie des notes florales délicates à des accords chaleureux de bois et d'épices, créant une aura séduisante. Idéal pour ceux qui cherchent à exprimer leur personnalité avec sophistication, il transforme chaque instant en une célébration de la beauté. Un incontournable pour toute collection.",
    secondDescription: `
        <b>Marque:</b> Splendeur, Toros De Arenas.
        <br>
        <b>Qualité:</b> Eau de toilette.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/toros de arenas img2 BIG.jpg",
        smallPicUrl: "assets/img/product/toros de arenas img2 SM.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/toros de arenas img2 BIG.jpg",
        smallPicUrl: "assets/img/product/toros de arenas img2 SM.jpg",
      },
      {
        bigPicUrl: "assets/img/product/toros de arenas img1 BIG.jpg",
        smallPicUrl: "assets/img/product/toros de arenas img1 SM.jpg",
      },
      {
        bigPicUrl: "assets/img/product/toros de arenas img3 BIG.jpg",
        smallPicUrl: "assets/img/product/toros de arenas img3 SM.jpg",
      },
    ],
  },
  {
    id: 2,
    ref: "Ana Lmalik, I am the King, 100ml",
    price: 299,
    description:
      "Découvrez Ana Lmalik, une fragrance royale qui incarne la grandeur et le raffinement. Ce parfum puissant et sophistiqué allie des notes orientales riches à des accords épicés et boisés, créant un sillage captivant et mémorable. Idéal pour ceux qui recherchent une signature olfactive affirmée et élégante, Ana Lmalik se porte avec assurance, de jour comme de nuit. Laissez-vous envelopper par son aura majestueuse et laissez une empreinte royale partout où vous allez.",
    secondDescription: `
      <b>Marque:</b> Ard Al Zaafaran, Ana Lmalik.
      <br>
      <b>Qualité:</b> Eau de parfum.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/ard al zaafarn i am king img3 BIG.jpg",
        smallPicUrl: "assets/img/product/ard al zaafarn i am king img3 SM.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/ard al zaafarn i am king img2 BIG.jpg",
        smallPicUrl: "assets/img/product/ard al zaafarn i am king img2 SM.jpg",
      },
      {
        bigPicUrl: "assets/img/product/ard al zaafarn i am king img4 BIG.jpg",
        smallPicUrl: "assets/img/product/ard al zaafarn i am king img4 SM.jpg",
      },
      {
        bigPicUrl: "assets/img/product/ard al zaafarn i am king img3 BIG.jpg",
        smallPicUrl: "assets/img/product/ard al zaafarn i am king img3 SM.jpg",
      },
      {
        bigPicUrl: "assets/img/product/ard al zaafarn i am king img5 BIG.jpg",
        smallPicUrl: "assets/img/product/ard al zaafarn i am king img5 SM.jpg",
      },
    ],
  },
  {
    id: 3,
    ref: "Yara, 100ml",
    price: 300,
    description:
      "Lattafa Yara est une fragrance délicate et envoûtante qui combine subtilement des notes florales et fruitées, créant une harmonie olfactive douce et rafraîchissante. Idéale pour ceux qui cherchent une touche de légèreté et d’élégance au quotidien, elle laisse un sillage raffiné et captivant. Parfait pour toutes les occasions, Yara évoque la fraîcheur et la modernité avec une allure irrésistible. Un parfum qui sublime chaque moment et attire tous les regards.",
    secondDescription: `
      <b>Marque:</b> Lattafa.
      <br>
      <b>Qualité:</b> Eau de parfum.`,
    pics: [
      {
        bigPicUrl: "assets/img/product/yara img1 BIG.jpg",
        smallPicUrl: "assets/img/product/yara img1 SM.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/yara img2 BIG.jpg",
        smallPicUrl: "assets/img/product/yara img2 SM.jpg",
      },
      {
        bigPicUrl: "assets/img/product/yara img3 BIG.jpg",
        smallPicUrl: "assets/img/product/yara img3 SM.jpg",
      },
      {
        bigPicUrl: "assets/img/product/yara img1 BIG.jpg",
        smallPicUrl: "assets/img/product/yara img1 SM.jpg",
      },
    ],
  },
  {
    id: 4,
    ref: "ref-produit-4",
    price: 400,
    description:
      "p4eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in",
    secondDescription:
      "p4eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in",
    pics: [
      {
        bigPicUrl: "assets/img/product/product8-big.jpg",
        smallPicUrl: "assets/img/product/product8.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/product1-big.jpg",
        smallPicUrl: "assets/img/product/product13.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product2-big.jpg",
        smallPicUrl: "assets/img/product/product2.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product8-big.jpg",
        smallPicUrl: "assets/img/product/product8.jpg",
      },
    ],
  },
  {
    id: 5,
    ref: "ref-produit-5",
    price: 500,
    description:
      "p5eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in",
    secondDescription:
      "p5eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in",
    pics: [
      {
        bigPicUrl: "assets/img/product/product3-big.jpg",
        smallPicUrl: "assets/img/product/product4.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product-3-big.jpg",
        smallPicUrl: "assets/img/product/product3.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/product2-big.jpg",
        smallPicUrl: "assets/img/product/product2.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product3-big.jpg",
        smallPicUrl: "assets/img/product/product4.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product-3-big.jpg",
        smallPicUrl: "assets/img/product/product3.jpg",
      },
    ],
  },
  {
    id: 6,
    ref: "ref-produit-6",
    price: 600,
    description:
      "p6eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in",
    secondDescription:
      "p6eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in",
    pics: [
      {
        bigPicUrl: "assets/img/product/product11-big.jpg",
        smallPicUrl: "assets/img/product/product11.jpg",
        isMain: true,
      },
      {
        bigPicUrl: "assets/img/product/product11-big.jpg",
        smallPicUrl: "assets/img/product/product11.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product3-big.jpg",
        smallPicUrl: "assets/img/product/product4.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product-3-big.jpg",
        smallPicUrl: "assets/img/product/product3.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product2-big.jpg",
        smallPicUrl: "assets/img/product/product2.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product3-big.jpg",
        smallPicUrl: "assets/img/product/product4.jpg",
      },
      {
        bigPicUrl: "assets/img/product/product-3-big.jpg",
        smallPicUrl: "assets/img/product/product3.jpg",
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
