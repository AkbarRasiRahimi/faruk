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
          <label className="label mb-2 text-neutral-content">Kullanıcı Adı:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Kullanıcı Adı"
            disabled
          />
          <label className="label mb-2 text-neutral-content">Email:</label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Email"
            disabled
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Ad:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Ad"
            required
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Soyad:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Soyad"
            required
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
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Üniversite:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Üniversite"
            required
          />
          <label className="label mb-2 text-neutral-content flex justify-start">
            <span className="text-error">*</span>Bölüm:
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Bölüm"
            required
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
          </label>
          <input
            type="text"
            className="input input-bordered input-primary input-sm w-full bg-transparent text-neutral-content"
            placeholder="Beceriler"
            required
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
