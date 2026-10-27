# Dallas Cafe Website

Complete, responsive, four-page website for Dallas Cafe in Dallas, Texas.

## Pages

- `/` - Home, illustrated storefront, featured menu items and opening hours
- `/menu/` - Full categorized, searchable food and drink menu
- `/delivery/` - Delivery and pickup information with working call-to-order actions
- `/contact/` - Address, click-to-call, opening hours and Google Maps embed

## Run locally (Node.js 18+)

```bash
npm install
npm run dev
```

Visit **http://localhost:8080**. No third-party npm dependencies are required.

## Build for deployment

```bash
npm run build
```

This creates the complete `dist/` directory with all four HTML pages and assets. Test the production build with:

```bash
npm run preview
```

### Vercel (connect your GitHub repository)

1. Push all source files in this directory to GitHub.
2. Import the repository in Vercel.
3. The included `vercel.json` sets `npm run build` and output directory `dist`.
4. Deploy. The menu, delivery and contact routes are configured in `vercel.json`.

### Cloudflare Pages (direct upload)

1. Run `npm run build` or use the separate prebuilt ZIP provided with this project.
2. Upload the **contents of `dist/`** to Cloudflare Pages, or use direct upload of the prebuilt ZIP.
3. No server or API keys are needed.

## Editing the website

- Home content: `index.html`
- Food/drink prices and menu: `menu/index.html`
- Delivery information: `delivery/index.html`
- Contact info and hours: `contact/index.html`
- Global design: `assets/css/styles.css`
- Mobile navigation, menu search and dynamic open status: `assets/js/main.js`
- Illustrated storefront: `assets/img/dallas-cafe-storefront.webp`
- Food illustrations: SVG files in `assets/img/`

## Information to verify before launch

Business information was taken from the screenshots supplied by the user:

- Dallas Cafe, 14999 Preston Rd, Suite 104, Dallas, TX 75254
- Phone: (972) 707-8000
- Listed hours: 7:00 am - 2:30 pm every day
- Listed rating: 4.8 from 60 Google reviews (may have changed)
- Menu prices transcribed from supplied photos. Please compare with the cafe's current menu, particularly kids meal details, extras, substitutions and beverages.

**Delivery:** The source screenshot showed an order-delivery option, but did not identify a verified delivery partner, ordering API, service area or delivery fee. The delivery page uses a **click-to-call inquiry flow**, not a fake checkout or a claim that delivery is available everywhere.

**Images:** The building image was re-illustrated in a front-facing artistic style based on the provided building photographs. The original Google listing screenshots and photographs are not republished on the site. An illustrative transformation should not be assumed to guarantee copyright clearance; confirm that you have appropriate rights to use any reference photos.

**Fonts:** Google Fonts load when the visitor has internet connectivity; system fallback fonts are included.
