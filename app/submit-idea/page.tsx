'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SubmitIdeaPage() {
  const [email, setEmail] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [sentTo, setSentTo] = useState('')

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsValidating(true)

    // Convert email to lowercase
    const normalizedEmail = email.trim().toLowerCase()

    // Validate email format
    if (!normalizedEmail) {
      setError('Please enter an email address')
      setIsValidating(false)
      return
    }

    if (!validateEmail(normalizedEmail)) {
      setError('Please enter a valid email address')
      setIsValidating(false)
      return
    }

    try {
      // Call API to verify email in database
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to verify email')
        setIsValidating(false)
        return
      }

      // Email verified successfully and sent
      setSuccess(true)
      setSentTo(normalizedEmail)
      setIsValidating(false)
    } catch (error) {
      setError('An error occurred. Please try again.')
      setIsValidating(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1A1A1A] to-[#2C3E50] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#E8DDBF]/70 hover:text-[#E16D3C] transition mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition" />
          <span>Back to Home</span>
        </Link>

        {/* Main Card */}
        <div className="rounded-2xl border border-[#E16D3C]/50 bg-gradient-to-br from-[#1A1A1A] via-[#1F2A3C] to-[#2C3E50] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#E8DDBF] mb-3">
              Submit Your Idea
            </h1>
            <p className="text-sm text-[#E8DDBF]/80">
              Enter your team leader's email address to proceed with idea submission
            </p>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#E8DDBF] mb-2">
                  Team Leader Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#E8DDBF]/50" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isValidating}
                    placeholder="teamleader@example.com"
                    className={`w-full pl-12 pr-4 py-3 bg-[#0F1419]/50 border ${
                      error ? 'border-red-500' : 'border-[#E16D3C]/30'
                    } rounded-xl text-[#E8DDBF] placeholder-[#E8DDBF]/30 focus:outline-none focus:ring-2 focus:ring-[#E16D3C]/50 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed`}
                    required
                  />
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </motion.div>
                )}
                <p className="mt-2 text-xs text-[#E8DDBF]/60">
                  Email will be automatically converted to lowercase for consistency
                </p>
              </div>

              <button
                type="submit"
                disabled={isValidating}
                className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#E16D3C] via-[#E8DDBF] to-[#2C3E50] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(225,109,60,0.5)] transition hover:scale-105 hover:shadow-[0_0_35px_rgba(225,109,60,0.7)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isValidating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending email...
                  </>
                ) : (
                  'Send me the form link'
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#E8DDBF] mb-2">
                Email verified!
              </h2>
              <p className="text-sm text-[#E8DDBF]/80">
                We sent the submission link to <span className="font-semibold text-[#E16D3C]">{sentTo}</span>. Check your inbox (and spam folder).
              </p>
              <p className="text-xs text-[#E8DDBF]/60 mt-3">
                If you do not see the email in a few minutes, request again or contact support.
              </p>
            </motion.div>
          )}

          <div className="mt-6 pt-6 border-t border-[#E16D3C]/20">
            <p className="text-xs text-[#E8DDBF]/60 text-center">
              Submission deadline: <span className="text-[#E16D3C] font-semibold">16 Jan 2026</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
