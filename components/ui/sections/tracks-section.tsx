'use client'

import { motion } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Shield, DollarSign, Heart, ArrowRight } from 'lucide-react'

const tracks = [
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protect systems, applications, and data from threats. Build for digital safety and resilience.',
  },
  {
    icon: DollarSign,
    title: 'FinTech',
    description: 'Develop tools to revolutionize finance — from payments to investments and beyond.',
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Create solutions to make healthcare more accessible, efficient, and intelligent.',
  },
]

export function TracksSection() {
  return (
    <section
      id="tracks"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1A1A1A]/95 snap-start"
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - 3D Robot */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[300px] md:h-[350px] lg:h-[400px] relative"
          >
            
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-[#E8DDBF] mb-3"
              >
                Tracks
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#E8DDBF] text-base opacity-80"
              >
                Choose your battlefield. Solve real-world challenges under these exciting domains.
              </motion.p>
            </div>

            {/* Track Cards */}
            <div className="space-y-3">
              {tracks.map((track, idx) => {
                const Icon = track.icon
                return (
                  <motion.div
                    key={track.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(225, 109, 60, 0.5)' }}
                    className="bg-gradient-to-br from-[#2C3E50]/10 to-[#E16D3C]/10 border border-[#E16D3C]/30 rounded-lg p-4 backdrop-blur-sm group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E16D3C]/20 flex items-center justify-center border border-[#E16D3C]/30 group-hover:bg-[#E16D3C]/40 transition-colors">
                        <Icon className="w-5 h-5 text-[#E16D3C]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#E8DDBF] mb-1">{track.title}</h3>
                        <p className="text-[#E8DDBF] mb-2 text-sm opacity-70">{track.description}</p>
                        <button className="flex items-center gap-2 text-[#E8DDBF] hover:text-[#E16D3C] transition-colors group-hover:gap-3 text-sm">
                          Learn More <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

