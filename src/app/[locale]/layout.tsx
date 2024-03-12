import { ReactNode } from "react";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Header } from "@/components/header";
import { Providers } from "@/app/[locale]/providers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Footer } from "@/components/footer";

const locales = ["de", "en"];

export const metadata = {
  title: "Hilde - Platform",
  description: "Hilde.",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  if (!locales.includes(locale)) {
    return notFound();
  }

  return (
    <html lang={locale}>
      <head />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers locale={locale}>
            <Header />
            <div>{children}</div>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
