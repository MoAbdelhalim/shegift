# SHEGIFT

Static storefront + management studio for a gift-box shop in Casablanca.
No build step, no dependencies — plain HTML/CSS/JS, deployed straight to Vercel.

```
.
├── index.html          → the storefront (AR / FR / EN, RTL-aware)
├── studio/index.html   → management studio (orders, catalogue, printing)
├── assets/
│   ├── config.js       → the only file you edit after deployment
│   ├── logo.png        → the brand logo (also used on printed documents)
│   ├── logo-180.png    → home-screen icon
│   └── favicon.png
├── vercel.json         → clean URLs + noindex on /studio
├── robots.txt
└── .gitignore
```

---

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "SHEGIFT storefront + studio"
git branch -M main
git remote add origin https://github.com/<you>/shegift.git
git push -u origin main
```

## 2. Deploy on Vercel

1. vercel.com → **Add New → Project** → import the repo.
2. Framework preset: **Other**. Build command: leave empty. Output directory: leave empty (root).
3. Deploy. You get `https://<project>.vercel.app`.
4. **Settings → Domains** → add your domain if you have one.

Every `git push` to `main` redeploys automatically.

## 3. Authorise your domain

In the console for the data service (Authentication → Settings → Authorized domains), add:

- `<project>.vercel.app`
- your custom domain
- `localhost` (for local testing)

Sign-in silently fails on unlisted domains.

## 4. Database rules

Paste into the Realtime Database rules tab and publish:

```json
{
  "rules": {
    "catalogue":  { ".read": true, ".write": "auth.uid === 'LU84LyBjakPv7oTjnq4YDnHPUYY2'" },
    "categories": { ".read": true, ".write": "auth.uid === 'LU84LyBjakPv7oTjnq4YDnHPUYY2'" },
    "settings":   { ".read": true, ".write": "auth.uid === 'LU84LyBjakPv7oTjnq4YDnHPUYY2'" },
    "orders": {
      ".read": "auth.uid === 'LU84LyBjakPv7oTjnq4YDnHPUYY2'",
      "$id": {
        ".write": "!data.exists() || auth.uid === 'LU84LyBjakPv7oTjnq4YDnHPUYY2'",
        ".validate": "newData.hasChildren(['ref','name','phone','total'])"
      }
    }
  }
}
```

What this gives you: anyone can read the catalogue and **create** an order; only your account can read customer data, edit the catalogue, or change an order.

## 5. If the studio misbehaves

Open `/studio` → **🩺 الحالة**. The usual causes:

| Line fails | Cause | Fix |
|---|---|---|
| ملف الإعدادات | opened as a local file, or `assets/` missing | serve over http (see below) |
| المكتبات | ad-blocker or network blocking the CDN | different browser or network |
| الجلسة → `auth/unauthorized-domain` | domain not authorised | step 3 |
| قراءة/حفظ البيانات → permission | rules not published, or a different account | step 4 |
| خدمة التصاور | upload preset is signed | make `Packetss` unsigned |

## 6. Before going live

- `assets/config.js` → set `contact.whatsapp` to the real number (country code, no `+`, no spaces). It ships as `212600000000`.
- Upload preset must be **unsigned** (`Packetss`), otherwise browser uploads are rejected.
- Add your storefront domain to the image service's allowed origins if you have that restriction turned on.

---

## Using the studio

`/studio` — bookmark it. It is excluded from search engines and never linked from the storefront.

**🩺 الحالة (status).** Before anything else, open this. It checks, one line each: config file loaded, libraries loaded, session, database read, database write, image upload — with the exact cause and the fix next to whatever fails. Every failure the studio can hit shows up here instead of a silent dead button.

**Two modes.** Open it and you land in a demo workspace: sample data, everything editable, changes stay in that browser only. Nothing about the live shop is shown or touched. Press **🔑 الدخول**, sign in with the owner account, and it switches to the live workspace — the badge turns green. Any other account is signed out again.

**Orders** — filter by status, search by ref/name/phone, change status (جديد → مؤكد → محضّر → مصيفط → توصل), send a pre-filled WhatsApp confirmation, export CSV.

**Printing** — two documents, both A4, black-and-white, no browser headers needed:

- 🧾 **سند التسليم** (per order, for the customer/courier) — customer block, item table, totals, the cash-on-delivery amount in a box, gift note, signature lines for recipient and courier.
- 📦 **ورقة التحضير** (per order, or batched) — section 1 aggregates every box to pull from stock with SKU and tick boxes; section 2 breaks it down per order with phone, COD amount and notes. Tick the checkboxes next to orders and press **لائحة التحضير** to batch several into one run; with nothing ticked it prints everything currently filtered.

**Catalogue** — name, price, old price (drives the discount badge), category, stock (0 shows as sold out), SKU (appears on picking slips), contents description, images (drag-and-drop, paste a URL, reorder by starring one as the main shot), featured, hidden.

**Categories** — Arabic/French/English names, emoji or image, display order.

**Settings** — WhatsApp number, Instagram, delivery fee, free-delivery threshold, the top banner in three languages, reviews and FAQ (one per line, fields separated by `|`). Saved settings override `config.js` on the storefront.

---

## Sharing

Each product card and the product popup have a share button. On phones it opens the native share sheet; on desktop it falls back to a panel with WhatsApp, Facebook, Messenger, Telegram, X, Instagram (copies the link, since Instagram has no web share) and a copy-link box.

Shared links look like `https://yourdomain.com/?p=<id>` and open the storefront with that box's popup already showing.

## Local testing

Open with a local server, not `file://` — the shared config is loaded from an absolute path:

```bash
python3 -m http.server 8080
# storefront → http://localhost:8080
# studio     → http://localhost:8080/studio/
```
