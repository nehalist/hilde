import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DefaultSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { Layout } from "~/components/Layout";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider themes={["light", "dark"]} attribute="class">
      <SessionProvider session={pageProps.session}>
        <Layout>
          <DefaultSeo
            defaultTitle="Hilde"
            titleTemplate="%s - Hilde"
            description="A better spreadsheet"
          />
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnFocusLoss={true}
            pauseOnHover={false}
          />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default trpc.withTRPC(App);
