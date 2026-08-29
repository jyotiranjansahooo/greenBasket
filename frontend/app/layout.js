import "./globals.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import {
  Fredoka,
  Poppins,
  DynaPuff,
} from "next/font/google";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "@/providers/QueryProvider";

import OfflineHandler from "./components/common/OfflineHandler";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Script from "next/script";

import { siteMetadata } from "./metadata";

export const metadata = siteMetadata;

// ======================================================
// Fonts
// ======================================================

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const dynaPuff = DynaPuff({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-dynapuff",
});

// ======================================================
// Root Layout
// ======================================================

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${fredoka.variable} ${poppins.variable} ${dynaPuff.variable}`}
      >
        <QueryProvider>
          <GoogleOAuthProvider
            clientId={
              process.env
                .NEXT_PUBLIC_GOOGLE_CLIENT_ID
            }
          >
            <AuthProvider>
              <OfflineHandler />

              <Navbar />

              <Toaster
                position="top-right"
              />

              {children}

              <Footer />
            </AuthProvider>
          </GoogleOAuthProvider>
        </QueryProvider>

        {/* Razorpay loads after the page becomes interactive */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
