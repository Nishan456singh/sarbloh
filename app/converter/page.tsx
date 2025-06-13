"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SarblohJsonResponse {
  pages: Array<{ page: number; text: string }>;
  metadata?: { source: string; title: string; language: string };
}

// Function to split text into phrases (e.g., by newlines or sentences)
const getPhrases = (text: string): string[] => {
  return text
    .split("\n")
    .map((phrase) => phrase.trim())
    .filter((phrase) => phrase.length > 0);
};

export default function ConverterPage() {
  const [data, setData] = useState<SarblohJsonResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/public/sarbloh-data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => setError("Failed to load data"));
  }, []);

  // Defensive check for data.pages existence
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!data || !Array.isArray(data.pages)) return <div className="text-gray-500 p-4">Loading...</div>;

  // Combine all page texts and split into phrases
  const allPhrases = data.pages
    .flatMap((page) => getPhrases(page.text))
    .filter((phrase, index, self) => self.indexOf(phrase) === index); // Remove duplicates

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  // Group phrases into chunks for grid display (e.g., 6 phrases per slide)
  const phrasesPerSlide = 6;
  const slides = [];
  for (let i = 0; i < allPhrases.length; i += phrasesPerSlide) {
    slides.push(allPhrases.slice(i, i + phrasesPerSlide));
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Sarbloh Granth Phrases</h1>
      <Slider {...settings}>
        {slides.map((slidePhrases, slideIndex) => (
          <div key={slideIndex} className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {slidePhrases.map((phrase, phraseIndex) => (
                <div
                  key={phraseIndex}
                  className="bg-white p-4 rounded-lg shadow-md text-center text-lg text-gray-800"
                >
                  {phrase}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
      {data.metadata && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Source: {data.metadata.source} | Title: {data.metadata.title} | Language:{" "}
            {data.metadata.language}
          </p>
        </div>
      )}
    </div>
  );
}