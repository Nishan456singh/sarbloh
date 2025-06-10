"use client"
import React from "react"

const heroImage = "/dessert.png"

const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-20 flex flex-col items-center">
      <div className="relative flex flex-col items-center w-full max-w-3xl">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500">
          {/* Animated glowing background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#C18653] via-[#2F5663] to-transparent blur-2xl opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
          {/* Main Image */}
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-96 object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-black/30 group-hover:bg-black/40 transition-all duration-500">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4 text-center animate-fade-in">
              Dive Into The World of Music
            </h1>
            <p className="text-lg md:text-2xl text-[#C18653] font-semibold mb-6 text-center animate-fade-in delay-150">
              Listen, Discover, and Feel Every Beat
            </p>
            <button className="px-8 py-3 bg-[#C18653] text-white font-bold rounded-full shadow-lg hover:bg-[#2F5663] hover:text-[#C18653] transition-all duration-300 animate-fade-in delay-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection