"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Apply() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();
  const [applications, setapplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/");
    } else {
      fetchapplications();
    }
  }, [token, router]);

  const fetchapplications = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/applications/own`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.response) {
        setapplications(data.applications);
      } else {
        setapplications([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setLoading(false);
    }
  };

  const handleViewAdvert = (id) => {
    router.push(`/advert/${id}`);
  };

  const handleViewApplicants = (id) => {
    router.push(`/advert/${id}/applicants`);
  };

  if (!token) {
    return null; // or a loading spinner
  }

  return (
    <section className="w-screen flex justify-center items-start h-screen py-20 bg-info">
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-bold mb-6">İlanları Görüntüle</h1>
        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p>No applications available.</p>
        ) : (
          <table className="table table-zebra bg-primary">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>İlanın İsmi</th>
                <th>İlanı Görüntüle</th>
                <th>İlana Başvuranlar</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((advert, index) => (
                <tr key={advert._id}>
                  <th>{index + 1}</th>
                  <td className="capitalize font-bold text-xl">{advert.title}</td>
                  <td>
                    <button onClick={() => handleViewAdvert(advert._id)} className="btn btn-info">
                      İlanı Görüntüle
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleViewApplicants(advert._id)} className="btn btn-success">
                      İlana Başvuranlar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
