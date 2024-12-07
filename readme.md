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

## ⭐ Why this project?

I didn't start from a stack. I started from a shop: **17 perfume references**, a catalogue that
changes a few times a year, and customers who already place their orders on WhatsApp. Every
decision below comes from taking that brief literally instead of reaching for the default
e-commerce architecture — and the most interesting engineering here is **what I chose not to build**.

**No backend. No database.** Seventeen products, with their name, description, price and photos
changing a handful of times a year, is not a database problem — it's a data file. The catalogue
lives in `app/data/products.js`, the photos in a static folder. Putting a REST API and a database
in front of 17 objects would have bought me a server to provision, patch, monitor, back up and pay
for, in exchange for nothing a `const` array doesn't already do.

**Product pages without a router.** Each card links to `product-details.html?productId=16`. The page
reads the query string, looks the product up in the catalogue, and hydrates itself. Same result as
server-side routing and templating — deep-linkable, shareable, one page per product — with no server
in the path.

**Security by subtraction.** No server, no database, no accounts, no sessions, no admin panel means
no SQL injection, no credential leak, no login to brute-force, no midnight CVE patching. Everything
runs in the visitor's own browser. The single writable surface left is one Firestore counter, locked
down by strict rules and App Check. You can't exploit what doesn't exist.

**Checkout where the customer already is.** The cart lives in `localStorage`; checkout formats the
order into a clean invoice and hands it to WhatsApp as a deep link. No payment gateway, no PCI scope,
no sign-up wall to abandon — the order lands in the conversation the shop already answers every day.
The most business-critical feature of the site is also the one with the least code behind it.

**The order history was already there.** What a CRM would have stored — who ordered, what, when, and
the whole exchange around it — is the WhatsApp thread itself, searchable by phone number, on a device
the owner already carries. Firestore adds the one thing a thread can't do: aggregate. Two integer
counters per product turn a pile of conversations into *what actually sells*. Between the two, the
shop has its history and its monitoring without owning a single row of customer data — which is also
one less thing to secure, back up, and answer for under a privacy regulation.

**Firebase is optional, deliberately.** It does one job: counting orders per product
(`total_orders`, `total_quantity`). One isolated module, two integer fields. The day it stops paying
for itself, removing it is a single commit and the shop keeps selling.

**What that trade buys:** €0 hosting on GitHub Pages, no infrastructure, no ops, no runtime bill, no
build step — `git push` _is_ the deployment. A visitor gets a fully static site: 78 KB of CSS and
61 KB of application JavaScript, after a cleanup pass that cut the inherited theme by 83 %.

This is a deliberate trade, not a shortcut, so I'll name its limits: past roughly a hundred products
the catalogue wants pagination and a real index, card payments or live stock would genuinely require
a backend, and — the one that costs something real — **individual product pages are not indexable by
search engines**. That last one is worth a section of its own, below. Until then, adding a backend
would be paying rent on complexity the business doesn't have.

---

## 🔎 SEO — what this demo does, what it doesn't, and what a cloner should do

**Site-level SEO is done.** The five content pages each carry a unique `<title>` and
`meta description`, a `canonical`, full Open Graph plus `twitter:card` (OG image in **JPEG** — the
Facebook crawler that feeds WhatsApp previews is unreliable on WebP), `lang="fr"`, and a
[`robots.txt`](robots.txt) + [`sitemap.xml`](sitemap.xml) pair.

**Product pages are not.** Search for a specific perfume and you will not find this shop. Three
causes, one root:

1. **One URL for the whole catalogue.** `product-details.html?productId=16` is not a distinct page,
   and its `canonical` omits the query string — which tells Google the 17 product pages are one
   generic page. `sitemap.xml` excludes it on purpose rather than advertising an empty page.
2. **The content is injected by JavaScript.** Googlebot does render JS, but on a second pass, with
   delay; if that pass fails, what gets indexed is the empty shell.
3. **Static Open Graph, no JSON-LD.** Sharing a specific perfume shows the generic store preview, and
   there is nothing for rich results to read.

**This is the honest price of the architecture, and it is the only real one.** Everything else the
no-backend trade gives up (card payments, live stock) is a business decision. This one is a technical
consequence: without a server or a build step, there is no way to hand a crawler pre-rendered HTML
per product. It is stated here rather than buried, because a reviewer will find it in thirty seconds
and the interesting question is not whether it exists but whether it was priced in.

### If you clone this as the base of a real shop

**Tier 1 — no build step, an afternoon's work.** Meaningful improvement, zero architectural change:

| Change | What it buys |
|---|---|
| Rewrite the `canonical` in JS to include the current `?productId=` | Stops Google collapsing 17 pages into one — the single highest-impact line here |
| List every product URL in `sitemap.xml` | Gives the crawler something to discover in the first place |
| Inject a JSON-LD `Product` block at hydration (name, brand, price, availability) | Eligibility for rich results — price and availability in the SERP |
| Update `<title>`, `meta description` and OG tags at hydration | Correct WhatsApp/Facebook link previews; marginal for ranking on its own |

**Tier 2 — the real fix, and the moment you accept a build step.** Generate one static HTML file per
product from `products.js` (a ~50-line Node script, run before deploy). Real URLs, real server-served
markup, nothing left for a crawler to guess. This is precisely the trade-off worth understanding:
**the no-build constraint is what costs you product SEO, and nothing else.** Everything else on this
site — catalogue, cart, checkout, order monitoring — genuinely does not need a server.

**Tier 3 — the part that isn't code.** For a shop this size, product SEO is not the acquisition
channel and never was. A custom domain (a `github.io` URL will not outrank Sephora or Amazon on a
perfume name, however well optimised), a real logo and brand identity, and paid social on
Meta/TikTok/Instagram are what bring customers. Add Tier 1 because it is nearly free; reach for
Tier 2 when organic search is actually converting.

### What you are not paying for, in exchange

No server to provision, patch or monitor. No database to back up, migrate or scale. No user accounts,
so no password storage, no session handling, no account-takeover surface. No server-side cart to
guard against tampered prices or quantities — there is no server-side price to tamper with, the
order is a message the shop owner reads and confirms. No payment integration, so no PCI scope. No
CI/CD pipeline, no staging environment, no runtime bill: `git push` is the deployment, hosting is €0.

The single writable surface in the entire system is one Firestore counter, protected by
[`firestore.rules`](firestore.rules) and App Check. That is the whole attack surface.

---

## 🤝 Contributing

Pull requests, issues, and suggestions are always welcome.

Nothing to install, nothing to run: clone it, serve the folder over HTTP
(see [Getting Started](#-getting-started-local-dev)) and edit. No bundler, no test suite, no CI —
a deliberate constraint of this project rather than an omission, so please don't add one in a PR.

Two things worth knowing before a first change:

- **Match the surrounding code.** Identifiers and comments in English, interface copy in French,
  `const`/`let` over `var`, and the formatting Prettier would produce. Every source file carries the
  Kosmetika copyright header.
- **Read _« À savoir avant de toucher au projet »_ in [`todo.md`](todo.md).** It collects the traps
  you cannot see from the code: `plugins.css` ships a **purged** Bootstrap, so a utility class added
  to the HTML stays inert until its rule is reinjected; Modernizr must stay non-deferred; the gallery
  thumbnails must stay `<a>` elements or ElevateZoom silently stops switching photos; `.owl-*` and
  `.slick-*` are never dead CSS; the files are UTF-8 **without BOM**, which PowerShell 5.1 destroys
  on contact. That section is the shortest path to a change that looks right and isn't.

---

## 🚀 Features

- 🛒 **Catalog & cart**
  - 17 products, cart contents and quantities kept in `localStorage`
  - A cart entry pointing at a since-removed product is pruned automatically instead of crashing
- 💬 **WhatsApp checkout**
  - Cart formats into a pre-filled WhatsApp message (deep link) — no payment gateway, no sign-up
- 📊 **Lightweight order analytics**
  - One Firestore counter per product (`total_orders`, `total_quantity`) — nothing else is stored
    server-side; the catalogue itself lives entirely in the frontend
- 🔒 **Firebase App Check** (reCAPTCHA v3, debug token support) protects that one write path
- 🛡️ **Secure by design**: strict Firestore rules (type + increment checks), no accounts, no admin
  panel, no server — there is very little left to attack
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
  - [Slick Slider](https://kenwheeler.github.io/slick/) & [Owl Carousel](https://owlcarousel2.github.io/OwlCarousel2/) – product carousels
  - [elevateZoom](https://www.elevateweb.co.uk/image-zoom/) – image zoom
  - [Notyf](https://github.com/caroso1222/notyf) – elegant notifications
  - [GTranslate](https://gtranslate.io/) – instant language switcher
  - Font Awesome – iconography
- **No build step**: no bundler, no npm install — any static file server works

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
├── firestore.rules              # Firestore security rules — the source of truth, deployed from here
├── firebase.json                # tells the Firebase CLI where the rules live
├── .firebaserc                  # default Firebase project
├── .gitattributes               # LF line endings everywhere, whatever the local Git config
├── robots.txt
├── sitemap.xml
├── LICENSE
├── todo.md                      # roadmap + the traps you cannot see from the code
└── readme.md
```

- **`app/main.js`**: bootstraps jQuery plugins and routes to the right per-page setup based on the
  current filename
- **`app/utils.js`**: per-page orchestration — renders product grids, the cart, the footer, binds events
- **`app/firebase-management.js`**: Firebase/App Check/Firestore logic (order counters only)
- **`app/data/products.js`**: the product catalogue — a plain JS array, edited directly, no build step
- **`app/ui/`**: HTML template builders, jQuery plugin initializers (Slick/Owl/elevateZoom), lazy video

---

## 🚦 Security

- **App Check** (reCAPTCHA v3) attests the browser before Firestore accepts it. Enforcement itself is
  a console switch — App Check → APIs → Cloud Firestore — not something the rules file can express.
- **No secret keys** are exposed on the frontend: the Firebase config identifies the project, it does
  not grant access to it. Access is decided by the rules below and by App Check.
- **[`firestore.rules`](firestore.rules)** constrains the shape of every write — two integer counters,
  moving forward only, by amounts a real checkout can produce — and closes every other path.
- **Best practices** for safe local development (debug token) and production

---

## 🚀 Getting Started (Local Dev)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/hicham-o-sfh/Kosmetika-Beauty-Store.git
   cd Kosmetika-Beauty-Store
   ```
2. **Serve it over HTTP.** Zero build, zero dependencies — but the app code is loaded as ES modules,
   which browsers block under `file://` (CORS). Two ways:

   - **VS Code's [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**
     — right-click `index.html` → *Open with Live Server*. Nothing to install beyond the extension.
   - **Already have Node?** `npx serve . --no-clean-urls` — the flag is required, without it the
     `?productId=` query is dropped and product pages come up empty.

   Open the printed `http://localhost:...` URL — catalogue, cart and WhatsApp checkout all work
   immediately, no configuration needed.
3. **(Optional) Configure Firebase** — only needed to unlock live order analytics
   (`total_orders`/`total_quantity` counters). The cart and checkout work identically without it.
   - Open [`assets/js/app/config/firebase.config.js`](assets/js/app/config/firebase.config.js) and
     replace every value with your own project's, plus your reCAPTCHA v3 site key.
     [`firebase.config.example.js`](assets/js/app/config/firebase.config.example.js) next to it says
     where each value comes from.
     **This file is committed on purpose**: GitHub Pages serves the site straight from the repository,
     so ignoring it would deploy a store with no Firebase. The keys are public by design — App Check,
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

The rules live in [`firestore.rules`](firestore.rules) — that file is the source of truth, not the
copy shown in the Firebase console. Read it there; it is commented.

Point [`.firebaserc`](.firebaserc) at your own project, then deploy. The Firebase CLI is a one-off
tool, not a runtime dependency, so `npx` is enough — nothing is added to the site:

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

The original code of this project is released under the [MIT License](LICENSE) —
you are free to clone, modify and reuse it, as long as the copyright notice is kept.

**What the MIT license covers**

- the application JavaScript in `assets/js/app/` — `config/`, `data/` (product model and
  repository), `services/` (cart, Firebase analytics), `ui/` (plugins, templates, video), `main.js`
- the page markup written or modified for this project
- the documentation (`readme.md`, `todo.md`) and the repository layout

**What it does NOT cover**

- **Bundled vendor libraries** (`assets/js/vendor/`): jQuery, Bootstrap, Popper, Slick,
  Owl Carousel, elevateZoom, Notyf, Modernizr, GTranslate — each remains under its own
  license, held by its respective authors.
- **Brand and content**: the _Kosmetika_ name and logo, the product photographs and all
  store copy are © Hicham Oussama Saffih and are **not** licensed for reuse.

In short: reuse the code, bring your own theme, your own visuals and your own brand.
