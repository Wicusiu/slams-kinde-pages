import {
  getEnvironmentVariable,
  getKindeCSRF,
  getKindeNonce,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getKindeWidget,
  getSVGFaviconUrl,
  type KindePageEvent,
} from '@kinde/infrastructure';
import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { SlamsEmblem, SlamsLogo } from './brand';
import { COPY, languageOf, type Variant } from './copy';
import { getStyles } from './styles';

/**
 * Where the application lives. Overridden by the `SLAMS_APP_URL` environment
 * variable, which a page reads only if it declares the `kinde.env` binding in
 * its own `pageSettings`.
 */
const DEFAULT_APP_URL = 'https://app.slams.tennis';

function appUrl(): string {
  try {
    const configured = getEnvironmentVariable('SLAMS_APP_URL')?.value;
    return (configured || DEFAULT_APP_URL).replace(/\/+$/, '');
  } catch {
    return DEFAULT_APP_URL;
  }
}

/**
 * The widget's texts. The documentation and the type definitions disagree on
 * their spelling (`page_title` against `pageTitle`), so both are read.
 */
function contentOf(event: KindePageEvent) {
  const content = (event.context?.widget?.content ?? {}) as unknown as Record<string, string | undefined>;
  return {
    pageTitle: content.pageTitle ?? content.page_title ?? 'SLAMS',
    heading: content.heading ?? '',
    description: content.description ?? '',
  };
}

function SlamsPage({ event, variant }: { event: KindePageEvent; variant: Variant }) {
  const { request } = event;
  const lang = request?.locale?.lang || 'fr';
  const copy = COPY[languageOf(lang)];
  const content = contentOf(event);
  const app = appUrl();

  return (
    <html lang={lang} dir={request?.locale?.isRtl ? 'rtl' : 'ltr'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <meta name="csrf-token" content={getKindeCSRF()} />
        <meta name="color-scheme" content="light dark" />
        <meta name="google" content="nopagereadaloud" />
        <title>{content.pageTitle}</title>
        <link rel="icon" href={getSVGFaviconUrl()} type="image/svg+xml" />
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        {/* As raw text: React would escape the quotes and `>` the CSS needs. */}
        <style nonce={getKindeNonce()} dangerouslySetInnerHTML={{ __html: getStyles(app) }} />
      </head>
      <body>
        <div data-kinde-root="true" className="shell">
          <aside className="aside">
            <SlamsLogo id="aside" href={app} label={copy.home} />
            <div className="aside-body">
              <SlamsEmblem className="aside-emblem" />
              <p className="kicker">{copy.kicker}</p>
              <p className="display">{copy.display[variant]}</p>
              <p className="lede">{copy.lede[variant]}</p>
              <ul className="audiences">
                {copy.audiences.map((audience) => (
                  <li key={audience}>{audience}</li>
                ))}
              </ul>
            </div>
            <p className="aside-foot">{copy.tagline}</p>
          </aside>

          <div className="main">
            <header className="topbar">
              <SlamsLogo id="topbar" href={app} label={copy.home} />
              <a className="back" href={app}>
                {copy.back}
              </a>
            </header>

            <main className="content">
              <div className="column">
                {content.heading && <h1 className="heading">{content.heading}</h1>}
                <p className="description">{content.description}</p>
                {getKindeWidget()}
                {variant === 'register' && (
                  <p className="note">
                    {copy.clubNote} <a href={`${app}/club-registration`}>{copy.clubLink}</a>
                  </p>
                )}
              </div>
            </main>

            <footer className="footer">
              <span>© SLAMS</span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

export function renderSlamsPage(event: KindePageEvent, variant: Variant): string {
  return renderToString(<SlamsPage event={event} variant={variant} />);
}
