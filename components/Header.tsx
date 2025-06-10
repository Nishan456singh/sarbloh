"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Music', href: '/music' },
  { name: 'Converter', href: '/converter' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const Header: React.FC = () => {
  const pathname = usePathname()

  return (
    <header className="bg-[#2F5663] shadow-lg">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#C18653]">
          Sarbloh Vibes
        </Link>
        <ul className="flex space-x-6">
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
      </nav>
    </header>
  )
}

export default Header