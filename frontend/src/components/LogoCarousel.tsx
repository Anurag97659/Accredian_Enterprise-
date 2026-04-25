"use client";

import Image from "next/image";

interface Logo {
  id: string;
  name: string;
  logo: string;
}

interface LogoCarouselProps {
  logos: Logo[];
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="mt-12 w-full overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .logo-carousel:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
      <div className="logo-carousel relative">
        <div className="flex animate-scroll gap-8">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="flex items-center justify-center h-20 w-32 bg-white rounded-lg border border-slate-200 hover:shadow-md transition">
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  width={100}
                  height={50}
                  className="object-contain max-h-16 max-w-24"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
