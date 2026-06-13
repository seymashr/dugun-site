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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f5f2eb]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="mb-6 text-center text-[#9c8768] tracking-[0.3em] uppercase text-sm"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Davetiyeyi görmek için zarfa tıklayın
            </p>

            <div className="flex items-center gap-4 mb-12 text-[#c2ae90]">
              <div className="w-20 h-px bg-[#cdbb9f]" />
              <span className="text-lg">♥</span>
              <div className="w-20 h-px bg-[#cdbb9f]" />
            </div>

            <motion.div
              onClick={() => setOpened(true)}
              whileHover={{ scale: 1.02, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="relative cursor-pointer"
            >
              {/* Gölge */}
              <div className="absolute inset-0 translate-y-4 blur-2xl bg-black/15 rounded-xl scale-95" />

              {/* Zarf */}
              <div
                className="
                  relative
                  w-[700px]
                  max-w-[90vw]
                  h-[470px]
                  bg-[#efe6d8]
                  rounded-sm
                  overflow-hidden
                  shadow-[0_25px_50px_rgba(0,0,0,0.18)]
                "
              >
                {/* Sol çizgi */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(40deg, transparent 49.7%, #d5c7b1 50%, transparent 50.3%)",
                  }}
                />

                {/* Sağ çizgi */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(-40deg, transparent 49.7%, #d5c7b1 50%, transparent 50.3%)",
                  }}
                />

                {/* Üst kapak */}
                <motion.div
                  initial={false}
                  animate={
                    opened
                      ? {
                          rotateX: -180,
                          y: -20,
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                  style={{
                    transformOrigin: "top center",
                    perspective: "1000px",
                  }}
                  className="absolute top-0 left-0 w-full z-20"
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "350px solid transparent",
                      borderRight: "350px solid transparent",
                      borderTop: "230px solid #f3eadc",
                      filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.08))",
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
                    w-20
                    h-20
                    rounded-full
                    bg-[#c9ae7a]
                    border-4
                    border-[#b99963]
                    shadow-xl
                    flex
                    items-center
                    justify-center
                    text-[#fff8ea]
                    text-2xl
                  "
                >
                  ❦
                </div>

                {/* Kağıt dokusu hissi */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#ffffff,transparent_70%)]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}