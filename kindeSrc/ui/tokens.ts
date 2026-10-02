/**
 * Organic, as the sign-in pages need it.
 *
 * A copy of `apps/frontend/src/lib/design-tokens.ts`, reduced to the default
 * palette (Wimbledon, `DEFAULT_THEME` in `theme-cookie.ts`): the sign-in
 * domain cannot read the palette cookie the application sets, so it paints the
 * palette a visitor without a preference sees. Do not hand-tune a value here —
 * retune it in Organic, re-copy it into the frontend, then here.
 * `apps/frontend/src/lib/kinde-pages-tokens.test.ts` compares the two.
 */

export type Ramp = readonly [string, string, string, string, string, string, string, string, string];

export interface OrganicPalette {
  readonly bg: string;
  readonly surface: string;
  readonly text: string;
  readonly textMuted: string;
  readonly accent: string;
  readonly accent2: string;
  readonly neutral: Ramp;
  readonly accentRamp: Ramp;
  readonly accent2Ramp: Ramp;
}

export const WIMBLEDON: OrganicPalette = {
  bg: '#f1f7f1',
  surface: '#e3eee3',
  text: '#171f18',
  textMuted: '#444944',
  accent: '#06683a',
  accent2: '#5d3c8d',
  neutral: ['#f1f6f1', '#e5eae4', '#d0d7d0', '#b6beb6', '#9aa19a', '#7d847d', '#606660', '#444944', '#2b2e2b'],
  accentRamp: ['#eaf9ee', '#d2f2dc', '#aee4c0', '#82cf9e', '#5eb47f', '#459565', '#33734d', '#245236', '#183423'],
  accent2Ramp: ['#f6f2fe', '#ece3fe', '#dccbff', '#c5acf5', '#aa8edc', '#8c72b9', '#6c578f', '#4d3e67', '#312842'],
};

/** The four Grand Slam accents, in calendar order — the emblem's ring. */
export const SLAM_ACCENTS = {
  australianOpen: '#a22e66',
  rolandGarros: '#ac4617',
  wimbledon: '#06683a',
  usOpen: '#224fa7',
} as const;

export const RADIUS = 12;
export const TAP = 44;
export const CONTROL_HEIGHT = 36;
export const TOUCH_FIELD_FONT = 16;
export const BREAKPOINT = { sm: 480, md: 768, lg: 1024 } as const;

/** Type scale, in px (`TYPE` and `TYPE_COMPACT` in the frontend copy). */
export const TYPE = { h1: 42, h2: 32, h3: 25, h4: 20, body: 15, bodySmall: 13, control: 14, caption: 12, kicker: 11 } as const;
export const LINE_HEIGHT_BODY = 1.55;
export const LINE_HEIGHT_HEADING = 1.12;
export const HEADING_TRACKING = '-0.015em';

/** MUI's own `error.main`, which the application leaves in place. */
export const ERROR = { light: '#d32f2f', dark: '#f44336' } as const;

type RampStep = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export function step(ramp: Ramp, n: RampStep): string {
  return ramp[n / 100 - 1];
}

export function alpha(hex: string, ratio: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${ratio})`;
}

export interface Roles {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentActive: string;
  accent2: string;
  divider: string;
  onAccent: string;
}

/** `lightRoles` of the frontend copy, verbatim. */
export function lightRoles(p: OrganicPalette): Roles {
  return {
    bg: p.bg,
    surface: p.surface,
    text: p.text,
    textMuted: p.textMuted,
    accent: p.accent,
    accentHover: step(p.accentRamp, 700),
    accentActive: step(p.accentRamp, 800),
    accent2: p.accent2,
    divider: alpha(p.text, 0.22),
    onAccent: p.bg,
  };
}

/** `darkRoles` of the frontend copy, verbatim. */
export function darkRoles(p: OrganicPalette): Roles {
  return {
    bg: p.text,
    surface: step(p.neutral, 900),
    text: step(p.neutral, 100),
    textMuted: step(p.neutral, 400),
    accent: step(p.accentRamp, 400),
    accentHover: step(p.accentRamp, 300),
    accentActive: step(p.accentRamp, 200),
    accent2: step(p.accent2Ramp, 400),
    divider: alpha(step(p.neutral, 100), 0.22),
    onAccent: p.text,
  };
}
