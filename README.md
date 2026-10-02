# SLAMS — sign-in pages

The pages Kinde renders on `auth.slams.tennis`: sign in, sign up, and every
other step of the flow (e-mail code, errors…) through the `(default)` route.
They are drawn with Organic, as the application is.

```
kinde.json                         rootDir + Kinde API version
kindeSrc/
  environment/pages/(kinde)/
    (default)/page.tsx             every page without a route of its own
    (login)/page.tsx
    (register)/page.tsx            adds « Inscrire ma structure »
  ui/
    page.tsx                       the document: head, side panel, widget
    styles.ts                      Organic → Kinde widget settings, layout
    tokens.ts                      copy of Organic (default palette)
    brand.tsx                      mark and emblem, inline SVG
    copy.ts                        the page's own sentences, fr / en
preview/                           local rendering, not used by Kinde
```

This folder is **not** an npm workspace of the monorepo: Kinde builds it on
its own, from a repository whose root holds `kinde.json`.

## What depends on the application

- **Fonts.** The sign-in domain's CSP accepts fonts from `slams.tennis` and
  `*.slams.tennis` only, so Caprasimo and Figtree are served by the frontend
  from `apps/frontend/public/fonts/`, with the CORS header set in
  `next.config.ts`. The frontend must be deployed with them **before** these
  pages go live, or the pages fall back to the system face.
- **Tokens.** `kindeSrc/ui/tokens.ts` copies `design-tokens.ts`.
  `apps/frontend/src/lib/kinde-pages-tokens.test.ts` fails when they drift:
  retune Organic, re-copy into the frontend, then here.
- **The palette** is the default one (Wimbledon). The sign-in domain cannot
  read the palette cookie the application sets; the colour scheme follows the
  system's (`prefers-color-scheme`), with Organic's derived dark roles.

## Publishing to Kinde

Kinde reads a GitHub repository and a branch, with `kinde.json` at its root.
This folder is pushed as its own repository:

```bash
# once: create an empty GitHub repository, e.g. slams-kinde-pages
git remote add kinde-pages git@github.com:<org>/slams-kinde-pages.git

# each release, from the monorepo root
git subtree push --prefix apps/kinde-pages kinde-pages main
```

Then, in Kinde:

1. **Settings › Git repo** → *Connect GitHub*, pick the repository and `main`.
2. **Design › Custom code** → choose custom code for the pages.
3. Optional — **Settings › Env variables**: `SLAMS_APP_URL` if the application
   is not on `https://app.slams.tennis` (the fonts and the « Retour » link
   use it).
4. **Design › Global › Brand**: keep the designer colours on Organic too
   (background `#f1f7f1`, buttons `#06683a`, 12px corners): Kinde falls back
   to them wherever a setting is not overridden here.
5. Add **French** under *Settings › Languages*, or the widget speaks English
   while the page speaks French.

Each push to `main` of that repository syncs; *View code status* on Kinde's
home page reports a page that fails to build.

## Looking at the pages locally

```bash
npm install
npm run typecheck
# fonts from the local frontend, before they are deployed
(cd .. && python3 -m http.server 8765) &
PREVIEW_FONTS_URL=http://localhost:8765/frontend/public/fonts npm run preview
open http://localhost:8765/kinde-pages/preview/out/login.fr.html
```

`preview/fixtures/` holds the widget captured from the live sign-in page, its
tokens blanked. Kinde's own stylesheet is loaded from the sign-in domain, so
the preview shows the widget as Kinde draws it.
