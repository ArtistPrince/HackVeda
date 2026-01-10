'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'

export function IdeaSubmissionPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-16 z-50 mx-auto max-w-2xl rounded-2xl border border-[#E16D3C]/50 bg-gradient-to-br from-[#1A1A1A] via-[#1F2A3C] to-[#2C3E50] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E16D3C]">
                  Idea Submission Window
                </p>
                <h3 className="text-2xl font-bold text-[#E8DDBF]">
                  Idea submissions are open now
                </h3>
                <p className="text-sm text-[#E8DDBF]/80 leading-relaxed">
                  Submit your hackathon idea between <span className="text-[#E16D3C] font-semibold">10 Jan</span> and <span className="text-[#E16D3C] font-semibold">16 Jan 2026</span>. Share your concept, problem statement, and impact for review.
                </p>
              </div>

              <button
                aria-label="Close announcement"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E16D3C]/40 text-[#E8DDBF] transition hover:border-[#E16D3C]/80 hover:text-white hover:shadow-[0_0_20px_rgba(225,109,60,0.6)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-[#E8DDBF]/70">
                Secure your spot early and keep your team aligned on the submission timeline.
              </div>
              <Link
                href="/submit-idea"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#E16D3C] via-[#E8DDBF] to-[#2C3E50] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(225,109,60,0.5)] transition hover:scale-105 hover:shadow-[0_0_35px_rgba(225,109,60,0.7)]"
              >
                Submit Idea
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
