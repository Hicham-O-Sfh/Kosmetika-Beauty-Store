# 🧹 TODO — Nettoyage & organisation du projet

> Revue de code complète du 25/07/2026 (branche `master`, arbre propre).
> Contexte : site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS,
> Firestore uniquement pour compter les commandes. Objectif : repo propre, lisible et
> clonable par un tiers depuis GitHub.

**Légende :** 🔴 P0 = bug ou blocage · 🟠 P1 = organisation (ta demande principale) · 🟡 P2 = poids/perf · 🔵 P3 = qualité & open source · 🟣 P4 = préparation du scale (JSON)

**Statut :** feuille de route uniquement — **aucune modification n'a été appliquée au code** à ce jour.
**Décisions déjà prises (25/07/2026) :** duplication HTML → statu quo (voir P1.3) · catalogue → futur `data/products.js` en `export default`, pas de `fetch` JSON (voir P4).

---

## 🔴 P0 — Bugs & code mort actif

- [ ] **`jquery.ui.js` (253 Ko) est chargé sur les 6 pages pour rien.**
      Il ne sert qu'à deux blocs de [main.js:146-173](assets/js/main.js#L146-L173) :
  - `$("#slider-range").slider(...)` → l'id `#slider-range` **n'existe dans aucune page HTML**.
  - `$('[data-bs-toggle="tooltip"]').tooltip()` et `$(".action_links ...").tooltip()` → **aucun** de ces sélecteurs n'existe dans le HTML, et **aucune** page ne contient d'attribut `title=""` (donc même s'ils existaient, jQuery UI n'afficherait rien).
        👉 Supprimer les deux blocs + `jquery.ui.js` + les 6 balises `<script>`.
        ⚠️ Note : `.tooltip()` venait de jQuery UI, **pas** de Bootstrap 5 (BS5 n'expose plus d'API jQuery) — les options passées (`placement`, `container`, `animated`) sont du vocabulaire Bootstrap 3 et étaient ignorées.

- [ ] **Faute de frappe** [main.js:248](assets/js/main.js#L248) : `$this.attr("clas")` → `"class"`.
      Actuellement masquée par le court-circuit `$this.is("a") || $this.is("span") || ...`, mais elle lèvera un `TypeError` dès qu'un autre type d'élément entrera dans la condition.

- [ ] **Clé dupliquée** [main.js:94-102](assets/js/main.js#L94-L102) : `autoplay: true` puis `autoplay: false` dans le même objet. La 2ᵉ gagne. À trancher (et de toute façon `.testimonial_active` n'existe dans aucune page → bloc à supprimer).

- [ ] **Code mort dans `main.js`** — sélecteurs absents de tout le HTML, à supprimer :
      `.product_row2` (L52-91), `.testimonial_active` (L94-102), `.instagram_pupop` (L105-110), `.video_popup` (L113-117), `.port_popup` (L120-125), `#slider-range` / `#amount` (L146-161).
      ⚠️ Après ça, vérifier si `plugins.js` (Slick + Magnific Popup, 80 Ko) est encore nécessaire : Magnific Popup ne servira plus, Slick oui (via `utils.js`).

- [ ] **`scrollUpBtn` sans garde `null`** [main.js:128](assets/js/main.js#L128) : `document.getElementById(...)` puis `.addEventListener` direct. L'élément est présent sur les 6 pages aujourd'hui, mais une page oubliée casserait **toute l'IIFE** (donc tout le JS de la page). Ajouter `if (!scrollBtn) return;`.

- [ ] **`.find(pic => pic.isMain === true).bigPicUrl` répété 7 fois sans garde** (utils.js L217, 267, 318, 395, 439, 476, 513, 541).
      Un seul produit ajouté sans `isMain: true` = `TypeError` → page blanche. **Risque direct quand tu ajouteras des produits.**
      👉 Créer `getMainPicUrl(product)` avec fallback sur `pics[0]`.

- [ ] **`prod.pics[1].bigPicUrl`** [utils.js:557](assets/js/utils.js#L557) (image "hover" du catalogue) : crash si un produit n'a qu'**une** photo. Aujourd'hui tous en ont ≥ 2, mais c'est une bombe à retardement. → fallback sur l'image principale.

- [ ] **`alert("message :", error)`** [utils.js:250](assets/js/utils.js#L250) et [utils.js:299](assets/js/utils.js#L299) : `alert()` ne prend qu'un argument, l'erreur est silencieusement perdue. Utiliser Notyf (déjà présent) + `console.error(error)`.

- [ ] **`getAllProductsFromDatabase()` appelé sans argument** [utils.js:536](assets/js/utils.js#L536) : ça marche par accident (`slice(0, undefined)` = tout). Rendre explicite (`maxItems = Infinity` par défaut).

- [ ] **`MAIN_DATABASE` est un `Set` d'objets** [database.management.js:25](assets/js/database.management.js#L25) : un `Set` ne déduplique pas les objets littéraux, donc il n'apporte **rien** ici — et oblige à `Array.from(...)` partout. → simple tableau (ou mieux, voir 🟣 P4).

- [ ] **`id` HTML numérique** [utils.js:224](assets/js/utils.js#L224) : `<div class="cart_item" id="${order.productId}">` produit `id="1"`. Valide en HTML5 mais incassable via `querySelector("#1")`. → `data-product-id="1"`.
      Idem [utils.js:615](assets/js/utils.js#L615) : `order.productId != cartItemToDelete.id` repose sur la coercition `number != string`. → `Number(el.dataset.productId)` + `!==`.

- [ ] **`updateProductOrderStats()` non attendu** [utils.js:645](assets/js/utils.js#L645) : le panier est vidé juste après, sans `await`. Si l'utilisateur bascule sur WhatsApp et que l'onglet est gelé/fermé, la stat est perdue. → `await` (ou `navigator.sendBeacon`-like) avant `emptyCartInLocalStorage()`.

- [ ] **~200 lignes de template dupliquées** : la carte produit est réécrite **4 fois à l'identique** — `projectRelatedProductsInPage` (L307-336), et 3 fois dans `projectProductsInHomeTabs` (L428-455, L465-492, L502-529), qui appelle en plus **3 fois** `getAllProductsFromDatabase(12)` pour afficher **exactement les mêmes produits** dans les 3 onglets (Featured / Nouveautés / Promos).
      👉 Une fonction `renderProductCard(prod)` + une boucle sur `[{tab, status}]`.

- [ ] **`PRODUCT_STATUS`** [database.management.js:17](assets/js/database.management.js#L17) : défini, jamais utilisé. → le brancher sur les 3 onglets (voir ci-dessus) ou le supprimer.

- [ ] **`INSTAGRAM_LINK`, `FACEBOOK_LINK`, `TIKTOK_LINK`** valent littéralement `"INSTAGRAM_LINK"`, etc. → liens morts en pied de page sur les 6 pages. Renseigner ou masquer.

- [ ] **Incohérence numéro WhatsApp** : `WHATSAPP_NUMBER_LINK = "https://wa.me/2120666201740"` (un `0` en trop après 212) vs `TEL_NUMBER_LINK = "tel:212666201740"`. À vérifier — c'est le lien de validation de commande.

---

## 🟠 P1 — Organisation du JS (ta demande principale)

### P1.1 — Séparer vendor / app

**Cible :**

```
assets/js/
├── vendor/                      # libs tierces, jamais modifiées
│   ├── jquery-3.4.1.min.js      (déjà là)
│   ├── modernizr-3.7.1.min.js   (déjà là)
│   ├── bootstrap.min.js
│   ├── popper.js
│   ├── plugins.js               → renommer en slick+magnific.bundle.js (ou éclater)
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

- [ ] Déplacer les libs dans `vendor/`, le code applicatif dans `app/`.
- [ ] Mettre à jour les `<script>` des 6 pages **et** les imports relatifs (`main.js` importe `"../js/utils.js"` → devient `"./utils.js"`).
- [ ] **Cas particulier `gTranslate-flags.js`** : ce fichier mélange la **config** (lignes 3-13, `window.gtranslateSettings` : langues, position, drapeaux) et les **533 lignes de lib GTranslate**. La lib lit la config au chargement, donc il faut la définir avant.
      👉 Découper en `app/config/gtranslate.settings.js` (ta config) + `vendor/gtranslate.js` (lib intacte), chargés dans cet ordre.

- [ ] **Supprimer purement et simplement** (chargés sur les 6 pages, jamais appelés dans ton code) :
  - `bpopup.js` (5 Ko) — aucun `.bPopup(` dans le projet
  - `jquery.cookie.js` (3 Ko) — aucun `$.cookie`
  - `imagesloaded.js` (5 Ko) — aucun appel
  - `jquery.ui.js` (253 Ko) — voir P0
  - `fontawesome.min.js` (**1,5 Mo**) — voir P2

- [ ] **Uniformiser le nommage** : `database.management.js` (points) / `gTranslate-flags.js` (camelCase) / `owl.carousel.main.js`. → kebab-case partout : `products-repository.js`, `firebase-service.js`, etc.

### P1.2 — Éclater `utils.js` (686 lignes, 5 responsabilités mélangées)

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

*(Options écartées, pour mémoire : build minimal type Eleventy/`posthtml-include` avec `dist/` commité — vrai DRY mais ajoute un `npm install` ; injection JS via `fetch('partials/header.html')` — écartée car header/footer deviendraient invisibles aux crawlers, rédhibitoire pour une boutique.)*

---

## 🟡 P2 — Poids & performance

> Le repo pèse **236 Mo** (dont 71 Mo de vidéos + historique git). C'est énorme pour un site vitrine et pénible à cloner.

- [ ] **Supprimer 32 Mo de GIFs jamais référencés** :
      `assets/video/parfum-ingredients.gif` (18 Mo) et `assets/video/parfum-kdo.gif` (14 Mo) — aucune référence dans le HTML/CSS/JS.
- [ ] **Autres fichiers jamais référencés** (~700 Ko) :
      `assets/img/banner/official-islam-banner.png` (360 Ko), `assets/img/bg/background-whatsapp.jpg`, `assets/img/bg/banner4.jpg`, `assets/img/favicon.ico` (le favicon utilisé est le PNG du logo), `assets/img/slider/slider{2,5,6}.jpg`.
- [ ] **`fontawesome.min.js` (1,5 Mo) chargé sur les 6 pages en doublon du CDN.**
      Chaque page charge déjà `font-awesome/6.6.0/css/all.min.css` depuis cdnjs. Le JS est la version SVG de FA 6.6.0 : les deux font le même travail. → supprimer le JS.
- [ ] **`assets/fonts/fontawesome-webfont*` (1,8 Mo)** : référencés par **aucun** CSS du projet. → supprimer (garder `ionicons*`, eux sont bien utilisés par `style.css`).
- [ ] **La page d'accueil charge 40 Mo de vidéo en `autoplay`** : `flowers.mp4` (8,3 Mo) + `fragrance.mp4` (14 Mo) + `bg-video-welcome.mp4` (18 Mo).
      👉 Ré-encoder en 720p H.264 CRF 28 (typiquement 1-2 Mo/vidéo) : `ffmpeg -i in.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -an -movflags +faststart out.mp4` (le `-an` retire l'audio, inutile sur une vidéo `muted`).
      👉 Ajouter `poster="…"` + `preload="none"` sur les vidéos hors du premier écran, et déclencher la lecture via `IntersectionObserver`.
      👉 Respecter `prefers-reduced-motion`.
- [ ] **Images produits : 11 Mo de PNG** → convertir en WebP (un seul l'est déjà : `Qimmah-img-1.webp`). Gain attendu 70-80 %. Ajouter `loading="lazy"` + `width`/`height` (évite le CLS).
- [ ] **`style.css` = 12 025 lignes** (thème acheté, très majoritairement inutilisé). → passer un PurgeCSS/UnCSS sur les 6 pages **une fois le JS stabilisé** (attention : les classes injectées par `utils.js` doivent être en safelist).
- [ ] **11 `<script>` bloquants par page**, tous dans le `<body>` sans `defer`. → ajouter `defer` (les modules le sont déjà par nature) ; à terme, bundler.
- [ ] **Le poids reste dans l'historique git** même après suppression des fichiers : un `git clone` téléchargera toujours les 32 Mo de GIFs. Si tu veux vraiment un repo léger à cloner, il faut réécrire l'historique (`git filter-repo --path assets/video --invert-paths`) — **à faire une seule fois, avant de communiquer le repo**, et à documenter.

---

## 🔵 P3 — Qualité de code & "prêt pour l'open source"

- [ ] **Aucun fichier `LICENSE`.** Sans licence, "open source" n'a pas de valeur juridique : par défaut, personne n'a le droit de cloner/réutiliser. → ajouter MIT (le plus permissif, cohérent avec ton intention) + la mention dans le readme.
      ⚠️ Vérifier aussi la licence du thème HTML d'origine avant de le republier.
- [ ] **Config Firebase en dur** [firebase-management.js:18-26](assets/js/firebase-management.js#L18-L26) + clé de site reCAPTCHA (L33).
      Ce ne sont pas des secrets (les clés Firebase sont publiques par design, la sécurité repose sur les règles Firestore + App Check — c'est bien fait chez toi 👍). **Mais** : un cloneur pointe par défaut sur **ta** base, ses écritures sont rejetées par App Check, et il ne comprend pas pourquoi.
      👉 `app/config/firebase.config.js` (gitignoré) + `firebase.config.example.js` commité + garde dans le code : si la config est absente, désactiver proprement les stats au lieu de planter.
- [ ] **Le `readme.md` ne correspond pas au repo** :
  - l'arborescence annonce `database-management.js` (tiret) → c'est `database.management.js` (point)
  - `services.html` n'apparaît pas dans l'arbre, `README.md` est en fait `readme.md`
  - "Live stock", "quantity selector" → le stock n'est nulle part dans le modèle de données
  - "Validations client & server side" → il n'y a pas de serveur ; c'est la règle Firestore (à reformuler)
  - "Clean code split into modules" → à re-vérifier après P1 🙂
  - la section Structure ne mentionne pas `assets/video` (71 Mo, c'est l'info la plus utile pour un cloneur)
- [ ] **`.gitignore` quasi vide** (`.vscode/*`, sans retour à la ligne final). → ajouter `.DS_Store`, `Thumbs.db`, `node_modules/`, `dist/` (selon P1.3), `app/config/firebase.config.js`.
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

## 🟣 P4 — Préparer le scale du catalogue (l'approche JSON)

> Ton intention : le catalogue vit dans un fichier JSON, pas dans une vraie BDD. C'est un choix parfaitement défendable pour ce volume (17 produits) — mais **aujourd'hui ce n'est pas du JSON** : c'est un `Set` d'objets JS en dur dans `database.management.js` (500 lignes), mélangé avec les constantes de contact.

> **Décision (25/07/2026) : rien ne change pour l'instant.** Cible retenue pour plus tard :
> **`data/products.js` avec `export default [...]`** — c'est-à-dire du JSON dans un module ES.
> Le `fetch('products.json')` a été **écarté** car il est bloqué par CORS en `file://`, ce qui casserait
> la promesse "clone & double-clic sur index.html" du readme. L'`export default` donne le même
> bénéfice (données séparées du code applicatif, éditables sans toucher à la logique) sans exiger
> de serveur local. Les points ci-dessous restent valables tels quels pour cette cible.

- [ ] **Extraire le catalogue dans `data/products.js`** (`export default [...]`) + un `products.repository.js` qui l'importe et expose `getProduct()` / `getAllProducts()`.
      ✅ Bénéfices : éditable sans toucher au code, diffable proprement, validable par un schéma, et prêt pour une vraie API (ou un vrai `.json` + `fetch`) le jour où tu passes sur un vrai serveur.
- [ ] **Sortir les constantes de contact** (`WHATSAPP_*`, `INSTAGRAM_*`, `TEL_*`…) de `database.management.js` vers `config/site.config.js` : elles n'ont rien à faire dans le fichier "base de données".
- [ ] **Nettoyer le modèle de données.** Aujourd'hui `ref` contient du HTML (`"Gucci® - Bloom <br> (100ml)"`) et `secondDescription` encode marque/qualité/catégorie **en HTML** — donc impossible à filtrer, trier ou traduire, et ça oblige à des bricolages comme `productFromDb.ref.split("\n")[0]` ([utils.js:632](assets/js/utils.js#L632)).
      Modèle cible :
      ```json
      {
        "id": 1,
        "name": "Bloom - Aqua Di Fiori",
        "brand": "Gucci®",
        "volumeMl": 100,
        "price": 100,
        "currency": "MAD",
        "quality": "Eau de toilette",
        "category": "femme",
        "status": "FEATURED",
        "descriptionHtml": "…",
        "pics": [{ "url": "…", "isMain": true }]
      }
      ```
      C'est ce qui débloquera : filtres du catalogue, tri par prix, recherche, et les 3 onglets de l'accueil (via `status`).
- [ ] **Valider le JSON automatiquement** (`ajv` + un `npm run validate:products` en CI) : `id` unique, `pics` non vide, **exactement un** `isMain: true`, `price > 0`. C'est ça qui empêchera définitivement les crashs 🔴 P0 quand le catalogue grossira.
- [ ] **Corriger les incohérences actuelles du catalogue** :
  - 16 des 17 produits sont à `price: 100` (à vérifier — les ids 2 et 3 sont à 299/300)
  - id `16` est inséré entre les ids `4` et `6` → l'ordre d'affichage suit l'ordre d'insertion, pas l'id. Ajouter un champ `order` explicite si l'ordre compte.
  - Manasik Muski Oud (id 16) et Malikat Al Arab (id 15) : `Catégorie: Femme` dans une description au champ lexical masculin — à vérifier.
- [ ] **Au-delà de ~100 produits** : prévoir la pagination ou le rendu incrémental sur `shop.html` (aujourd'hui tout le catalogue est injecté d'un coup dans le DOM), et un index séparé (`products-index.json` léger pour les listes + un fichier par produit pour le détail).

---

## ✅ Ordre d'exécution recommandé

1. **P0** — bugs et suppression du code mort (`jquery.ui.js`, blocs orphelins de `main.js`). *Rien ne casse, gain immédiat.*
2. **P2 (suppressions)** — fichiers jamais référencés + `fontawesome.min.js` + polices FA. *~35 Mo et 3,5 Mo de JS en moins, zéro risque.*
3. **P1.1** — réorganisation `vendor/` + `app/`. *Un seul commit dédié, facile à relire.*
4. **P3 (licence, readme, .gitignore, config Firebase)** — avant de communiquer le repo.
5. **P4** — migration JSON + modèle de données. *À faire avant d'ajouter beaucoup de produits, pas après.*
6. **P1.2 / P1.3 / P2 (médias, CSS)** — les chantiers longs.
