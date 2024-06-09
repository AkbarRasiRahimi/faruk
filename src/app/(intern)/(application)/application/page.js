"use client";

import { useGlobalState } from "../../../../store/global";
import Loading from "../../../../components/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserApplications() {
  const { isLoading, isLoggedIn, token } = useGlobalState();
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      fetchApplications();
    }
  }, [isLoggedIn, router, token]);

  const fetchApplications = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${apiUrl}/api/applications/own`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications);
      } else {
        console.error("Error fetching applications", await response.json());
      }
    } catch (error) {
      console.error("Error fetching applications", error);
    }
  };

  if (isLoading || !isLoggedIn) {
    return <Loading />;
  }

  return (
    <section className="w-screen flex justify-center py-20 bg-base-100 h-full">
      <div className="w-screen max-w-[1200px] px-10">
        <h1 className="text-2xl font-bold mb-4">Başvurularım</h1>
        <table className="table-auto w-full bg-base-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">İlanın İsmi</th>
              <th className="px-4 py-2">Eşleşme Skoru</th>
              <th className="px-4 py-2">İncele</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id} className="bg-base-100 border-b border-base-300">
                <td className="px-4 py-2">{application.advert ? application.advert.title : "N/A"}</td>
                <td className="px-4 py-2">{application.status}</td>
                <td className="px-4 py-2">{application.isScored ? "Yapıldı" : "Yapılmadı"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
