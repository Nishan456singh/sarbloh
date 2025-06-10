"use client"
import React from "react";
import { FaGithub, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer: React.FC = () => (
  <footer className="w-full bg-[#2F5663] text-white py-6 px-4 mt-[0.3] shadow-inner">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold tracking-wide bg-gradient-to-r from-[#C18653] to-[#e1e8eb] bg-clip-text text-transparent">
          Sarbloh Music
        </span>
        <span className="text-xs text-gray-300 ml-2">© {new Date().getFullYear()} All rights reserved.</span>
      </div>
      <div className="flex items-center gap-5 mt-2 md:mt-0">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#C18653] transition-colors duration-200 text-xl"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#C18653] transition-colors duration-200 text-xl"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#C18653] transition-colors duration-200 text-xl"
          aria-label="Twitter"
        >
          <FaX />
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#C18653] transition-colors duration-200 text-xl"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;