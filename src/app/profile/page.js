"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [showSkills, setShowSkills] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const router = useRouter();
  if (!token) {
    router.push("/");
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.user?.username);
          setEmail(data.user?.email);
          setPhone(data.user?.phone);
          setAddress(data.user?.address);
          setCity(data.user?.city);
          setCountry(data.user?.country);
        } else {
          const data = await response.json();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <section className="w-screen flex justify-center items-start h-screen py-20 bg-base-100 ">
      <div className="flex flex-col w-screen h-fit justify-center items-center bg-base-100 md:flex-row md:items-start md:space-x-6 pb-20 gap-2">
        <div className="w-full max-w-md p-6 bg-base-200 md:w-1/2 rounded-lg h-fit">
          <h1 className="text-2xl font-bold mb-6">Profil Bilgileri</h1>
          <label className="label mb-2 text-neutral-content">Kullanıcı Adı:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Kullanıcı Adı"
            disabled
            value={username}
          />
          <label className="label mb-2 text-neutral-content">Email:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Email"
            disabled
            value={email}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Ad:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Ad"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Soyad:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Soyad"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <label className="label mb-2 text-neutral-content">Doğum Günü:</label>
          <input
            type="date"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="mm/dd/yyyy"
          />
          <label className="label mb-2 text-neutral-content">Telefon:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Telefon"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <label className="label mb-2 text-neutral-content">Adres:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Adres"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Üniversite:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Üniversite"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Bölüm:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Bölüm"
            required
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
        </div>
        <div className="w-full max-w-md p-6 bg-base-200 md:w-1/2 h-fit rounded-lg">
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Sinif:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Sinif"
            required
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Ortalama:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Ortalama"
            required
          />
          <label className="label mb-2 text-neutral-content">Deneyim:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Deneyim"
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Çalışmak İstediğiniz Alan:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Çalışmak İstediğiniz Alan"
            required
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Beceriler:
            <div className="relative inline-block w-10 ml-2 align-middle select-none">
              <button
                type="button"
                onClick={() => setShowSkills((prev) => !prev)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true">
                <HiPlus aria-hidden="true" />
              </button>
              {showSkills && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1">
                  <div className="py-1" role="none">
                    {showSkills &&
                      [("HTML", "CSS", "JavaScript", "React")].map((skill) => (
                        <div
                          key={skill}
                          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                          role="menuitem"
                          tabIndex="0"
                          onClick={() => setCountry(skill)}>
                          {skill}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Beceriler"
            value={country}
            readOnly
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Yabancı Dil:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Yabancı Dil"
            required
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Takım Çalışması Becerisi:
          </label>
          <select
            className="select select-bordered select-primary select-sm w-full bg-transparent text-neutral-content"
            required>
            <option value="">Lütfen Seçiniz</option>
            <option value="Orta">Orta</option>
            <option value="İyi">İyi</option>
            <option value="Çok İyi">Çok İyi</option>
          </select>
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>İletişim Beceri:
          </label>
          <select
            className="select select-bordered select-primary select-sm w-full bg-transparent text-neutral-content"
            required>
            <option value="">Lütfen Seçiniz</option>
            <option value="Orta">Orta</option>
            <option value="İyi">İyi</option>
            <option value="Çok İyi">Çok İyi</option>
          </select>
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span> Analitik Beceri:
          </label>
          <select
            className="select select-bordered select-primary select-sm w-full bg-transparent text-neutral-content"
            required>
            <option value="">Lütfen Seçiniz</option>
            <option value="Orta">Orta</option>
            <option value="İyi">İyi</option>
            <option value="Çok İyi">Çok İyi</option>
          </select>
          <label className="label mb-2 text-neutral-content">Hobiler:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Hobiler"
          />
          <button className="btn btn-primary w-full mt-10">Profili Kaydet</button>
        </div>
      </div>
    </section>
  );
}
