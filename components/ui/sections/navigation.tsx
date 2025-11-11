'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Timeline', id: 'timeline' },
  { name: 'Tracks', id: 'tracks' },
  { name: 'Sponsors', id: 'sponsors' },
  { name: 'Contact', id: 'contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#1A1A1A]/80 backdrop-blur-md border-b border-[#E16D3C]/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C3E50] to-[#E16D3C] flex items-center justify-center">
              <span className="text-[#E8DDBF] font-bold text-xl">H</span>
            </div>
            <span className="text-[#E8DDBF] font-bold text-xl hidden sm:block">HackVeda</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-[#E8DDBF] hover:text-[#E16D3C] transition-colors font-medium"
              >
                {item.name}
              </motion.button>
            ))}
            <a
              href="https://docs.google.com/forms/d/133p7aXCZ94o4gsDxPkMFi_r_UBDlU0TWQ8hCzC9SKhg/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <LiquidButton
                size="sm"
                className="relative font-semibold bg-gradient-to-r from-[#2C3E50] via-[#E16D3C] to-[#E8DDBF] text-white 
                  hover:from-[#E16D3C] hover:via-[#E8DDBF] hover:to-[#2C3E50]
                  transition-all duration-300
                  shadow-[0_0_15px_rgba(225,109,60,0.5),0_0_30px_rgba(232,221,191,0.3)]
                  hover:shadow-[0_0_20px_rgba(225,109,60,0.7),0_0_40px_rgba(232,221,191,0.5)]
                  hover:scale-105"
              >
                <span className="relative z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Register
                </span>
              </LiquidButton>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1A1A1A]/95 backdrop-blur-md border-t border-[#E16D3C]/20"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full text-left text-[#E8DDBF] hover:text-[#E16D3C] transition-colors py-2 font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
              <div className="pt-4">
                <a
                  href="https://docs.google.com/forms/d/133p7aXCZ94o4gsDxPkMFi_r_UBDlU0TWQ8hCzC9SKhg/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <LiquidButton
                    size="sm"
                    className="relative font-semibold bg-gradient-to-r from-[#2C3E50] via-[#E16D3C] to-[#E8DDBF] text-white 
                      hover:from-[#E16D3C] hover:via-[#E8DDBF] hover:to-[#2C3E50]
                      transition-all duration-300
                      shadow-[0_0_15px_rgba(225,109,60,0.5),0_0_30px_rgba(232,221,191,0.3)]
                      hover:shadow-[0_0_20px_rgba(225,109,60,0.7),0_0_40px_rgba(232,221,191,0.5)]
                      hover:scale-105 w-full"
                  >
                    <span className="relative z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      Register
                    </span>
                  </LiquidButton>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

