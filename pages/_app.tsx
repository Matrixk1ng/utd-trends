import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { IconButton, Card, Tooltip } from '@mui/material';
import GitHub from '@mui/icons-material/GitHub';
import { useMediaQuery } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  const showGitInfo =
    typeof process.env.NEXT_PUBLIC_VERCEL_ENV !== 'undefined' &&
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' &&
    typeof process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA !== 'undefined' &&
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA !== '';
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const darkModeElevation = prefersDarkMode ? 3 : 1;

  return (
    <>
      <Head>
        <title>UTD Trends</title>
        <link rel="icon" href="/Project_Nebula_Logo.svg" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
      {showGitInfo ? (
        <>
          <Card
            className="w-fit h-fit bg-light fixed bottom-2 right-2 rounded-full"
            elevation={darkModeElevation}
          >
            <Tooltip title="Open GitHub commit for this instance">
              <a
                href={
                  'https://github.com/UTDNebula/utd-trends/commit/' +
                  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                <IconButton size="large">
                  <GitHub className="fill-dark text-3xl" />
                </IconButton>
              </a>
            </Tooltip>
          </Card>
        </>
      ) : null}
    </>
  );
}

export default MyApp;
