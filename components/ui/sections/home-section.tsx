'use client'

import { motion } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function HomeSection() {
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    const calculateDaysLeft = () => {
      const registrationDate = new Date('2025-01-05T23:59:59')
      const today = new Date()
      const diffTime = registrationDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysLeft(diffDays > 0 ? diffDays : 0)
    }

    calculateDaysLeft()
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60) // Update every hour
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#1A1A1A]/95 snap-start"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,109,60,0.1),transparent_50%)] z-[1]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#E8DDBF] via-[#E16D3C] to-[#2C3E50] bg-clip-text text-transparent"
            >
              HackVeda
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-[#E8DDBF] font-medium"
            >
              A national-level hackathon pushing the boundaries of innovation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-[#E8DDBF] text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-80"
            >
              Join us for an extraordinary journey where creativity meets technology. 
              Build innovative solutions, collaborate with peers, and make a lasting impact.
            </motion.p>

            {/* Presented By Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 1 }}
  className="pt-8 space-y-4"
>
<p className="text-[#E8DDBF] text-sm font-medium opacity-80 inline-flex items-center gap-2">
  <span className="text-[#E16D3C]">Presented</span> by
  <span className="inline-flex items-center">
    <Image
      src="/partners/iilm.jpg"
      alt="IILM University"
      width={140}
      height={40}
      className="object-contain rounded-sm"
      priority
      unoptimized
    />
  </span>
  in collaboration with
</p>

  <div className="flex items-center justify-center lg:justify-start gap-6 flex-wrap">
    {[
      { alt: 'IBM', src: '/partners/ibm.png.jpg' },       // change to '/partners/ibm.png.jpg' if that’s your exact file
      { alt: 'AWS', src: '/partners/aws.png.jpg' },       // change to your exact AWS filename
    ].map((logo, idx) => (
      <motion.div
        key={logo.alt}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 + idx * 0.1 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(225,109,60,0.5)' }}
        className="bg-gradient-to-br from-[#2C3E50]/20 to-[#E16D3C]/20 border border-[#E16D3C]/30 rounded-lg p-6 backdrop-blur-sm min-w-[160px] h-[80px] flex items-center justify-center"
      >
        <div className="relative h-16 w-40">
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            className="object-contain"
            sizes="112px"
            priority
            unoptimized
          />
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

            {/* Registration Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="pt-6 flex flex-col items-center lg:items-start gap-4"
            >
              <a
                href="https://docs.google.com/forms/d/133p7aXCZ94o4gsDxPkMFi_r_UBDlU0TWQ8hCzC9SKhg/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <LiquidButton
                  size="xl"
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

              {/* Countdown Timer */}
              {daysLeft > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="bg-gradient-to-br from-[#2C3E50]/20 to-[#E16D3C]/20 border border-[#E16D3C]/30 rounded-lg p-4 backdrop-blur-sm"
                >
                  <p className="text-[#E8DDBF] text-sm opacity-80 mb-1">Registration closes in</p>
                  <p className="text-[#E16D3C] text-2xl font-bold">
                    {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                  </p>
                  <p className="text-[#E8DDBF] text-xs opacity-60 mt-1">Deadline: January 5th, 2025</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Robot */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-[500px] md:h-[650px] lg:h-[800px] relative order-1 lg:order-2"
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

