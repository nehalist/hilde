import React, { ReactNode } from "react";
import "@/styles/globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/app/[locale]/providers";
import { notFound } from "next/navigation";

const locales = ["de", "en"];

export const metadata = {
  title: "Hilde - Platform",
  description: "Hilde.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) {
    return notFound();
  }

  return (
    <html lang={locale}>
      <head />
      <body>
        <Providers>
          <Header />
          <div className="container mx-auto max-w-7xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
