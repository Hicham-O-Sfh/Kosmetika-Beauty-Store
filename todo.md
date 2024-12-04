# 🧹 TODO — Nettoyage & organisation du projet

> Site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS, Firestore uniquement
> pour compter les commandes. Objectif : repo propre, lisible et clonable par un tiers.

**Légende :** 🔴 bug visible · 🟡 poids/perf · 🔵 qualité & open source · 🟣 scale · 🟤 investigation

---

## 👉 Prochaine étape

Le site n'a toujours aucun bug visible par un client, mais les compteurs de commandes ne fonctionnent
plus côté Firebase — invisible depuis la boutique, bien réel côté données.

1. 🔴 **Firebase HS en production** — déployer `firestore.rules`, puis débloquer App Check.
   Seul point réellement cassé aujourd'hui ; détail dans la section dédiée.
2. 🟣 **Incohérences du catalogue** — 3 points à confirmer, 10 minutes.
3. 🔵 **Captures d'écran du readme** — après la refonte des photos.

**Photos produit** : refonte complète prévue via génération IA (Nano Banana / Higgsfield), plus tard.
Tout travail d'optimisation d'images d'ici là serait jeté.

---

## 📋 Reste à faire

### 🔴 Firebase hors service en production

Découvert le 04/08 en vérifiant l'externalisation de la config. Invisible depuis la boutique : ni le
panier ni la commande WhatsApp ne dépendent de Firestore. **Les compteurs, eux, n'enregistrent plus rien.**

**Cause unique : App Check.** L'enforcement est activé sur Cloud Firestore et le panneau App Check
affiche **0 requête validée sur 4** — donc 100 % du trafic légitime est rejeté, lectures comme écritures.
Les règles ne sont pas en cause : celles de la console (inchangées depuis juin 2025) sont exactement
celles que le readme documentait, `allow read: if true` compris. Déployer `firestore.rules` ne
débloquera donc rien par soi-même.

- [ ] **Prod — le jeton reCAPTCHA est rejeté (`App attestation failed`).** Le domaine
      `hicham-o-sfh.github.io` a été ajouté aux domaines de la clé le 04/08 : **ça n'a rien changé**,
      l'échange renvoie toujours `403`. Piste écartée.
      Un appel direct à `:exchangeRecaptchaV3Token` avec un jeton bidon répond `App attestation failed`
      et non « API non activée » ou « app inconnue » : l'API App Check est donc **active** et l'app
      **bien enregistrée**. C'est la vérification du jeton qui échoue. Deux causes restantes, toutes
      deux visibles sur le même écran (Firebase Console → App Check → **Apps** → l'app web) :
      1. la **clé secrète** enregistrée dans App Check ne correspond pas à la paire de la clé de site ;
      2. l'app est enregistrée en **reCAPTCHA Enterprise** et non v3 — dans ce cas le code doit passer
         à `ReCaptchaEnterpriseProvider`, `ReCaptchaV3Provider` ne peut pas marcher.
      Contrôle : la métrique « Requêtes validées » doit décoller — elle est lisible **sans**
      désactiver l'enforcement.
      _Note : la clé secrète reCAPTCHA a été exposée le 04/08 — la régénérer règle aussi ce point._
- [ ] **Local — jeton de débogage manquant.** reCAPTCHA v3 ne produit pas de jeton exploitable depuis
      `localhost` : les requêtes y remontent en « non valides ». Il faut un jeton de débogage
      (App Check → Jetons de débogage) posé avant `main.js`. **À ne jamais commiter.**
- [ ] **Durcir les règles** (optionnel, sans rapport avec la panne) : le [firestore.rules](firestore.rules)
      du repo ajoute `hasAll` (le `hasOnly` seul laisse passer un document amputé d'un compteur), borne
      la quantité à 1–50 au lieu de `>= 0`, et ferme explicitement toutes les autres collections.
      ⚠️ Le déploiement **remplace** les règles de la console — l'historique y reste consultable, mais
      il n'y a pas de sauvegarde locale.

### 🔵 Qualité & open source

- [ ] **Captures d'écran dans le readme** — le placeholder `demo-banner.png` est commenté en haut du
      fichier. À faire **après** la refonte IA des photos, sinon elles seront à refaire.

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

_Plus rien à investiguer : `requestStorageAccess` a été tranché le 04/08 (voir « À savoir »)._

_Plus rien à trancher : les deux derniers points ont été décidés le 04/08 (faux onglet → `<h2>`,
CONTRIBUTING → section du readme)._

---

## ⚠️ À savoir avant de toucher au projet

**Décisions actées** — ne pas les rouvrir sans raison neuve :

- Duplication HTML sur les 6 pages **gardée** : pas de build, pas d'injection JS.
- Catalogue en `data/products.js` (`export default`), pas de `fetch` JSON.
- Historique git non réécrit (clone lourd accepté, seule la fluidité du site compte).
- Noms de fichiers gardés tels quels (kebab-case écarté).

**`requestStorageAccess: Permission denied` — élucidé le 04/08, rien à corriger.** L'appel vient de
**reCAPTCHA v3**, donc de Firebase App Check ; **GTranslate est hors de cause**. Deux preuves
indépendantes : l'iframe `google.com/recaptcha/api2/anchor` est le **seul** cadre tiers de la page
(or la Storage Access API n'est appelable que depuis un iframe cross-site), et le bundle reCAPTCHA
référence l'API (`document.hasStorageAccess`) alors que `vendor/gtranslate.js`, servi en first-party
depuis le repo, n'en contient aucune trace. Le message est émis par du code Google, dans son iframe :
il n'est pas corrigeable depuis le projet, seulement supprimable en retirant App Check — ce qui
coûterait la protection des compteurs. Sans effet sur le panier, qui est en `localStorage`
first-party. **À documenter, pas à corriger.**

**Pièges techniques** :

- **`firebase.config.js` est commité volontairement** (04/08) : GitHub Pages sert le site
  **directement depuis le dépôt**, donc un fichier gitignoré déploierait une prod sans Firebase.
  Les clés sont publiques par nature ; ce qui protège les compteurs, c'est App Check et sa liste de
  domaines, pas le secret du fichier. Contrepartie assumée : un cloneur pointe par défaut sur le
  projet d'origine et ses écritures sont refusées — d'où le message dédié de
  `warnIfForeignProject()`, qui l'explique en clair au lieu de laisser l'erreur Firestore brute.
- **La config Firebase est chargée par `import()` dynamique, jamais en statique** :
  `firebase-management.js` est atteint depuis `main.js` via `utils.js`. Un `import` statique d'un
  fichier absent ferait échouer **tout** le graphe de modules — panier compris. Le `try/catch` autour
  de l'`import()` garantit qu'une config supprimée (par un fork) ne coupe que les compteurs.
  Ne pas le « simplifier » en import statique.
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
- **04/08 — config Firebase, règles Firestore, `requestStorageAccess`.** Config sortie de
  `firebase-management.js` vers `config/firebase.config.js` + `firebase.config.example.js` qui
  documente chaque valeur. Les deux sont commités : le `.gitignore` a été **rouvert** en cours de
  route, un fichier ignoré aurait déployé une prod sans Firebase (GitHub Pages sert le dépôt tel
  quel). Chargement par `import()` dynamique sous `try/catch` : config absente → une ligne
  d'explication en console et compteurs éteints, le reste du site intact (vérifié fichier retiré :
  17 cartes produit rendues, footer projeté, zéro erreur). `firestore.rules` + `firebase.json` +
  `.firebaserc` rapatriés dans le repo, les règles y sont désormais la référence plutôt que la console.
  `requestStorageAccess` élucidé — reCAPTCHA v3, pas GTranslate (voir « À savoir »). Au passage,
  **compteurs de commandes HS en production** mis au jour : App Check rejette 100 % du trafic
  (0 requête validée sur 4), d'où la section 🔴. Les règles, elles, étaient correctes.
- **04/08 — SEO et liens sociaux.** `robots.txt` + `sitemap.xml` ajoutés (5 pages ; `product-details`
  volontairement exclu, il ne rend rien sans `?productId=` pour un crawler). Les 3 liens sociaux
  sans URL n'aboutissent plus dans le vide : ils ouvrent une modale expliquant que ce sont des
  emplacements de démonstration, avec un bouton « Compris ». Injectée à la première ouverture, jamais
  dupliquée, focus rendu au lien à la fermeture. `.modal-content` et `.modal-dialog-centered`
  réinjectées dans `plugins.css`, la purge les avait retirées.
- **04/08 — faux onglet et contribution.** Le bloc « Plus d'info ! » de `product-details.html`
  n'était un onglet que de nom : `<h2 class="product_info_title">`, échafaudage `tablist` /
  `tab-content` / `tab-pane` retiré, 5 règles CSS mortes supprimées (−15 lignes HTML). Les vrais
  onglets d'`index.html` sont intacts, ils dépendent d'un bloc CSS distinct (`.product_tab_button`).
  Pas de `CONTRIBUTING.md` : une section « Contributing » du readme renvoie vers les pièges
  ci-dessus, qui sont la vraie information utile à un nouveau venu.
