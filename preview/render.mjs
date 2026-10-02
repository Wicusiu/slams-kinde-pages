/**
 * Renders the pages outside Kinde, to look at them before a push.
 *
 *   npm run preview            → preview/out/{login,register,default}.{fr,en}.html
 *
 * Kinde's placeholders are swapped for what Kinde would put there: its
 * required stylesheet, fetched from the sign-in domain, and a widget captured
 * from the live sign-in page (`fixtures/`, tokens blanked). Kinde's script is
 * left out — the widget is inert here, which is all a look needs.
 *
 * Fonts load from the production application, as they do on the sign-in
 * domain; `PREVIEW_FONTS_URL` points them elsewhere — at
 * `apps/frontend/public/fonts` behind a local server, before they are deployed.
 */
import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'out');
await mkdir(out, { recursive: true });

const bundle = path.join(out, 'page.bundle.mjs');
await build({
  entryPoints: [path.join(here, '..', 'kindeSrc', 'ui', 'page.tsx')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  outfile: bundle,
  tsconfig: path.join(here, '..', 'tsconfig.json'),
  logLevel: 'warning',
});

const infra = await import('@kinde/infrastructure');
const { renderSlamsPage } = await import(pathToFileURL(bundle).href);

const KINDE_ORIGIN = 'https://auth.slams.tennis';
const placeholders = {
  [infra.getKindeRequiredCSS()]: `<link rel="stylesheet" href="${KINDE_ORIGIN}/dist/end_user_ui/assets/css/style.css">`,
  [infra.getKindeRequiredJS()]: '',
  [infra.getKindeNonce()]: 'preview',
  [infra.getKindeCSRF()]: 'preview',
};

const widgets = {
  login: await readFile(path.join(here, 'fixtures', 'login-widget.html'), 'utf8'),
  register: await readFile(path.join(here, 'fixtures', 'register-widget.html'), 'utf8'),
};
widgets.default = widgets.login;

const headings = {
  login: { heading: 'Sign in', description: '' },
  register: { heading: 'Create your account', description: '' },
  default: { heading: 'Sign in', description: '' },
};

for (const variant of ['login', 'register', 'default']) {
  for (const lang of ['fr', 'en']) {
    const event = {
      request: { locale: { lang, isRtl: false }, route: { flow: variant, context: variant, path: 'auth' } },
      context: { widget: { content: { pageTitle: `${headings[variant].heading} | SLAMS`, ...headings[variant] } } },
    };
    let html = '<!DOCTYPE html>' + renderSlamsPage(event, variant);
    for (const [placeholder, value] of Object.entries(placeholders)) {
      html = html.split(placeholder).join(value);
    }
    html = html.split(infra.getKindeWidget()).join(widgets[variant]);
    // The favicon and logo placeholders are paths on the sign-in domain.
    html = html.replace(/href="\/favicon_svg[^"]*"/, `href="${KINDE_ORIGIN}/favicon_svg"`);
    if (process.env.PREVIEW_FONTS_URL) {
      html = html.split('https://app.slams.tennis/fonts').join(process.env.PREVIEW_FONTS_URL);
    }
    await writeFile(path.join(out, `${variant}.${lang}.html`), html);
  }
}

console.log(`Rendered into ${path.relative(process.cwd(), out)}/`);
// @kinde/infrastructure leaves a handle open outside Kinde's runtime.
process.exit(0);
