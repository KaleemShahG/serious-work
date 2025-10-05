// src/App.jsx
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function App() {
  const [balloons, setBalloons] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    // 🎈 Balloons
    const balloonColors = ["#f9a8d4", "#fbcfe8", "#f472b6", "#fda4af"];
    const newBalloons = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      size: 40 + Math.random() * 40,
    }));
    setBalloons(newBalloons);

    // 💕 Hearts
    const heartColors = ["#f9a8d4", "#fb7185", "#f472b6", "#fda4af"];
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 5 + Math.random() * 6,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
    }));
    setHearts(newHearts);

    // 🎊 Confetti initial burst (generate pieces)
    const pieces = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: 50 + (Math.random() - 0.5) * 20, // start near center
      xOffset: -150 + Math.random() * 300,
      rotate: Math.random() * 360,
      delay: Math.random() * 1,
      color: ["#ffe4f0", "#ffd1e6", "#ffd6d6", "#ffefef", "#fce7f3"][
        Math.floor(Math.random() * 5)
      ],
      size: 6 + Math.random() * 10,
    }));
    setConfetti(pieces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // play on first user interaction (we also provide play/pause control)
  const startMusicSafely = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // re-trigger confetti burst
  const burstConfetti = () => {
    const pieces = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + "-" + i,
      left: 50 + (Math.random() - 0.5) * 20,
      xOffset: -150 + Math.random() * 300,
      rotate: Math.random() * 360,
      delay: Math.random() * 0.4,
      color: ["#ffe4f0", "#ffd1e6", "#ffd6d6", "#ffefef", "#fce7f3"][
        Math.floor(Math.random() * 5)
      ],
      size: 6 + Math.random() * 10,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 2500);
  };

  // helper: handle click to start music once
  const handleFirstClick = () => {
    startMusicSafely();
  };

  return (
    <div
      onClick={handleFirstClick}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 text-gray-800 font-[Poppins,sans-serif] selection:bg-pink-200"
    >
      {/* audio */}
      <audio ref={audioRef} src="/birthday-melody.mp3" loop preload="auto" />

      {/* 🎈 Balloons */}
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full shadow-md opacity-80"
          style={{
            backgroundColor: b.color,
            width: `${b.size}px`,
            height: `${b.size * 1.3}px`,
            left: `${b.left}%`,
            bottom: -80,
            zIndex: 0,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -1200, opacity: [0, 1, 1, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: b.duration,
            delay: b.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 💕 Hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-2xl opacity-80 z-10"
          style={{ left: `${h.left}%`, bottom: -40, color: h.color }}
          initial={{ y: 0, opacity: 0, scale: 0.8 }}
          animate={{ y: -900, opacity: [0, 1, 1, 0], scale: [0.8, 1.1, 1.1, 0.8] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: h.duration,
            delay: h.delay,
            ease: "easeInOut",
          }}
        >
          💖
        </motion.div>
      ))}

      {/* 🎊 Confetti pieces (burst) */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute"
            style={{
              left: `${c.left}%`,
              top: "40%",
              width: c.size,
              height: c.size * 1.6,
              backgroundColor: c.color,
              borderRadius: 2,
              transformOrigin: "center",
            }}
            initial={{ opacity: 1, y: 0, x: 0, rotate: c.rotate, scale: 1 }}
            animate={{ opacity: 0, y: -420 - Math.random() * 200, x: c.xOffset, rotate: c.rotate + 360 }}
            transition={{ delay: c.delay, duration: 1.6, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* 🌸 HERO */}
      <header className="relative z-40 flex flex-col items-center justify-center text-center py-24 px-6">
        {/* floating name ribbon */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: [0, -8, 0], opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          className="mb-4 px-6 py-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md inline-flex items-center gap-3"
        >
          <span className="text-lg font-semibold text-pink-600 tracking-wide">B I S M A</span>
          <span className="text-xl">💞</span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-pink-600 drop-shadow-lg mb-3"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          🎀 Happy Birthday Bimmo 💕
        </motion.h1>

        <motion.p
          className="mt-3 text-base md:text-lg text-gray-700 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          May your day sparkle with love, laughter, and all your favorite pastel vibes 💖✨
        </motion.p>

        {/* cake + controls row */}
        <div className="mt-8 flex items-center gap-4">
          {/* Cake SVG */}
          <motion.div
            initial={{ scale: 0.9, y: 10 }}
            animate={{ scale: [1, 1.03, 1], y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-36 md:w-44"
          >
            {/* Simple cake SVG (cute pastel) */}
            <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#ffd6e0" />
                  <stop offset="1" stopColor="#ffdbe9" />
                </linearGradient>
              </defs>

              {/* base */}
              <rect x="20" y="70" rx="14" ry="14" width="160" height="60" fill="url(#g1)" stroke="#ffc7dc" strokeWidth="2" />
              {/* frosting */}
              <path d="M20 82 q20 -18 40 0 t40 0 t40 0 t40 0 v8 h-160z" fill="#fff" opacity="0.9" />
              {/* candles */}
              <g transform="translate(60,46)">
                <rect x="-6" y="-16" width="6" height="18" rx="2" fill="#fff" stroke="#f9a8d4" />
                <motion.path
                  d="M-3 -18 q1 -6 3 -9"
                  fill="none"
                />
                <g transform="translate(20,0)">
                  <rect x="-6" y="-16" width="6" height="18" rx="2" fill="#fff" stroke="#fda4af" />
                </g>
              </g>
              {/* candle flame (flicker) */}
              <g transform="translate(60,30)">
                <motion.path
                  d="M0 0 C4 -6 4 -12 0 -16 C-4 -12 -4 -6 0 0 Z"
                  fill="#ffd166"
                  animate={{ scale: [1, 1.06, 1], rotate: [0, 3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </g>
            </svg>
          </motion.div>

          {/* Celebrate + Music controls */}
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                burstConfetti();
              }}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl shadow-lg"
            >
              Celebrate!
            </button>

            <button
              onClick={toggleMusic}
              className="bg-white/80 border border-pink-200 px-3 py-2 rounded-xl shadow-sm text-pink-600"
            >
              {isPlaying ? "Pause Music" : "Play Music"}
            </button>
          </div>
        </div>
      </header>

      <hr className="border-pink-400 mx-auto w-11/12 md:w-3/4 my-6 relative z-40" />

      {/* 💌 ABOUT */}
      <main className="relative z-40 px-6 pb-14">
        <section className="py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6">💫 Why You’re So Special</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Soft-Hearted 💗",
                text: "You make people feel warm, just like a cozy pastel sunset.",
              },
              {
                title: "Full of Joy 🌸",
                text: "Your laugh is tiny sunshine that makes every day lighter.",
              },
              {
                title: "Inspiring Soul ✨",
                text: "You turn ordinary moments into something beautiful.",
              },
            ].map((card, index) => (
              <motion.article
                key={index}
                className="bg-white/80 rounded-3xl shadow-xl p-6 backdrop-blur-sm hover:scale-105 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-pink-600 mb-2">{card.title}</h3>
                <p className="text-gray-700">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ✨ Cute Shayari Cards (Roman Urdu, cute/instagram style) */}
        <section className="py-10 text-center">
          <h3 className="text-2xl font-bold text-pink-600 mb-6">💌  Shayari</h3>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
               lines: [
  "Teri smile dekhu to din khubsurat lagta hai,",
  "har baat teri ek pyaari si vibe laati hai,",
  "tu hasti hai to lagta hai sab kuch perfect hai 💖",
],

              },
     { lines:      [
               "Teri smile se roshan har din mera,",
"tu lage sabse pyaara, sabse hatke bas mera,",
"bimmo jaisi koi nahi, tu hai dil ka sitara 💕",
      ],
              },
              {
                lines: [
                  "Chand bhi hairaan hai teri narmi pe,",
                  "phool bhi sharmaye teri narmi dekh ke.",
                  "Bas yunhi muskura, sada khush rehna.",
                ],
              },
            ].map((s, idx) => (
              <motion.div
                key={idx}
                className="bg-white/90 rounded-2xl p-6 shadow-md border border-pink-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * idx }}
                viewport={{ once: true }}
              >
                <p className="text-pink-600 font-semibold mb-3">♡</p>
                <div className="text-gray-800 leading-relaxed">
                  {s.lines.map((l, i) => (
                    <p key={i} className="text-sm md:text-base">{l}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <hr className="border-pink-400 mx-auto w-11/12 md:w-3/4 my-6" />

        {/* 📸 MEMORIES (6 images) */}
        <section className="py-10 text-center bg-pink-50/60 rounded-2xl p-6 mx-4 md:mx-auto md:max-w-6xl">
          <h3 className="text-2xl font-bold text-pink-600 mb-6">📸 Beautiful Memories</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "/mem1.jpeg",
              "/mem2.jpeg",
              "/mem3.jpeg",
              "/mem4.jpeg",
              "/mem5.jpeg",
              "/mem6.jpeg",
            ].map((img, i) => (
              <motion.div
                key={i}
                className="rounded-2xl overflow-hidden shadow-lg border-4 border-pink-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <img
                  src={img}
                  alt={`Memory ${i + 1}`}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-gray-600 italic">Every moment shines a little brighter with you 💞</p>
        </section>
      </main>

{/* ✨ Love Message Section */}
<section className="text-center py-10">
  <button
    onClick={() => {
      const msg = document.getElementById("love-msg");
      msg.classList.toggle("opacity-0");
      msg.classList.toggle("translate-y-6");
    }}
    className="bg-gradient-to-r from-pink-400 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-pink-400/50 hover:scale-105 transition-all duration-300"
  >
    💖 Click here 💖
  </button>

  <p
    id="love-msg"
    className="mt-6 text-3xl md:text-4xl font-bold text-pink-600 opacity-0 translate-y-6 transition-all duration-700"
  >
    I love u 😘
  </p>
</section>

      <footer className="relative z-40 text-center py-8 text-gray-700">
        Made with 💖 by <span className="font-semibold text-pink-600">Kaleem</span> for <span className="font-semibold">Bimmo</span> 🎀
      </footer>
    </div>
  );
}
