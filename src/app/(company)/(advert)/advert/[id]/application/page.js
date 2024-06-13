"use client";

import React from "react";
import Loading from "../../../../../../components/loading";
import { useGlobalState } from "../../../../../../store/global";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Application = () => {
  const { token, setIsLoading, isLoading } = useGlobalState();
  const router = useRouter();
  const { id } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/applications/advert/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.response) {
        setApplications(data.applications);
      } else {
        setApplications([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setIsLoading(false);
    }
  };

  const handelAcceptApplication = async (applicationId) => {
    try {
      const response = await fetch(`${apiUrl}/api/applications/accept/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchApplications();
      } else {
        console.error("Error accepting application:", await response.json());
      }
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const handelRejectApplication = async (applicationId) => {
    try {
      const response = await fetch(`${apiUrl}/api/applications/reject/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchApplications();
      } else {
        console.error("Error rejecting application:", await response.json());
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  return (
    <div className="w-screen flex justify-center items-start py-20 bg-base-100">
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-bold mb-6">İlana Başvuranlar</h1>
        {isLoading ? (
          <Loading />
        ) : applications.length === 0 ? (
          <>
            {" "}
            <p>Henüz başvuru yapılmamış.</p>{" "}
            <button
              className="px-4 mt-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              onClick={() => router.back()}>
              Geri
            </button>
          </>
        ) : (
          <>
            {" "}
            <table className="table table-zebra bg-base-200">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Adayın İsmi</th>
                  <th>Adayın Soysismi</th>
                  <th>Adayın Eşlelme Skoru</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {applications
                  .filter((app) => app.status === "pending")
                  .map((application, index) => (
                    <tr key={application._id} className="text-center">
                      <th>{index + 1}</th>
                      <td className="capitalize font-bold text-xl">{application.intern.firstName}</td>
                      <td className="capitalize font-bold text-xl">{application.intern.lastName}</td>
                      <td className="capitalize font-bold text-xl">{application.__v}</td>
                      <td>
                        <button
                          onClick={() => handelAcceptApplication(application._id)}
                          className="px-4 py-2 bg-success text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                          kabul Et
                        </button>
                        <button
                          onClick={() => handelRejectApplication(application._id)}
                          className="px-4 py-2 ml-2 bg-warning text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                          Reddet
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              className="px-4 mt-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              onClick={() => router.back()}>
              Geri
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Application;
