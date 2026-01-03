'use client'

import { motion } from 'framer-motion'
import Orb from '@/components/ui/Orb'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function HomeSection() {
  const [daysLeft, setDaysLeft] = useState(0)
  const [eventCountdown, setEventCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateDaysLeft = () => {
      const registrationDate = new Date('2026-01-10T23:59:59')
      const today = new Date()
      const diffTime = registrationDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysLeft(diffDays > 0 ? diffDays : 0)
    }

    const calculateEventCountdown = () => {
      // Set event date: January 29, 2026 at midnight (local time)
      // Month is 0-indexed (0 = January, 11 = December)
      const eventDate = new Date(2026, 0, 29, 0, 0, 0)
      const now = new Date()
      const diffTime = eventDate.getTime() - now.getTime()

      console.log('Event Date:', eventDate)
      console.log('Now:', now)
      console.log('Diff Time (ms):', diffTime)
      console.log('Diff Time (days):', diffTime / (1000 * 60 * 60 * 24))

      if (diffTime > 0) {
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diffTime % (1000 * 60)) / 1000)

        console.log('Countdown:', { days, hours, minutes, seconds })
        setEventCountdown({ days, hours, minutes, seconds })
      } else {
        // If event date has passed, show 0s
        console.log('Event date has passed or is invalid')
        setEventCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateDaysLeft()
    calculateEventCountdown()

    const registrationInterval = setInterval(calculateDaysLeft, 1000 * 60 * 60) // Update every hour
    const eventInterval = setInterval(calculateEventCountdown, 1000) // Update every second

    return () => {
      clearInterval(registrationInterval)
      clearInterval(eventInterval)
    }
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent snap-start"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,109,60,0.1),transparent_50%)] z-[1]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative flex flex-col items-center justify-center min-h-[700px] md:min-h-[900px]">
          {/* Orb - Behind Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1.0, scale: 1.4 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute z-[2] pointer-events-none"
            style={{
              left: '23%',  // Adjust this value to move left/right (e.g., '5%', '15%', '50%', '20px')
              top: '15%',   // Adjust this value to move up/down (e.g., '40%', '60%', '100px')
              transform: 'translateY(-50%)' // Centers vertically based on top position
            }}
          >
            <div className="h-[600px] md:h-[700px] lg:h-[700px] w-[600px] md:w-[700px] lg:w-[700px] relative">
              <Orb
                hoverIntensity={0.5}
                rotateOnHover={true}
                hue={0}
                forceHoverState={false}
              />
            </div>
          </motion.div>

          {/* Content - On Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-center w-full max-w-4xl relative z-[3]"
          >
            {/* 1. IILM University Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <Image
                src="/partners/iilm.png"
                alt="IILM University"
                width={400}
                height={130}
                className="object-contain rounded-sm"
                priority
                unoptimized
              />
            </motion.div>

            {/* 2. In Collaboration With */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[#E8DDBF] text-sm font-medium opacity-80"
            >
              in collaboration with
            </motion.p>

            {/* 3. IBM Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(225,109,60,0.5)' }}
              className="bg-gradient-to-br from-[#2C3E50]/20 to-[#E16D3C]/20 border border-[#E16D3C]/30 rounded-lg p-6 backdrop-blur-sm w-fit mx-auto min-w-[200px] h-[100px] flex items-center justify-center"
            >
              <div className="relative h-24 w-60">
                <Image
                  src="/partners/ibm.png.jpg"
                  alt="IBM"
                  fill
                  className="object-contain"
                  sizes="240px"
                  priority
                  unoptimized
                />
              </div>
            </motion.div>

            {/* 4. Presents */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-[#E8DDBF] text-sm font-medium opacity-80 pt-4"
            >
              presents
            </motion.p>

            {/* 5. HackVeda Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#E8DDBF] via-[#E16D3C] to-[#2C3E50] bg-clip-text text-transparent"
            >
              HackVeda
            </motion.h1>

            {/* 6. Content/Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-xl md:text-2xl text-[#E8DDBF] font-medium"
            >
              A national-level hackathon pushing the boundaries of innovation.
            </motion.p>

            {/* Event Countdown Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="pt-0"
            >
              <p className="text-[#E8DDBF] text-sm font-medium opacity-80 mb-4">Event starts in</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="bg-gradient-to-br from-[#2C3E50]/30 to-[#E16D3C]/30 border border-[#E16D3C]/40 rounded-lg px-6 py-4 backdrop-blur-sm min-w-[80px]">
                  <div className="text-[#E16D3C] text-3xl font-bold">{String(eventCountdown.days).padStart(2, '0')}</div>
                  <div className="text-[#E8DDBF] text-xs opacity-80 mt-1">Days</div>
                </div>
                <div className="bg-gradient-to-br from-[#2C3E50]/30 to-[#E16D3C]/30 border border-[#E16D3C]/40 rounded-lg px-6 py-4 backdrop-blur-sm min-w-[80px]">
                  <div className="text-[#E16D3C] text-3xl font-bold">{String(eventCountdown.hours).padStart(2, '0')}</div>
                  <div className="text-[#E8DDBF] text-xs opacity-80 mt-1">Hours</div>
                </div>
                <div className="bg-gradient-to-br from-[#2C3E50]/30 to-[#E16D3C]/30 border border-[#E16D3C]/40 rounded-lg px-6 py-4 backdrop-blur-sm min-w-[80px]">
                  <div className="text-[#E16D3C] text-3xl font-bold">{String(eventCountdown.minutes).padStart(2, '0')}</div>
                  <div className="text-[#E8DDBF] text-xs opacity-80 mt-1">Minutes</div>
                </div>
                <div className="bg-gradient-to-br from-[#2C3E50]/30 to-[#E16D3C]/30 border border-[#E16D3C]/40 rounded-lg px-6 py-4 backdrop-blur-sm min-w-[80px]">
                  <div className="text-[#E16D3C] text-3xl font-bold">{String(eventCountdown.seconds).padStart(2, '0')}</div>
                  <div className="text-[#E8DDBF] text-xs opacity-80 mt-1">Seconds</div>
                </div>
              </div>
            </motion.div>

            {/* 7. Registration Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="pt-2 flex flex-col items-center gap-4"
            >
              <a
                href="https://forms.gle/ddaZoa56aXnf4rpe8"
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
                  transition={{ duration: 0.6, delay: 1.8 }}
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
        </div>
      </div>
    </section>
  )
}

