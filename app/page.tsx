import React from 'react'
import HeroSection from '@/components/HeroSection'

const page = () => {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-[#2F5663] to-[#1a2a33]" />
        {/* Mountain SVG Divider */}
        <svg
          className="absolute bottom-0 left-0 w-full h-24 xs:h-28 sm:h-32 md:h-48"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160 L360,80 L720,240 L1080,120 L1440,200 L1440,320 L0,320 Z"
            fill="#1a2a33"
          />
        </svg>
      </div>
      <div className="relative z-10 w-full px-2 sm:px-4 md:px-0">
        <HeroSection />
      </div>
    </main>
  )
}

export default page