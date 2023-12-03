import type { AppProps } from "next/app";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DefaultSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { Layout } from "~/components/Layout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider session={session}>
          {getLayout(
            <>
              <DefaultSeo
                defaultTitle="Hilde"
                titleTemplate="%s - Hilde"
                description="A better spreadsheet"
              />
              <Component {...pageProps} />
            </>,
          )}
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default trpc.withTRPC(App);
