'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RegistrationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const fullName = (formData.get('fullName') as string)?.trim();
    const company = (formData.get('company') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim();

    // Validate fields
    if (!fullName || !company || !email || !phone) {
      setError('All fields are required');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: fullName,
        company,
        email,
        phone,
      };

      const res = await axios.post(
        'https://app.addedtownhall.ae/api/register',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // If your backend requires credentials/cookies to be included:
          // withCredentials: true,
        },
      );

      const data = res.data || {};

      // try a few common token keys
      const token =
        data.token ||
        data.registration_token ||
        data.registrationToken ||
        data.data?.token;

      // If backend returned a token, store it as a client cookie (non-HttpOnly)
      if (token) {
        // 1 year
        document.cookie = `registration_token=${token}; path=/; max-age=${
          60 * 60 * 24 * 365
        }; SameSite=Lax; Secure`;
      } else {
        // If backend set HttpOnly cookie server-side you won't see token here.
        // We'll rely on server-set cookie (if any) or proceed to badge page.
      }

      // Redirect to badge (your existing page will detect cookie if it's set)
      router.push('/done');
    } catch (err: any) {
      // axios error handling (try to extract useful messages)
      if (err?.response) {
        const resp = err.response;
        // Common API error shapes
        const msg =
          resp.data?.message ||
          (typeof resp.data === 'string' ? resp.data : null) ||
          (resp.data?.errors &&
            Object.values(resp.data.errors).flat().join(', ')) ||
          `Request failed with status ${resp.status}`;
        setError(msg);
      } else {
        setError(err?.message || 'Network error');
      }
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md px-4 sm:px-0">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1e3a8a] mb-4 sm:mb-6">
          Registration
          <div className="h-1 mt-3 w-10 bg-blue-300" />
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-[#1e3a8a]"
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Full Name"
              className="bg-white border-white/50 rounded-xl h-11 sm:h-12 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="company"
              className="text-sm font-medium text-[#1e3a8a]"
            >
              Company
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              required
              placeholder="Company name"
              className="bg-white border-white/50 rounded-xl h-11 sm:h-12 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-[#1e3a8a]"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className="bg-white border-white/50 rounded-xl h-11 sm:h-12 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-[#1e3a8a]"
            >
              Phone number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Phone number"
              className="bg-white border-white/50 rounded-xl h-11 sm:h-12 placeholder:text-gray-400"
            />
          </div>

          {error && (
            <p
              className="text-red-200 text-sm bg-red-500/20 p-3 rounded-lg"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:from-[#2563eb] hover:to-[#0891b2] text-white px-8 py-5 sm:px-12 sm:py-6 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
