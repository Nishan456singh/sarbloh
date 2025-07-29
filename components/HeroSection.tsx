"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"

const heroImage = "/dessert.png"

const GURBANI_QUOTES = [
  "ਏ ਮਨ ਪਿਆਰਿਆ ਤੂ ਸਦਾ ਸਚੁ ਸਮਾਲੇ ॥",
  "ਐਸਾ ਕੰਮੁ ਮੂਲੇ ਨ ਕੀਚੈ ਜਿਤੁ ਅੰਤਿ ਪਛੋਤਾਈਐ ॥",
  "ਪਰਮੇਸਰ ਤੇ ਭੁਲਿਆਂ ਵਿਆਪਨਿ ਸਭੇ ਰੋਗ ॥",
  "ਆਪੇ ਮਾਛੀ ਮਛੁਲੀ ਆਪੇ ਪਾਣੀ ਜਾਲੁ ॥",
  "ਤਰਸੁ ਪਇਆ ਮਿਹਰਾਮਤਿ ਹੋਈ ਸਤਿਗੁਰੁ ਸਜਣੁ ਮਿਲਿਆ ॥",
  "ਬਾਦਿਸਾਹ ਸਾਹ ਸਭ ਵਸਿ ਕਰਿ ਦੀਨੇ ॥",
  "ਜੋ ਮਾਗਹਿ ਠਾਕੁਰ ਅਪੁਨੇ ਤੇ ਸੋਈ ਸੋਈ ਦੇਵੈ ॥",
  "ਆਪੁ ਗਵਾਇ ਸੇਵਾ ਕਰੇ ਤਾ ਕਿਛੁ ਪਾਏ ਮਾਨੁ ॥",
]

const HeroSection: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % GURBANI_QUOTES.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-b from-[#2F5663] to-[#1a2a33] px-2 md:px-0 relative overflow-hidden">
      {/* Floating Gurbani Cards */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {GURBANI_QUOTES.map((quote, index) => (
          <div
            key={index}
            className={`absolute backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl px-4 py-2 shadow-lg transition-all duration-1000 ${
              index === currentQuote ? "opacity-100 scale-110 bg-white/20" : "opacity-40 scale-95"
            }`}
            style={{
              top: `${15 + (index * 9)}%`,
              left: `${5 + (index * 11)}%`,
              animation: `float-${index % 4} ${15 + index * 2}s infinite linear`,
              animationDelay: `${index * 1.5}s`,
              transform: `rotate(${(index % 3 - 1) * 5}deg)`,
            }}
          >
            <span className="text-xs md:text-sm text-white font-medium block max-w-[200px] truncate">
              {quote}
            </span>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col items-center w-full max-w-3xl z-10">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500">
          {/* Animated glowing background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#C18653] via-[#2F5663] to-transparent blur-2xl opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
          {/* Main Image */}
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-56 xs:h-64 sm:h-80 md:h-96 object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-black/30 group-hover:bg-black/40 transition-all duration-500">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-3 sm:mb-4 text-center animate-fade-in">
              Dive Into The World of Music
            </h1>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-[#C18653] font-semibold mb-4 sm:mb-6 text-center animate-fade-in delay-150">
              Listen, Discover, and Feel Every Beat
            </p>
            <Link
              href="/music"
              className="px-6 py-2 sm:px-8 sm:py-3 bg-[#C18653] text-white font-bold rounded-full shadow-lg hover:bg-[#2F5663] hover:text-[#C18653] transition-all duration-300 animate-fade-in delay-300"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Current Quote Display */}
        <div className="mt-8 backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl px-6 py-4 shadow-xl max-w-md mx-auto">
          <p className="text-white text-center font-medium text-lg transition-all duration-500">
            {GURBANI_QUOTES[currentQuote]}
          </p>
          <p className="text-[#C18653] text-center text-sm mt-2 font-semibold">
            ਗੁਰਬਾਣੀ
          </p>
        </div>

        {/* Quote indicators */}
        <div className="flex gap-2 mt-4">
          {GURBANI_QUOTES.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                idx === currentQuote
                  ? "bg-[#C18653] shadow-lg scale-125"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CSS for floating animations */}
      <style jsx>{`
        @keyframes float-0 {
          0% { transform: translateX(-150px) translateY(0px) rotate(-5deg); }
          100% { transform: translateX(calc(100vw + 150px)) translateY(-30px) rotate(5deg); }
        }
        @keyframes float-1 {
          0% { transform: translateX(-150px) translateY(0px) rotate(5deg); }
          100% { transform: translateX(calc(100vw + 150px)) translateY(40px) rotate(-3deg); }
        }
        @keyframes float-2 {
          0% { transform: translateX(-150px) translateY(0px) rotate(-3deg); }
          100% { transform: translateX(calc(100vw + 150px)) translateY(-20px) rotate(7deg); }
        }
        @keyframes float-3 {
          0% { transform: translateX(-150px) translateY(0px) rotate(7deg); }
          100% { transform: translateX(calc(100vw + 150px)) translateY(20px) rotate(-5deg); }
        }
      `}</style>
    </section>
  )
}

export default HeroSection