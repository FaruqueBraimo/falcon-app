import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { fonts } from "./fonts";

export const metadata: Metadata = {
  title: "Falcon",
  description: "Your travel assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts.inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
