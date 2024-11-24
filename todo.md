# 🧹 TODO — Nettoyage & organisation du projet

> Revue de code complète du 25/07/2026 (branche `master`, arbre propre).
> Contexte : site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS,
> Firestore uniquement pour compter les commandes. Objectif : repo propre, lisible et
> clonable par un tiers depuis GitHub.

**Légende :** 🔴 P0 = bug ou blocage · 🟠 P1 = organisation (ta demande principale) · 🟡 P2 = poids/perf · 🔵 P3 = qualité & open source · 🟣 P4 = préparation du scale (JSON)

**Statut :** 🔴 P0 ✅ · 🟣 P4 migration ✅ · 🟠 **P1 ✅** (P1.1 + P1.2 faits ; P1.3 = statu quo) ·
🟡 **P2 médias ✅** (suppressions + vidéos + images : `assets/` passé de **~86 Mo à 14,4 Mo**) ·
carrousels produits refactorés et débogués (28/07 au soir) · 🟡 **P2 CSS ✅** (30/07 : **753 Ko → 129 Ko**,
CSS + `vendor/plugins.js`, renommé `vendor/slick.js` depuis) · 🟡 **P2 polices ✅**
(30/07 : Ionicons remplacé par Font Awesome, −188 Ko téléchargés — `assets/fonts/` n'existe plus).
🔵 **P3 entamé** : `LICENSE` MIT + section licence du readme + `.gitignore` (30/07) ;
🔴 garde `?productId=` sur `product-details.html` (30/07).
Restent P2 (`defer`), P3 (config Firebase, readme, SEO, a11y, outillage), P4 (reste), P5 — et les liens sociaux.
**Décisions déjà prises (25/07/2026) :** duplication HTML → statu quo (voir P1.3) · catalogue → futur `data/products.js` en `export default`, pas de `fetch` JSON (voir P4).

---

## ✅ Fait (2026-07-26)

**P0 — bugs & code mort** (tout, sauf les liens sociaux) : `jquery.ui.js` (253 Ko) + 6 balises
`<script>` + blocs morts de `main.js` supprimés ; typo `attr("class")` + garde `scrollBtn` + regex
nettoyée ; `alert()` → `console.error` + toast Notyf ; panier `data-product-id` + comparaison stricte
`!==` ; `await` des stats Firestore avant vidage ; **déduplication** des templates → `renderProductCard()` ;
`PRODUCT_STATUS` branché sur les 3 onglets (FEATURED 6 / NEW_ARRIVALS 5 / ONSALE 5 / OUT_OF_STOCK 1 = Aqua),
avec badge « Épuisé » en overlay + alerte sur la fiche. Les items `isMain`/`pics[1]`/`Set`/argument par
défaut/n° WhatsApp avaient été réglés pendant P4.

**P4 — migration data** : catalogue dans `app/data/products.js` (modèle propre), `products.repository.js`
et `app/config/site.config.js` ; `database.management.js` supprimé. Vérifié en live dans le navigateur.

**P1.1 — vendor/app** : libs tierces → `assets/js/vendor/`, code → `assets/js/app/` (avec `config/` et
`data/`) ; libs mortes supprimées (`bpopup`, `jquery.cookie`, `imagesloaded`, `fontawesome` −1,5 Mo) ;
`gTranslate-flags.js` scindé en `app/config/gtranslate.settings.js` + `vendor/gtranslate.js` ;
les 6 blocs `<script>` standardisés (`notyf` désormais partout). Noms de fichiers gardés tels quels.

**P1.2 — éclater `utils.js`** : sorti en 3 modules ciblés → `app/services/cart.service.js` (état panier),
`app/ui/plugins.js` (init jQuery Slick/Owl/Zoom), `app/ui/templates.js` (générateurs HTML). `utils.js`
garde l'orchestration par page ; `main.js` inchangé. Vérifié en live (toutes pages + panier, 0 erreur).

---

## ✅ Fait (2026-07-28) — P2 poids & médias

**Suppressions (−32,5 Mo)** : les 2 GIFs (`parfum-ingredients`, `parfum-kdo`), `official-islam-banner.png`,
`banner4.jpg`, `favicon.ico`, `slider{2,5,6}.jpg` et les 7 fichiers `assets/fonts/fontawesome-webfont*`
(aucun `@font-face` ne les cible — seul `ionicons` l'est, `plugins.css:209`).
_(Ionicons est parti à son tour le 30/07 : `assets/fonts/` n'existe plus.)_
⚠️ **Correction du diagnostic initial** : `background-whatsapp.jpg` est **bien utilisé**
([style.css:1475](assets/css/style.css#L1475) et [9108](assets/css/style.css#L9108)) → **conservé**.
`fontawesome.min.js` avait déjà été supprimé pendant P1.1.

**Vidéos (39,7 Mo → 10,4 Mo, −74 %)** : `flowers` et `fragrance` ré-encodées en 720p H.264 CRF 28 sans
piste audio (`-movflags +faststart`), qualité visuellement indiscernable à 100 % de zoom.
`bg-video-welcome` a un traitement à part (voir ci-dessous). Décodage intégral vérifié sur les 3.
Plus d'`autoplay` en dur : chaque `<video>` porte `preload="none"` + un `poster` WebP (~30 Ko, extrait de
la vidéo) + `data-lazy`, et le nouveau module `app/ui/video.js` charge puis lance la lecture via
`IntersectionObserver` quand la vidéo entre dans le viewport (pause à la sortie). `prefers-reduced-motion`
respecté : le poster reste affiché et **la vidéo n'est jamais téléchargée**. Appelé depuis `main.js` (page `index`).

**Netteté de `bg-video-welcome.mp4`** : le flou signalé sur cette vidéo **vient de la source**, pas du
ré-encodage — l'original 1080p sorti de git est déjà mou (énergie de contours 0,54, très basse ; tag
encodeur `Lavf58.76.100` = déjà transcodé avant d'entrer dans le projet). Aucun filtre CSS en cause.
La résolution n'était pas le vrai levier : c'est le masque de netteté `unsharp=5:5:1.0:5:5:0.0` de ffmpeg
qui rend les arêtes franches (il ne crée pas de détail — l'information n'est pas dans le fichier).
Version retenue : **1080p natif + `unsharp`, CRF 26 = 6,4 Mo** (au lieu de 2,5 Mo en 720p). Le surpoids est
acceptable parce que `preload="none"` fait que cette vidéo ne se télécharge que si le visiteur descend
jusqu'à elle ; et elle est affichée sur ~1050 px CSS, soit ~2100 px physiques en retina, où le 720p était
nettement étiré. Poster régénéré en 1440 px depuis la version nette (30 Ko) pour éviter un saut visuel.
⚠️ Si cette vidéo est un jour remplacée, **repartir d'une source nette** : c'est le seul vrai correctif.

**Images (11,3 Mo → 1,2 Mo, −89 %)** : 48 PNG (produits, service, bannière) convertis en WebP qualité 82.
Transparence vérifiée fichier par fichier — seuls `loyalty` et `delivery-express` en avaient, elle est
préservée (`yuva420p`). Le logo reste en **PNG** : il sert aussi de favicon, et WebP n'est pas fiable en
favicon sur Safari. 45 références mises à jour dans `data/products.js`, plus `services.html` et `contact-us.html`.
`width`/`height` ajoutés partout (toutes les images produit sont en 1:1) et `loading="lazy"` sur la grille
`shop.html`, le footer et les images statiques hors du premier écran — **volontairement pas** dans les
carrousels Slick, où l'image clippée provoquerait un flash à la navigation.

**Vérifié** : les 6 pages servies en http, 0 erreur console, 0 image cassée, 0 requête 404.
_(5 `url()` de `style.css` pointent dans le vide — `banner13/14/15.jpg`, `coming-soon.jpg`, `icon/blog-nav.png` —
mais c'est **antérieur** : ce sont des règles mortes du thème acheté, à nettoyer avec le PurgeCSS de P2.)_

---

## ✅ Fait (2026-07-28, soir) — carrousels produits

**Layout des sliders Slick** ([plugins.js](assets/js/app/ui/plugins.js)) : les colonnes responsives sont
sorties dans `PRODUCT_SLIDES_PER_BREAKPOINT` et une seule fabrique `buildProductSlickSettings(slideCount, options)`
sert les deux carrousels (support de `rows` / `centerMode`). Elle **plafonne `slidesToShow`/`slidesToScroll`
au nombre réel de slides** : Slick dimensionne chaque slide à `listWidth / slidesToShow`, donc une rangée
contenant moins de slides que prévu ne couvrait qu'une fraction du conteneur et les cartes se retrouvaient
tassées d'un côté (bug visible sur les onglets d'accueil en desktop : 5-6 produits = 3 slides seulement une
fois empilés 2 par 2, contre `slidesToShow: 5`). `applySlickForSectionRelatedProducts` s'initialise
désormais **rangée par rangée** (`.each`) d'après le nombre d'enfants, et `applySlickForSectionHomeTabs`
calcule `ceil(nbEnfants / 2)` pour `rows: 2`. Le carrousel revient de lui-même dès qu'il y a plus de
produits que de colonnes. Au passage : nettoyage de formatage CSS (`font-family`, `box-shadow`).

---

## ✅ Fait (2026-07-30) — P2 CSS : purge du thème & des libs

**Résultat : 753 Ko → 129 Ko (−83 %)** sur les 3 fichiers touchés.
`plugins.css` 441 → 33 Ko · `style.css` 234 → 53 Ko · `vendor/plugins.js` 78 → 43 Ko
_(renommé `vendor/slick.js` dans la foulée)_.
_(Deux passes : la purge d'abord, puis une seconde passe le même jour — safelist resserrée,
warnings CSS, commentaires orphelins, nettoyage de `vendor/plugins.js`. Tout est décrit ci-dessous.)_

**1. Libs entières retirées de `plugins.css`** (bundle qui empilait 12 librairies). Chaque bloc a été
vérifié individuellement — retiré seulement si le JS correspondant est absent **ou** jamais initialisé :

| Bloc retiré      | Poids  | Pourquoi                                                                                   |
| ---------------- | ------ | ------------------------------------------------------------------------------------------ |
| Stroke-Gap-Icons | 113 Ko | polices en base64 ; `@font-face` cassé (pointait sur une page 404), aucune classe `.icon-` |
| animate.css      | 69 Ko  | seules 2 `@keyframes` servaient (voir ci-dessous)                                          |
| jQuery UI        | 31 Ko  | `jquery.ui.js` supprimé en P0                                                              |
| Magnific Popup   | 5,5 Ko | `.magnificPopup(` jamais appelé                                                            |
| fullPage         | 5,2 Ko | la lib JS n'est pas dans le projet                                                         |
| meanMenu         | 2,8 Ko | bundlé dans `vendor/plugins.js` mais jamais initialisé                                     |
| slinky           | 2,5 Ko | aucun usage                                                                                |

Conservés : **Bootstrap** (purgé), **Slick**, **Owl** (moins le module vidéo), **Ionicons** (purgé), **Notyf**.
_(Ionicons a finalement été retiré entièrement le même jour — voir « Fait (2026-07-30, suite) ».)_

**2. PurgeCSS** sur Bootstrap (152 → 21 Ko), Ionicons (50 → 1,2 Ko : seuls `ion-android-cart` et
`ion-android-close` servent — ces 1,2 Ko sont partis à leur tour, voir « Fait (2026-07-30, suite) »)
et `style.css` (234 → 53 Ko). Contenu analysé : les 6 pages + tout
`assets/js/app/` + les vendors qui posent des classes à l'exécution (Bootstrap, Slick, Owl, Notyf,
elevateZoom, GTranslate, Modernizr). Safelist réduite à ce que le contenu ne peut pas montrer :
`active`, `d-none`, `show`, `fade`, `collapse*`, `modal-*`, `disabled`, `no-js`, `translated-ltr/rtl`.

⚠️ **Trois pièges rencontrés, à connaître si l'opération est refaite :**

- **Le piège des chemins Windows** : PurgeCSS (fast-glob) n'accepte que des `/`. Avec des `\`, les globs
  matchent **silencieusement zéro fichier** — le JS applicatif n'était pas analysé et `.cart_item`,
  `.badge`, `.alert-warning`, `.col-sm-6`… partaient à la poubelle. Toujours vérifier que chaque entrée
  `content` matche au moins un fichier.
- **Le piège des références par _valeur_** : `style.css` appelle `animation-name: fadeInLeft` / `fadeInDown`,
  des `@keyframes` **d'animate.css** — aucune classe `.animate__…` nulle part, donc la recherche par
  classes ne les voyait pas. Retirer animate.css cassait l'animation d'entrée du slider d'accueil
  (`.active .slider_content h1`, délais 0,3/0,6/0,9 s). Corrigé : les 2 `@keyframes` (+ variantes
  `-webkit-`) sont réinjectées en fin de `plugins.css`.
- **Le piège de la safelist `greedy`** : `greedy: [/owl/]` garde le sélecteur **entier** dès qu'une de ses
  parties matche. `.blog_grid .blog_thumb_active .owl-nav div` survivait donc alors que `.blog_grid`
  n'existe nulle part — idem `.testimonial_active`, `.blog_wrapper`, `.product_black_section`.
  `greedy` supprimé : les classes posées à l'exécution (`slick-*`, `owl-*`, `notyf*`, `zoom*`, `gt_*`) sont
  **déjà** couvertes par `content`, qui inclut le source des libs concernées. −6 Ko de plus, et la 5ᵉ `url()`
  morte (`icon/blog-nav.png`) disparaît avec.

**3. Finition de `style.css`**

- **`-ms-filter` retirés** (les warnings VS Code « Also define the standard property 'filter' »), 6
  déclarations IE en tout : 4 sur les `::placeholder`, 2 sur `.tooltip.show` (`-ms-filter` +
  `filter: alpha(opacity=100)`). C'est la façon IE 8/9 d'écrire `opacity: 1`, qui est déjà là juste
  au-dessus dans chaque règle — et IE 8/9 ne comprend aucun de ces sélecteurs. **Supprimées, pas
  complétées** : ajouter un `filter` standard n'aurait fait que rendre le mort plus verbeux.
  _(Vérifié ensuite : plus aucun préfixe vendeur orphelin dans `style.css`. Il en reste dans
  `plugins.css`, mais c'est du code de librairie, on n'y touche pas.)_
- **92 commentaires orphelins retirés** : dans une suite de commentaires consécutifs, seul le dernier
  introduit encore quelque chose, les précédents annonçaient des sections entièrement purgées
  (`/*blog none sidebar*/`, `/*home five css here*/`, `/*- Overlay Color BG -*/`…).
- **`/* 27. coming soon css here*/` renommé** : ce n'était pas une section morte mais un en-tête menteur —
  ce qui le suit, ce sont **tes** styles (`#whatsapp-button`, squelettes de chargement,
  `.brand-kosmetika-title`, `.video-background`, `#scrollUpBtn`). Devenu
  `/* Kosmetika — styles propres au projet (hors thème) */`.
- **Sommaire régénéré** : l'index de 27 sections en tête de fichier en annonçait 13 qui n'existaient plus.
  Il en liste maintenant 14, réellement présentes.

**4. `vendor/plugins.js` : 78 → 43 Ko** _(renommé `vendor/slick.js` juste après)_. Le fichier empilait
4 librairies, une seule sert :

| Retiré                             | Pourquoi                                                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| jQuery meanMenu 2.0.8 (**GPL v3**) | menu mobile jamais initialisé ; l'offcanvas est fait à la main dans `app/main.js`                                                                                           |
| Magnific Popup 1.1.0               | aucune lightbox dans le projet                                                                                                                                              |
| jQuery Collapse                    | l'accordéon de `faq.html` est celui de **Bootstrap 5** (`data-bs-toggle="collapse"`) ; cette lib écrasait en plus le `$.fn.collapse` de Bootstrap en se chargeant après lui |

Reste **Slick Slider 1.8.1** seul. Le nom `plugins.js` est devenu impropre — le renommer en `slick.js`
demanderait de toucher les 6 pages, c'est noté comme retouche possible (cf. P1.1 : on garde les noms).

**5. Fichiers supprimés** : `assets/css/owl.video.play.html` et `assets/css/fonts/Stroke-Gap-Icons.html`
(les deux artefacts d'aspirateur : des pages d'erreur HTML servies comme image et comme police).
Les 5 `url()` mortes signalées le 28/07 ont toutes disparu avec les règles qui les portaient.

**6. Vérification — diff des styles calculés, pas à l'œil.** Pour chaque page : capture de
`getComputedStyle` (45 propriétés × élément × `::before`/`::after`) avec le CSS final, bascule à chaud
vers le CSS d'origine sorti de git, seconde capture, diff. Même DOM des deux côtés, donc zéro bruit.
**0 différence** partout :

| Page                                                          | Éléments comparés | Différences |
| ------------------------------------------------------------- | ----------------- | ----------- |
| `index` (1280 / 768 / 375 px)                                 | 998 / 1000 / 1208 | 0           |
| `shop` (1280 / 375 px)                                        | 854 / 876         | 0           |
| `product-details` `?productId=1` + panier ouvert + 2 articles | 794               | 0           |
| `services`                                                    | 587               | 0           |
| `faq` (accordéon déplié)                                      | 545               | 0           |
| `contact-us` (formulaire actif)                               | 538               | 0           |

_(Seuls écarts observés : les éléments en animation permanente — icône `fa-beat-fade`, spinner reCAPTCHA —
saisis à des phases différentes, et un décalage sous-pixel tant que `document.fonts.status !== "loaded"`.)_

**Vérification fonctionnelle après le nettoyage de `plugins.js`** : Slick initialisé (27 slides, 4 pistes,
flèches présentes) · Owl (galerie 9 items) · elevateZoom (`zoomContainer` + `zoomWindow`) · 18 produits liés
en carrousel · menu offcanvas ouvre/ferme · mini-panier ouvre/ferme · ajout au panier + toast Notyf ·
**accordéon FAQ** : panneau `height 0` → `collapse show`, `height 153px` (c'est bien Bootstrap qui le gère) ·
`$.fn.meanmenu` et `$.fn.magnificPopup` sont maintenant `undefined`, `$.fn.collapse` est redevenu celui de
Bootstrap · 0 nouvelle erreur console.

**À suivre, découvert au passage — ✅ les 3 points sont traités, voir la section suivante :**

- [x] `assets/fonts/ionicons*` = **713 Ko** (188 Ko réellement téléchargés, le `.ttf`) pour **2 glyphes**.
      FontAwesome 6 est déjà chargé depuis le CDN et a les deux équivalents → remplacer les 2 `<i class="ion-…">`
      et supprimer la police ferait −188 Ko réels.
- [x] `product-details.html` **sans** `?productId=` lève `TypeError: … reading 'brand'` en console
      (antérieur, sans rapport avec le CSS) → prévoir une garde + message.
- [x] `vendor/plugins.js` ne contient plus que Slick → le renommer `slick.js` (6 balises `<script>` à changer).

---

## ✅ Fait (2026-07-30, suite) — les 3 points « à suivre »

**1. Ionicons supprimé — −188 Ko réellement téléchargés, −713 Ko dans le repo.**
La police servait exactement **2 glyphes**, et Font Awesome 6 (déjà chargé depuis le CDN sur les 6 pages)
a les deux équivalents :

| Avant               | Après                       | Où                                                         |
| ------------------- | --------------------------- | ---------------------------------------------------------- |
| `ion-android-cart`  | `fa-solid fa-cart-shopping` | icône panier de l'en-tête (×6 pages)                       |
| `ion-android-close` | `fa-solid fa-xmark`         | fermeture offcanvas + fermeture mini-panier (×2, ×6 pages) |
| `ion-android-close` | `fa-solid fa-xmark`         | bouton « retirer du panier », généré dans `utils.js`       |

Retiré avec : le bloc Ionicons de `plugins.css` (`@font-face` + les 2 classes, ~1,2 Ko) et les
**4 fichiers `assets/fonts/ionicons28b5.{eot,svg,ttf,woff}`** (713 Ko) — le dossier `assets/fonts/`
disparaît complètement. `plugins.css` : 33 → **32,9 Ko**.

⚠️ Le sélecteur d'événement du panier dépendait de la classe de l'icône
(`$("body").on("click", ".ion-android-close.remove-from-cart", …)`). Il ne cible plus que
`.remove-from-cart` : c'est la classe qui porte le sens, l'icône n'était qu'un décor.
Même logique dans `style.css`, où les 3 règles `.cart_link > a i.ion-android-cart`
(taille, marges, breakpoints) suivent en `i.fa-cart-shopping`.

**2. `product-details.html` sans `?productId=` : garde + message.**
`getCurrentDisplayedProductId()` faisait `+url.searchParams.get("productId")` → `+null` = **`0`**,
un id d'apparence valide qu'aucun produit ne porte. `getProduct(0)` résolvait donc `undefined`, et
`getProductTitle(undefined)` levait `TypeError: … reading 'brand'`, avalé par le `.catch()` en
console + toast d'erreur, sur une page restée en squelette de chargement.

- `getCurrentDisplayedProductId()` renvoie maintenant **`null`** si le paramètre est absent ou
  malformé (`abc`, `1.5`, `-3`, vide), et un `number` sinon — l'appelant peut distinguer
  « pas de produit demandé » d'un vrai id.
- `projectProductInPage()` garde les **deux** cas : id absent (rien à charger) et id bien formé mais
  hors catalogue (lien périmé, produit retiré) → le bloc produit est remplacé par un message
  `productNotFoundHtml()` qui renvoie vers le catalogue. Remplacer le bloc fait disparaître du même
  coup les squelettes de chargement et le bouton « Ajouter au panier », donc rien ne reste à moitié
  rendu. La section « Produits similaires » reste affichée juste en dessous.
- **Effet de bord réglé au passage** : avant la garde, un clic sur « Ajouter au panier » depuis cette
  page écrivait `{productId: 0}` en `localStorage`. Un panier ainsi empoisonné faisait planter
  `buildVisualCart()` **sur les 6 pages**, à chaque chargement. `buildVisualCart()` supprime
  désormais silencieusement toute ligne dont le produit n'existe plus (panier vérolé, produit retiré
  du catalogue) au lieu de planter sur `undefined`.

**3. `vendor/plugins.js` → `vendor/slick.js`** (`git mv`, l'historique du fichier est conservé).
Le nom mentait depuis le nettoyage du 30/07 : il ne restait qu'une seule librairie. 6 balises
`<script>` mises à jour. En-tête du fichier complété pour garder la trace de l'ancien nom.
⚠️ Ne pas confondre avec `assets/js/app/ui/plugins.js`, qui lui reste bien nommé (c'est _notre_ code
d'initialisation des plugins jQuery) — c'est justement cette ambiguïté que le renommage lève.

**Vérifié en live** (`npx serve`, 0 erreur console sur les 4 pages testées) : aucune requête vers
`assets/fonts/` ni `ionicons` · `slick.js` chargé et `$.fn.slick` défini · les 3 icônes rendues en
`"Font Awesome 6 Free"` avec leur glyphe · 0 élément `[class*="ion-android"]` restant · fiche produit
`?productId=1` complète (titre, prix, infos, galerie 11 vignettes, bouton) · sans paramètre,
`?productId=99999` et `?productId=abc` → message « introuvable », pas de bouton, pas de squelette,
pas de toast d'erreur, 18 produits liés toujours en carrousel · panier : ajout → ligne rendue avec
`fa-xmark remove-from-cart`, clic → ligne retirée et `localStorage` à jour · panier vérolé
`[{productId:0},{productId:1}]` → la ligne morte est purgée, l'autre s'affiche, 0 erreur.

---

## 🔴 P0 — reste

- [ ] ⏸️ **Liens sociaux placeholder** — `INSTAGRAM_LINK` / `FACEBOOK_LINK` / `TIKTOK_LINK` valent encore
      littéralement leur nom → liens morts dans le footer des 6 pages.
      _(reporté 2026-07-26 : placeholders gardés pour l'instant.)_ → renseigner les vraies URLs ou masquer.

---

## 🟠 P1 — Organisation du JS (ta demande principale)

### P1.1 — Séparer vendor / app — ✅ **Fait (2026-07-26)**

> Structure `vendor/` + `app/` en place, libs mortes supprimées, GTranslate scindé, 6 blocs `<script>`
> standardisés (+ notyf partout). Noms de fichiers gardés (kebab-case non retenu). Vérifié en live.

**Cible (réalisée) :**

```
assets/js/
├── vendor/                      # libs tierces, jamais modifiées
│   ├── jquery-3.4.1.min.js      (déjà là)
│   ├── modernizr-3.7.1.min.js   (déjà là)
│   ├── bootstrap.min.js
│   ├── popper.js
│   ├── plugins.js               → renommé `slick.js` le 30/07 (il ne restait que Slick)
│   ├── owl.carousel.js
│   ├── jquery.elevatezoom.js
│   ├── notyf.min.js
│   └── gtranslate.js
└── app/                         # ton code
    ├── main.js
    ├── utils.js
    ├── database.management.js
    └── firebase-management.js
```

- [x] Déplacer les libs dans `vendor/`, le code applicatif dans `app/`.
- [x] Mettre à jour les `<script>` des 6 pages **et** les imports relatifs (`main.js` importe `"../js/utils.js"` → devient `"./utils.js"`).
- [x] **Cas particulier `gTranslate-flags.js`** → découpé en `app/config/gtranslate.settings.js` + `vendor/gtranslate.js`, chargés dans cet ordre.

- [x] **Supprimer purement et simplement** (chargés sur les 6 pages, jamais appelés dans ton code) :
  - `bpopup.js` (5 Ko) — aucun `.bPopup(` dans le projet
  - `jquery.cookie.js` (3 Ko) — aucun `$.cookie`
  - `imagesloaded.js` (5 Ko) — aucun appel
  - `jquery.ui.js` (253 Ko) — voir P0
  - `fontawesome.min.js` (**1,5 Mo**) — voir P2

- [x] ⛔ **Uniformiser le nommage** en kebab-case → **décidé : non retenu**, les noms de fichiers sont gardés tels quels.

### P1.2 — Éclater `utils.js` — ✅ **Fait (2026-07-26)**

> Découpage **intermédiaire** : `app/services/cart.service.js` + `app/ui/plugins.js` +
> `app/ui/templates.js` sortis ; `utils.js` garde l'orchestration par page, `main.js` inchangé.
> Découpage complet (`ui/pages/`, `analytics.service.js`) non retenu — codebase trop petit. Vérifié en live.

_(Proposition d'origine ci-dessous, pour mémoire.)_

`utils.js` contient aujourd'hui : init des plugins jQuery, gestion du panier, templates HTML, rendu par page, et binding d'événements. Découpage proposé (à faire **après** P1.1, sinon trop de churn d'un coup) :

```
app/
├── main.js                      # bootstrap + routing par page (déjà propre 👍)
├── config/
│   ├── site.config.js           # WHATSAPP_*, INSTAGRAM_*, … (aujourd'hui dans database.management.js)
│   └── firebase.config.js       # + firebase.config.example.js  (voir P3)
├── data/
│   └── products.repository.js   # getProduct / getAllProducts (voir P4)
├── services/
│   ├── cart.service.js          # localStorage "panier", add/remove/total
│   └── analytics.service.js     # ex firebase-management.js
└── ui/
    ├── plugins.js               # applySlick*, applyOwlCarousel, applyElevateZoom
    ├── templates.js             # productCard(), cartItem(), footerProduct()
    └── pages/{home,shop,product-details,contact}.js
```

> ⚠️ Ne fais pas ce découpage si tu ne comptes pas dépasser ~1000 lignes de JS applicatif : à 686 lignes on est à la limite du raisonnable. Un découpage intermédiaire (`cart.service.js` + `templates.js` sortis de `utils.js`) capte 80 % du bénéfice.

### P1.3 — Duplication HTML (~250 lignes × 6 pages) — ⛔ **Décidé : statu quo**

Le `<head>`, le menu offcanvas, le header, le footer et le bloc de `<script>` sont **identiques** sur les 6 pages (tu les as d'ailleurs balisés `#generic` — bon réflexe). Soit ~1500 lignes dupliquées.

**Décision (25/07/2026) : on garde les 6 pages en HTML statique, pas de build ni d'injection JS.**
Conséquence à assumer : toute modification du menu, du footer ou du bloc `<script>` doit être répercutée **manuellement sur les 6 fichiers**. Les marqueurs `#generic` déjà en place servent de repère — les conserver et les maintenir à jour.

_(Options écartées, pour mémoire : build minimal type Eleventy/`posthtml-include` avec `dist/` commité — vrai DRY mais ajoute un `npm install` ; injection JS via `fetch('partials/header.html')` — écartée car header/footer deviendraient invisibles aux crawlers, rédhibitoire pour une boutique.)_

---

## 🟡 P2 — Poids & performance

> Le repo pesait **236 Mo** (dont 71 Mo de vidéos + historique git). Après la passe du 28/07/2026,
> `assets/` est descendu à **14,4 Mo**. L'historique git, lui, pèse toujours autant — **assumé** :
> le clone lourd n'est pas un problème pour toi, seule la fluidité du site compte.

- [x] **Supprimer 32 Mo de GIFs jamais référencés** — `parfum-ingredients.gif` + `parfum-kdo.gif` supprimés.
- [x] **Autres fichiers jamais référencés** — `official-islam-banner.png`, `banner4.jpg`, `favicon.ico`,
      `slider{2,5,6}.jpg` supprimés. ⚠️ `background-whatsapp.jpg` **était un faux positif** : il est utilisé
      par `style.css` (×2) → conservé.
- [x] **`fontawesome.min.js` (1,5 Mo)** — déjà supprimé pendant P1.1 (doublon du CDN CSS).
- [x] **`assets/fonts/fontawesome-webfont*`** — 7 fichiers supprimés (aucun `@font-face` ne les cible ;
      `ionicons*` conservés, eux sont bien référencés par `plugins.css:209`).
- [x] **`assets/fonts/ionicons*` (713 Ko, −188 Ko réellement téléchargés)** — supprimés le 30/07 :
      2 glyphes seulement, tous deux disponibles dans le Font Awesome 6 déjà chargé depuis le CDN.
      Le dossier `assets/fonts/` n'existe plus. Voir la section « Fait (2026-07-30, suite) ».
- [x] **La page d'accueil chargeait 40 Mo de vidéo en `autoplay`** → ré-encodées (**10,4 Mo** : 720p CRF 28
      pour les 2 vidéos du carrousel, 1080p CRF 26 + `unsharp` pour `bg-video-welcome`), `preload="none"` +
      `poster` + lecture déclenchée par `IntersectionObserver`, `prefers-reduced-motion` respecté.
      Voir la section « Fait (2026-07-28) ».
- [x] **Images produits : 11 Mo de PNG** → 48 fichiers convertis en WebP (**1,2 Mo**, −89 %),
      `loading="lazy"` + `width`/`height` ajoutés. Voir la section « Fait (2026-07-28) ».
- [ ] _(optionnel)_ **Les 12 `.jpg` restants** (~950 Ko : quelques photos produit, `banner{1,2,3}`,
      `happy-people`, `background-whatsapp`) n'ont pas été convertis — gain estimé ~600 Ko seulement,
      et `background-whatsapp` demanderait de toucher `style.css`. À faire si on veut l'homogénéité.
- [x] **`style.css` = 12 025 lignes** (thème acheté, très majoritairement inutilisé) → **fait le 30/07/2026** :
      PurgeCSS + retrait de 7 librairies mortes de `plugins.css` (et de 3 dans `vendor/plugins.js`,
      renommé `vendor/slick.js` depuis).
      **753 Ko → 129 Ko (−83 %)**, 0 différence de rendu vérifiée par diff des styles calculés.
      Voir la section « Fait (2026-07-30) ».
- [ ] **11 `<script>` bloquants par page**, tous dans le `<body>` sans `defer`. → ajouter `defer` (les modules le sont déjà par nature) ; à terme, bundler.
- [x] ⛔ **Le poids reste dans l'historique git** (un `git clone` téléchargera toujours les 32 Mo de GIFs).
      → **décidé le 28/07/2026 : on ne réécrit pas l'historique.** Un clone lourd est sans importance ici,
      seule la fluidité du site final compte.

---

## 🔵 P3 — Qualité de code & "prêt pour l'open source"

- [x] **`LICENSE` MIT ajouté (2026-07-30)** au nom de Hicham Oussama Saffih, avec une clause de portée :
      la MIT ne couvre que `assets/js/app/`, le markup écrit pour le projet et la doc.
      Section « License & third-party assets » ajoutée au readme (le reste du readme est à réécrire, voir plus bas).
      **Enquête sur le thème d'origine (30/07/2026) — non identifié.** Aucune attribution dans les 6 HTML.
      Empreinte relevée : classes `snake_case` numérotées jusqu'à `_ten` (thème multi-démos à 10 accueils ;
      `index.html` part de `home_slider_two`), Bootstrap 5.0.2, Owl 2.2.1, elevateZoom 3.0.8, Slick, Magnific,
      Ionicons + Stroke-Gap-Icons, Playfair Display + Rubik + Prata. Piste **non confirmée** :
      « Glowing – Beauty & Cosmetics Shop » de G5Theme (ThemeForest, 10 homepages) → à vérifier à la main en
      cherchant `home_slider_two` / `categorie_banner` dans le source de https://glowing.g5plus.net/main/
      (seconde famille de candidats : les démos cosmétique de HasThemes).
      ⚠️ **Le thème a été aspiré depuis une démo, pas téléchargé sous licence** : noms de polices suffixés d'un
      hash de cache (`ionicons28b5.ttf`), `fontawesome-webfontd41d.eot` (= MD5 du fichier vide), et pages
      d'erreur HTML sauvegardées à la place d'une police et d'une image (`Stroke-Gap-Icons.html`,
      `owl.video.play.html` — d'où les 2 règles CSS cassées listées plus bas). Aucun `licence.txt`, aucune
      `documentation/`. → conclusion assumée dans le readme : redistribué sans licence connue, hors MIT.
- [x] **meanMenu 2.0.8 (GPL v3) retiré de `vendor/plugins.js`** le 30/07 — c'était du code mort, et c'était
      la licence la plus contraignante qu'on redistribuait. Magnific Popup et jQuery Collapse sont partis
      avec ; le fichier, réduit à Slick, s'appelle désormais `vendor/slick.js`. **Ionicons (MIT) est parti
      à son tour** le même jour — plus aucune police n'est redistribuée, Font Awesome vient du CDN.
      Reste à refléter la liste réelle des libs dans la section « License & third-party assets » du readme.
- [ ] **Config Firebase en dur** [firebase-management.js](assets/js/app/firebase-management.js) + clé de site reCAPTCHA.
      Ce ne sont pas des secrets (les clés Firebase sont publiques par design, la sécurité repose sur les règles Firestore + App Check — c'est bien fait chez toi 👍). **Mais** : un cloneur pointe par défaut sur **ta** base, ses écritures sont rejetées par App Check, et il ne comprend pas pourquoi.
      👉 `app/config/firebase.config.js` (gitignoré) + `firebase.config.example.js` commité + garde dans le code : si la config est absente, désactiver proprement les stats au lieu de planter.
- [ ] **Le `readme.md` ne correspond pas au repo** :
  - l'arborescence annonce `database-management.js` → ce fichier **n'existe plus** (supprimé en P4) ;
    toute la section est à réécrire sur la structure actuelle `vendor/` + `app/{config,data,services,ui}`
  - `services.html` n'apparaît pas dans l'arbre, `README.md` est en fait `readme.md`
  - l'arbre annonce encore `assets/fonts/` → le dossier **n'existe plus** depuis le retrait d'Ionicons (30/07)
  - "Live stock", "quantity selector" → le stock n'est nulle part dans le modèle de données
  - "Validations client & server side" → il n'y a pas de serveur ; c'est la règle Firestore (à reformuler)
  - "Clean code split into modules" → à re-vérifier après P1 🙂
  - ~~la section Structure ne mentionne pas `assets/video` (71 Mo…)~~ → l'argument du poids ne tient plus
    (`assets/` = 10,5 Mo depuis le 28/07/2026), mais la section Structure reste à corriger
- [x] **`.gitignore` quasi vide** → **fait le 30/07/2026** : éditeurs (`.vscode`, `.idea`, `*.swp`),
      OS (`.DS_Store`, `Thumbs.db`, `desktop.ini`), `node_modules/` + logs npm, `dist/`,
      `assets/js/app/config/firebase.config.js` + `.env*`, fichiers de travail (`*.bak`, `*.orig`, `*.tmp`).
      _(La ligne Firebase est posée à l'avance : le fichier n'existe pas encore, la config est toujours
      en dur dans `firebase-management.js` — c'est l'item suivant.)_
- [ ] **Ajouter `.editorconfig` + Prettier + ESLint.** Le code est déjà formaté à la Prettier — autant le figer pour que les contributions restent cohérentes. ESLint aurait attrapé `attr("clas")`, la clé `autoplay` dupliquée et les variables mortes.
- [ ] **SEO** : les 6 pages partagent le même `<title>` (`✨ Kosmetika © ✨`) et une `meta description` **vide**. `<html lang="en">` alors que tout le contenu est en français.
      → titre + description uniques par page, `lang="fr"`, Open Graph (`og:title`, `og:image`) pour les partages WhatsApp — critique pour une boutique diffusée par WhatsApp.
- [ ] **Accessibilité** : ~20 images avec `alt=""` (dont le logo et **toutes** les photos produit générées par `utils.js`). → `alt="${prod.ref}"` dans les templates.
      Aussi : `<a href="#">` utilisés comme boutons (panier, suppression d'article) → `<button>` + `aria-label`.
- [ ] **Résidus du template téléchargé** (artefacts d'aspirateur de site) :
  - `assets/css/fonts/Stroke-Gap-Icons.html` et `assets/css/owl.video.play.html` — des `.html` servis comme fichier de police et comme image
  - `plugins.css:462` : `src: url('fonts/Stroke-Gap-Icons.html')` → `@font-face` **cassé** (une page HTML n'est pas une police)
  - `plugins.css:44` : `background: url(owl.video.play.html)` → idem
    👉 supprimer ces deux fichiers et les règles CSS correspondantes.
- [ ] **Conventions de code** : mélange `var`/`const`, jQuery et DOM natif dans le même fichier, noms et commentaires FR/EN mélangés (`projectDataInFooter` vs `"panier"` vs `"Erreur lors du chargement"`).
      → convention : **code et commentaires en anglais, textes d'interface en français**. Et `const`/`let` uniquement.
- [ ] **Zéro test.** Acceptable pour un POC, mais 3-4 tests Vitest sur `cart.service` (ajout, incrément de quantité, suppression, total) donnent beaucoup de crédibilité sur un repo portfolio.
- [ ] **Zéro CI.** Une GitHub Action (Prettier + ESLint + validation HTML + déploiement Pages) = signal fort, ~30 lignes de YAML.
- [ ] **Ajouter un `CONTRIBUTING.md` court** + des captures d'écran dans le readme (le placeholder `demo-banner.png` est commenté ligne 6).

---

## 🟣 P4 — reste (catalogue JSON)

> **✅ Migration faite (2026-07-26)** : `data/products.js` (modèle propre) + `products.repository.js`
>
> - `config/site.config.js` ; `database.management.js` supprimé.

- [ ] **Valider le catalogue automatiquement** (`ajv` + `npm run validate:products` en CI) : `id` unique,
      `pics` non vide, **exactement un** `isMain`, `price > 0`, `status` valide.
      _(Dépend de la décision d'introduire npm/CI — cf. P3. En attendant, une vérif manuelle existe.)_
- [ ] **Corriger les incohérences du catalogue** (laissées volontairement pour l'instant) :
  - prix ids 2 (299) & 3 (300) vs 100 ailleurs — à confirmer.
  - id 16 inséré entre 4 et 6 → l'affichage suit l'ordre d'insertion ; ajouter un champ `order` si besoin.
  - catégories ids 15 & 16 = `femme` malgré un champ lexical masculin — à confirmer.
- [ ] **Au-delà de ~100 produits** : pagination / rendu incrémental sur `shop.html` + index séparé.

---

## 🟤 P5 — À investiguer plus tard

- [ ] **`requestStorageAccess: Permission denied` en console sur GitHub Pages (https).**
      Message émis par un script **tiers** qui demande un accès au stockage cross-site — soit **GTranslate**
      (`gTranslate-flags.js`, cookie `googtrans`), soit **Firebase App Check / reCAPTCHA** (iframe).
      **Sans impact sur le panier** : celui-ci utilise `localStorage` first-party, qui n'a jamais besoin
      de cette API (elle ne concerne que les contextes tiers/embarqués).
      👉 Identifier la source exacte (GTranslate vs Firebase), puis décider si on masque/corrige.
      _(Rappel connexe : le double-clic `file://` ne fait pas tourner le site — modules ES bloqués par CORS.
      Il faut le servir en http, via Live Server ou GitHub Pages.)_

---

## ✅ Ordre d'exécution recommandé

1. ~~P0~~ ✅ · ~~P4 (migration data)~~ ✅ — **faits** (2026-07-26).
2. ~~**P1**~~ ✅ (P1.1 vendor/app + P1.2 éclatement de `utils.js` ; P1.3 statu quo) — **fait** (2026-07-26).
3. ~~**P2 (suppressions + médias)**~~ ✅ — **fait** (2026-07-28) : `assets/` de ~86 Mo à 14,4 Mo,
   - refonte des réglages Slick des carrousels produits (même jour).
4. ~~**P2 (CSS)**~~ ✅ — **fait** (2026-07-30) : 753 Ko → 129 Ko, vérifié par diff des styles calculés.
5. **P3 (suite)** — ~~licence~~ ✅, ~~`.gitignore`~~ ✅, puis **config Firebase**, réécriture du readme,
   SEO (`lang="fr"`, titres, Open Graph), accessibilité (`alt`, `<button>`), outillage (Prettier/ESLint/CI).
   👉 **Prochaine étape**, à finir avant de communiquer le repo.
6. **P4 (reste)** — validation CI + incohérences du catalogue.
7. **P2 (`defer`) / P5** — les derniers chantiers & investigations.

> ⚠️ Rappel pour la suite : les fichiers du projet sont en **UTF-8 sans BOM**. Ne jamais les réécrire via
> `Get-Content` / `Set-Content` sous PowerShell 5.1 (lecture en Windows-1252 → double encodage, les accents
> et emoji sont détruits). Utiliser `[System.IO.File]::ReadAllText` / `WriteAllText` avec un
> `UTF8Encoding($false)`, ou un éditeur.
