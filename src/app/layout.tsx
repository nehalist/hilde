import React, { ReactNode } from "react";
import "@/styles/globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "Hilde - SaaS",
  description: "Hilde.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <Header />
          <div className="container mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
