# ✨ Kosmetika Beauty Store

**Kosmetika Beauty Store** is a modern, responsive e-commerce web application for beauty products, built from scratch with HTML, JavaScript, Firebase, and the latest security best practices (including Firebase App Check).  
The project demonstrates clean code, secure data handling, and production-ready architecture for a real-world e-commerce scenario.

<!-- ![Kosmetika Demo Banner](assets/img/demo-banner.png) -->

> ### **Quick Start, No Setup Required**
>
> This application is designed to be instantly _“clone-and-play”_.  
> All core features work out-of-the-box, no Firebase or reCAPTCHA config needed for a first exploration.  
> The catalogue lives in a plain JS module (`app/data/products.js`), cart state is handled via `localStorage`, and checkout is as simple as sending a WhatsApp message (pre-filled invoice) using the WhatsApp API and query string.
>
> ⚡ **Just** `git clone` **the repo and open** `index.html` **in your browser to see the app in action!**
>
> _If you want to unlock the full, production-ready power, realtime analytics, App Check (reCAPTCHA) protection, and live stats via Firebase: just follow the config steps. But if you only need a quick demo, or want to skip advanced integrations, it’s ready for you out of the box!_

---

## 🚀 Features

- 🛒 **Catalog & cart**
  - 17 products, cart contents and quantities kept in `localStorage`
  - A cart entry pointing at a since-removed product is pruned automatically instead of crashing
- 💬 **WhatsApp checkout**
  - Cart formats into a pre-filled WhatsApp message (deep link). No payment gateway, no sign-up
- 📊 **Lightweight order analytics**
  - One Firestore counter per product (`total_orders`, `total_quantity`). Nothing else is stored
    server-side, the catalogue itself lives entirely in the frontend
- 🔒 **Firebase App Check** (reCAPTCHA v3, debug token support) protects that one write path
- 🛡️ **Secure by design**: strict Firestore rules (type + increment checks), no accounts, no admin
  panel, no server, so there is very little left to attack
- 🌍 **i18n**: GTranslate instant language switch
- 🎉 **UI**: responsive, mobile-first, product carousels (Slick, Owl Carousel), image zoom
  (elevateZoom), toast notifications (Notyf), Font Awesome icons
- ⚡ **Client-side validation & error handling**: friendly toasts instead of `alert()` or silent failures
- 🧩 **Modular JS**: `vendor/` (third-party, untouched) vs `app/{config,data,services,ui}`
  (application code)

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES Modules), CSS3, Bootstrap 5
- **Backend**: [Firebase Firestore](https://firebase.google.com/docs/firestore), [Firebase App Check](https://firebase.google.com/docs/app-check)
- **Security**: App Check (reCAPTCHA v3), strict Firestore rules
- **UI/UX Plugins**:
  - [Slick Slider](https://kenwheeler.github.io/slick/) & [Owl Carousel](https://owlcarousel2.github.io/OwlCarousel2/) for product carousels
  - [elevateZoom](https://www.elevateweb.co.uk/image-zoom/) for image zoom
  - [Notyf](https://github.com/caroso1222/notyf) for elegant notifications
  - [GTranslate](https://gtranslate.io/) for the instant language switcher
  - Font Awesome for iconography
- **No build step**: no bundler, no npm install. Any static file server works

---

## ⭐ Why this project?

I didn't start from a stack. I started from a shop: **17 perfume references**, a catalogue that
changes a few times a year, and customers who already place their orders on WhatsApp. Every
decision below comes from taking that brief literally instead of reaching for the default
e-commerce architecture, and the most interesting engineering here is **what I chose not to build**.

**No backend. No database.** Seventeen products, with their name, description, price and photos
changing a handful of times a year, is not a database problem, it's a data file. The catalogue
lives in `app/data/products.js`, the photos in a static folder. Putting a REST API and a database
in front of 17 objects would have bought me a server to provision, patch, monitor, back up and pay
for, in exchange for nothing a `const` array doesn't already do.

**Product pages without a router.** Each card links to `product-details.html?productId=16`. The page
reads the query string, looks the product up in the catalogue, and hydrates itself. Same result as
server-side routing and templating (deep-linkable, shareable, one page per product) with no server
in the path.

**Security by subtraction.** No server, no database, no accounts, no sessions, no admin panel means
no SQL injection, no credential leak, no login to brute-force, no midnight CVE patching. Everything
runs in the visitor's own browser. The single writable surface left is one Firestore counter, locked
down by strict rules and App Check. You can't exploit what doesn't exist.

**Checkout where the customer already is.** The cart lives in `localStorage`; checkout formats the
order into a clean invoice and hands it to WhatsApp as a deep link. No payment gateway, no PCI scope,
no sign-up wall to abandon. The order lands in the conversation the shop already answers every day.
The most business-critical feature of the site is also the one with the least code behind it.

**The order history was already there.** What a CRM would have stored (who ordered, what, when, and
the whole exchange around it) is the WhatsApp thread itself, searchable by phone number, on a device
the owner already carries. Firestore adds the one thing a thread can't do: aggregate. Two integer
counters per product turn a pile of conversations into _what actually sells_. Between the two, the
shop has its history and its monitoring without owning a single row of customer data, which is also
one less thing to secure, back up, and answer for under a privacy regulation.

**Firebase is optional, deliberately.** It does one job: counting orders per product
(`total_orders`, `total_quantity`). One isolated module, two integer fields. The day it stops paying
for itself, removing it is a single commit and the shop keeps selling.

**What that trade buys:** €0 hosting on GitHub Pages, no infrastructure, no ops, no runtime bill, no
build step, since `git push` _is_ the deployment. A visitor gets a fully static site: 78 KB of CSS
and 61 KB of application JavaScript, after a cleanup pass that cut the inherited theme by 83 %.

This is a deliberate trade, not a shortcut, so I'll name its limits: past roughly a hundred products
the catalogue wants pagination and a real index, card payments or live stock would genuinely require
a backend, and the one that costs something real, **individual product pages are not indexable by
search engines**. That last one is worth a section of its own, below. Until then, adding a backend
would be paying rent on complexity the business doesn't have.

---

## 🔎 SEO

**First, the part that matters: this is about ranking, not about the app.** The shop is complete and
in real use. Anyone, on any device, can browse the catalogue, open a product page, fill a cart and
send a full order in a few taps. Product links are shareable and reopen on the right perfume. Nothing
below is broken, missing, or waiting to be fixed. What follows is the last stretch of optimisation,
the one that decides whether Google lists each perfume on its own, and it costs this shop nothing
today: customers arrive from Instagram, WhatsApp and word of mouth, not from a search for
"Lattafa Yara 100ml".

**Site-level SEO is done.** The five content pages each carry a unique `<title>` and
`meta description`, a `canonical`, full Open Graph and a Twitter card (still spelled `twitter:card`
even on X, the tags were never renamed), `lang="fr"`, plus a [`robots.txt`](robots.txt) and
[`sitemap.xml`](sitemap.xml) pair. The OG image is JPEG on purpose: the Facebook crawler behind
WhatsApp previews is unreliable on WebP.

**Product pages are the exception**, for one reason wearing three faces. They share a single URL,
`product-details.html?productId=16`, whose `canonical` drops the query string, so Google reads 17
perfumes as one generic page. Their content is injected by JavaScript, which crawlers render on a
later pass. And their Open Graph tags are static, so sharing one shows the store's generic preview.

That is the honest price of having no server and no build step, and it is the only one. It is
written here rather than buried, because it was priced in from the start.

### Making them indexable, if you clone this for a real shop

**Tier 1, no build step, an afternoon's work.** Real improvement, zero architectural change:

| Change | What it buys |
|---|---|
| Rewrite the `canonical` in JS to include the current `?productId=` | Stops Google collapsing 17 pages into one, the highest-impact line here |
| List every product URL in `sitemap.xml` | Gives the crawler something to discover |
| Inject a JSON-LD `Product` block at hydration (name, brand, price, availability) | Price and availability shown right in the results page |
| Update `<title>`, `meta description` and OG tags at hydration | Correct WhatsApp and Facebook link previews |

**Tier 2, the real fix.** Generate one static HTML file per product from `products.js`, with a Node
script of about fifty lines run before deploy. Real URLs, real markup, nothing left for a crawler to
guess. That is the trade-off in one sentence: **the no-build constraint costs you product SEO and
nothing else.** Catalogue, cart, checkout and order monitoring genuinely do not need a server.

**Tier 3, the part that isn't code.** For a shop this size, search was never the acquisition channel.
A custom domain (a `github.io` URL will not outrank Sephora on a perfume name, however well
optimised), a real brand identity, and paid social on Meta, TikTok and Instagram are what bring
customers. Take Tier 1 because it is nearly free, reach for Tier 2 the day organic search converts.

### 😎 What you are not paying for, in exchange

No server to provision, patch or monitor. No database to back up, migrate or scale. No user accounts,
so no password storage, no session handling, no account-takeover surface. No server-side cart to
guard against tampered prices or quantities, because there is no server-side price to tamper with:
the order is a message the shop owner reads and confirms. No payment integration, so no PCI scope. No
CI/CD pipeline, no staging environment, no runtime bill: `git push` is the deployment, hosting is €0.

The single writable surface in the entire system is one Firestore counter, protected by Google
[`firestore.rules`](firestore.rules) and Google App Check ! That is the whole attack surface.

---

## 🤝 Contributing

Pull requests, issues, and suggestions are always welcome.

Nothing to install, nothing to run: clone it, serve the folder over HTTP
(see [Getting Started](#-getting-started-local-dev)) and edit. No bundler, no test suite, no CI.
That is a deliberate constraint of this project rather than an omission, so please don't add one
in a PR.

**Match the surrounding code.** Identifiers and comments in English, interface copy in French,
`const`/`let` over `var`, and the formatting Prettier would produce. Every source file carries the
Kosmetika copyright header.

### Traps you cannot see from the code

Each of these has already cost a debugging session. They are the shortest path to a change that
looks right and isn't.

**Catalogue & product photos**

- **The `pics` array has an ordering contract, not just flags.** Three functions in
  `products.repository.js` read it differently: `getMainPicUrl()` looks for `isMain`,
  `getHeroPicUrl()` looks for `isHero`, but **`getSecondaryPicUrl()` takes `pics[1]` by position**,
  and that one is the hover photo on product cards. Hence the rule: **`main` first, `hero` last,
  gallery photos in between**. Moving the `hero` to index 1 would make it the hover image of
  every card.
- **The product page gallery renders `pics` in full, `hero` included**, so the big opening photo is
  also the last thumbnail. That is intentional: filtering the `hero` out would remove the thumbnail
  matching the displayed photo.
- **Photo naming**: `assets/img/products/{id}-{brand}-{name}-{main|box|hero|N}.webp`, lowercase and
  unaccented, `N` numbering gallery photos from 1. The `{id}` prefix must match the product's `id`,
  which is what makes the catalogue verifiable at a glance. AI-generated visuals (`main`, `hero`) are
  **1024×1024**, WebP q92.

**Firebase**

- **`firebase.config.js` is committed on purpose.** GitHub Pages serves the site straight from the
  repository, so a gitignored file would deploy a Firebase-less production. The keys are public by
  nature; what protects the counters is App Check and its domain list, not the file being secret.
- **The config is loaded through a dynamic `import()`, never a static one.** A static import of a
  missing file would break the _entire_ module graph, cart included. The `try/catch` around the
  `import()` is what keeps a deleted config (in a fork) from costing anything but the counters.

**CSS & markup**

- **`plugins.css` ships a purged Bootstrap 5.0.2.** Most utilities (`d-flex`, `mb-*`, `me-*`,
  `img-fluid`…) were removed, so any utility class added to the HTML stays inert until its rule is
  reinjected. Check with `grep -o '\.class\b' assets/css/plugins.css`. Bootstrap 5.3 classes (`z-1`…)
  do not exist here.
- **`.owl-*` and `.slick-*` are never dead CSS**: those classes are applied at runtime by the
  libraries, so they are invisible to a search through the HTML.
- **Carousels stay on the custom grid**: `custom-row` / `custom-col-5` (6 px gutters) form the grid
  _inside_ Slick/Owl, which set slide widths inline. Substituting `.row`/`.col-*` would put two
  layout systems in conflict.
- **A `<button>` replacing an `<a>` needs its native chrome stripped** (background, border, padding,
  font). A block at the top of `style.css` does this for interface buttons; it must stay **before**
  the component rules, which then win on equal specificity.
- **Never restore `*:focus { outline: none }`**: that is what made keyboard navigation impossible to
  follow. The current rule hides the ring for pointer users (`:not(:focus-visible)`) and shows it for
  keyboard users (`:focus-visible`).
- **If a CSS purge is ever re-run**: PurgeCSS (fast-glob) silently ignores Windows `\` paths;
  `@keyframes` referenced only by `animation-name:` escape class-based detection; a `greedy` safelist
  keeps a whole compound selector as soon as one fragment matches.

**JS plugins**

- **Modernizr is deliberately not deferred**: it swaps the `.no-js` class on `<html>`, which
  `.no-js .owl-carousel { display: block }` depends on. Deferring it makes the product gallery flash.
- **Gallery thumbnails must stay `<a>` elements**: ElevateZoom hardcodes `$('#' + gallery + ' a')`,
  and the touch fallback `applyGalleryImageSwap()` delegates on `$('#gallery_01').on('click', 'a', …)`.
  Turning them into `<button>` would silently break photo switching **on both paths**. Their
  accessible name comes from the image `alt`, which is the accepted trade-off.
- **ElevateZoom is skipped at 480 px and below** (`ZOOM_DISABLED_QUERY`, `ui/plugins.js`): the
  magnifier listened to `touchmove` / `touchend` on the big photo and swallowed the swipe, blocking
  page scrolling. Since the plugin also owns click-to-switch, that behaviour is reimplemented by hand
  in `applyGalleryImageSwap()`, so **any gallery change must be carried into both branches**. The
  media query is evaluated **once, on load**: resizing past 480 px does not re-enable zoom without
  a reload.
- **Bootstrap 5.0 does not restore focus after a modal** (added in 5.3). If another modal is ever
  added, repeat the `hidden.bs.modal` → `trigger.focus()` of `bindSocialPlaceholderDialog()`.
- **The social links are a one-line fix**: replace `INSTAGRAM_LINK` / `FACEBOOK_LINK` /
  `TIKTOK_LINK` in [`site.config.js`](assets/js/app/config/site.config.js) with a real URL,
  `isPlaceholderSocialLink()` stops matching, and the placeholder dialog disappears on its own.

**Files & tooling**

- **LF line endings, enforced by `.gitattributes`** (`* text=auto eol=lf`), which overrides the
  `core.autocrlf=true` that Git for Windows installs by default. Do not remove it "because it works".
- **Files are UTF-8 without BOM**: never run PowerShell 5.1 `Get-Content`/`Set-Content` over them
  (accents and emoji are destroyed). Use `[System.IO.File]::ReadAllText`/`WriteAllText` with
  `UTF8Encoding($false)`, or an editor.
- **`npx serve` needs `-c .claude/serve.json`** (see [Getting Started](#-getting-started-local-dev)):
  without it, `serve` rewrites `/product-details.html?productId=10` to `/product-details` and drops
  the query string, leaving every product page blank. There is no command-line flag for it.

### Console noise that is not a bug

- **`requestStorageAccess: Permission denied`** comes from **reCAPTCHA v3** (App Check), inside a
  Google iframe, not from GTranslate, and it is not fixable from this project. No effect on the cart,
  which is first-party `localStorage`.
- **`ERR_BLOCKED_BY_CLIENT` on `firestore.googleapis.com/…/Write/channel`**: a browser extension
  (ad blocker, privacy shield) cutting the call. The blocked request carries `TYPE=terminate`: it
  closes the channel _after_ the write succeeded, so the order is recorded regardless.
- **App Check rejections in local development** are expected: `localhost` is not on the reCAPTCHA
  key's domain list, and adding it would weaken the production key. Everything but the Firestore
  counters works locally, and `warnAppCheckRejected()` says so in the console.

### Decisions already made (don't reopen without a new reason)

- **HTML duplication across the 6 pages is kept**: no build step, no JS injection.
- **The catalogue lives in `data/products.js`** (`export default`), not a fetched JSON file.
- **No tooling** (`.editorconfig`, Prettier, ESLint), no tests, no CI, no `ajv` catalogue validation.
  The code is already Prettier-formatted in practice; freezing that with tooling would buy nothing.
- **Product photos**: `main` and `hero` are AI-regenerated, the secondary gallery photos are the
  originals and stay that way.
- **Product SEO is a documented limitation, not a task**, see the [SEO section](#-seo).
- **The git history was rewritten once**, on 31/07 (`git filter-branch`), to strip co-author
  attribution. Every SHA before that date changed. No further rewrite is planned.

---

## 🧑‍💻 Project Structure

```
├── assets/
│   ├── css/                     # style.css (site) + plugins.css (vendor bundle)
│   ├── img/
│   ├── video/
│   └── js/
│       ├── vendor/              # third-party libraries, never modified
│       └── app/
│           ├── main.js          # bootstrap + per-page routing
│           ├── utils.js         # per-page orchestration
│           ├── firebase-management.js
│           ├── config/          # site.config.js, gtranslate.settings.js, firebase.config[.example].js
│           ├── data/            # products.js (catalogue), products.repository.js
│           ├── services/        # cart.service.js
│           └── ui/              # plugins.js, templates.js, video.js
├── index.html
├── shop.html
├── product-details.html
├── services.html
├── faq.html
├── contact-us.html
├── firestore.rules              # Firestore security rules: the source of truth, deployed from here
├── firebase.json                # tells the Firebase CLI where the rules live
├── .firebaserc                  # default Firebase project
├── .gitattributes               # LF line endings everywhere, whatever the local Git config
├── robots.txt
├── sitemap.xml
├── LICENSE
├── todo.md                      # the few tasks still open, and nothing else
└── readme.md
```

- **`app/main.js`**: bootstraps jQuery plugins and routes to the right per-page setup based on the
  current filename
- **`app/utils.js`**: per-page orchestration, rendering product grids, the cart and the footer, and
  binding events
- **`app/firebase-management.js`**: Firebase/App Check/Firestore logic (order counters only)
- **`app/data/products.js`**: the product catalogue, a plain JS array, edited directly, no build step
- **`app/ui/`**: HTML template builders, jQuery plugin initializers (Slick/Owl/elevateZoom), lazy video

---

## 🚦 Security

- **App Check** (reCAPTCHA v3) attests the browser before Firestore accepts it. Enforcement itself is
  a console switch (App Check → APIs → Cloud Firestore), not something the rules file can express.
- **No secret keys** are exposed on the frontend: the Firebase config identifies the project, it does
  not grant access to it. Access is decided by the rules below and by App Check.
- **[`firestore.rules`](firestore.rules)** constrains the shape of every write (two integer counters,
  moving forward only, by amounts a real checkout can produce) and closes every other path.
- **Best practices** for safe local development (debug token) and production

---

## 🚀 Getting Started (Local Dev)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/hicham-o-sfh/Kosmetika-Beauty-Store.git
   cd Kosmetika-Beauty-Store
   ```
2. **Serve it over HTTP.** Zero build, zero dependencies, but the app code is loaded as ES modules,
   which browsers block under `file://` (CORS). Two ways:

   - **VS Code's [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**:
     right-click `index.html` → _Open with Live Server_. Nothing to install beyond the extension.
   - **Already have Node?** `npx serve -c .claude/serve.json .`, where the config is required. `serve`
     rewrites `/product-details.html?productId=10` to `/product-details` and **drops the query
     string**, so product pages come up empty; that file just sets `"cleanUrls": false`. There is no
     command-line flag for it: `--no-clean-urls` is not a `serve` option and makes it exit.

   Open the printed `http://localhost:...` URL. Catalogue, cart and WhatsApp checkout all work
   immediately, no configuration needed.

3. **(Optional) Configure Firebase**, only needed to unlock live order analytics
   (`total_orders`/`total_quantity` counters). The cart and checkout work identically without it.
   - Open [`assets/js/app/config/firebase.config.js`](assets/js/app/config/firebase.config.js) and
     replace every value with your own project's, plus your reCAPTCHA v3 site key.
     [`firebase.config.example.js`](assets/js/app/config/firebase.config.example.js) next to it says
     where each value comes from.
     **This file is committed on purpose**: GitHub Pages serves the site straight from the repository,
     so ignoring it would deploy a store with no Firebase. The keys are public by design. App Check,
     which only trusts the store's own domain, is what protects the counters.
     Left untouched, the clone points at the original project and every write is refused; the console
     says so explicitly. Delete the file entirely and the counters just stay off. Either way the
     catalogue, the cart and the WhatsApp checkout are unaffected.
   - Deploy the rules to your own project (see **Firestore Rules** below), otherwise every write is
     rejected.
   - Add your debug token (Firebase Console → App Check → Debug Tokens) before `main.js` loads, in
     `index.html`:
     ```html
     <script>
       window.FIREBASE_APPCHECK_DEBUG_TOKEN = "YOUR_DEBUG_TOKEN";
     </script>
     ```
4. **Enjoy!**

---

## 🌐 Live Demo

[**Try the deployed app on GitHub Pages →**](https://hicham-o-sfh.github.io/Kosmetika-Beauty-Store/): hicham-o-sfh.github.io/Kosmetika-Beauty-Store

---

## 📖 Firestore Rules

The rules live in [`firestore.rules`](firestore.rules), and that file is the source of truth, not the
copy shown in the Firebase console. Read it there; it is commented.

Point [`.firebaserc`](.firebaserc) at your own project, then deploy. The Firebase CLI is a one-off
tool, not a runtime dependency, so `npx` is enough and nothing is added to the site:

```bash
npx --yes firebase-tools login
```

```bash
npx --yes firebase-tools deploy --only firestore:rules
```

Before deploying over an existing project, copy the console's current rules somewhere safe
(Firestore Database → **Rules**): deploying replaces them outright, and the console keeps a version
history but no local backup.

---

## 📄 License & third-party assets

The original code of this project is released under the [MIT License](LICENSE). You are free to
clone, modify and reuse it, as long as the copyright notice is kept.

**What the MIT license covers**

- the application JavaScript in `assets/js/app/`: `config/`, `data/` (product model and
  repository), `services/` (cart, Firebase analytics), `ui/` (plugins, templates, video), `main.js`
- the page markup written or modified for this project
- the documentation (`readme.md`, `todo.md`) and the repository layout

**What it does NOT cover**

- **Bundled vendor libraries** (`assets/js/vendor/`): jQuery, Bootstrap, Popper, Slick,
  Owl Carousel, elevateZoom, Notyf, Modernizr, GTranslate. Each remains under its own
  license, held by its respective authors.
- **Brand and content**: the _Kosmetika_ name and logo, the product photographs and all
  store copy are © Hicham Oussama Saffih and are **not** licensed for reuse.

In short: reuse the code, bring your own theme, your own visuals and your own brand.
