'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Cairo } from 'next/font/google';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export default function BadgePage() {
  // const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find((row) =>
      row.startsWith('registration_token='),
    );

    if (tokenCookie) {
      const registrationToken = tokenCookie.split('=')[1];
      setToken(registrationToken);
    }
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">No registration token found</p>
      </div>
    );
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    token,
  )}`;

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
        <div className="text-center flex flex-col justify-center items-center">
          <p className="text-white text-6xl mb-8">You&apos;re in!</p>
          <p className="text-white text-xl mb-12">See you on the Journey!</p>

          {/* View Badge Button */}
          <div className="w-40 bg-white p-4 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <Image
              src={qrCodeUrl || '/placeholder.svg'}
              width={150}
              height={150}
              alt="QR Code"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
