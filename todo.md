# 🧹 TODO — Nettoyage & organisation du projet

> Site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS, Firestore uniquement
> pour compter les commandes. Objectif : repo propre, lisible et clonable par un tiers.

**Légende :** 🔴 bug visible · 🔵 qualité & open source · 🟣 scale

---

## 👉 Prochaine étape

Plus rien de bloquant : le site n'a aucun bug visible par un client, et la chaîne de commande a été
vérifiée de bout en bout en production le 04/08 — la commande s'enregistre bien dans Firestore.

1. 📸 **Refonte des photos produit par IA** — le dernier gros levier, et le seul qui débloque autre
   chose (captures du readme, puis passe d'optimisation d'images, en une fois).

**Photos produit** : refonte complète prévue via génération IA (Nano Banana / Higgsfield), plus tard.
Tout travail d'optimisation d'images d'ici là serait jeté.

---

## 📋 Reste à faire

### 🔵 Firestore

- [x] **Règles durcies déployées le 04/08.** `firestore.rules` du repo est désormais la version active
      (compilation OK, `released rules to cloud.firestore`). Elles ajoutent `hasAll` en plus de
      `hasOnly`, bornent la quantité à 1–50 au lieu de `>= 0`, et ferment explicitement toutes les
      autres collections. Le repo et la console ne peuvent plus diverger : redéployer après chaque
      modification du fichier.

### 🔵 Qualité & open source

- [ ] **Captures d'écran dans le readme** — le placeholder `demo-banner.png` est commenté en haut du
      fichier. À faire **après** la refonte IA des photos, sinon elles seront à refaire.

### ⏸️ Écarté volontairement (04/08)

Ces points étaient listés ; ils ne le sont plus. Décision assumée, ne pas les rouvrir :

- **Jeton de débogage App Check** — les compteurs resteront muets en développement local, et c'est
  accepté. Le site y fonctionne entièrement (catalogue, panier, commande WhatsApp) ; seule l'écriture
  Firestore est refusée, et `warnAppCheckRejected()` l'explique en console au lieu de laisser une
  erreur brute. La prod, elle, est vérifiée fonctionnelle. Ajouter `localhost` à la clé reCAPTCHA
  n'est **pas** une alternative : ça affaiblirait la clé de production.
- **Outillage** (`.editorconfig`, Prettier, ESLint), **fichier de conventions de code**, **tests**,
  **CI** — hors périmètre. Le projet reste sans build, sans `npm install`, sans pipeline. Le code est
  déjà formaté à la Prettier de fait ; le figer par de l'outillage n'apporterait rien ici.
- **Optimisation des 12 `.jpg` restants** — toutes les photos produit vont être **régénérées** par IA
  (Nano Banana / Higgsfield). Optimiser des images destinées à disparaître serait du travail perdu.
  À reconsidérer une fois les nouveaux visuels en place, en une seule passe.
- **SEO des fiches produit** — ce n'est pas une dette de _ce_ projet. Kosmetika est une démonstration :
  qu'un tunnel catalogue → fiche → panier → commande, avec monitoring des ventes et historique client,
  tient sans backend ni base de données. Le SEO produit est une problématique de **boutique réelle**,
  pas de POC, et l'optimiser ici ne prouverait rien de plus. La limite et le chemin de correction
  (3 niveaux, du canonical dynamique à la génération de pages) sont documentés dans le readme,
  section « SEO », **à destination du cloneur** qui reprendrait le socle pour un vrai commerce.

### 🟣 Scale du catalogue

- [x] **Incohérences connues — réglées le 04/08.** Tous les prix alignés à 100 MAD · id 16 remis dans
      l'ordre · catégories 15/16 tranchées : le 15 était cohérent, le 16 reste `femme` et sa description
      a été reprise (elle s'adressait à « ceux » et disait « luxure » pour « luxe »).
      _(La validation automatique par `ajv` reste écartée avec la CI — voir plus haut.)_
- [ ] **Au-delà de ~100 produits** : pagination / index séparé sur `shop.html`.

---

## ⚠️ À savoir avant de toucher au projet

**Décisions actées** — ne pas les rouvrir sans raison neuve :

- Duplication HTML sur les 6 pages **gardée** : pas de build, pas d'injection JS.
- Catalogue en `data/products.js` (`export default`), pas de `fetch` JSON.
- Historique git **réécrit une fois**, le 31/07 (`git filter-branch`), pour retirer l'attribution de
  co-auteur des commits. Tous les SHA antérieurs ont changé. Pas d'autre réécriture prévue : le poids
  du clone reste accepté, seule la fluidité du site compte.
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

**`ERR_BLOCKED_BY_CLIENT` sur `firestore.googleapis.com/…/Write/channel` — pas un bug non plus.**
Observé le 04/08 après une commande réussie. `BY_CLIENT` désigne le navigateur lui-même : c'est une
extension (bloqueur de pub, anti-tracking, bouclier de confidentialité) qui coupe l'appel, pas le
serveur ni le code. Et la requête bloquée porte `TYPE=terminate` : c'est la **fermeture** du canal
WebChannel, envoyée _après_ que l'écriture a abouti — d'où une commande bien enregistrée dans
Firestore malgré le message rouge. Pour confirmer, rouvrir la page en navigation privée sans
extensions : le message disparaît. Rien à corriger côté projet.

**Un contributeur fantôme dans la barre latérale GitHub — séquelle du `filter-branch` du 31/07.**
L'encart « Contributors » affiche un second compte qui n'a écrit aucun des 127 commits. Vérifié le
04/08 sur cinq sources : historique local (aucun auteur, committer, message ni trailer le mentionnant),
API `commits` (100 % attribués au propriétaire), API `contributors` et `stats/contributors` (une seule
entrée, 127 commits), plus zéro collaborateur et zéro GitHub App sur le dépôt. L'explication est du
côté de GitHub : le force-push qui a suivi la réécriture a rendu les anciens commits inaccessibles
depuis une branche, **mais GitHub ne les supprime pas** et son index de contributeurs, précalculé et
mis en cache, continue de les compter. D'où le hovercard « Committed in the past week », daté des
objets d'origine. Vider le cache du navigateur est sans effet : le cache est côté serveur. Seul
recours actif : demander à GitHub Support un `gc` du dépôt et un recalcul de l'index. Sinon, attendre.
**Conséquence à connaître** : tant que ce `gc` n'a pas eu lieu, les commits d'avant le 31/07 restent
récupérables sur GitHub par leur SHA, dépôt public compris.

**`npx serve` casse les fiches produit — corrigé dans le readme le 04/08.** `serve` fait des
« clean URLs » : il redirige `/product-details.html?productId=10` vers `/product-details` **en perdant
la query string**, si bien que `getCurrentDisplayedProductId()` ne trouve plus rien et que la fiche
reste vide. Le readme conseille désormais Live Server en premier (aucun outillage à installer,
et un cloneur n'a pas forcément Node), puis `npx serve . --no-clean-urls` pour ceux qui ont déjà Node.
Ne jamais reconseiller `npx serve .` sans le drapeau.

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
- **Fins de ligne en LF, imposées par `.gitattributes`** (`* text=auto eol=lf`) : le fichier a priorité
  sur le `core.autocrlf=true` installé par défaut par Git for Windows, qui sinon convertit tout en CRLF
  au checkout et fait apparaître des diffs fantômes. Ne pas le supprimer « parce que ça marche ».
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

**Limite assumée — SEO des fiches produit et Open Graph.** Une recherche Google sur un parfum précis
(« Lattafa Yara 100ml ») ne mène **pas** au site, et le partage WhatsApp d'une fiche affiche l'aperçu
générique de la boutique. Même cause, trois symptômes :

- **Une seule URL pour tout le catalogue.** `product-details.html?productId=16` n'existe pas comme page
  distincte, et son `canonical` omet la query string : Google fusionne les 17 fiches en une page
  générique. `sitemap.xml` l'exclut d'ailleurs volontairement.
- **Le contenu arrive par JS, après un appel Firestore.** Googlebot rend le JS, mais en seconde passe
  et avec délai ; en cas d'échec il indexe la coquille vide.
- **Balises OG et JSON-LD statiques ou absents** — rien à donner au crawler Facebook ni aux résultats
  enrichis.

**Limite assumée, pas une tâche** : le projet est un POC sans backend, le SEO produit est un sujet de
boutique réelle. Le readme lui consacre une section (« SEO — what this demo does, what it doesn't,
and what a cloner should do ») qui détaille les trois niveaux de correction, du canonical dynamique
en quelques lignes jusqu'à la génération d'une page HTML par produit — la seule correction de fond,
et la seule chose que la contrainte « pas de build » coûte réellement. **Ne pas rouvrir ce point
comme un todo** ; s'il est traité un jour, ce sera pour une vraie boutique, avec domaine propre.

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
  Historique réécrit par `git filter-branch` pour retirer l'attribution de co-auteur des commits :
  tous les SHA antérieurs ont changé (séquelle visible côté GitHub, voir « À savoir »).
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
  `requestStorageAccess` élucidé — reCAPTCHA v3, pas GTranslate (voir « À savoir »). Paire de clés
  reCAPTCHA régénérée au passage. **Chaîne de commande vérifiée de bout en bout en production** :
  la commande s'enregistre bien dans Firestore. Les `403 App Check` vus pendant la session venaient
  du navigateur automatisé de test, que reCAPTCHA v3 note comme un robot — pas d'une panne du site.
  Leçon retenue : ne jamais conclure à une panne reCAPTCHA depuis un navigateur piloté.
  En fin de session, `firestore.rules` a été **déployé** : le repo et la console sont alignés, et le
  fichier devient la référence — toute modification doit être redéployée pour prendre effet.
  Catalogue au passage : prix tous à 100 MAD, id 16 remis en ordre, `status` bascule sur l'enum
  `PRODUCT_STATUS`, et « luxure » (débauche) remplacé par « luxe » sur les ids 15 et 16.
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
- **04/08 — fins de ligne et SEO produit.** `.gitattributes` ajouté (`* text=auto eol=lf`) : GitHub
  Desktop avertissait que le `core.autocrlf=true` global allait convertir les fichiers LF en CRLF au
  prochain checkout. Le fichier tranche pour tout le monde, quelle que soit la config locale.
  Constat SEO au passage, sans changement de code : les fiches produit ne sont pas indexables
  individuellement — canonical sans `?productId=`, contenu injecté par JS, pas de JSON-LD. Traité
  comme une **limite assumée de POC** et non comme une dette : le readme gagne une section « SEO »
  qui l'expose et donne au cloneur les trois niveaux de correction, plus le décompte de ce que
  l'absence de backend fait économiser (pas de serveur, pas de BDD, pas de comptes, pas de panier à
  garder côté serveur, pas de PCI, pas de CI/CD). Le todo n'en garde qu'une ligne dans « Écarté ».
