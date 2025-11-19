'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RegistrationForm } from '@/components/registration-form';
import Image from 'next/image';

import { Cairo } from 'next/font/google';

const cairo = Cairo({ subsets: ['arabic', 'latin'] });

export default function HomePage() {
  // const router = useRouter();

  // useEffect(() => {
  //   const cookies = document.cookie.split('; ');
  //   const tokenCookie = cookies.find((row) =>
  //     row.startsWith('registration_token='),
  //   );

  //   if (tokenCookie) {
  //     router.push('/badge');
  //   }
  // }, [router]);

  return (
    <div className={`min-h-screen relative overflow-hidden ${cairo.className}`}>
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src="/BackGround.svg"
            fill
            className="object-cover"
            alt="background"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className=" mt-10 w-full h-16 sm:h-20  lg:h-24 relative flex flex-col items-center justify-center">
            {/* <Image
              className="absolute top-0 left-0"
              src="/Logo.svg"
              fill
              style={{ objectFit: 'contain' }}
              alt="logo"
              priority
            /> */}
            <p className="md:text-5xl text-2xl font-bold text-white">
              ملتقى الموظفين 2025
            </p>
            <p className="md:text-5xl text-2xl font-bold text-white">
              ADDED Townhall 2025
            </p>
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <p
            className="text-white text-2xl sm:text-3xl lg:text-4xl mb-2"
            dir="rtl"
          >
            نصنع الغد
          </p>
          <p className="text-white/90 text-2xl sm:text-3xl lg:text-4xl">
            Shaping Tomorrow
          </p>
        </div>

        {/* Registration Form */}
        <RegistrationForm />
      </div>
    </div>
  );
}
