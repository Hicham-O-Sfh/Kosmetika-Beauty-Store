# 🧹 TODO — Nettoyage & organisation du projet

> Site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS, Firestore uniquement
> pour compter les commandes. Objectif : repo propre, lisible et clonable par un tiers.

**Légende :** 🔴 bug visible · 🟡 poids/perf · 🔵 qualité & open source · 🟣 scale · 🟤 investigation

---

## 👉 Prochaine étape

1. 🔴 **Liens sociaux** — le seul bug encore visible par un client. Il ne manque que les 3 URLs.
2. 🔵 _(optionnel)_ `robots.txt` + `sitemap.xml` — complète le SEO du 31/07.
3. 🔵 **Outillage** — Prettier/ESLint/`.editorconfig`, puis tests, puis CI.
4. 🔵 **Conventions de code** — `var`/`const` et FR/EN mélangés.

Puis 🟣 P4 (validation + incohérences catalogue) et 🟤 P5.
**Config Firebase** : en pause, à reprendre dans une session dédiée — hors de cet ordre.

---

## 📋 Reste à faire

### 🔴 Bug visible

- [ ] **Liens sociaux placeholder** — `INSTAGRAM_LINK`/`FACEBOOK_LINK`/`TIKTOK_LINK`
      ([site.config.js](assets/js/app/config/site.config.js)) valent encore littéralement leur nom
      → 3 liens morts dans le footer des 6 pages. Renseigner les vraies URLs ou masquer.

### 🔵 Qualité & open source

- [ ] ⏸️ **Config Firebase en dur** dans [firebase-management.js](assets/js/app/firebase-management.js).
      Les clés ne sont pas secrètes (la sécurité tient aux règles Firestore + App Check), mais un cloneur
      pointe par défaut sur **ta** base et ses écritures sont rejetées sans qu'il comprenne pourquoi.
      👉 `app/config/firebase.config.js` (déjà gitignoré) + `firebase.config.example.js` commité + garde :
      config absente → stats désactivées proprement plutôt qu'un crash.
      👉 Rapatrier aussi `firestore.rules` dans le repo : elles n'existent aujourd'hui que dans la console.
- [ ] **`.editorconfig` + Prettier + ESLint** — le code est déjà formaté à la Prettier, autant le figer.
- [ ] **Conventions de code** : mélange `var`/`const`, FR/EN dans les noms et commentaires
      → code + commentaires en anglais, textes d'interface en français, `const`/`let` uniquement.
- [ ] **Zéro test** — 3-4 tests Vitest sur `cart.service` (ajout, quantité, suppression, total).
- [ ] **Zéro CI** — GitHub Action (Prettier + ESLint + validation HTML + déploiement Pages), ~30 lignes.
- [ ] **`CONTRIBUTING.md`** dédié + captures d'écran dans le readme (placeholder `demo-banner.png` commenté).
- [ ] _(optionnel)_ **`robots.txt` + `sitemap.xml`** — 2 fichiers statiques, aident l'indexation des 6 pages.

### 🟡 Poids / perf

- [ ] _(optionnel)_ **12 `.jpg` restants** (~950 Ko, dont `background-whatsapp` qui touche `style.css`)
      → gain estimé ~600 Ko, homogénéité uniquement.

### 🟣 Scale du catalogue

- [ ] **Valider le catalogue automatiquement** (`ajv` + `npm run validate:products` en CI) : `id` unique,
      `pics` non vide, un seul `isMain`, `price > 0`, `status` valide. _(Dépend de la décision npm/CI.)_
- [ ] **Incohérences connues** (laissées volontairement) : prix des ids 2/3 différents des autres · id 16
      inséré hors ordre (ajouter un champ `order` si besoin un jour) · catégories 15/16 à confirmer.
- [ ] **Au-delà de ~100 produits** : pagination / index séparé sur `shop.html`.

### 🟤 À investiguer

- [ ] **`requestStorageAccess: Permission denied`** en console sur GitHub Pages. Piste principale :
      les cookies tiers de reCAPTCHA v3 (Firebase App Check) ; GTranslate est l'autre suspect.
      Sans impact sur le panier (`localStorage` first-party). Identifier, puis décider si on corrige.

### ❓ À trancher

- `product-details.html` : le bloc « Plus d'info ! » est un **faux onglet** — un seul `role="tab"`,
  aucun bouton de bascule, sur un `<a>` sans `href` (donc ni lien ni focusable). L'`aria-selected` et
  le `role="presentation"` ont été corrigés le 04/08, mais la structure reste un onglet qui n'en est
  pas un. Un `<h2>` au-dessus du texte ferait le même effet visuel, en plus simple.

---

## ⚠️ À savoir avant de toucher au projet

**Décisions actées** — ne pas les rouvrir sans raison neuve :

- Duplication HTML sur les 6 pages **gardée** : pas de build, pas d'injection JS.
- Catalogue en `data/products.js` (`export default`), pas de `fetch` JSON.
- Historique git non réécrit (clone lourd accepté, seule la fluidité du site compte).
- Noms de fichiers gardés tels quels (kebab-case écarté).

**Pièges techniques** :

- **Fichiers en UTF-8 sans BOM** : jamais de `Get-Content`/`Set-Content` PowerShell 5.1 dessus
  (accents et emoji détruits). Utiliser `[System.IO.File]::ReadAllText`/`WriteAllText` avec
  `UTF8Encoding($false)`, ou un éditeur.
- **`plugins.css` contient un Bootstrap purgé** : la plupart des utilities (`d-flex`, `mb-*`, `me-*`,
  `img-fluid`…) ont été supprimées. Toute utility posée dans le HTML doit d'abord être **réinjectée**
  dans le bloc Bootstrap, sinon la classe est inerte. Vérifier : `grep -o '\.classe\b' assets/css/plugins.css`.
  Le projet est en **Bootstrap 5.0.2** — les classes 5.3 (`z-1`…) n'existent pas.
- **Modernizr n'est pas différé, volontairement** : il remplace la classe `.no-js` de `<html>`, dont
  dépend `.no-js .owl-carousel { display: block }`. Le différer ferait clignoter la galerie de
  `product-details.html`. Un commentaire dans les 6 pages le rappelle.
- **Les vignettes de la galerie doivent rester des `<a>`** : ElevateZoom câble en dur
  `$('#' + gallery + ' a')`. Les passer en `<button>` casserait silencieusement le changement de photo.
  Elles ont un nom accessible via l'`alt` de leur image, c'est le compromis retenu.
- **Un `<button>` qui remplace un `<a>` a besoin d'être dépouillé** : fond, bordure, `padding` et
  `font` natifs. Un bloc en tête de `style.css` s'en charge pour les boutons d'interface ; il doit
  rester **avant** les règles de composant, qui gagnent alors l'égalité de spécificité.
- **Ne jamais remettre `*:focus { outline: none }`** : c'est ce qui rendait la navigation au clavier
  impossible à suivre. La règle actuelle masque l'anneau à la souris (`:not(:focus-visible)`) et
  l'affiche au clavier (`:focus-visible`).
- **Si une purge CSS est refaite** : PurgeCSS (fast-glob) ignore silencieusement les chemins Windows
  en `\` ; les `@keyframes` référencées seulement par `animation-name:` échappent à la recherche par
  classe ; la safelist `greedy` garde tout un sélecteur composé dès qu'un fragment matche.
- **`.owl-*` / `.slick-*` ne sont jamais du CSS mort** : ces classes sont posées à l'exécution par les
  librairies, donc invisibles à une recherche dans le HTML.
- **Les carrousels restent en CSS custom** : `custom-row` / `custom-col-5` (gouttières de 6 px) forment
  la grille **interne** à Slick/Owl, qui pilote lui-même la largeur des slides en inline. Y substituer
  `.row`/`.col-*` ferait entrer en conflit deux systèmes de layout.
- **`cart_link` et `footer_top` restent en CSS** : leurs échelles responsives (25/15/20 px et
  61/42/27 px) n'ont pas d'équivalent Bootstrap sans altérer le design à 3 breakpoints.

**Limite assumée — Open Graph** : `product-details.html` a des balises OG **statiques**. Partager le lien
d'un parfum précis affiche l'aperçu générique de la boutique, pas le produit : les crawlers n'exécutent
pas le JS et il n'y a pas de rendu serveur. Corrigeable seulement avec un build ou un backend.

**Méthode de vérification d'une refonte CSS/HTML** : capture des styles calculés + géométrie avant/après
(1280 / 768 / 375), puis diff sur les éléments de contenu — insensible à la suppression de wrappers.

---

## ✅ Journal

_Le détail de chaque changement est dans l'historique git ; ce journal ne garde que le résultat._

- **26/07 — bugs, architecture JS, catalogue.** Code mort nettoyé (`jquery.ui.js`, scripts morts,
  `alert()` → toast, dédup des templates, badges stock). Catalogue migré vers `app/data/products.js`
  - `products.repository.js`. JS séparé en `vendor/` + `app/{config,data,services,ui}`.
- **28/07 — médias.** `assets/` 86 Mo → 14,4 Mo : fichiers morts (−32,5 Mo), vidéos ré-encodées (−74 %,
  lecture différée par `IntersectionObserver` + `prefers-reduced-motion`), 48 PNG → WebP (−89 %).
- **30/07 — CSS & polices.** PurgeCSS + 7 libs mortes retirées : 753 Ko → 129 Ko (−83 %), 0 différence
  de rendu. Ionicons retiré, `assets/fonts/` supprimé. Garde `?productId=` sur `product-details.html`.
- **30-31/07 — open source.** `LICENSE` MIT, `.gitignore` durci, résidus d'aspirateur de site supprimés,
  en-tête copyright sur tous les fichiers, commentaires d'historique retirés du code, `readme.md` réécrit.
- **31/07 — Bootstrap-first (P6).** Les 6 pages + les blocs `#generic` migrés vers les utilities ;
  `style.css` 2736 → 2497 lignes.
- **31/07 — SEO.** `lang="fr"`, titre + `meta description` uniques par page, `canonical`, Open Graph
  complet + `twitter:card`, image OG 1200×630 en **JPEG** (le crawler Facebook, qui alimente les aperçus
  WhatsApp, ne rend pas le WebP de façon fiable).
- **03/08 — accessibilité, perf, template.** Les 24 `alt=""` du site remplis (17 dans le HTML,
  7 dans les templates JS, titre du parfum injecté). `defer` sur les 8 scripts différables des 6 pages.
  `banner_section` masquée supprimée : photos de bijoux et textes génériques hérités du template,
  −46 lignes HTML, −15 règles CSS, −91 Ko d'images.
- **04/08 — accessibilité (fin), CSS.** Les 37 faux liens des 6 pages passés en
  `<button type="button">` + `aria-label` (menu, panier, validation, envoi du formulaire), plus le
  bouton « retirer » du panier — dont l'activation au clavier **ne fonctionnait pas** : le gestionnaire
  écoutait `.remove-from-cart` posé sur l'icône, que `Entrée` ne cible jamais. Les 8 boutons du site
  ont désormais un nom (flèches Slick et « remonter » compris). Les liens-images qui doublaient le
  lien-titre sont rendus non focusables (`tabindex="-1"` + `aria-hidden`) : 3 liens par carte produit
  → 1. `*:focus { outline: none }` remplacé par un couple `:not(:focus-visible)` / `:focus-visible`.
  Lien mort autour de `#zoom1` retiré. Les 3 règles `.tooltip` inutilisées supprimées et les 6 styles
  inline sortis en classes.
