import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRouteError,
} from '@remix-run/react';
import { createCookieSessionStorage, json } from '@remix-run/cloudflare';
import { ThemeProvider, themeStyles } from '~/components/theme-provider';
import { LanguageProvider } from '~/components/language-provider';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { useEffect } from 'react';
import { Error } from '~/layouts/error';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Navbar } from '~/layouts/navbar';
import { Progress } from '~/components/progress';
import config from '~/config.json';
import styles from './root.module.css';
import './reset.module.css';
import './global.module.css';

export const links = () => [
  {
    rel: 'preload',
    href: GothamMedium,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  {
    rel: 'preload',
    href: GothamBook,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: '',
  },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'icon', href: '/favicon.png', type: 'image/png' },
  { rel: 'shortcut_icon', href: '/favicon.png', type: 'image/png' },
  { rel: 'apple-touch-icon', href: '/favicon.png' },
];

export const loader = async ({ request, context }) => {
  const { url } = request;
  const { pathname } = new URL(url);
  const pathnameSliced = pathname.endsWith('/') ? pathname.slice(0, -1) : url;
  const canonicalUrl = `${config.url}${pathnameSliced}`;

  const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [context.cloudflare.env.SESSION_SECRET || ' '],
      secure: true,
    },
  });

  const session = await getSession(request.headers.get('Cookie'));
  const theme = session.get('theme') || 'dark';
  const language = session.get('language') || 'fr';

  return json(
    { canonicalUrl, theme, language },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
};

export default function App() {
  let { canonicalUrl, theme, language } = useLoaderData();
  const fetcher = useFetcher();
  const { state } = useNavigation();

  if (fetcher.formData?.has('theme')) {
    theme = fetcher.formData.get('theme');
  }
  if (fetcher.formData?.has('language')) {
    language = fetcher.formData.get('language');
  }

  function toggleTheme(newTheme) {
    fetcher.submit(
      { theme: newTheme ? newTheme : theme === 'dark' ? 'light' : 'dark' },
      { action: '/api/set-theme', method: 'post' }
    );
  }

  function toggleLanguage(newLang) {
    fetcher.submit(
      { language: newLang ? newLang : language === 'fr' ? 'en' : 'fr' },
      { action: '/api/set-language', method: 'post' }
    );
  }

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="zRULzhw7WwkOHC4jBLiMaUKD3jwC4XQ2G_W1MCzi9bw" />
        {/* Theme color doesn't support oklch so I'm hard coding these hexes for now */}
        <meta name="theme-color" content={theme === 'dark' ? '#111' : '#F2F2F2'} />
        <meta
          name="color-scheme"
          content={theme === 'light' ? 'light dark' : 'dark light'}
        />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <Meta />
        <Links />
        <link rel="canonical" href={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jolidon Missimahu HOUNGUE",
              "url": "https://jolidonhoungue.pages.dev",
              "image": "https://jolidonhoungue.pages.dev/profile-jolidon.jpeg",
              "jobTitle": "Frontend Developer & UI/UX Designer",
              "sameAs": [
                "https://bj.linkedin.com/in/jolidon-houngue",
                "https://github.com/missimahu05"
              ]
            }),
          }}
        />
      </head>
      <body data-theme={theme}>
        <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
          <LanguageProvider language={language} toggleLanguage={toggleLanguage}>
            <Progress />
            <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
              Aller au contenu principal
            </VisuallyHidden>
            <Navbar />
            <main
              id="main-content"
              className={styles.container}
              tabIndex={-1}
              data-loading={state === 'loading'}
            >
              <Outlet />
            </main>
          </LanguageProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111" />
        <meta name="color-scheme" content="dark light" />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <Meta />
        <Links />
      </head>
      <body data-theme="dark">
        <Error error={error} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
