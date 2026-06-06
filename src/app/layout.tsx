import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "World Food Movement — No Student Goes Hungry",
    template: "%s | World Food Movement",
  },
  description:
    "We provide free nutritious meals to college students across America. 100% of donations fund meals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-[family-name:var(--font-nunito-sans)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
