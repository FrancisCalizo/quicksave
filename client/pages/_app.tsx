import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import TopBarProgress from 'react-topbar-progress-indicator';
import '../styles/globals.css';

import { RouteGuard } from 'components/RouteGuard';
import { theme } from 'theme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();

  const [progress, setProgress] = React.useState(false);

  const getLayout = Component.getLayout || ((page: any) => <>{page}</>);

  // Function will fired when route change started
  router.events?.on('routeChangeStart', () => {
    setProgress(true);
  });

  // Function will fired when route change ended
  router.events?.on('routeChangeComplete', () => {
    setProgress(false);
  });

  return (
    <>
      <Head>
        <title>Quicksave App</title>
        <meta name="description" content="Quicksave expense tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <RouteGuard>
            {progress && <TopBarProgress />}
            {getLayout(<Component {...pageProps} />)}
          </RouteGuard>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
