"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from "react-icons/hi";

const QUOTES = [
  "ਏ ਮਨ ਪਿਆਰਿਆ ਤੂ ਸਦਾ ਸਚੁ ਸਮਾਲੇ ॥",
  "ਐਸਾ ਕੰਮੁ ਮੂਲੇ ਨ ਕੀਚੈ ਜਿਤੁ ਅੰਤਿ ਪਛੋਤਾਈਐ ॥",
  "ਪਰਮੇਸਰ ਤੇ ਭੁਲਿਆਂ ਵਿਆਪਨਿ ਸਭੇ ਰੋਗ ॥",
  "ਆਪੇ ਮਾਛੀ ਮਛੁਲੀ ਆਪੇ ਪਾਣੀ ਜਾਲੁ ॥ ਆਪੇ ਜਾਲ ਮਣਕੜਾ ਆਪੇ ਅੰਦਰਿ ਲਾਲੁ ॥੨॥",
  "ਤਰਸੁ ਪਇਆ ਮਿਹਰਾਮਤਿ ਹੋਈ ਸਤਿਗੁਰੁ ਸਜਣੁ ਮਿਲਿਆ ॥ ਨਾਨਕ ਨਾਮੁ ਮਿਲੈ ਤਾਂ ਜੀਵਾਂ ਤਨੁ ਮਨੁ ਥੀਵੈ ਹਰਿਆ ॥੧॥",
  "ਬਾਦਿਸਾਹ ਸਾਹ ਸਭ ਵਸਿ ਕਰਿ ਦੀਨੇ ॥ ਅੰਮ੍ਰਿਤ ਨਾਮ ਮਹਾ ਰਸ ਪੀਨੇ ॥੨॥",
  "ਜੋ ਮਾਗਹਿ ਠਾਕੁਰ ਅਪੁਨੇ ਤੇ ਸੋਈ ਸੋਈ ਦੇਵੈ ॥ ਨਾਨਕ ਦਾਸੁ ਮੁਖ ਤੇ ਜੋ ਬੋਲੈ ਈਹਾ ਊਹਾ ਸਚੁ ਹੋਵੈ ॥੨॥੧੪॥੪੫॥",
  "ਆਪੁ ਗਵਾਇ ਸੇਵਾ ਕਰੇ ਤਾ ਕਿਛੁ ਪਾਏ ਮਾਨੁ ॥ ਨਾਨਕ ਜਿਸ ਨੋ ਲਗਾ ਤਿਸੁ ਮਿਲੈ ਲਗਾ ਸੋ ਪਰਵਾਨੁ ॥੧॥",
]

const GLASS_STYLE =
  "backdrop-blur-md bg-white/30 border border-white/30 shadow-xl rounded-2xl px-6 py-4 flex flex-col items-center transition-all duration-700 ease-in-out"

const Header: React.FC = () => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false);

  // Quotes logic
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % QUOTES.length)
        setFade(true)
      }, 700)
    }, 120000) // 2 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-[#2F5663] shadow-lg fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center py-2 px-2 md:px-8 gap-4 md:gap-0">
        <div className="flex flex-row justify-between items-center w-full md:w-auto">
          <Link href="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#C18653]">
            Sarbloh Vibes
          </Link>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-3xl focus:outline-none ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
        {/* Quotes Glass Card */}
        <div className="hidden md:flex flex-col items-center ml-8">
          <div
            className={`${GLASS_STYLE} ${
              fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              minWidth: 420,
              maxWidth: 820,
              minHeight: 10,
            }}
          >
            <span className="text-base font-semibold text-gray-800 text-center transition-colors duration-700">
              {QUOTES[current]}
            </span>
          </div>
          <div className="flex gap-1 mt-2">
            {QUOTES.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "bg-[#C18653] shadow-lg scale-125"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 w-full h-full bg-[#2F5663] bg-opacity-95 z-50 flex flex-col items-center justify-center transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <HiX />
          </button>
          <div className="flex flex-col items-center space-y-8">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#C18653]"
              onClick={() => setMobileOpen(false)}
            >
              Sarbloh Vibes
            </Link>
            {/* Quotes Glass Card for Mobile */}
            <div className="flex flex-col items-center">
              <div
                className={`${GLASS_STYLE} ${
                  fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{
                  minWidth: 420,
                  maxWidth: 820,
                  minHeight: 80,
                }}
              >
                <span className="text-base font-semibold text-gray-800 text-center mb-2 transition-colors duration-700">
                  {QUOTES[current]}
                </span>
              </div>
              <div className="flex gap-1 mt-2">
                {QUOTES.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.0 w-1.0 rounded-full transition-all duration-300 ${
                      idx === current
                        ? "bg-[#C18653] shadow-lg scale-125"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Header