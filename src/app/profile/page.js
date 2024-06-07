"use client";

import { useRouter } from "next/navigation";
export default function Profile() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();
  if (!token) {
    router.push("/");
  }
  return (
    <section className="w-screen flex justify-center items-start h-screen py-20 bg-base-100 ">
      <div className="flex flex-col w-screen h-fit justify-center items-center bg-base-100 md:flex-row md:items-start md:space-x-6 pb-20 gap-2">
        <div className="w-full max-w-md p-6 bg-base-200 md:w-1/2 rounded-lg h-fit">
          <h1 className="text-2xl font-bold mb-6">Profil Bilgileri</h1>
          <label className="label mb-2 text-neutral-content">Username:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Username"
          />
          <label className="label mb-2 text-neutral-content">Email:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Email"
          />
          <label className="label mb-2 text-neutral-content">Ad:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Ad"
          />
          <label className="label mb-2 text-neutral-content">Soyad:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Soyad"
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
          />
          <label className="label mb-2 text-neutral-content">Adres:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Adres"
          />
          <label className="label mb-2 text-neutral-content">Üniversite:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Üniversite"
          />
          <label className="label mb-2 text-neutral-content">Bölüm:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Bölüm"
          />
        </div>
        <div className="w-full max-w-md p-6 bg-base-200 md:w-1/2 h-fit rounded-lg">
          <label className="label mb-2 text-neutral-content">Sinif:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Sinif"
          />
          <label className="label mb-2 text-neutral-content">Ortalama:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Ortalama"
          />
          <label className="label mb-2 text-neutral-content">Deneyim:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Deneyim"
          />
          <label className="label mb-2 text-neutral-content">Çalışmak İstediğiniz Alan:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Çalışmak İstediğiniz Alan"
          />
          <label className="label mb-2 text-neutral-content">Beceriler:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Beceriler"
          />
          <label className="label mb-2 text-neutral-content">Yabancı Dil:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Yabancı Dil"
          />
          <label className="label mb-2 text-neutral-content">Takım Çalışması Becerisi:</label>
          <select
            className="select select-bordered select-primary select-sm w-full bg-transparent text-neutral-content"
            required>
            <option value="">Lütfen Seçiniz</option>
            <option value="Orta">Orta</option>
            <option value="İyi">İyi</option>
            <option value="Çok İyi">Çok İyi</option>
          </select>
          <label className="label mb-2 text-neutral-content">İletişim Beceri:</label>
          <select
            className="select select-bordered select-primary select-sm w-full bg-transparent text-neutral-content"
            required>
            <option value="">Lütfen Seçiniz</option>
            <option value="Orta">Orta</option>
            <option value="İyi">İyi</option>
            <option value="Çok İyi">Çok İyi</option>
          </select>
          <label className="label mb-2 text-neutral-content">Analitik Beceri:</label>
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
