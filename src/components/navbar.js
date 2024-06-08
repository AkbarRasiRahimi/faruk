"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    router.push("/");
    window.location.reload();
  };

  if (!token) {
    return null;
  }

  return (
    <div className="navbar bg-secondary fixed top-0 z-10">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost">
          Anasayfa
        </Link>
        <Link href="/apply" className="btn btn-ghost">
          Başvurularım
        </Link>
        <Link href="/internship" className="btn btn-ghost">
          Stajım
        </Link>
        <Link href="/interview" className="btn btn-ghost">
          Başvuru Yap
        </Link>
        <Link href="/profile" className="btn btn-ghost">
          Profilim
        </Link>
        <Link href="/" onClick={onLogoutHandler} className="btn btn-ghost">
          Çıkış Yap
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
