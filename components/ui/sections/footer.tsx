'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Instagram } from 'lucide-react'

const quickLinks = [
  { name: 'About', id: 'about' },
  { name: 'Timeline', id: 'timeline' },
  { name: 'Tracks', id: 'tracks' },
  { name: 'Prizes', id: 'about' },
  { name: 'Register', id: 'sponsors' },
  { name: 'Partners', id: 'sponsors' },
  { name: 'Contact', id: 'contact' },
]

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="relative bg-[#1A1A1A] border-t border-[#E16D3C]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-[#E8DDBF] mb-2">HackVeda</h3>
            <p className="text-[#E8DDBF] text-sm leading-relaxed opacity-80">
              A national-level hackathon hosted by IILM with support from IBM and AWS — 
              where innovation meets impact.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-[#E8DDBF]">Explore</h4>
            <div className="flex flex-wrap gap-4">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ scale: 1.1, color: '#E16D3C' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#E8DDBF] hover:text-[#E16D3C] transition-colors text-sm opacity-80"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-[#E8DDBF]">Contact Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[#E8DDBF] opacity-80">
                <Mail className="w-4 h-4 text-[#E16D3C]" />
                <span>hackveda@iilm.edu</span>
              </div>
              <div className="flex items-center gap-2 text-[#E8DDBF] opacity-80">
                <Phone className="w-4 h-4 text-[#E16D3C]" />
                <span>+91 9910000000</span>
              </div>
              <motion.a
                href="https://www.instagram.com/hackathon_iilm/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: '#E16D3C' }}
                className="flex items-center gap-2 text-[#E8DDBF] hover:text-[#E16D3C] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>@hackathon_iilm</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-[#E16D3C]/20 text-center text-[#E8DDBF] text-sm opacity-60"
        >
          <p>&copy; 2025 HackVeda. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

