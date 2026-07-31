# 🧹 TODO — Nettoyage & organisation du projet

> Site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS, Firestore uniquement
> pour compter les commandes. Objectif : repo propre, lisible et clonable par un tiers.

**Légende :** 🔴 P0 = bug/blocage · 🟠 P1 = organisation · 🟡 P2 = poids/perf · 🔵 P3 = qualité & open source · 🟣 P4 = scale (JSON) · 🟤 P5 = investigation

**Statut :** P0 ✅ (sauf liens sociaux) · P1 ✅ · P2 médias ✅ · P2 CSS ✅ · P2 polices ✅ · P4 migration ✅ ·
P3 bien avancé (licence, `.gitignore`, en-têtes copyright, résidus de template — tous faits 30-31/07).

**👉 Prochaine étape : voir tout en bas.**

**Décisions actées :**

- Duplication HTML sur les 6 pages → gardée (pas de build, pas d'injection JS — voir historique P1.3).
- Catalogue en `data/products.js` (`export default`), pas de `fetch` JSON.
- Historique git non réécrit (clone lourd accepté, seule la fluidité du site compte).
- Noms de fichiers gardés tels quels (kebab-case écarté).

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

## 🟡 P2 — reste

- [ ] **`defer` sur les 10 `<script>` bloquants restants** de chaque page (les modules le sont déjà par
      nature).
- [ ] _(optionnel)_ **12 `.jpg` restants** (~950 Ko, dont `background-whatsapp` qui touche `style.css`) →
      gain estimé ~600 Ko seulement, homogénéité uniquement.

---

## 🔵 P3 — reste

- [ ] **Config Firebase en dur** dans [firebase-management.js](assets/js/app/firebase-management.js). Les
      clés ne sont pas secrètes (sécurité = règles Firestore + App Check), mais un cloneur pointe par défaut
      sur **ta** base et ses écritures sont rejetées sans comprendre pourquoi.
      👉 `app/config/firebase.config.js` (déjà gitignoré) + `firebase.config.example.js` commité + garde :
      config absente → stats désactivées proprement plutôt qu'un crash.
- [ ] **`readme.md` partiellement obsolète** (la section licence et « Why this project? » sont à jour, le
      reste ne l'est pas) :
  - arborescence : `database-management.js` (supprimé), `assets/fonts/` (supprimé), `services.html` manquant
  - « Live stock, quantity selector » → aucun stock dans le modèle de données · « Validations client &
    server side » → pas de serveur · « Clean code split into modules » → à revérifier après P1
  - Getting Started : chemin `assets/js/firebase-management.js` obsolète (il manque `app/`) et
    `npx live-server` à recaler sur la vraie procédure — dépend de l'item Firebase ci-dessus
- [ ] **`.editorconfig` + Prettier + ESLint** — le code est déjà formaté à la Prettier, autant le figer.
- [ ] **SEO** : même `<title>` sur les 6 pages, `meta description` vide, `<html lang="en">` alors que tout
      est en français → titres/descriptions uniques, `lang="fr"`, Open Graph (partages WhatsApp).
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

**Suite de P3, dans cet ordre :**

1. **Externaliser la config Firebase** (`firebase.config.js` gitignoré + `.example.js` commité + garde de
   dégradation propre) — rapide, et débloque la réécriture du readme (Getting Started en dépend).
2. **Réécrire `readme.md`** (arborescence, features, getting started).
3. SEO → accessibilité → outillage (Prettier/ESLint/CI) → tests.

Puis P4 (validation + incohérences catalogue), P2 (`defer`), P5.

> ⚠️ Fichiers en **UTF-8 sans BOM** : jamais de `Get-Content`/`Set-Content` PowerShell 5.1 dessus (accents/
> emoji détruits). Utiliser `[System.IO.File]::ReadAllText`/`WriteAllText` avec `UTF8Encoding($false)`, ou
> un éditeur.
