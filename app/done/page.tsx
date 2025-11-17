'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Cairo } from 'next/font/google';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export default function Done() {
  const router = useRouter();

  const handleViewBadge = () => {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find((row) =>
      row.startsWith('registration_token='),
    );

    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      router.push(`/badge?token=${token}`);
    } else {
      router.push('/badge');
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${cairo.className}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/BackGround.svg"
          fill
          style={{ objectFit: 'cover' }}
          alt="background"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-8">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-32 h-20 relative flex items-center justify-center">
            <Image
              className="absolute top-0 left-0"
              src="/Logo.svg"
              style={{ objectFit: 'contain' }}
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

        {/* Success Message */}
        <div className="text-center">
          <p className="text-white text-6xl mb-8">You&apos;re in!</p>
          <p className="text-white text-xl mb-12">See you on the Journey!</p>

          {/* View Badge Button */}
          <Button
            onClick={handleViewBadge}
            className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:from-[#2563eb] hover:to-[#0891b2] text-white px-10 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            View Badge
          </Button>
        </div>
      </div>
    </div>
  );
}
