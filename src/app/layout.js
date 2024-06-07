"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

function RootLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" data-theme="winter">
      <body className={`${inter.className}`}>
        {isClient ? (
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </body>
    </html>
  );
}

export default RootLayout;
