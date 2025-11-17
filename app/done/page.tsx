'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BadgeDisplay } from '@/components/badge-display';
import Image from 'next/image';

import { Cairo } from 'next/font/google';
const cairo = Cairo({ subsets: ['arabic', 'latin'] });
export default function BadgePage() {
  return (
    <div className={`min-h-screen relative overflow-hidden ${cairo.className}`}>
      {/* Gradient Background */}

      {/* Placeholder for background asset */}
      <div className="absolute inset-0 ">
        <div>
          <Image
            src="/BackGround.svg"
            fill
            objectFit="cover"
            alt="background"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-8">
        {/* Logo Placeholder */}
        <div className="mb-8">
          <div className="w-32 h-20 relative  flex items-center justify-center">
            <Image
              className="absolute to-0 left-0"
              src="/Logo.svg"
              objectFit="contatin"
              fill
              alt="logo"
            />
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mb-12">
          <p className="text-white text-3xl mb-2" dir="rtl">
            نصنع الغد
          </p>
          <p className="text-white/90 text-3xl">Shaping Tomorrow</p>
        </div>

        <div>
          <p className="text-white text-6xl text-center mt-20">You're in !</p>
          <p className="text-white text-xl text-center mt-20">
            See you on the Journey!{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
