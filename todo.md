# 🧹 TODO — Nettoyage & organisation du projet

> Site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS, Firestore uniquement
> pour compter les commandes. Objectif : repo propre, lisible et clonable par un tiers.

**Légende :** 🔴 bug visible · 🟡 poids/perf · 🔵 qualité & open source · 🟣 scale · 🟤 investigation

---

## 👉 Prochaine étape

Plus rien de bloquant : le site n'a aucun bug visible par un client. Ce qui reste est au choix.

1. 🟤 **`requestStorageAccess`** — la seule anomalie encore ouverte, sans impact utilisateur.
2. 🔵 **`CONTRIBUTING.md`** + captures dans le readme — à décider (voir la section).
3. 🟣 **Incohérences du catalogue** — 3 points à confirmer, 10 minutes.

**Config Firebase** : en pause, à reprendre dans une session dédiée — hors de cet ordre.
**Photos produit** : refonte complète prévue via génération IA (Nano Banana / Higgsfield), plus tard.
Tout travail d'optimisation d'images d'ici là serait jeté.

---

## 📋 Reste à faire

### 🔵 Qualité & open source

- [ ] ⏸️ **Config Firebase en dur** dans [firebase-management.js](assets/js/app/firebase-management.js).
      Les clés ne sont pas secrètes (la sécurité tient aux règles Firestore + App Check), mais un cloneur
      pointe par défaut sur **ta** base et ses écritures sont rejetées sans qu'il comprenne pourquoi.
      👉 `app/config/firebase.config.js` (déjà gitignoré) + `firebase.config.example.js` commité + garde :
      config absente → stats désactivées proprement plutôt qu'un crash.
      👉 Rapatrier aussi `firestore.rules` dans le repo : elles n'existent aujourd'hui que dans la console.
- [ ] **`CONTRIBUTING.md`** dédié + captures d'écran dans le readme (placeholder `demo-banner.png`
      commenté). **À décider** : sans CI ni tests, un CONTRIBUTING se réduit à « ouvre `index.html`,
      respecte le style existant, pas de dépendance ». Le readme peut l'absorber en 5 lignes. Les
      captures, elles, valent le coup quel que soit le choix — mais après la refonte des photos.

### ⏸️ Écarté volontairement (04/08)

Ces points étaient listés ; ils ne le sont plus. Décision assumée, ne pas les rouvrir :

- **Outillage** (`.editorconfig`, Prettier, ESLint), **fichier de conventions de code**, **tests**,
  **CI** — hors périmètre. Le projet reste sans build, sans `npm install`, sans pipeline. Le code est
  déjà formaté à la Prettier de fait ; le figer par de l'outillage n'apporterait rien ici.
- **Optimisation des 12 `.jpg` restants** — toutes les photos produit vont être **régénérées** par IA
  (Nano Banana / Higgsfield). Optimiser des images destinées à disparaître serait du travail perdu.
  À reconsidérer une fois les nouveaux visuels en place, en une seule passe.

### 🟣 Scale du catalogue

- [ ] **Incohérences connues** (laissées volontairement) : prix des ids 2/3 différents des autres · id 16
      inséré hors ordre (ajouter un champ `order` si besoin un jour) · catégories 15/16 à confirmer.
      _(La validation automatique par `ajv` est écartée avec la CI — voir plus haut.)_
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
- **Les liens sociaux se réparent en une ligne** : remplacer la valeur de `INSTAGRAM_LINK` /
  `FACEBOOK_LINK` / `TIKTOK_LINK` dans [site.config.js](assets/js/app/config/site.config.js) par une
  vraie URL suffit — `isPlaceholderSocialLink()` cesse de matcher et le lien redevient un lien normal
  (nouvel onglet, `rel="noopener"`). Rien d'autre à toucher, la modale disparaît d'elle-même.
- **Bootstrap 5.0 ne rend pas le focus après une modale** (ajouté en 5.3) : si une autre modale est
  créée un jour, refaire le `hidden.bs.modal` → `trigger.focus()` de `bindSocialPlaceholderDialog()`.
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
- **04/08 — SEO et liens sociaux.** `robots.txt` + `sitemap.xml` ajoutés (5 pages ; `product-details`
  volontairement exclu, il ne rend rien sans `?productId=` pour un crawler). Les 3 liens sociaux
  sans URL n'aboutissent plus dans le vide : ils ouvrent une modale expliquant que ce sont des
  emplacements de démonstration, avec un bouton « Compris ». Injectée à la première ouverture, jamais
  dupliquée, focus rendu au lien à la fermeture. `.modal-content` et `.modal-dialog-centered`
  réinjectées dans `plugins.css`, la purge les avait retirées.
