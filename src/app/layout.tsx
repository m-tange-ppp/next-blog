import type { Metadata } from "next";
import localFont from "next/font/local";
import { Kiwi_Maru } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const kiwiMaru = Kiwi_Maru({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Next Blog App",
  description: "Next.jsとSupabaseと私",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${kiwiMaru.className} antialiased`}>{children}</body>
    </html>
  );
}
