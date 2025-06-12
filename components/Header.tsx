"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Music', href: '/music' },
  { name: 'Converter', href: '/converter' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const Header: React.FC = () => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#2F5663] shadow-lg fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <Link href="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#C18653]">
          Sarbloh Vibes
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-2 rounded transition-colors duration-200 ${
                  pathname === link.href
                    ? "bg-[#C18653] text-[#2F5663] font-bold shadow"
                    : "text-white hover:text-[#C18653]"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 w-full h-full bg-[#2F5663] bg-opacity-95 z-50 flex flex-col items-center justify-center transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <HiX />
          </button>
          <ul className="flex flex-col space-y-8">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-2xl px-6 py-3 rounded transition-colors duration-200 ${
                    pathname === link.href
                      ? "bg-[#C18653] text-[#2F5663] font-bold shadow"
                      : "text-white hover:text-[#C18653]"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header