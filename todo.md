# 🧹 TODO — Nettoyage & organisation du projet

> Revue de code complète du 25/07/2026 (branche `master`, arbre propre).
> Contexte : site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS,
> Firestore uniquement pour compter les commandes. Objectif : repo propre, lisible et
> clonable par un tiers depuis GitHub.

**Légende :** 🔴 P0 = bug ou blocage · 🟠 P1 = organisation (ta demande principale) · 🟡 P2 = poids/perf · 🔵 P3 = qualité & open source · 🟣 P4 = préparation du scale (JSON)

**Statut :** 🔴 P0 ✅ · 🟣 P4 migration ✅ · 🟠 **P1.1 ✅** (2026-07-26). Restent P1.2, P2, P3, P5 — et les liens sociaux (reportés).
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

_(Options écartées, pour mémoire : build minimal type Eleventy/`posthtml-include` avec `dist/` commité — vrai DRY mais ajoute un `npm install` ; injection JS via `fetch('partials/header.html')` — écartée car header/footer deviendraient invisibles aux crawlers, rédhibitoire pour une boutique.)_

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
2. **P1.1** ✅ (vendor/app fait) · **P1.2** — éclater `utils.js` = prochain sous-chantier possible.
3. **P2 (suppressions)** — fichiers jamais référencés + `fontawesome.min.js` + polices FA (~35 Mo).
4. **P3** — licence, readme, `.gitignore`, config Firebase (avant de communiquer le repo).
5. **P4 (reste)** — validation CI + incohérences du catalogue.
6. **P1.2 / P1.3 / P2 (médias, CSS) / P5** — les chantiers longs & investigations.
