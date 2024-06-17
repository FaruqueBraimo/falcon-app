import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import  Header  from "./component/header";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
