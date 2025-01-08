# 🧹 TODO — ce qu'il reste à faire

> Site vitrine/e-commerce statique (99 % front), catalogue en dur côté JS, Firestore uniquement
> pour compter les commandes. Aucun bug visible par un client, chaîne de commande vérifiée en
> production. Les pièges techniques et les décisions actées ont été migrés dans la section
> « Contributing » du [readme](readme.md) — ce fichier ne garde que les tâches ouvertes.

**Légende :** 🔵 qualité & open source · 🟣 scale

---

## 🔵 Qualité & open source

- [ ] **Captures d'écran dans le readme** — le placeholder `demo-banner.png` est commenté ligne 6 du
      readme et le PNG n'existe pas sur le disque. Les visuels produit étant définitifs, les captures
      ne seront pas à refaire.

- [ ] **Passe d'optimisation d'images** — `assets/` pèse 18 Mo : 11 Mo de vidéo et 7 Mo d'images.
      Ce qui reste à traiter :
  - **Les 17 `hero` sont le vrai gisement** : 3,1 Mo à eux seuls, de 91 à 296 Ko
    (`11-khalis-ameerat-al-arab-hero.webp`), là où les `main` tiennent en 20-92 Ko. Et le `hero` est
    chargé sur chaque fiche produit.
  - **Les 8 photos secondaires de galerie sont en 600×600**, contre 1024×1024 pour les `main` et
    `hero` : dimensions à uniformiser. Elles sont toutes en WebP depuis la conversion du dernier
    JPEG (`3-lattafa-yara-1`). Décision maintenue : elles ne sont **pas** régénérées par IA.
  - **`assets/img/bg/background-whatsapp.jpg`** fait 1718×1718 pour un fond (120 Ko).
  - **Ne pas toucher à `assets/img/banner/og-kosmetika.jpg`** : il est en JPEG **volontairement**,
    le crawler Facebook — qui alimente les aperçus WhatsApp — ne rend pas le WebP de façon fiable.

## 🟣 Scale du catalogue

- [ ] **Au-delà de ~100 produits** : pagination / index séparé sur `shop.html`.
