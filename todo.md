# 🧹 TODO — Nettoyage & organisation du projet

> Revue de code complète du 25/07/2026 (branche `master`, arbre propre).
> Contexte : site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS,
> Firestore uniquement pour compter les commandes. Objectif : repo propre, lisible et
> clonable par un tiers depuis GitHub.

**Légende :** 🔴 P0 = bug ou blocage · 🟠 P1 = organisation (ta demande principale) · 🟡 P2 = poids/perf · 🔵 P3 = qualité & open source · 🟣 P4 = préparation du scale (JSON)

**Statut :** 🔴 P0 ✅ · 🟣 P4 migration ✅ · 🟠 **P1 ✅** (P1.1 + P1.2 faits ; P1.3 = statu quo) ·
🟡 **P2 médias ✅** (suppressions + vidéos + images : `assets/` passé de **~86 Mo à 14,4 Mo**).
Restent P2 (CSS, `defer`, historique git), P3, P5 — et les liens sociaux (reportés).
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
- [x] **La page d'accueil chargeait 40 Mo de vidéo en `autoplay`** → ré-encodées (**10,4 Mo** : 720p CRF 28
      pour les 2 vidéos du carrousel, 1080p CRF 26 + `unsharp` pour `bg-video-welcome`), `preload="none"` +
      `poster` + lecture déclenchée par `IntersectionObserver`, `prefers-reduced-motion` respecté.
      Voir la section « Fait (2026-07-28) ».
- [x] **Images produits : 11 Mo de PNG** → 48 fichiers convertis en WebP (**1,2 Mo**, −89 %),
      `loading="lazy"` + `width`/`height` ajoutés. Voir la section « Fait (2026-07-28) ».
- [ ] _(optionnel)_ **Les 12 `.jpg` restants** (~950 Ko : quelques photos produit, `banner{1,2,3}`,
      `happy-people`, `background-whatsapp`) n'ont pas été convertis — gain estimé ~600 Ko seulement,
      et `background-whatsapp` demanderait de toucher `style.css`. À faire si on veut l'homogénéité.
- [ ] **`style.css` = 12 025 lignes** (thème acheté, très majoritairement inutilisé). → passer un PurgeCSS/UnCSS sur les 6 pages **une fois le JS stabilisé** (attention : les classes injectées par `utils.js` doivent être en safelist).
- [ ] **11 `<script>` bloquants par page**, tous dans le `<body>` sans `defer`. → ajouter `defer` (les modules le sont déjà par nature) ; à terme, bundler.
- [x] ⛔ **Le poids reste dans l'historique git** (un `git clone` téléchargera toujours les 32 Mo de GIFs).
      → **décidé le 28/07/2026 : on ne réécrit pas l'historique.** Un clone lourd est sans importance ici,
      seule la fluidité du site final compte.

---

## 🔵 P3 — Qualité de code & "prêt pour l'open source"

- [ ] **Aucun fichier `LICENSE`.** Sans licence, "open source" n'a pas de valeur juridique : par défaut, personne n'a le droit de cloner/réutiliser. → ajouter MIT (le plus permissif, cohérent avec ton intention) + la mention dans le readme.
      ⚠️ Vérifier aussi la licence du thème HTML d'origine avant de le republier.
- [ ] **Config Firebase en dur** [firebase-management.js](assets/js/app/firebase-management.js) + clé de site reCAPTCHA.
      Ce ne sont pas des secrets (les clés Firebase sont publiques par design, la sécurité repose sur les règles Firestore + App Check — c'est bien fait chez toi 👍). **Mais** : un cloneur pointe par défaut sur **ta** base, ses écritures sont rejetées par App Check, et il ne comprend pas pourquoi.
      👉 `app/config/firebase.config.js` (gitignoré) + `firebase.config.example.js` commité + garde dans le code : si la config est absente, désactiver proprement les stats au lieu de planter.
- [ ] **Le `readme.md` ne correspond pas au repo** :
  - l'arborescence annonce `database-management.js` → ce fichier **n'existe plus** (supprimé en P4) ;
    toute la section est à réécrire sur la structure actuelle `vendor/` + `app/{config,data,services,ui}`
  - `services.html` n'apparaît pas dans l'arbre, `README.md` est en fait `readme.md`
  - "Live stock", "quantity selector" → le stock n'est nulle part dans le modèle de données
  - "Validations client & server side" → il n'y a pas de serveur ; c'est la règle Firestore (à reformuler)
  - "Clean code split into modules" → à re-vérifier après P1 🙂
  - ~~la section Structure ne mentionne pas `assets/video` (71 Mo…)~~ → l'argument du poids ne tient plus
    (`assets/` = 10,5 Mo depuis le 28/07/2026), mais la section Structure reste à corriger
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
2. ~~**P1**~~ ✅ (P1.1 vendor/app + P1.2 éclatement de `utils.js` ; P1.3 statu quo) — **fait** (2026-07-26).
3. ~~**P2 (suppressions + médias)**~~ ✅ — **fait** (2026-07-28) : `assets/` de ~86 Mo à 14,4 Mo.
4. **P3** — licence, readme, `.gitignore`, config Firebase. 👉 **Prochaine étape**, à faire avant de communiquer le repo.
5. **P4 (reste)** — validation CI + incohérences du catalogue.
6. **P2 (CSS + `defer`) / P5** — les chantiers longs & investigations.

> ⚠️ Rappel pour la suite : les fichiers du projet sont en **UTF-8 sans BOM**. Ne jamais les réécrire via
> `Get-Content` / `Set-Content` sous PowerShell 5.1 (lecture en Windows-1252 → double encodage, les accents
> et emoji sont détruits). Utiliser `[System.IO.File]::ReadAllText` / `WriteAllText` avec un
> `UTF8Encoding($false)`, ou un éditeur.
