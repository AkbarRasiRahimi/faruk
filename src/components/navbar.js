"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "../store/global";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { userType, setIsLoggedIn } = useGlobalState();
  const router = useRouter();

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
    window.location.reload();
  };

  if (!userType) {
    return null;
  }

  return (
    <div className="navbar bg-secondary fixed top-0 z-10">
      {userType === "intern" ? (
        <div className="navbar-start flex justify-between w-full items-center">
          <div>
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
            </Link>{" "}
          </div>
          <div className="flex items-center">
            <Link href="/profile" className="btn btn-ghost">
              Profilim
            </Link>
            <Link href="/" onClick={onLogoutHandler} className="btn btn-ghost">
              <AiOutlineLogout size={25} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="navbar-start flex justify-between w-full ">
          <div>
            <Link href="/" className="btn btn-ghost">
              İlan Oluştur
            </Link>
            <Link href="/apply" className="btn btn-ghost">
              İlanları Görüntüle
            </Link>
            <Link href="/internship" className="btn btn-ghost">
              Stajyerler
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/profile-company" className="btn btn-ghost">
              Profil
            </Link>
            <Link href="/" onClick={onLogoutHandler} className="btn btn-ghost">
              <AiOutlineLogout size={25} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
