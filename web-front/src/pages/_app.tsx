import type { AppProps } from "next/app";
import { Provider as UrqlProvider } from "urql";
import { Provider as JotaiProvider } from "jotai";
import Layout from "../components/Layout";
import { urqlClient } from "../utils/urqlClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <UrqlProvider value={urqlClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UrqlProvider>
    </JotaiProvider>
  );
}

export default MyApp;
