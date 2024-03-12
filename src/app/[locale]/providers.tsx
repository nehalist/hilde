"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ThemeDependentProviders() {
  const { theme } = useTheme();
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnFocusLoss={true}
        pauseOnHover={false}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </>
  );
}

export function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  return (
    <>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <SessionProvider>{children}</SessionProvider>
          <ThemeDependentProviders />
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
}
