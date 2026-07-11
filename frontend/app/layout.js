import "./globals.css";
import NaNvbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Fredoka, Poppins, DynaPuff } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "@/providers/QueryProvider";
import OfflineHandler from "./components/common/OfflineHandler";

import { siteMetadata } from "./metadata";
export const metadata = siteMetadata;

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${poppins.variable} ${dynaPuff.variable}`}
      >
        <QueryProvider>
          <AuthProvider>
             <OfflineHandler />
            <NaNvbar />
            <Toaster position="top-right" />
            {children}
            <Footer/>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
