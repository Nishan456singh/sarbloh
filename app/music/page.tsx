"use client"
import { useState, useRef, useEffect } from "react";
import axios from "axios";

interface Track {
  id: number;
  title: string;
  artist: { name: string };
  album: { title: string; cover_medium: string };
  preview: string;
}

export default function MusicPlayer() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Search tracks using Deezer API
  const searchTracks = async (query: string): Promise<void> => {
    if (!query) return;
    try {
      const response = await axios.get(
        "https://deezerdevs-deezer.p.rapidapi.com/search",
        {
          params: { q: query },
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      setTracks(response.data.data as Track[]);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setTracks([]);
    }
  };

  // Handle track playback
  const playTrack = (track: Track): void => {
    if (audioRef.current) {
      audioRef.current.src = track.preview;
      audioRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  // Toggle play/pause
  const togglePlayPause = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Reset audio when track ends
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTrack(null);
      };
      audio.addEventListener("ended", handleEnded);
      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#2F5663] to-[#1a2a33] flex flex-col items-center py-8 px-2 sm:px-4 md:px-8 overflow-x-hidden">
      {/* Decorative SVG background */}
      <svg
        className="absolute top-0 left-0 w-full h-40 xs:h-52 sm:h-64 pointer-events-none z-0"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 Q360,80 720,200 Q1080,320 1440,160 L1440,0 L0,0 Z"
          fill="#C18653"
          opacity="0.15"
        />
        <path
          d="M0,240 Q360,200 720,280 Q1080,320 1440,240 L1440,0 L0,0 Z"
          fill="#fff"
          opacity="0.05"
        />
      </svg>
      {/* Mountain SVG Divider */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-20 xs:h-28 sm:h-32 md:h-48"
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
      <h1 className="relative z-10 text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8 text-center tracking-tight drop-shadow-lg">
        <span className="bg-gradient-to-r from-[#C18653] to-[#e1e8eb] bg-clip-text text-transparent">
          Music Player
        </span>
      </h1>
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 mb-8 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search for songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C18653] transition"
        />
        <button
          onClick={() => searchTracks(searchQuery)}
          className="px-6 py-3 bg-[#C18653] text-white font-bold rounded-xl shadow-lg hover:bg-[#2F5663] hover:text-[#C18653] transition-all duration-300 w-full md:w-auto"
        >
          Search
        </button>
      </div>
      <audio ref={audioRef} className="hidden" />
      <div className="relative z-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mb-8">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-white/10 rounded-2xl shadow-xl p-4 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          >
            <img
              src={track.album.cover_medium}
              alt={track.album.title}
              className="w-28 h-28 xs:w-32 xs:h-32 object-cover rounded-xl mb-3 shadow group-hover:scale-110 transition-transform duration-300"
            />
            <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white text-center mb-1 group-hover:text-[#C18653] transition">
              {track.title}
            </h3>
            <p className="text-[#C18653] text-xs xs:text-sm sm:text-base text-center mb-2">{track.artist.name}</p>
            <button
              onClick={() => playTrack(track)}
              className="px-4 py-2 bg-[#2F5663] text-white rounded-full font-semibold shadow hover:bg-[#C18653] hover:text-[#2F5663] transition-all duration-200 w-full"
            >
              Play Preview
            </button>
          </div>
        ))}
      </div>
      {currentTrack && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#2F5663]/90 rounded-2xl shadow-2xl px-4 xs:px-6 sm:px-8 py-4 xs:py-6 flex flex-col items-center animate-fade-in z-50 max-w-[95vw] w-[95vw] xs:w-auto">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold text-[#C18653] mb-2">Now Playing</h3>
          <p className="text-white text-center mb-2 text-xs xs:text-sm sm:text-base">
            {currentTrack.title} <span className="text-[#C18653]">by {currentTrack.artist.name}</span>
          </p>
          <button
            onClick={togglePlayPause}
            className={`px-6 py-2 rounded-full font-bold shadow transition-all duration-200 w-full xs:w-auto ${
              isPlaying
                ? "bg-[#C18653] text-white hover:bg-[#fff] hover:text-[#C18653]"
                : "bg-white text-[#2F5663] hover:bg-[#C18653] hover:text-white"
            }`}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
      {tracks.length === 0 && (
        <p className="relative z-10 text-center text-gray-300 mt-16 text-sm xs:text-base">No tracks found. Try searching for a song!</p>
      )}
    </div>
  );
}