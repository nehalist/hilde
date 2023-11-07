import type { AppProps } from "next/app";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DefaultSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { Layout } from "~/components/Layout";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider session={session}>
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
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default trpc.withTRPC(App);
