'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function RegistrationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const fullName = formData.get('fullName') as string
    const company = formData.get('company') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

    // Validate fields
    if (!fullName || !company || !email || !phone) {
      setError('All fields are required')
      setIsSubmitting(false)
      return
    }

    // Generate a simple token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36)

    // Store user data in localStorage
    const userData = { fullName, company, email, phone }
    localStorage.setItem('userData', JSON.stringify(userData))

    // Store token in cookie
    document.cookie = `registration_token=${token}; path=/; max-age=31536000` // 1 year

    // Redirect to badge page
    setTimeout(() => {
      router.push('/badge')
    }, 500)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30">
        <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-[#1e3a8a]">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Please enter your"
              className="bg-white border-white/50 rounded-xl h-12 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-[#1e3a8a]">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              required
              placeholder="Company name"
              className="bg-white border-white/50 rounded-xl h-12 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-[#1e3a8a]">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className="bg-white border-white/50 rounded-xl h-12 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-[#1e3a8a]">
              Phone number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Phone number"
              className="bg-white border-white/50 rounded-xl h-12 placeholder:text-gray-400"
            />
          </div>

          {error && (
            <p className="text-red-200 text-sm bg-red-500/20 p-3 rounded-lg">{error}</p>
          )}

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:from-[#2563eb] hover:to-[#0891b2] text-white px-12 py-6 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
