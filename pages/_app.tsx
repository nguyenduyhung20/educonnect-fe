import { useEffect, type ReactElement, type ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AuthConsumer, AuthProvider } from '@/contexts/auth/jwt-context';
import { SplashScreen } from './components/splash-screen';
import { MaterialDesignContent, SnackbarProvider } from 'notistack';
import styled from '@emotion/styled';
import NotificationsProvider from '@/contexts/notification/noti-context';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface EduConnectAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#f5f1f0'
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#970C0C'
  }
}));

function EduConnectApp(props: EduConnectAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>EduConnect</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <SnackbarProvider
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent
        }}
        hideIconVariant
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <AuthConsumer>
              {(auth) => {
                const showSlashScreen = !auth.isInitialized;
                return (
                  <SidebarProvider>
                    <ThemeProvider>
                      <CssBaseline />
                      {showSlashScreen ? (
                        <SplashScreen />
                      ) : (
                        <NotificationsProvider>
                          <> {getLayout(<Component {...pageProps} />)}</>
                        </NotificationsProvider>
                      )}
                    </ThemeProvider>
                  </SidebarProvider>
                );
              }}
            </AuthConsumer>
          </AuthProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default EduConnectApp;
