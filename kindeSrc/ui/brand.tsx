import React from 'react';
import { SLAM_ACCENTS } from './tokens';

/**
 * The SLAMS mark and emblem, drawn inline.
 *
 * The geometry is `scripts/build-brand-assets.mjs`'s, as in the frontend's
 * `SlamsLogo.tsx`; if they diverge, the script is right. Inline rather than an
 * `<img>` so the mark takes `currentColor` and follows the colour scheme.
 */

const SEAM = 'M128 -24 A76 76 0 0 0 128 128 A76 76 0 0 1 128 280';

function Seam({ id }: { id: string }) {
  return (
    <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256">
      <circle cx="128" cy="128" r="128" fill="#fff" />
      <path d={SEAM} fill="none" stroke="#000" strokeWidth="42" strokeLinecap="butt" />
    </mask>
  );
}

/**
 * `id` must be unique in the document: a mask referenced from a hidden
 * subtree (the side panel on a phone) paints nothing, and the mark becomes a
 * square wherever the id is shared.
 */
export function SlamsMark({ id }: { id: string }) {
  const mask = `slams-seam-${id}`;
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <Seam id={mask} />
      <rect width="256" height="256" fill="currentColor" mask={`url(#${mask})`} />
    </svg>
  );
}

/** The mark and the word, as `SlamsLogo` locks them up. */
export function SlamsLogo({ id, href, label }: { id: string; href: string; label: string }) {
  return (
    <a className="logo" href={href} aria-label={label}>
      <SlamsMark id={id} />
      <span aria-hidden="true">SLAMS</span>
    </a>
  );
}

/**
 * One arc per tournament, clockwise in calendar order from noon. Reserved for
 * 64px and above: below it the cuts close up.
 */
const RING: ReadonlyArray<readonly [string, number]> = [
  [SLAM_ACCENTS.australianOpen, 230.5],
  [SLAM_ACCENTS.rolandGarros, 320.5],
  [SLAM_ACCENTS.wimbledon, 50.5],
  [SLAM_ACCENTS.usOpen, 140.5],
];

export function SlamsEmblem({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 340 340" aria-hidden="true" focusable="false">
      {RING.map(([colour, angle]) => (
        <circle
          key={angle}
          cx="170"
          cy="170"
          r="158"
          fill="none"
          stroke={colour}
          strokeWidth="13"
          strokeDasharray="217.85 774.89"
          transform={`rotate(${angle} 170 170)`}
        />
      ))}
      <g transform="translate(42 42)">
        <Seam id="slams-seam-emblem" />
        <rect width="256" height="256" fill="currentColor" mask="url(#slams-seam-emblem)" />
      </g>
    </svg>
  );
}
