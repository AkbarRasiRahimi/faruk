"use client";

import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { GlobalStateProvider } from "../store/global";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        router.push("/login");
      } else {
        router.push("/application");
      }
    }
  }, [router]);
  return (
    <html lang="en" data-theme="nord">
      <body className={`${inter.className}`}>
        <GlobalStateProvider>
          {children}
          <Navbar />
          <Footer />
        </GlobalStateProvider>
      </body>
    </html>
  );
}

export default RootLayout;
