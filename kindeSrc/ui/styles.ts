import {
  BREAKPOINT,
  CONTROL_HEIGHT,
  ERROR,
  HEADING_TRACKING,
  LINE_HEIGHT_BODY,
  LINE_HEIGHT_HEADING,
  RADIUS,
  TAP,
  TOUCH_FIELD_FONT,
  TYPE,
  WIMBLEDON,
  alpha,
  darkRoles,
  lightRoles,
  type Roles,
} from './tokens';

/**
 * The page's stylesheet: Organic's roles under Organic's own custom property
 * names, the Kinde widget's settings mapped onto them, and the layout.
 *
 * The widget's stylesheet sits in CSS cascade layers, so these unlayered rules
 * win over it whatever their specificity. Every widget colour is set twice —
 * `--kinde-x` and `--kinde-x-dark` — to the same role: the role itself follows
 * the system's colour scheme, so the page reads one palette whichever of the
 * two the widget resolves.
 */

const px = (n: number) => `${n / 16}rem`;

function roleVariables(r: Roles, error: string): string {
  return `
    --color-bg: ${r.bg};
    --color-surface: ${r.surface};
    --color-text: ${r.text};
    --color-text-muted: ${r.textMuted};
    --color-accent: ${r.accent};
    --color-accent-hover: ${r.accentHover};
    --color-accent-active: ${r.accentActive};
    --color-accent-2: ${r.accent2};
    --color-divider: ${r.divider};
    --color-on-accent: ${r.onAccent};
    --color-hover: ${alpha(r.text, 0.05)};
    --color-error: ${error};
    --color-error-tint: ${alpha(error, 0.1)};
    --color-accent-tint: ${alpha(r.accent, 0.1)};
  `;
}

/** Widget setting → value. Colours point at the roles above. */
const WIDGET_COLOURS: Record<string, string> = {
  '--kinde-base-background-color': 'var(--color-bg)',
  '--kinde-base-color': 'var(--color-text)',
  '--kinde-base-accent-color': 'var(--color-accent)',
  '--kinde-base-focus-outline-color': 'var(--color-accent)',

  '--kinde-shared-color-invalid': 'var(--color-error)',
  '--kinde-shared-color-text-caption': 'var(--color-text-muted)',
  '--kinde-shared-color-text-label': 'var(--color-text)',
  '--kinde-shared-color-disabled-background': 'var(--color-surface)',
  '--kinde-shared-color-disabled-text': 'var(--color-text-muted)',

  '--kinde-button-primary-background-color': 'var(--color-accent)',
  '--kinde-button-primary-background-color-hover': 'var(--color-accent-hover)',
  '--kinde-button-primary-background-color-focus': 'var(--color-accent-hover)',
  '--kinde-button-primary-background-color-active': 'var(--color-accent-active)',
  '--kinde-button-primary-background-color-loading': 'var(--color-accent)',
  '--kinde-button-primary-color': 'var(--color-on-accent)',
  '--kinde-button-primary-color-hover': 'var(--color-on-accent)',
  '--kinde-button-primary-color-focus': 'var(--color-on-accent)',
  '--kinde-button-primary-color-active': 'var(--color-on-accent)',
  '--kinde-button-primary-color-loading': 'var(--color-on-accent)',
  '--kinde-button-primary-border-color': 'transparent',

  // MUI's `outlined` button, as the application draws it.
  '--kinde-button-secondary-background-color': 'transparent',
  '--kinde-button-secondary-background-color-hover': 'var(--color-hover)',
  '--kinde-button-secondary-background-color-focus': 'var(--color-hover)',
  '--kinde-button-secondary-background-color-active': 'var(--color-hover)',
  '--kinde-button-secondary-background-color-loading': 'transparent',
  '--kinde-button-secondary-color': 'var(--color-text)',
  '--kinde-button-secondary-color-hover': 'var(--color-text)',
  '--kinde-button-secondary-color-focus': 'var(--color-text)',
  '--kinde-button-secondary-color-active': 'var(--color-text)',
  '--kinde-button-secondary-color-loading': 'var(--color-text)',
  '--kinde-button-secondary-border-color': 'var(--color-divider)',

  '--kinde-button-uncontained-background-color': 'transparent',
  '--kinde-button-uncontained-background-color-hover': 'var(--color-hover)',
  '--kinde-button-uncontained-color': 'var(--color-accent-hover)',
  '--kinde-button-uncontained-color-hover': 'var(--color-accent-active)',

  '--kinde-control-select-text-background-color': 'var(--color-surface)',
  '--kinde-control-select-text-background-color-hover': 'var(--color-surface)',
  '--kinde-control-select-text-background-color-focus': 'var(--color-surface)',
  '--kinde-control-select-text-background-color-invalid': 'var(--color-surface)',
  '--kinde-control-select-text-border-color': 'var(--color-divider)',
  '--kinde-control-select-text-border-color-hover': 'var(--color-text-muted)',
  '--kinde-control-select-text-border-color-focus': 'var(--color-accent)',
  '--kinde-control-select-text-border-color-invalid': 'var(--color-error)',
  '--kinde-control-select-text-color': 'var(--color-text)',

  '--kinde-control-label-color': 'var(--color-text)',
  '--kinde-control-associated-text-color': 'var(--color-text-muted)',
  '--kinde-control-associated-text-invalid-message-color': 'var(--color-error)',

  '--kinde-control-checkable-background-color': 'var(--color-surface)',
  '--kinde-control-checkable-background-color-checked': 'var(--color-accent)',
  '--kinde-control-checkable-border-color': 'var(--color-text-muted)',
  '--kinde-control-checkable-border-color-hover': 'var(--color-text)',
  '--kinde-control-checkable-border-color-checked': 'var(--color-accent)',
  '--kinde-control-checkable-icon-color': 'var(--color-on-accent)',
  '--kinde-control-checkable-switch-track-color-on': 'var(--color-accent)',

  // RGAA 10.6 — a link is never told apart by its colour alone.
  '--kinde-text-link-color': 'var(--color-accent-hover)',
  '--kinde-text-link-color-hover': 'var(--color-accent-active)',
  '--kinde-text-link-color-focus': 'var(--color-accent-active)',
  '--kinde-text-link-color-active': 'var(--color-accent-active)',
  '--kinde-text-link-color-visited': 'var(--color-accent-hover)',

  '--kinde-choice-separator-color': 'var(--color-text-muted)',

  '--kinde-card-background-color': 'var(--color-surface)',
  '--kinde-card-border-color': 'var(--color-divider)',
  '--kinde-card-element-divider-color': 'var(--color-divider)',

  '--kinde-alert-banner-error-background-color': 'var(--color-error-tint)',
  '--kinde-alert-banner-error-border-color': 'var(--color-error)',
  '--kinde-alert-banner-error-color': 'var(--color-text)',
  '--kinde-alert-banner-info-background-color': 'var(--color-accent-tint)',
  '--kinde-alert-banner-info-border-color': 'var(--color-accent)',
  '--kinde-alert-banner-info-color': 'var(--color-text)',
};

/** Widget settings that are not colours: sizes, faces, corners. */
const WIDGET_SHAPE: Record<string, string> = {
  '--kinde-base-font-family': 'var(--font-body)',
  '--kinde-base-font-size': px(TYPE.body),
  '--kinde-base-line-height': String(LINE_HEIGHT_BODY),
  '--kinde-base-letter-spacing': 'normal',
  '--kinde-base-font-variant-numeric': 'normal',
  '--kinde-base-strong-font-weight': '600',
  '--kinde-base-focus-outline-width': '2px',
  '--kinde-base-focus-outline-offset': '2px',
  '--kinde-base-focus-border-radius': '2px',

  // Organic's button: the display face, weight 400, one 12px corner, and the
  // height of a finger on a sign-in page.
  '--kinde-button-border-radius': `${RADIUS}px`,
  '--kinde-button-block-size': `${TAP}px`,
  '--kinde-button-font-size': px(TYPE.control + 1),
  '--kinde-button-font-weight': '400',
  '--kinde-button-letter-spacing': 'normal',
  '--kinde-button-primary-border-width': '0',
  '--kinde-button-secondary-border-width': '1px',
  '--kinde-button-secondary-border-style': 'solid',

  '--kinde-control-select-text-border-radius': `${RADIUS}px`,
  '--kinde-control-select-text-border-width': '1px',
  '--kinde-control-select-text-block-size': `${TAP}px`,

  '--kinde-control-label-font-size': px(TYPE.bodySmall),
  '--kinde-control-label-font-weight': '600',
  '--kinde-control-associated-text-font-size': px(TYPE.caption),

  '--kinde-control-checkable-border-radius': '4px',
  '--kinde-control-checkable-border-width': '1.5px',

  '--kinde-text-link-font-weight': '600',
  '--kinde-text-link-text-decoration-line': 'underline',
  '--kinde-text-link-text-decoration-line-is-inline': 'underline',
  '--kinde-text-link-text-underline-offset': '3px',

  '--kinde-card-border-radius': `${RADIUS}px`,
  '--kinde-alert-banner-border-radius': `${RADIUS}px`,
  '--kinde-alert-banner-padding': '1rem',
};

function widgetSettings(): string {
  const colours = Object.entries(WIDGET_COLOURS)
    .map(([name, value]) => `${name}: ${value}; ${name}-dark: ${value};`)
    .join('\n    ');
  const shape = Object.entries(WIDGET_SHAPE)
    .map(([name, value]) => `${name}: ${value};`)
    .join('\n    ');
  return `${colours}\n    ${shape}`;
}

/** Organic's two voices, served by the application (see `next.config.ts`). */
function fontFaces(appUrl: string): string {
  const face = (family: string, file: string, weight: string, range: string) => `
  @font-face {
    font-family: '${family}';
    font-style: normal;
    font-weight: ${weight};
    font-display: swap;
    src: url('${appUrl}/fonts/${file}.woff2') format('woff2');
    unicode-range: ${range};
  }`;
  const latin =
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
  const latinExt =
    'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF';
  return [
    face('Caprasimo', 'caprasimo-latin', '400', latin),
    face('Caprasimo', 'caprasimo-latin-ext', '400', latinExt),
    face('Figtree', 'figtree-latin', '400 700', latin),
    face('Figtree', 'figtree-latin-ext', '400 700', latinExt),
  ].join('');
}

const belowMd = `@media (max-width: ${BREAKPOINT.md - 0.05}px)`;
const fromLg = `@media (min-width: ${BREAKPOINT.lg}px)`;

export function getStyles(appUrl: string): string {
  const light = lightRoles(WIMBLEDON);
  const dark = darkRoles(WIMBLEDON);

  return `
  ${fontFaces(appUrl)}

  :root {
    color-scheme: light dark;
    --font-heading: 'Caprasimo', system-ui, sans-serif;
    --font-body: 'Figtree', system-ui, sans-serif;
    --radius: ${RADIUS}px;
    ${roleVariables(light, ERROR.light)}
    ${widgetSettings()}
  }

  @media (prefers-color-scheme: dark) {
    :root {
      ${roleVariables(dark, ERROR.dark)}
    }
  }

  *, *::before, *::after { box-sizing: border-box; }

  html, body { margin: 0; min-height: 100%; }

  body {
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: ${px(TYPE.body)};
    line-height: ${LINE_HEIGHT_BODY};
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: var(--color-accent-tint); }

  :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 2px; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ── The widget, where its settings do not reach ───────────────────── */

  .kinde-button { font-family: var(--font-heading); min-block-size: ${CONTROL_HEIGHT}px; }

  .kinde-control-select-text { font-family: var(--font-body); font-size: ${px(TYPE.control + 1)}; caret-color: var(--color-accent); }
  .kinde-control-select-text:focus { box-shadow: 0 0 0 1px var(--color-accent); }

  ${belowMd} {
    /* Under 16px iOS Safari zooms the page on focus and never zooms back. */
    .kinde-control-select-text { font-size: ${TOUCH_FIELD_FONT}px; }
  }

  /* The Apple mark is drawn black; on the dark ground it would vanish. */
  @media (prefers-color-scheme: dark) {
    [data-kinde-button-icon-name$='apple'] svg path { fill: currentColor; }
  }

  /* ── Layout ─────────────────────────────────────────────────────────── */

  .shell {
    min-block-size: 100vh;
    min-block-size: 100dvh;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  ${fromLg} {
    .shell { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); }
  }

  .aside { display: none; }

  ${fromLg} {
    .aside {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 2rem;
      margin: 1rem 0 1rem 1rem;
      padding: 2.5rem;
      border-radius: var(--radius);
      background: var(--color-surface);
      overflow: hidden;
      position: relative;
    }
  }

  .aside-body { max-inline-size: 30rem; }

  .aside-emblem { inline-size: 7.5rem; block-size: 7.5rem; margin-block-end: 2rem; color: var(--color-text); }

  .kicker {
    margin: 0 0 0.75rem;
    font-size: ${px(TYPE.kicker)};
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-accent-hover);
  }

  .display {
    margin: 0 0 1rem;
    font-family: var(--font-heading);
    font-weight: 400;
    font-size: ${px(TYPE.h1)};
    line-height: ${LINE_HEIGHT_HEADING};
    letter-spacing: ${HEADING_TRACKING};
  }

  .lede { margin: 0; color: var(--color-text-muted); max-inline-size: 28rem; }

  .audiences { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.75rem 0 0; padding: 0; list-style: none; }

  .audiences li {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius);
    background: var(--color-bg);
    font-size: ${px(TYPE.bodySmall)};
    font-weight: 600;
  }

  .aside-foot { margin: 0; font-size: ${px(TYPE.caption)}; color: var(--color-text-muted); }

  .main { display: flex; flex-direction: column; min-inline-size: 0; }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 1rem;
  }

  ${fromLg} {
    .topbar { padding: 1.75rem 2.5rem; justify-content: flex-end; }
    .topbar .logo { display: none; }
  }

  .logo { display: inline-flex; align-items: center; gap: 0.6rem; color: var(--color-accent); text-decoration: none; }
  .logo svg { inline-size: 1.75rem; block-size: 1.75rem; display: block; }
  .logo span {
    font-weight: 700;
    font-size: 1.085rem;
    letter-spacing: 0.1em;
    margin-inline-end: -0.1em;
    line-height: 1;
    color: var(--color-text);
  }

  .back {
    display: inline-flex;
    align-items: center;
    min-block-size: ${TAP}px;
    padding-inline: 0.5rem;
    border-radius: var(--radius);
    font-size: ${px(TYPE.control)};
    font-weight: 600;
    color: var(--color-accent-hover);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .back:hover { color: var(--color-accent-active); background: var(--color-hover); }

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 1rem 2rem;
  }

  .column { inline-size: 100%; max-inline-size: 25rem; }

  ${belowMd} {
    /* A phone keyboard covers the lower half: the form starts at the top. */
    .content { align-items: flex-start; padding-block-start: 1.5rem; }
  }

  .heading {
    margin: 0 0 1.5rem;
    font-family: var(--font-heading);
    font-weight: 400;
    font-size: ${px(TYPE.h2)};
    line-height: ${LINE_HEIGHT_HEADING};
    letter-spacing: ${HEADING_TRACKING};
  }

  ${belowMd} {
    .heading { font-size: ${px(TYPE.h3)}; }
  }

  .description { margin: -1rem 0 1.5rem; color: var(--color-text-muted); }
  .description:empty { display: none; }

  .note {
    margin: 1.5rem 0 0;
    padding: 0.875rem 1rem;
    border-radius: var(--radius);
    background: var(--color-surface);
    font-size: ${px(TYPE.bodySmall)};
    color: var(--color-text-muted);
  }

  .note a { color: var(--color-accent-hover); font-weight: 600; text-underline-offset: 3px; }
  .note a:hover { color: var(--color-accent-active); }

  .footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25rem 1.25rem;
    padding: 1rem 1rem 1.5rem;
    font-size: ${px(TYPE.caption)};
    color: var(--color-text-muted);
  }

  .footer a { color: inherit; text-underline-offset: 3px; }
  .footer a:hover { color: var(--color-text); }
  `;
}
