'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Instagram } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const sponsors = [
  'xxxx Bank',
  'IBM ',
  'AWS',
  'IILM University',
]

export function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1A1A1A]/95 snap-start"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Sponsors Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#E8DDBF] mb-4">
              Our <span className="text-[#E16D3C]">Sponsors</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sponsors.map((sponsor, idx) => (
                <motion.div
                  key={sponsor}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(225, 109, 60, 0.5)' }}
                  className="bg-gradient-to-br from-[#2C3E50]/20 to-[#E16D3C]/20 border border-[#E16D3C]/30 rounded-lg p-4 backdrop-blur-sm h-24 flex items-center justify-center"
                >
                  <span className="text-[#E8DDBF] font-semibold text-xs text-center">
                    {sponsor}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Registration Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-4"
          >
            <h3 className="text-xl font-bold text-[#E8DDBF]">Register Your Team</h3>
            <a
              href="https://docs.google.com/forms/d/133p7aXCZ94o4gsDxPkMFi_r_UBDlU0TWQ8hCzC9SKhg/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <LiquidButton
                size="lg"
                className="relative font-bold bg-gradient-to-r from-[#2C3E50] via-[#E16D3C] to-[#E8DDBF] text-white 
                  hover:from-[#E16D3C] hover:via-[#E8DDBF] hover:to-[#2C3E50]
                  transition-all duration-300
                  shadow-[0_0_20px_rgba(225,109,60,0.5),0_0_40px_rgba(232,221,191,0.3),0_0_60px_rgba(44,62,80,0.2)]
                  hover:shadow-[0_0_30px_rgba(225,109,60,0.7),0_0_60px_rgba(232,221,191,0.5),0_0_90px_rgba(44,62,80,0.3)]
                  hover:scale-105"
              >
                <span className="relative z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Register Now
                </span>
              </LiquidButton>
            </a>
            <p className="text-[#E8DDBF] text-xs opacity-60">
              For more updates on Hackathon and events, follow us on:
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-[#2C3E50]/10 to-[#E16D3C]/10 border border-[#E16D3C]/30 rounded-lg p-6 backdrop-blur-sm space-y-4"
          >
            <h3 className="text-xl font-bold text-[#E8DDBF] text-center">Get in Touch</h3>

            <div className="space-y-3 text-center">
              <div>
                <p className="text-[#E8DDBF] font-semibold text-base">Mr. Priyansh Singh</p>
                <p className="text-[#E8DDBF] text-sm opacity-70">Student Coordinator, HackVeda</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-center gap-2 text-[#E8DDBF] text-sm opacity-80">
                  <Phone className="w-3 h-3 text-[#E16D3C]" />
                  <span>+91 9910000000</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#E8DDBF] text-sm opacity-80">
                  <Mail className="w-3 h-3 text-[#E16D3C]" />
                  <span className="text-xs break-all">priyansh.singh.csibm26@iilm.edu</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#E8DDBF] text-sm opacity-80">
                  <Mail className="w-3 h-3 text-[#E16D3C]" />
                  <span className="text-xs">hackversemitb@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#E8DDBF] text-sm opacity-80">
                  <Instagram className="w-3 h-3 text-[#E16D3C]" />
                  <span>@iilm.edu</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

