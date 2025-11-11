'use client'

import { motion } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Globe, FileText, Trophy, Calendar, MapPin, Clock, Rocket } from 'lucide-react'

const rounds = [
  {
    title: 'Round 1',
    subtitle: 'Online Round Evaluation',
    items: [
      { icon: Globe, text: 'Virtual Participation' },
      { icon: FileText, text: 'Project Evaluation' },
      { icon: Trophy, text: 'Qualifying Round' },
    ],
    description: 'Submit your innovative solutions for evaluation',
  },
  {
    title: 'Round 2',
    subtitle: 'Grand Finale (Offline)',
    items: [
      { icon: Calendar, text: 'January 28th - 30th, 2026' },
      { icon: MapPin, text: 'IILM University, Greater Noida' },
      { icon: Clock, text: '36 Hours Intensive' },
      { icon: Rocket, text: 'Build, Present & Win' },
    ],
    description: 'The ultimate showdown of innovation and creativity',
  },
]

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent snap-start"
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#E8DDBF]"
            >
              HackVerse Competition <span className="text-[#E16D3C]">Rounds</span>
            </motion.h2>

            {/* Timeline Divider */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E16D3C] via-[#E8DDBF] to-[#E16D3C]" />

              {rounds.map((round, roundIdx) => (
                <motion.div
                  key={round.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: roundIdx * 0.3 }}
                  className="mb-6 relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-9 top-2 w-3 h-3 rounded-full bg-[#E16D3C] border-2 border-[#1A1A1A] shadow-lg shadow-[#E16D3C]/50" />

                  <div className="bg-gradient-to-br from-[#2C3E50]/10 to-[#E16D3C]/10 border border-[#E16D3C]/30 rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-[#E8DDBF] mb-1">{round.title}</h3>
                    <p className="text-[#E8DDBF] font-semibold mb-3 text-sm opacity-80">{round.subtitle}</p>

                    <div className="space-y-2 mb-3">
                      {round.items.map((item, itemIdx) => {
                        const Icon = item.icon
                        return (
                          <motion.div
                            key={itemIdx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: roundIdx * 0.3 + itemIdx * 0.1 }}
                            className="flex items-center gap-2 text-[#E8DDBF] text-sm opacity-80"
                          >
                            <Icon className="w-4 h-4 text-[#E16D3C]" />
                            <span>{item.text}</span>
                          </motion.div>
                        )
                      })}
                    </div>

                    <p className="text-[#E8DDBF] text-xs italic opacity-70">{round.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - 3D Robot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[300px] md:h-[350px] lg:h-[400px] relative"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

