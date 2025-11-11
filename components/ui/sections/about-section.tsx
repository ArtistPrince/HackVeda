'use client'

import { motion } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Trophy, DollarSign, Lightbulb, Users, Award } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Drive creativity through impactful solutions.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Work together to solve real-world challenges.',
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Gain visibility, experience, and opportunities.',
  },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent snap-start"
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - 3D Robot (Statue Mode) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[400px] lg:h-[600px] relative"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full opacity-80"
            />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[#E8DDBF]"
            >
              About <span className="text-[#E16D3C]">HackVeda</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#E8DDBF] text-lg leading-relaxed opacity-80"
            >
              HackVeda is a national-level hackathon where innovation meets collaboration. 
              Hosted by IILM University, this event encourages students to build impactful 
              solutions to real-world challenges.
            </motion.p>

            {/* Prize Pool and Registration Fee */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(225, 109, 60, 0.5)' }}
                className="bg-gradient-to-br from-[#2C3E50]/20 to-[#E16D3C]/20 border border-[#E16D3C]/30 rounded-lg p-6 backdrop-blur-sm"
              >
                <Trophy className="w-8 h-8 text-[#E16D3C] mb-2" />
                <h3 className="text-[#E8DDBF] font-semibold text-lg mb-1">Prize Pool</h3>
                <p className="text-[#E8DDBF] text-sm opacity-70">Exciting rewards await</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(225, 109, 60, 0.5)' }}
                className="bg-gradient-to-br from-[#2C3E50]/20 to-[#E16D3C]/20 border border-[#E16D3C]/30 rounded-lg p-6 backdrop-blur-sm"
              >
                <DollarSign className="w-8 h-8 text-[#E16D3C] mb-2" />
                <h3 className="text-[#E8DDBF] font-semibold text-lg mb-1">Registration Fee</h3>
                <p className="text-[#E8DDBF] text-sm opacity-70">Free for all participants</p>
              </motion.div>
            </div>

            {/* Feature Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(225, 109, 60, 0.4)' }}
                    className="bg-gradient-to-br from-[#2C3E50]/10 to-[#E16D3C]/10 border border-[#E16D3C]/20 rounded-lg p-4 backdrop-blur-sm"
                  >
                    <Icon className="w-6 h-6 text-[#E16D3C] mb-2" />
                    <h4 className="text-[#E8DDBF] font-semibold mb-1">{feature.title}</h4>
                    <p className="text-[#E8DDBF] text-sm opacity-70">{feature.description}</p>
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

