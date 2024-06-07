"use client";

import { useRouter } from "next/navigation";
export default function Apply() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();
  if (!token) {
    router.push("/");
  }
  return (
    <section className="w-screen flex justify-center items-start h-screen py-20 bg-base-100 ">
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-bold mb-6">Başvuru Yaptıklarım</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Şirket İsmi</th>
              <th>İlanın İsmi</th>
              <th> Başvuru Durumu</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
