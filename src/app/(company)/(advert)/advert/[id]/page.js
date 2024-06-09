"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdvertDetail() {
  const { id } = useParams();
  const [advert, setAdvert] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      //router.push("/");
    } else {
      fetchAdvertDetail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, router]);

  const fetchAdvertDetail = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/adverts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.response) {
        setAdvert(data.advert);
      } else {
        setAdvert(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching advert detail:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!advert) {
    return <p>Advert not found.</p>;
  }

  return (
    <section className="w-screen flex justify-center items-start h-screen py-20 bg-base-100">
      <div className="max-w-md p-6 bg-base-200 rounded-lg flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">{advert.title}</h1>
        <p>
          <strong>Field:</strong> {advert.field}
        </p>
        <p>
          <strong>Department:</strong> {advert.department}
        </p>
        <p>
          <strong>Requirements:</strong> {advert.requirements.join(", ")}
        </p>
        <p>
          <strong>Foreign Languages:</strong> {advert.foreignLanguages.join(", ")}
        </p>
        <p>
          <strong>Oluşturulma Tarihi:</strong> {new Date(advert.createdAt).toLocaleDateString("tr-TR")}
        </p>
        <p>
          <strong>Güncellenme Tarihi:</strong> {new Date(advert.updatedAt).toLocaleDateString("tr-TR")}
        </p>
        <Link href="/show">
          <button className="btn btn-primary">Geri</button>
        </Link>
      </div>
    </section>
  );
}
