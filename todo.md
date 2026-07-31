# 🧹 TODO — Nettoyage & organisation du projet

> Site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS, Firestore uniquement
> pour compter les commandes. Objectif : repo propre, lisible et clonable par un tiers.

**Légende :** 🔴 P0 = bug/blocage · 🟠 P1 = organisation · 🟡 P2 = poids/perf · 🔵 P3 = qualité & open source · 🟣 P4 = scale (JSON) · 🟤 P5 = investigation · 🎨 P6 = Bootstrap-first

**Statut :** P0 ✅ (sauf liens sociaux) · P1 ✅ · P2 médias ✅ · P2 CSS ✅ · P2 polices ✅ · P4 migration ✅ ·
P3 bien avancé (licence, `.gitignore`, en-têtes copyright, résidus de template, `readme.md` — tous faits
30-31/07).

**👉 Prochaine étape : voir tout en bas.**

**Décisions actées :**

- Duplication HTML sur les 6 pages → gardée (pas de build, pas d'injection JS — voir historique P1.3).
- Catalogue en `data/products.js` (`export default`), pas de `fetch` JSON.
- Historique git non réécrit (clone lourd accepté, seule la fluidité du site compte).
- Noms de fichiers gardés tels quels (kebab-case écarté).
- **Config Firebase reportée (31/07)** : ça bloque/bug côté outillage du user, mise en pause volontaire —
  pas oubliée, juste plus tard. Le readme reflète l'état actuel (clé en dur) sans anticiper le fichier
  externalisé.

---

## ✅ Fait

**26/07 — P0 + P4 + P1** : bugs/code mort nettoyés (`jquery.ui.js`, scripts morts, `alert()` → toast, dédup
des templates, badges stock) · catalogue migré vers `app/data/products.js` + `products.repository.js` · JS
séparé en `vendor/` + `app/{config,data,services,ui}` · `utils.js` éclaté (`cart.service`, `ui/plugins`,
`ui/templates`).

**28/07 — P2 médias** : `assets/` 86 Mo → 14,4 Mo. Fichiers morts supprimés (−32,5 Mo), vidéos ré-encodées
(−74 %, lecture différée par `IntersectionObserver` + `prefers-reduced-motion`), 48 PNG → WebP (−89 %).
Carrousels Slick refactorés (`buildProductSlickSettings`, plafonne `slidesToShow` au nombre réel de slides).

**30/07 — P2 CSS/polices** : purge PurgeCSS + 7 libs mortes retirées de `plugins.css`/`vendor/plugins.js`
(renommé `vendor/slick.js`). 753 Ko → 129 Ko (−83 %), 0 différence de rendu vérifiée par diff des styles
calculés. Ionicons retiré (2 glyphes → Font Awesome), `assets/fonts/` n'existe plus. Garde `?productId=`
ajoutée sur `product-details.html` (panier vérolé auto-nettoyé).
_Pièges à connaître si une purge CSS est refaite : PurgeCSS (fast-glob) ignore silencieusement les chemins
Windows en `\` ; les `@keyframes` référencées seulement par `animation-name:` (pas de classe) échappent à la
recherche par classe ; la safelist `greedy` garde tout un sélecteur composé dès qu'un fragment matche._

**30-31/07 — P3** : `LICENSE` MIT + section licence du readme · `.gitignore` durci · résidus d'aspirateur de
site supprimés (`Stroke-Gap-Icons.html`, `owl.video.play.html`, polices Ionicons) · en-tête copyright
Kosmetika ajouté à tous les fichiers HTML/CSS/JS du projet · commentaires d'historique retirés du code
(dates, bugs corrigés, anciens noms de champs — l'historique git suffit).

---

## 🔴 P0 — reste

- [ ] ⏸️ **Liens sociaux placeholder** — `INSTAGRAM_LINK`/`FACEBOOK_LINK`/`TIKTOK_LINK` valent encore
      littéralement leur nom → liens morts dans le footer des 6 pages. Renseigner les vraies URLs ou masquer.

---

## 🎨 P6 — Bootstrap 5 d'abord, CSS custom en dernier recours

> Objectif : tout ce qui est **positionnement / espacement / alignement** passe par les utilities
> Bootstrap ; le CSS custom ne garde que la **thématisation** (couleurs, tailles de police, fonds).
> Chaque page migrée = autant de règles supprimées de `style.css`.

⚠️ **Contrainte à connaître** : `plugins.css` contient un Bootstrap **purgé** — la plupart des utilities
(`d-flex`, `mb-*`, `me-*`, `pb-*`, `img-fluid`…) avaient été supprimées. Il faut **réinjecter chaque
utility utilisée** dans le bloc Bootstrap de `plugins.css`, sinon la classe posée dans le HTML est inerte.
Vérifier systématiquement : `grep -o '\.classe\b' assets/css/plugins.css`.

**Méthode de vérification retenue** : capture des styles calculés + géométrie avant/après (1280/768/375),
diff sur les éléments de contenu (insensible à la suppression de wrappers). Voir le commit de `services.html`.

- [x] **`services.html` + `shop.html` ✅ (31/07)** — wrappers ne portant qu'une marge supprimés
      (`single_services`, `services_thumb`), `shop_reverse` (no-op : inversait `.row` puis annulait
      l'inversion) et l'échafaudage `tab-content`/`tab-pane` de `shop.html` (un seul panneau, aucun bouton
      d'onglet) retirés. Diff vérifié : `shop` identique, `services` à 1 px près sur les 8 blocs texte
      (`margin-right: 15px` → `me-3` = 16px).
- [x] **`index.html` ✅ (31/07)** — `banner_fullwidth` : wrapper `align-items-center` (inerte, sans
      `d-flex`) et `col-12` orphelin (hors `.row`) supprimés, d'où 3 règles `.banner_fullwidth .row` mortes
      retirées ; `z-1` retiré des 2 slides (**c'est du Bootstrap 5.3, le projet est en 5.0.2** — la classe
      n'existait dans aucun CSS) ; `product_tab_button` → `text-center mb-4`.
- [x] **`product-details.html` ✅ (31/07)** — `product_variant.quantity` → `d-flex align-items-center mb-4`,
      `product_desc` → `mb-4 pb-4`, `product_info_button` → `pb-3`, `product_d_info` → `mb-5`,
      `#img-1 { text-align:center }` → `text-center`.
- [x] **`faq.html` + `contact-us.html` ✅ (31/07)** — `faq_content_area`, `about_section`, `about_thumb`,
      `contact_area` entièrement remplacées par des utilities (classes supprimées du HTML) ;
      `accordion_area` gardée comme point d'accroche pour `.collapse.show`. Accordéon Bootstrap retesté.
- [x] **Blocs `#generic` ✅ (31/07)** — `middel_right` → `d-flex justify-content-center
      justify-content-lg-end align-items-center` (**correspondance exacte** : `lg` = ≥992 px, comme les
      media queries d'origine) et `main_menu_inner` → `text-center`, répercutés sur les 6 pages.
      ⛔ `cart_link` (25/15/20 px) et `footer_top` (61/42/27 px) **laissés en CSS** : leurs échelles
      responsives n'ont pas d'équivalent Bootstrap sans altérer le design à 3 breakpoints.
- [x] **Passe de nettoyage `style.css` ✅** — résidus **meanMenu** supprimés (`.mean-container`, `.mean-bar`,
      `.mean-nav`, `.meanmenu-reveal` : la lib était partie le 30/07), plus `.fix` et `.clear` inutilisées.
      ⚠️ `.owl-*` / `.slick-*` **conservées** : posées à l'exécution par les librairies, invisibles à une
      recherche dans le HTML.

**⛔ Non migré, volontairement — les carrousels.** `custom-row` / `custom-col-5` (gouttières de 6 px)
forment le système de grille **interne à Slick/Owl**, qui pilote lui-même la largeur des slides en inline.
Y substituer `.row`/`.col-*` ferait entrer en conflit deux systèmes de layout. C'est un cas légitime de
CSS custom.

**❓ À trancher (signalé, non modifié) :**

- `index.html` : la section `<section class="banner_section d-none">` (3 bannières) est **masquée en
  permanence**. 15 règles CSS la servent. La supprimer ? ou la réactiver ?
- `style.css` : les 3 règles d'override `.tooltip` / `.tooltip-inner` ne servent à rien — aucun
  `data-bs-toggle="tooltip"` dans le HTML, aucune initialisation JS. Gardées par prudence (le JS Bootstrap
  embarque le composant, donc réactivable).
- `contact-us.html` : `style="width: 60%; height: 250px"` en inline sur la bannière — pas d'équivalent
  Bootstrap (60 %), à sortir en classe projet si tu veux zéro style inline.

---

## 🟡 P2 — reste

- [ ] **`defer` sur les 10 `<script>` bloquants restants** de chaque page (les modules le sont déjà par
      nature).
- [ ] _(optionnel)_ **12 `.jpg` restants** (~950 Ko, dont `background-whatsapp` qui touche `style.css`) →
      gain estimé ~600 Ko seulement, homogénéité uniquement.

---

## 🔵 P3 — reste

- [x] **`readme.md` réécrit (31/07)** : arborescence, features et Getting Started recalés sur l'état réel
      du repo (plus de `database-management.js`/`assets/fonts/`, `services.html` listé, plus de fausses
      promesses de stock/validation serveur). Le chemin Firebase est resté celui du fichier en dur —
      voir item ci-dessous, volontairement pas anticipé.
- [ ] ⏸️ **Config Firebase en dur** dans [firebase-management.js](assets/js/app/firebase-management.js) —
      **reportée (31/07)**, pas prioritaire pour l'instant. Les clés ne sont pas secrètes (sécurité = règles
      Firestore + App Check), mais un cloneur pointe par défaut sur **ta** base et ses écritures sont
      rejetées sans comprendre pourquoi.
      👉 quand on s'y remet : `app/config/firebase.config.js` (déjà gitignoré) + `firebase.config.example.js`
      commité + garde : config absente → stats désactivées proprement plutôt qu'un crash.
- [ ] **`.editorconfig` + Prettier + ESLint** — le code est déjà formaté à la Prettier, autant le figer.
- [x] **SEO ✅ (31/07)** — `lang="fr"` sur les 6 pages, titre + `meta description` uniques (calibrés :
      titre < 60 car., description < 160), `<link rel="canonical">`, Open Graph complet + `twitter:card`.
      Image OG **1200×630 en JPEG** générée depuis la bannière (`assets/img/banner/og-kosmetika.jpg`, 44 Ko)
      — **pas de WebP** : le crawler Facebook, qui alimente aussi les aperçus WhatsApp, ne le rend pas
      de façon fiable. GTranslate revérifié après le passage à `lang="fr"` (widget + 4 langues intacts).
      ⚠️ **Limite assumée** : `product-details.html` a des balises OG **statiques**. Partager le lien d'un
      parfum précis affichera l'aperçu générique de la boutique, pas le produit — les crawlers n'exécutent
      pas le JS, et il n'y a pas de rendu serveur. Corrigeable seulement avec un build ou un backend.
- [ ] _(optionnel, complément SEO)_ `robots.txt` + `sitemap.xml` — 2 petits fichiers statiques, aident
      l'indexation des 6 pages.
- [ ] **Accessibilité** : ~20 images `alt=""` (logo + toutes les photos produit générées par les templates)
      → `alt` descriptif · `<a href="#">` utilisés comme boutons (panier) → `<button>` + `aria-label`.
- [ ] **Conventions de code** : mélange `var`/`const`, FR/EN dans noms et commentaires →
      code + commentaires en anglais, textes d'interface en français, `const`/`let` uniquement.
- [ ] **Zéro test** — 3-4 tests Vitest sur `cart.service` (ajout, quantité, suppression, total).
- [ ] **Zéro CI** — GitHub Action (Prettier + ESLint + validation HTML + déploiement Pages), ~30 lignes.
- [ ] **`CONTRIBUTING.md`** dédié + captures d'écran dans le readme (placeholder `demo-banner.png` commenté).

---

## 🟣 P4 — reste

- [ ] **Valider le catalogue automatiquement** (`ajv` + `npm run validate:products` en CI) : `id` unique,
      `pics` non vide, un seul `isMain`, `price > 0`, `status` valide. _(Dépend de la décision npm/CI — P3.)_
- [ ] **Incohérences du catalogue** (laissées volontairement) : prix ids 2/3 différents des autres · id 16
      inséré hors ordre (ajouter un champ `order` si besoin un jour) · catégories 15/16 à confirmer.
- [ ] **Au-delà de ~100 produits** : pagination / index séparé sur `shop.html`.

---

## 🟤 P5 — à investiguer

- [ ] **`requestStorageAccess: Permission denied`** en console sur GitHub Pages — script tiers (GTranslate
      ou Firebase App Check/reCAPTCHA). Sans impact sur le panier (`localStorage` first-party). Identifier la
      source, puis décider si on masque/corrige.

---

## ✅ Prochaine étape

**🎨 P6 terminé (31/07)** — les 6 pages + les blocs `#generic` sont migrés, `style.css` nettoyé
(2736 → 2497 lignes). Restent 3 points à trancher, listés en fin de section P6.
**🔵 SEO terminé (31/07)** — voir P3.

**Suite de P3 :**

1. **Accessibilité** — `alt` descriptifs (~20 images, dont toutes les photos produit générées par les
   templates), `<button>` + `aria-label` au lieu des `<a href="#">` du panier.
2. Outillage (Prettier/ESLint/`.editorconfig`) → tests → CI.
3. _(optionnel)_ `robots.txt` + `sitemap.xml`.

Puis P4 (validation + incohérences catalogue), P2 (`defer`), P5.
**Config Firebase** : en pause (voir P3 ci-dessus) — à reprendre séparément, hors de cet ordre.

> ⚠️ Fichiers en **UTF-8 sans BOM** : jamais de `Get-Content`/`Set-Content` PowerShell 5.1 dessus (accents/
> emoji détruits). Utiliser `[System.IO.File]::ReadAllText`/`WriteAllText` avec `UTF8Encoding($false)`, ou
> un éditeur.
