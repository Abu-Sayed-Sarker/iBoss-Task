import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/providers/ReduxProvider";
import Navbar from "@/components/footer-and-navbar/Navbar";
import Footer from "@/components/footer-and-navbar/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iBoss-Task",
  description: "Online Test Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="">
        <ClientProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <div className="min-h-[calc(100vh-117px)]">{children}</div>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
