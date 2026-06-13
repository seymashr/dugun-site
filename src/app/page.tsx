import EnvelopeIntro from "@/components/EnvelopeIntro";
import HomeIntro from "@/components/HomeIntro";
import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/Countdown";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] px-4 py-10">
       <EnvelopeIntro>
     <HomeIntro>
        <p
  className="uppercase tracking-[0.4em] text-[#7b7468] text-sm mb-6"
  style={{ fontFamily: "var(--font-cormorant)" }}
>
          Düğün Davetiyesi
        </p>
        

        <Image
          src="/couple.jpg"
          alt="Sabiha ve Görkem"
          width={500}
          height={700}
          className="mx-auto mb-10 rounded-lg shadow-lg w-full max-w-sm object-cover border border-[#d8d2c5]"
        />

        <h1
  className="text-6xl md:text-8xl text-[#4f4a43]"
  style={{ fontFamily: "var(--font-great-vibes)" }}
>
          <>
  Sabiha
  <br />
  <span className="text-5xl">&</span>
  <br />
  Görkem
</>
        </h1>

        <p className="text-3xl my-4 text-[#b7b2a5]">
  ❦
</p>

       <p
  className="text-3xl mb-6 text-[#4f4a43]"
  style={{ fontFamily: "var(--font-cormorant)" }}
>
  Bir Ömür Boyu Sürecek Hikâyemize Şahitlik Etmenizden Mutluluk Duyarız
</p>

        <p
  className="text-2xl leading-relaxed mb-10 text-[#4f4a43]"
  style={{ fontFamily: "var(--font-cormorant)" }}
>
          Bu özel günümüzde sizleri aramızda görmekten mutluluk duyarız.
        </p>

        <div className="bg-transparent border-t border-b border-[#c7c1b3] py-8 space-y-4">
          <p
  className="text-2xl text-[#4f4a43]"
  style={{ fontFamily: "var(--font-cormorant)" }}
>
  12 Eylül 2026
</p>

          <p
  className="text-lg text-[#4f4a43]"
  style={{ fontFamily: "var(--font-cormorant)" }}
>
  Saat bilgisi yakında eklenecektir
</p>

<p
  className="text-lg text-[#4f4a43]"
  style={{ fontFamily: "var(--font-cormorant)" }}
>
  Çamlık Bahçe Kır Düğünü
</p>

          <a
            href="https://maps.google.com/?q=Fatih+Mahallesi+Cumhuriyet+Caddesi+No+196+Çavuşbaşı+Beykoz+İstanbul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 border border-[#7b7468] px-6 py-3 text-[#4f4a43] hover:bg-[#ebe6db] transition"
          >
            Yol Tarifi
          </a>
        </div>
        <div className="mt-8">
  <Link
    href="/upload"
    className="inline-block border border-[#7b7468] px-8 py-4 text-[#4f4a43] hover:bg-[#ebe6db] transition"
  >
    Anılarınızı Bizimle Paylaşın
  </Link>
</div>

        <Countdown />
      </HomeIntro>
      </EnvelopeIntro>
    </main>
  );
} 