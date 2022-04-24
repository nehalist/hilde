import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DefaultSeo } from "next-seo";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default MyApp;
