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
            initial={{ opacity: 0, scale:  0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-16 z-50 mx-auto max-w-2xl rounded-2xl border border-[#E16D3C]/50 bg-gradient-to-br from-[#1A1A1A] via-[#1F2A3C] to-[#2C3E50] p-6 shadow-[0_20px_80px_rgba(0,0[...]
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E16D3C]">
                  Results Announcement
                </p>
                <h3 className="text-2xl font-bold text-[#E8DDBF]">
                  Results have been announced
                </h3>
                <p className="text-sm text-[#E8DDBF]/80 leading-relaxed">
                  We are pleased to announce that the results have been finalized. All leaders have received their notification emails with further details.
                </p>
              </div>

              <button
                aria-label="Close announcement"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E16D3C]/40 text-[#E8DDBF] transition hover:border-[#E16D3C]/80 hover:text-white hover: shadow-[0_0_20p[...]
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm: items-center sm:justify-between">
              <div className="text-sm text-[#E8DDBF]/70">
                Thank you for your participation and dedication. We look forward to seeing you in future events.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
