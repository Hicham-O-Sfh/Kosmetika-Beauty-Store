/*!
 * Kosmetika — Beauty Store
 * Copyright (c) 2024-2026 Hicham Oussama Saffih. All rights reserved.
 * Distributed under the MIT License — see the LICENSE file at the project root.
 */

"use strict";

/**
 * Product catalogue — source of truth; array order = display order.
 * Exactly one picture per product carries `isMain: true`.
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
    name: "Bloom - Acqua Di Fiori",
    brand: "Gucci®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de toilette",
    category: "femme",
    status: PRODUCT_STATUS.FEATURED,
    descriptionHtml:
      "<b>Gucci® - Bloom - Acqua Di Fiori</b> est une fragrance florale fraîche et délicate 🌸. Avec ses notes de <b>jasmin</b>, de <b>tubéreuse</b> et une touche verte rafraîchissante, elle évoque un jardin en pleine éclosion. Parfaite pour celles qui recherchent une <b>fraîcheur naturelle</b> et une <b>élégance subtile</b> ✨. Un parfum qui célèbre la beauté de la nature et la féminité dans sa forme la plus pure.<br><br>Imaginez la rosée du matin déposée sur des pétales encore endormis 🌿 : voilà l'instant précis que <b>Acqua Di Fiori</b> met en flacon. La <b>tubéreuse</b> s'y fait tendre, presque murmurée, tandis qu'une note verte transparente ouvre l'horizon comme une fenêtre sur un jardin secret.<br><br>Portez-le au lever du jour, sur une peau nue, et laissez-le raconter votre douceur avant même que vous ne parliez 💫. Un <b>sillage lumineux</b> qui ne s'impose jamais mais dont on se souvient toujours — celui d'une femme qui n'a rien à prouver, seulement à fleurir.",
    pics: [
      {
        url: "assets/img/products/1-gucci-bloom-acqua-di-fiori-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/1-gucci-bloom-acqua-di-fiori-box.webp" },
      {
        url: "assets/img/products/1-gucci-bloom-acqua-di-fiori-hero.webp",
        isHero: true,
      },
    ],
  },
  {
    id: 2,
    name: "Ana Lmalik",
    brand: "Ard Al Zaafaran®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "homme",
    status: PRODUCT_STATUS.ONSALE,
    descriptionHtml:
      "<b>Ard Al Zaafaran® - Ana Lmalik</b> est une fragrance <b>royale</b> qui allie des notes <b>orientales</b> et <b>boisées</b> pour un sillage <b>captivant</b> 👑. Parfait pour une <b>signature élégante</b> de jour comme de nuit 🌙. Laissez une <b>empreinte royale</b> partout où vous allez.<br><br>Son nom signifie « je suis le roi » — et tout, dans ce flacon, tient cette promesse 🦁. Les <b>épices chaudes</b> ouvrent la marche, les <b>bois précieux</b> referment le cortège, et entre les deux s'installe une assurance tranquille, celle des hommes qui entrent dans une pièce sans jamais élever la voix.<br><br>Deux pressions au creux du cou, et le reste de la journée vous appartient ⚜️. Un parfum <b>tenace</b> et <b>magnétique</b>, qui persiste sur le col d'une veste bien après votre départ — comme une signature qu'on n'oublie pas.",
    pics: [
      {
        url: "assets/img/products/2-ard-al-zaafaran-ana-lmalik-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/2-ard-al-zaafaran-ana-lmalik-box.webp" },
      {
        url: "assets/img/products/2-ard-al-zaafaran-ana-lmalik-hero.webp",
        isHero: true,
      },
    ],
  },
  {
    id: 3,
    name: "Yara",
    brand: "Lattafa®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: PRODUCT_STATUS.FEATURED,
    descriptionHtml:
      "<b>Lattafa® - Yara</b> est une fragrance <b>délicate</b> et <b>envoûtante</b> qui combine subtilement des notes <b>florales</b> et <b>fruitées</b> 🍓. Elle offre une harmonie <b>douce</b> et <b>rafraîchissante</b>, parfaite pour une touche de <b>légèreté</b> et d'<b>élégance</b> au quotidien ✨. Avec son sillage <b>raffiné</b>, elle sublime chaque moment et attire tous les regards.<br><br>Il y a dans <b>Yara</b> quelque chose d'irrésistiblement gourmand 🍦 : une <b>vanille crémeuse</b> qui enveloppe, un <b>musc</b> velouté qui rassure, et cette pointe de fruit mûr qui donne envie de se rapprocher. Le flacon rose et doré est déjà une promesse ; la peau fait le reste.<br><br>C'est le parfum des complices, celui qu'on vous demandera à voix basse 💗. Sa <b>tenue exceptionnelle</b> traverse la journée sans faiblir et s'attarde le soir sur l'écharpe, l'oreiller, la mémoire. Douce, mais inoubliable.",
    pics: [
      { url: "assets/img/products/3-lattafa-yara-main.webp", isMain: true },
      { url: "assets/img/products/3-lattafa-yara-box.webp" },
      { url: "assets/img/products/3-lattafa-yara-1.webp" },
      { url: "assets/img/products/3-lattafa-yara-2.webp" },
      { url: "assets/img/products/3-lattafa-yara-hero.webp", isHero: true },
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
    status: PRODUCT_STATUS.ONSALE,
    descriptionHtml:
      "<b>Manassik® - Gharam wa Hob</b> est une eau de parfum <b>captivante</b> qui incarne la <b>passion</b> et le <b>romantisme</b> 💖. Ses notes <b>orientales chaleureuses</b> et <b>florales</b> créent un sillage <b>sensuel</b> et <b>mystérieux</b>. Idéal pour les moments <b>spéciaux</b>, ce parfum riche en <b>émotions</b> est une véritable déclaration de <b>séduction</b>.<br><br>« Passion et amour » : son nom dit tout, son sillage le prouve 🔥. Les <b>fleurs</b> s'y ouvrent comme une confidence, puis viennent l'<b>ambre</b> et le <b>musc</b>, chauds, enveloppants, qui transforment un simple bonsoir en promesse tenue.<br><br>Réservez-le aux soirs qui comptent 🌹 — un dîner aux lumières basses, une rencontre qu'on espère. Sur la peau, il devient <b>plus profond</b> heure après heure, jusqu'à ne plus faire qu'un avec vous. Ce n'est plus un parfum : c'est votre déclaration.",
    pics: [
      {
        url: "assets/img/products/4-manassik-gharam-wa-hob-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/4-manassik-gharam-wa-hob-box.webp" },
      {
        url: "assets/img/products/4-manassik-gharam-wa-hob-hero.webp",
        isHero: true,
      },
    ],
  },
  {
    id: 5,
    name: "Aqua",
    brand: "Aqua®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: PRODUCT_STATUS.OUT_OF_STOCK,
    descriptionHtml:
      "<b>Aqua®</b> 🌊 est une fragrance <b>fraîche</b> et <b>vivifiante</b>, inspirée par l'énergie de l'<b>océan</b>. Ses notes <b>marines</b> et <b>d'agrumes</b> 🍋 offrent une sensation de <b>liberté</b> et de <b>pureté</b> 🌿, parfaite pour toutes vos journées.<br><br>C'est le premier plongeon du matin, l'air salé qui pique les joues, la lumière qui rebondit sur l'eau ☀️. Le <b>citron</b> et la <b>bergamote</b> réveillent, l'accord <b>aquatique</b> apaise, et un fond légèrement <b>musqué</b> garde la peau douce longtemps après.<br><br>À porter comme on respire : au bureau, en terrasse, sur un chemin de sable 🐚. Une <b>fraîcheur nette</b> et lumineuse qui rend chaque geste plus léger, et laisse derrière vous ce parfum de vacances qu'on n'a jamais envie de quitter.",
    pics: [
      { url: "assets/img/products/5-aqua-main.webp", isMain: true },
      { url: "assets/img/products/5-aqua-box.webp" },
      { url: "assets/img/products/5-aqua-hero.webp", isHero: true },
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
    status: PRODUCT_STATUS.ONSALE,
    descriptionHtml:
      "<b>Allerv® - Exchange</b> est un parfum masculin <b>luxueux</b>, inspiré par la sophistication de <b>Bleu de Chanel</b> ✨. Avec ses notes <b>fraîches</b> et <b>boisées</b>, il incarne l'<b>élégance</b> et la <b>modernité</b>. Parfait pour l'homme <b>sûr de lui</b>, il laisse un sillage <b>raffiné</b> et <b>intemporel</b>, idéal pour toutes les occasions 🌟.<br><br>Tout commence par un éclat d'<b>agrumes</b> 🍋, vif comme une poignée de main franche. Puis le <b>cèdre</b> et l'<b>encens</b> prennent le relais, plus graves, plus sûrs — la fraîcheur du matin qui devient élégance du soir sans jamais changer de costume.<br><br>Costume ou chemise ouverte, il s'adapte à tout sauf à la médiocrité 🖤. Un <b>format 50 ml</b> qui se glisse partout, une signature <b>polyvalente</b> et racée, et ce compliment qui finit toujours par arriver : « tu sens vraiment bon ».",
    pics: [
      { url: "assets/img/products/6-allerv-exchange-main.webp", isMain: true },
      { url: "assets/img/products/6-allerv-exchange-box.webp" },
      { url: "assets/img/products/6-allerv-exchange-hero.webp", isHero: true },
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
    status: PRODUCT_STATUS.ONSALE,
    descriptionHtml:
      "<b>Lattafa® - Raghba</b> pour Femme, est une fragrance délicieusement sucrée qui enveloppe de ses notes gourmandes de <b>miel</b> 🍯 et de vanille. Séduisante et envoûtante, elle laisse un sillage irrésistible, parfait pour celles qui veulent captiver à chaque instant. Un parfum d'<b>excellence</b>, alliant douceur et <b>séduction</b>, idéal pour les moments spéciaux.<br><br><b>Raghba</b> signifie « désir », et rien n'est laissé au hasard 🤍. La <b>vanille</b> y coule comme du velours, le <b>miel</b> réchauffe, et un fond de <b>bois</b> et de <b>musc</b> vient poser juste ce qu'il faut de profondeur pour que la douceur ne bascule jamais dans la naïveté.<br><br>Vaporisez-en sur les cheveux : le sillage vous suivra toute la soirée ✨. <b>Puissante</b>, <b>durable</b>, terriblement addictive, c'est la fragrance de celles qui laissent les autres deviner — et espérer.",
    pics: [
      { url: "assets/img/products/7-lattafa-raghba-main.webp", isMain: true },
      { url: "assets/img/products/7-lattafa-raghba-box.webp" },
      { url: "assets/img/products/7-lattafa-raghba-hero.webp", isHero: true },
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
    status: PRODUCT_STATUS.ONSALE,
    descriptionHtml:
      "<b>Manassik® - Loves Musk</b> est une fragrance envoûtante qui célèbre la pureté et la douceur du <b>musc</b> 🌸. Avec ses notes chaleureuses et sensuelles ❤️‍🔥, elle laisse un sillage <b>élégant</b> et <b>raffiné</b>, idéal pour les moments de <b>séduction</b>. Un parfum qui incarne la <b>passion</b> et l'<b>intimité</b>, parfait pour ceux qui veulent se démarquer avec subtilité.<br><br>Le <b>musc</b> est le plus intime des parfums : il ne se pose pas sur la peau, il en devient le prolongement 🤍. Ici, il se drape de <b>fleurs blanches</b> et d'une douceur poudrée, comme un linge propre séché au soleil, comme une étreinte qui dure une seconde de trop.<br><br>Idéal pour les journées où l'on veut être approchée, pas remarquée 💫. Un sillage <b>discret</b> mais <b>tenace</b>, qui ne se révèle qu'à ceux qui savent s'avancer — la définition même de l'élégance chuchotée.",
    pics: [
      {
        url: "assets/img/products/8-manassik-loves-musk-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/8-manassik-loves-musk-box.webp" },
      {
        url: "assets/img/products/8-manassik-loves-musk-hero.webp",
        isHero: true,
      },
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
    status: PRODUCT_STATUS.NEW_ARRIVALS,
    descriptionHtml:
      "<b>Manassik® - Assalah</b> est une eau de parfum masculine de <b>luxe</b> 🐎, incarnant la <b>virilité</b> et l'<b>élégance</b> à travers son design inspiré par la noblesse des chevaux. Ses notes riches et boisées créent un sillage puissant et <b>raffiné</b>, parfait pour l'homme sûr de lui et moderne. Un parfum de <b>beauté</b> intemporelle, conçu pour ceux qui veulent marquer leur présence avec distinction.<br><br><b>Assalah</b> — « l'authenticité ». Celle du pur-sang arabe, du désert au lever du jour, du cuir chaud d'une selle ⚜️. Les <b>épices</b> claquent à l'ouverture, le <b>santal</b> et l'<b>ambre</b> s'installent ensuite, souverains, pour ne plus vous quitter.<br><br>C'est un parfum de tempérament, pas de tendance 🌟. Il convient à l'homme qui avance droit, qui tient parole, et dont on retient le nom. Un <b>sillage noble</b> et <b>durable</b>, aussi juste au bureau qu'aux grandes soirées.",
    pics: [
      { url: "assets/img/products/9-manassik-assalah-main.webp", isMain: true },
      { url: "assets/img/products/9-manassik-assalah-box.webp" },
      { url: "assets/img/products/9-manassik-assalah-hero.webp", isHero: true },
    ],
  },
  {
    id: 10,
    name: "Crystal Noir",
    brand: "Diamond®",
    volumeMl: 50,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: PRODUCT_STATUS.FEATURED,
    descriptionHtml:
      "<b>Diamond® - Crystal Noir</b> s'inspire du célèbre parfum <b>Versace Crystal Noir</b>, offrant une alternative <b>élégante</b> et <b>raffinée</b> ✨. Ses notes <b>florales</b> et <b>orientales</b> créent une fragrance <b>envoûtante</b>, parfaite pour ceux qui recherchent un parfum <b>sophistiqué</b> et <b>séduisant</b>, à la hauteur de l'original.<br><br>Une <b>gardénia</b> crémeuse posée sur un lit de <b>santal</b> et d'<b>ambre</b> 🖤 : c'est la nuit habillée de soie, le noir qui brille au lieu d'absorber la lumière. Un soupçon poivré à l'ouverture réveille l'ensemble, puis tout s'adoucit, comme un velours qu'on caresse à rebours.<br><br>Parfait pour une robe sombre et un rendez-vous qu'on n'annulera pas 🥂. <b>Mystérieux</b>, <b>opulent</b>, terriblement féminin — un flacon compact de 50 ml qui contient bien plus que son volume : une présence.",
    pics: [
      {
        url: "assets/img/products/10-diamond-crystal-noir-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/10-diamond-crystal-noir-box.webp" },
      {
        url: "assets/img/products/10-diamond-crystal-noir-hero.webp",
        isHero: true,
      },
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
    status: PRODUCT_STATUS.FEATURED,
    descriptionHtml:
      "<b>Khalis Perfumes® - Ameerat Al Arab</b> est une fragrance luxueuse qui incarne la <b>grâce</b> et la <b>féminité</b> 🌹. Ses notes riches et <b>orientales</b>, composées de <b>musc</b>, <b>oud</b>, et de touches florales, créent un sillage <b>élégant</b> et <b>envoûtant</b>. Parfait pour celles qui veulent laisser une empreinte royale et <b>sophistiquée</b> à chaque instant. Un parfum digne d'une princesse, à porter en toute occasion spéciale.<br><br>« La princesse des Arabes » porte bien son nom 👑. La <b>rose</b> y règne, ample et charnue, entourée de <b>safran</b> et de <b>fruits confits</b>, avant que l'<b>oud</b> ne vienne poser sa gravité précieuse — l'Orient dans ce qu'il a de plus généreux et de plus raffiné.<br><br>Son flacon sculpté est un bijou de coiffeuse, son sillage un héritage 💎. Quelques gouttes suffisent : il tient des heures, se réveille à la chaleur de la peau et transforme la moindre sortie en <b>occasion mémorable</b>.",
    pics: [
      {
        url: "assets/img/products/11-khalis-ameerat-al-arab-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/11-khalis-ameerat-al-arab-box.webp" },
      { url: "assets/img/products/11-khalis-ameerat-al-arab-1.webp" },
      { url: "assets/img/products/11-khalis-ameerat-al-arab-2.webp" },
      { url: "assets/img/products/11-khalis-ameerat-al-arab-3.webp" },
      {
        url: "assets/img/products/11-khalis-ameerat-al-arab-hero.webp",
        isHero: true,
      },
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
    status: PRODUCT_STATUS.NEW_ARRIVALS,
    descriptionHtml:
      "<b>Lattafa Perfumes® - Ethra'a</b> est une fragrance orientale riche et sophistiquée ✨. Composée de notes <b>florales</b> et <b>épicées</b>, elle crée un sillage envoûtant et <b>luxueux</b>, parfait pour celles qui recherchent une touche de <b>grâce</b> et de <b>mystère</b> 🌹. Ce parfum allie parfaitement la <b>finesse</b> des traditions orientales à une <b>élégance moderne</b>, idéal pour les occasions spéciales où vous souhaitez vous démarquer.<br><br>Il y a des parfums qu'on porte et d'autres qui vous portent 🌙. <b>Ethra'a</b> est de ceux-là : une ouverture <b>épicée</b> et lumineuse, un cœur floral profond, puis une base <b>ambrée</b> et <b>musquée</b> qui s'attarde comme une conversation qu'on ne veut pas finir.<br><br>Offrez-le, ou offrez-le-vous 🎁 — le flacon a déjà l'allure d'un cadeau. Nouveauté <b>rare</b> et <b>opulente</b>, il habille les fêtes, les fiançailles et tous les soirs où vous décidez, simplement, d'être inoubliable.",
    pics: [
      {
        url: "assets/img/products/12-lattafa-perfumes-ethraa-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/12-lattafa-perfumes-ethraa-box.webp" },
      {
        url: "assets/img/products/12-lattafa-perfumes-ethraa-hero.webp",
        isHero: true,
      },
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
    status: PRODUCT_STATUS.NEW_ARRIVALS,
    descriptionHtml:
      "<b>Cosmo® - Black Afgan</b> est un parfum masculin de <b>luxe</b> et d'<b>élégance</b>, inspiré par les riches notes de l'<b>Oud</b> 🖤. Cette fragrance <b>orientale</b> puissante et envoûtante allie des accords <b>boisés</b> et <b>épicés</b>, créant un sillage <b>intense</b> et <b>raffiné</b>. Parfait pour l'homme qui veut affirmer son style avec une touche de mystère et de distinction 🌟. Un parfum qui ne passe pas inaperçu.<br><br>Une fumée d'<b>encens</b> qui monte lentement, du <b>cuir</b> sombre, une résine sucrée qui adoucit les angles 🔥. <b>Black Afgan</b> ne cherche pas à plaire à tout le monde : il choisit ceux qui l'osent, et les récompense d'une aura que rien d'autre ne donne.<br><br>Réservez-le au soir, à l'hiver, aux occasions où vous voulez qu'on se souvienne 🌑. Une seule pulvérisation suffit — sa <b>tenue est redoutable</b>, son caractère <b>indomptable</b>, et son souvenir s'accroche aux vêtements comme aux esprits.",
    pics: [
      {
        url: "assets/img/products/13-cosmo-black-afgan-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/13-cosmo-black-afgan-box.webp" },
      {
        url: "assets/img/products/13-cosmo-black-afgan-hero.webp",
        isHero: true,
      },
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
    status: PRODUCT_STATUS.FEATURED,
    descriptionHtml:
      "<b>Al Fakhr Perfumes® - Cheikh Zaid</b> est une fragrance <b>orientale</b> luxueuse, inspirée par la noblesse et la puissance du <b>Oud</b> 🌿. Avec ses notes riches et <b>boisées</b>, ce parfum évoque l'<b>élégance</b> et la <b>sophistication</b>, parfait pour ceux qui cherchent à affirmer leur présence avec un sillage <b>intense</b> et mémorable. Un parfum digne des plus grands, alliant tradition et modernité 🌟.<br><br>C'est l'odeur des grandes demeures où l'on brûle le bois pour accueillir l'invité 🕌. Le <b>safran</b> et la <b>rose</b> ouvrent la porte, l'<b>oud</b> et le <b>patchouli</b> font asseoir, et l'<b>ambre</b> vous retient encore un peu — l'hospitalité faite parfum.<br><br>À porter les jours où l'on vous attend quelque part ⚜️. <b>Profond</b>, <b>chaleureux</b>, majestueux sans être écrasant, il donne à la voix plus de poids et au silence plus de force. Un classique oriental que l'on garde à vie.",
    pics: [
      {
        url: "assets/img/products/14-al-fakhr-perfumes-cheikh-zaid-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/14-al-fakhr-perfumes-cheikh-zaid-box.webp" },
      {
        url: "assets/img/products/14-al-fakhr-perfumes-cheikh-zaid-hero.webp",
        isHero: true,
      },
    ],
  },
  {
    id: 15,
    name: "Malikat Al Arab (Rose)",
    brand: "Manassik®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: PRODUCT_STATUS.NEW_ARRIVALS,
    descriptionHtml:
      "Plongez dans un univers de <b>luxe floral</b> avec <b>Manassik® - Malikat Al Arab - Rose</b> 🌹. Ce parfum capture l'essence de la <b>rose</b>, enveloppant la peau d'une touche de <b>féminité</b> et de <b>raffinement</b>. Les notes florales s'accordent parfaitement pour créer un sillage <b>sophistiqué</b> et <b>romantique</b>, idéal pour la femme qui souhaite exprimer sa <b>royauté</b> à travers chaque geste. Un véritable hommage à l'<b>élégance orientale</b> 🌸.<br><br>Ce n'est pas une rose de bouquet, c'est une <b>rose de jardin royal</b> 👑 : dense, veloutée, encore humide de rosée, portée par une <b>vanille</b> discrète et un <b>musc</b> soyeux qui la font durer bien après le crépuscule.<br><br>« La reine des Arabes » ne demande pas la permission d'entrer 💗. Portez-la sur les poignets, à l'intérieur des coudes, et laissez chaque geste diffuser ce <b>sillage romantique</b> et <b>souverain</b> qui fait tourner les têtes sans un mot.",
    pics: [
      {
        url: "assets/img/products/15-manassik-malikat-al-arab-rose-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/15-manassik-malikat-al-arab-rose-box.webp" },
      { url: "assets/img/products/15-manassik-malikat-al-arab-rose-1.webp" },
      { url: "assets/img/products/15-manassik-malikat-al-arab-rose-2.webp" },
      {
        url: "assets/img/products/15-manassik-malikat-al-arab-rose-hero.webp",
        isHero: true,
      },
    ],
  },
  {
    id: 16,
    name: "Muski Oud",
    brand: "Manassik®",
    volumeMl: 100,
    price: 100,
    currency: "MAD",
    quality: "Eau de parfum",
    category: "femme",
    status: PRODUCT_STATUS.NEW_ARRIVALS,
    descriptionHtml:
      "<b>Manassik® - Muski Oud</b> marie la douceur du <b>musc</b> à la profondeur de l'<b>oud</b> pour une signature <b>audacieuse</b> et envoûtante 🖤. Ses notes <b>orientales</b>, riches et captivantes, s'adressent à celles qui imposent leur présence sans hausser le ton. Une empreinte de <b>luxe</b> et de <b>sophistication</b>, idéale pour marquer chaque instant d'un sillage <b>profond</b> et <b>durable</b> 🌟.<br><br>Deux âmes dans un même flacon ☯️ : le <b>musc</b>, tendre et lumineux comme une caresse, et l'<b>oud</b>, sombre et résineux comme un secret. De leur rencontre naît un contraste rare — de la douceur qui a du caractère, de la puissance qui sait murmurer.<br><br>Il évolue avec vous au fil des heures 🌙 : boisé le matin, presque velouté le soir. Un <b>sillage tenace</b>, élégant, résolument oriental, pour celles qui préfèrent qu'on les devine plutôt qu'on les remarque.",
    pics: [
      {
        url: "assets/img/products/16-manassik-muski-oud-main.webp",
        isMain: true,
      },
      { url: "assets/img/products/16-manassik-muski-oud-box.webp" },
      { url: "assets/img/products/16-manassik-muski-oud-1.webp" },
      {
        url: "assets/img/products/16-manassik-muski-oud-hero.webp",
        isHero: true,
      },
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
    status: PRODUCT_STATUS.FEATURED,
    descriptionHtml:
      "<b>Lattafa® - Qimmah</b> est l'incarnation de la <b>noblesse</b> et de la <b>grandeur</b> 🌌. Ce parfum unique associe des notes orientales et épicées, créant un sillage à la fois <b>élégant</b> et <b>audacieux</b>, parfait pour ceux qui souhaitent affirmer leur <b>présence</b>. Avec sa profondeur boisée et ses touches épicées, <b>Qimmah</b> exprime la force et la distinction à chaque instant, laissant une empreinte <b>inoubliable</b> 🌟.<br><br><b>Qimmah</b> veut dire « le sommet » — et l'air y est plus rare, plus pur, plus vertigineux 🏔️. Les <b>épices</b> y crépitent, les <b>bois précieux</b> tiennent la ligne, et une base <b>ambrée</b> vient adoucir l'ascension sans jamais lui faire perdre son altitude.<br><br>C'est le parfum des jours décisifs 🥂 : un entretien, une célébration, une promesse tenue. <b>Sophistiqué</b> et <b>affirmé</b>, il ne suit personne et n'imite rien. Ceux qui le portent ne cherchent pas leur place : ils l'occupent.",
    pics: [
      { url: "assets/img/products/17-lattafa-qimmah-main.webp", isMain: true },
      { url: "assets/img/products/17-lattafa-qimmah-box.webp" },
      { url: "assets/img/products/17-lattafa-qimmah-hero.webp", isHero: true },
    ],
  },
];
