"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { HiMenu, HiX } from "react-icons/hi";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#2F5663] shadow-lg fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <Link href="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#C18653]">
          Sarbloh Vibes
        </Link>
        
        <div className="flex items-center gap-4">
          <Link
            href="/music"
            className="px-4 py-2 rounded-full bg-[#C18653] text-[#2F5663] font-bold shadow hover:bg-[#2F5663] hover:text-[#C18653] transition-all duration-300"
          >
            Get Started
          </Link>
          
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-3xl focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
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
            <Link
              href="/music"
              className="px-8 py-3 rounded-full bg-[#C18653] text-[#2F5663] font-bold shadow hover:bg-[#2F5663] hover:text-[#C18653] transition-all duration-300 text-xl"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
