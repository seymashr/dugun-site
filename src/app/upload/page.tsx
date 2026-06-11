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
    <main className="min-h-screen bg-[#f5f2eb] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h1
          className="text-5xl text-center mb-8 text-[#4f4a43]"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Anılarınızı Bizimle Paylaşın
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ad Soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Düğün Kodu"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="İsterseniz bir not bırakabilirsiniz"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-3 rounded-lg"
            rows={4}
          />

          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full"
          />

          {error && (
            <p className="text-red-600 font-medium">{error}</p>
          )}

          {message && (
            <p className="text-green-600 font-medium">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            {loading ? "Yükleniyor..." : "Fotoğrafları Yükle"}
          </button>
        </form>
      </div>
    </main>
  );
}