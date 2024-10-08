/**
 * remove background and replace it with pute white (canva)
 * save under 1.06 size : 600 x 600 (canva)
 * enhance image quality, only if really needed ! (canva)
 *
 * ! todo:
 * - ajouter catégorie: homme/femme/mono
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
    ref: `Diamond® - Crystal Noir 
          <br> 
          (100ml)`,
    price: 100,
    description:
      "<b>Diamond Crystal Noir</b> s'inspire du célèbre parfum <b>Versace Crystal Noir</b>, offrant une alternative <b>élégante</b> et <b>raffinée</b> ✨. Ses notes <b>florales</b> et <b>orientales</b> créent une fragrance <b>envoûtante</b>, parfaite pour ceux qui recherchent un parfum <b>sophistiqué</b> et <b>séduisant</b>, à la hauteur de l'original.",
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
    id: 2,
    ref: `Ard Al Zaafaran® - Ana Lmalik 
          <br>
          (100ml)`,
    price: 299,
    description:
      "<b>Ana Lmalik</b> est une fragrance <b>royale</b> qui allie des notes <b>orientales</b> et <b>boisées</b> pour un sillage <b>captivant</b> 👑. Parfait pour une <b>signature élégante</b> de jour comme de nuit 🌙. Laissez une <b>empreinte royale</b> partout où vous allez.",
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
      "<b>Lattafa Yara</b> est une fragrance <b>délicate</b> et <b>envoûtante</b> qui combine subtilement des notes <b>florales</b> et <b>fruitées</b> 🍓. Elle offre une harmonie <b>douce</b> et <b>rafraîchissante</b>, parfaite pour une touche de <b>légèreté</b> et d'<b>élégance</b> au quotidien ✨. Avec son sillage <b>raffiné</b>, elle sublime chaque moment et attire tous les regards.",
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
      "<b>Manassik Gharam wa Hob</b> est une eau de parfum <b>captivante</b> qui incarne la <b>passion</b> et le <b>romantisme</b> 💖. Ses notes <b>orientales chaleureuses</b> et <b>florales</b> créent un sillage <b>sensuel</b> et <b>mystérieux</b>. Idéal pour les moments <b>spéciaux</b>, ce parfum riche en <b>émotions</b> est une véritable déclaration de <b>séduction</b>.",
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
    id: 5,
    ref: `Aqua® - Aqua 
          <br>
          (33ml)`,
    price: 100,
    description:
      "<b>Aqua</b> 🌊 est une fragrance <b>fraîche</b> et <b>vivifiante</b>, inspirée par l'énergie de l'<b>océan</b>. Ses notes <b>marines</b> et <b>d'agrumes</b> 🍋 offrent une sensation de <b>liberté</b> et de <b>pureté</b> 🌿, parfaite pour toutes vos journées.",
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
    id: 6,
    ref: `Allerv® - Exchange
          <br>
          (50ml)`,
    price: 100,
    description:
      "<b>Allerv Exchange</b> est un parfum masculin <b>luxueux</b>, inspiré par la sophistication de <b>Bleu de Chanel</b> ✨. Avec ses notes <b>fraîches</b> et <b>boisées</b>, il incarne l'<b>élégance</b> et la <b>modernité</b>. Parfait pour l'homme <b>sûr de lui</b>, il laisse un sillage <b>raffiné</b> et <b>intemporel</b>, idéal pour toutes les occasions 🌟.",
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
      {
        bigPicUrl: "assets/img/product/allery-exchange-img-1-BIG.png",
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
      "Lattafa Raghba pour Femme, est une fragrance délicieusement sucrée qui enveloppe de ses notes gourmandes de <b>miel</b> 🍯 et de vanille. Séduisante et envoûtante, elle laisse un sillage irrésistible, parfait pour celles qui veulent captiver à chaque instant. Un parfum d'<b>excellence</b>, alliant douceur et <b>séduction</b>, idéal pour les moments spéciaux.",
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
