import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => <>{page}</>);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
