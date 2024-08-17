import type { Metadata } from "next";
import { Nunito, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCanonicalUrl } from "@/utils";

const inter = Nunito({ subsets: ["latin"] });
const cuteFont = Josefin_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Fast Buy",
  description:
    "Discover the power of simplicity with Fast Buy – the ultimate solution for effortless selling products. Unlock convenience and boost your sales.",
  alternates: {
    canonical: getCanonicalUrl(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {/* <hr className="h-0.5 bg-gray-100 border-0"></hr> */}
        <div className="bg-gray-951 pb-12 pt-24 relative">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
