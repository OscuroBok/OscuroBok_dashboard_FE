import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
import "./global.css";

export const metadata = {
  title: "Modernize Main Demo",
  description: "Modernize Main kit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/images/logo-oscurobook.png" 
          type="image/png"
          sizes="23x23"
        />
      </head>
      <body>
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
