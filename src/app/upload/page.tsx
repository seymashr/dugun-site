"use client";

import { useState } from "react";

export default function UploadPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwBeEF45ukATJNR-t_nBMizrIhwwAeRaJgoD6ixCk2UMyxUO1VngMgIyOPnJH4doGnjeg/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code !== "SG1209") {
      setError("Geçersiz düğün kodu");
      return;
    }

    if (!files || files.length === 0) {
      setError("Lütfen en az bir fotoğraf seçin");
      return;
    }

    setError("");
    setLoading(true);

    try {
      for (const file of Array.from(files)) {
        const base64 = await toBase64(file);

        const res = await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify({
            file: base64.split(",")[1],
            mimeType: file.type,
            fileName: `${name || "anonim"}-${file.name}`,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || "Yükleme başarısız");
        }
      }

      setMessage("🎉 Fotoğraflar başarıyla yüklendi!");
      setFiles(null);
      setName("");
      setCode("");
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  return (
    <main className="min-h-screen bg-[#f5f2eb] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-xl shadow-lg">

        <h1
          className="text-3xl sm:text-5xl text-center mb-6 sm:mb-8 text-[#3f3a34] leading-snug"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Anılarınızı Bizimle Paylaşın
        </h1>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input
            type="text"
            placeholder="Düğün Kodu"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <textarea
            placeholder="İsterseniz bir not bırakabilirsiniz"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
            rows={4}
          />

          {/* 📦 FILE UPLOAD BOX */}
          <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              Fotoğrafları buraya seçin
            </p>
          </div>

          {error && (
            <p className="text-red-600 font-medium text-sm">{error}</p>
          )}

          {message && (
            <p className="text-green-600 font-medium text-sm">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg text-base font-medium active:scale-[0.98] transition"
          >
            {loading ? "Yükleniyor..." : "Fotoğrafları Yükle"}
          </button>

        </form>
      </div>
    </main>
  );
}