"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnvelopeIntro({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f5f2eb] px-4"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="mb-6 text-center text-[#8f8069] tracking-[0.3em] uppercase text-sm"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Davetiyeyi görmek için zarfa tıklayın
            </p>

            <motion.div
              onClick={() => setOpened(true)}
              whileHover={{ scale: 1.015, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative cursor-pointer"
            >
              {/* Genel gölge */}
              <div className="absolute inset-0 translate-y-5 scale-95 rounded-xl bg-black/10 blur-3xl" />

              {/* Zarf */}
              <div
                className="
                  relative
                  w-[92vw]
                  max-w-[700px]
                  aspect-[1.55/1]
                  overflow-hidden
                  rounded-sm
                "
              >
                {/* Arka yüzey */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "#efe6d8",
                    boxShadow:
                      "0 25px 50px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.7)",
                  }}
                />

                {/* Sol kat */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(40deg, transparent 49.5%, #d7cab6 50%, transparent 50.5%)",
                  }}
                />

                {/* Sağ kat */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(-40deg, transparent 49.5%, #d7cab6 50%, transparent 50.5%)",
                  }}
                />

                {/* Alt üçgen */}
                <div
                  className="absolute bottom-0 left-0 w-full h-full"
                  style={{
                    clipPath: "polygon(0 100%,50% 45%,100% 100%)",
                    background: "#e8ddcc",
                  }}
                />

                {/* Kapak */}
                <motion.div
                  animate={
                    opened
                      ? {
                          rotateX: -180,
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                  style={{
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                  }}
                  className="absolute inset-0 z-20"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(0 0,100% 0,50% 68%)",
                      background: "#f3eadc",
                      boxShadow:
                        "0 8px 18px rgba(0,0,0,.10)",
                    }}
                  />

                  {/* Kapak derinliği */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: "polygon(0 0,100% 0,50% 68%)",
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,.35), rgba(0,0,0,.06))",
                    }}
                  />
                </motion.div>

                {/* Mühür */}
                <div
                  className="
                    absolute
                    left-1/2
                    top-[58%]
                    -translate-x-1/2
                    -translate-y-1/2
                    z-30
                    w-16
                    h-16
                    md:w-20
                    md:h-20
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                  style={{
                    background:
                      "linear-gradient(135deg,#d8bf8a,#c6a76d,#b58d4e)",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,.18), inset 0 2px 4px rgba(255,255,255,.35)",
                    border: "3px solid #b89258",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 700,
                      color: "#fffaf0",
                      letterSpacing: "0.08em",
                    }}
                    className="text-xl md:text-3xl"
                  >
                    SG
                  </span>
                </div>

                {/* Kağıt dokusu */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#ffffff,transparent_70%)]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}