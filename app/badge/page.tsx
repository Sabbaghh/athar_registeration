'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Cairo } from 'next/font/google';
import Link from 'next/link';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export default function BadgePage() {
  const [token, setToken] = useState<string | null>(null);
  const [BadgeUrl, setBadgeUrl] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find((row) =>
      row.startsWith('registration_token='),
    );
    const BadgePdfUrlCookie = cookies.find((row) =>
      row.startsWith('BadgePdfUrl='),
    );

    if (tokenCookie) {
      const registrationToken = tokenCookie.split('=')[1];
      setToken(registrationToken);
    }
    if (BadgePdfUrlCookie) {
      const badgeToken = BadgePdfUrlCookie.split('=')[1];
      setBadgeUrl(badgeToken);
    }
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-cyan-400">
        <p className="text-white text-xl">No registration token found</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${cairo.className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-500 to-cyan-400">
        {/* Subtle wave pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-0 right-0 h-96">
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(255,255,255,0.1)"
                d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,165.3C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between px-6 py-12 min-h-screen">
        {/* Top Section - Logo */}
        <div className="flex flex-col items-center pt-8">
          <div className="mb-16">
            <div className="w-48 h-28 relative flex items-center justify-center">
              <Image
                className="object-contain"
                src="/Logo.svg"
                fill
                alt="Athar logo"
              />
            </div>
          </div>
        </div>

        {/* Middle Section - Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
          {/* Tagline */}
          <div className="space-y-4">
            <p
              className="text-white text-4xl md:text-5xl font-light tracking-wide"
              dir="rtl"
            >
              نصنع الغد
            </p>
            <p className="text-white text-4xl md:text-5xl font-light tracking-wide">
              Shaping Tomorrow
            </p>
          </div>

          {/* Success Message */}
          <div className="space-y-6 mt-12">
            <p
              className="text-white text-2xl md:text-3xl font-normal"
              dir="rtl"
            >
              نتطلع لرؤيتكم!
            </p>
            <p className="text-white text-2xl md:text-3xl font-light">
              See you on the journey!
            </p>
          </div>

          {/* Download Badge Button */}
          <div className="mt-12">
            <Link
              href={BadgeUrl || '#'}
              className="inline-block px-12 py-4 bg-linear-to-r from-purple-600 via-purple-500 to-cyan-400 text-white md:text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-bold text-xl"
            >
              Download your badge
            </Link>
          </div>
        </div>

        {/* Bottom Section - QR Instruction */}
        <div className="text-center space-y-3 pb-8 mt-10">
          <p className="text-white text-lg md:text-xl font-normal" dir="rtl">
            يرجى مسح الرمز الخاص بك لدى وصولك
          </p>
          <p className="text-white text-lg md:text-xl font-light">
            Scan your QR Code upon arrival
          </p>
        </div>
      </div>
    </div>
  );
}
