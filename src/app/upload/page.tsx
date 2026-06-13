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

      setMessage("Fotoğraflar başarıyla yüklendi.");
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
      <div className="w-full max-w-xl bg-[#faf8f3] border border-[#d8d2c5] p-6 sm:p-8 rounded-xl shadow-lg">

        <h1
          className="text-4xl sm:text-6xl text-center mb-3 text-[#4f4a43]"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Bizimle Bir Anı Bırakın
        </h1>

        <p
          className="text-center text-[#7b7468] mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Bu özel güne ait fotoğraf ve anılarınızı bizimle paylaşabilirsiniz.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#c7c1b3] p-3 rounded-lg text-[#4f4a43] placeholder:text-[#8d8578] focus:outline-none focus:ring-2 focus:ring-[#b7b2a5]"
          />

          <input
            type="text"
            placeholder="Düğün Kodu"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-[#c7c1b3] p-3 rounded-lg text-[#4f4a43] placeholder:text-[#8d8578] focus:outline-none focus:ring-2 focus:ring-[#b7b2a5]"
          />

          <textarea
            placeholder="İsterseniz bir not bırakabilirsiniz"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border border-[#c7c1b3] p-3 rounded-lg text-[#4f4a43] placeholder:text-[#8d8578] focus:outline-none focus:ring-2 focus:ring-[#b7b2a5]"
          />

          <div className="w-full border-2 border-dashed border-[#c7c1b3] rounded-lg p-5 bg-[#f5f2eb]">
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full text-sm text-[#4f4a43]"
            />

            <p className="text-sm text-[#7b7468] mt-3">
              Fotoğraflarınızı seçerek paylaşabilirsiniz.
            </p>
          </div>

          {error && (
            <p className="text-red-600 font-medium text-sm">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-700 font-medium text-sm">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-[#7b7468] bg-[#f5f2eb] text-[#4f4a43] p-3 rounded-lg font-medium hover:bg-[#ebe6db] transition"
          >
            {loading ? "Yükleniyor..." : "Fotoğrafları Yükle"}
          </button>
        </form>
      </div>
    </main>
  );
}