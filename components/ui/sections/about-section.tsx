'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import '../MagicBento.css'

// Particle creation helper
const createParticleElement = (x: number, y: number, color = '225, 109, 60') => {
  const el = document.createElement('div')
  el.className = 'particle'
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

// ParticleCard wrapper component
interface ParticleCardWrapperProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  particleCount?: number
  enableTilt?: boolean
  enableMagnetism?: boolean
  clickEffect?: boolean
}

const ParticleCardWrapper = ({
  children,
  className = '',
  glowColor = '225, 109, 60',
  particleCount = 12,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true
}: ParticleCardWrapperProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLElement[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLElement[]>([])
  const particlesInitialized = useRef(false)
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null)

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    magnetismAnimationRef.current?.kill()
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle)
        }
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return
    if (!particlesInitialized.current) {
      initializeParticles()
    }
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return
        const clone = particle.cloneNode(true) as HTMLElement
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        })
        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        })
      }, index * 100)
      timeoutsRef.current.push(timeoutId)
    })
  }, [initializeParticles])

  useEffect(() => {
    if (!cardRef.current) return
    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      animateParticles()
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        })
      }
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        })
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05
        const magnetY = (y - centerY) * 0.05
        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      )
      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `
      element.appendChild(ripple)
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      )
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('click', handleClick)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('click', handleClick)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles, enableTilt, enableMagnetism, clickEffect, glowColor])

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  )
}

// Icon components
const PrizeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const InnovationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CollaborationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const RecognitionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LearningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Global Spotlight Component
const GlobalSpotlight = ({
  gridRef,
  glowColor = '225, 109, 60',
  spotlightRadius = 300
}: {
  gridRef: React.RefObject<HTMLDivElement>
  glowColor?: string
  spotlightRadius?: number
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const isInsideSection = useRef(false)

  useEffect(() => {
    if (!gridRef?.current) return

    const spotlight = document.createElement('div')
    spotlight.className = 'global-spotlight'
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `
    document.body.appendChild(spotlight)
    spotlightRef.current = spotlight

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return
      const section = gridRef.current.closest('section')
      const rect = section?.getBoundingClientRect()
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

      isInsideSection.current = mouseInside || false

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
        return
      }

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      })

      gsap.to(spotlightRef.current, {
        opacity: 0.6,
        duration: 0.2,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      isInsideSection.current = false
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current)
    }
  }, [gridRef, glowColor, spotlightRadius])

  return null
}

export function AboutSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent snap-start py-20 bento-section"
    >
      <GlobalSpotlight gridRef={gridRef} glowColor="225, 109, 60" spotlightRadius={300} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#E8DDBF] mb-4">
            About <span className="text-[#E16D3C]">HackVeda</span>
          </h2>
        </motion.div>

        <div ref={gridRef} className="space-y-6">
          {/* Top Row - Two Large Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prize Pool Card - Green */}
            <ParticleCardWrapper
              glowColor="34, 197, 94"
              particleCount={12}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative group rounded-2xl bg-gradient-to-br from-[#0a1a0a] to-[#0d2e0d] border-2 border-green-500/50 p-8 backdrop-blur-sm overflow-hidden w-full h-full"
                style={{
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.3), inset 0 0 60px rgba(34, 197, 94, 0.1)'
                }}
              >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="mb-6 w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500/50">
                  <div className="text-green-400">
                    <PrizeIcon />
                  </div>
                </div>
                <h3 className="text-green-400 text-lg font-semibold mb-3">Prize Pool</h3>
                <p className="text-green-300 text-base md:text-lg font-semibold leading-relaxed">Prizes and goodies for the winners</p>
              </div>
              </motion.div>
            </ParticleCardWrapper>

            {/* Registration Free Card - Purple */}
            <ParticleCardWrapper
              glowColor="168, 85, 247"
              particleCount={12}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group rounded-2xl bg-gradient-to-br from-[#1a0a1a] to-[#2e0d2e] border-2 border-purple-500/50 p-8 backdrop-blur-sm overflow-hidden w-full h-full"
                style={{
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 60px rgba(168, 85, 247, 0.1)'
                }}
              >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="mb-6 w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center border-2 border-purple-500/50">
                  <div className="text-purple-400">
                    <CheckIcon />
                  </div>
                </div>
                <h3 className="text-purple-400 text-lg font-semibold mb-3">No registration cost</h3>
                <p className="text-purple-300 text-4xl md:text-5xl font-bold">100% FREE</p>
              </div>
              </motion.div>
            </ParticleCardWrapper>
          </div>

          {/* Bottom Row - Four Smaller Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Innovation Card - Blue */}
            <ParticleCardWrapper
              glowColor="59, 130, 246"
              particleCount={10}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative group rounded-xl bg-gradient-to-br from-[#0a0f1a] to-[#0d152e] border-2 border-blue-500/50 p-6 backdrop-blur-sm overflow-hidden w-full h-full"
                style={{
                  boxShadow: '0 0 25px rgba(59, 130, 246, 0.3), inset 0 0 50px rgba(59, 130, 246, 0.1)'
                }}
              >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4 w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                  <div className="text-blue-400">
                    <InnovationIcon />
                  </div>
                </div>
                <h3 className="text-blue-400 text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Build groundbreaking solutions that can shape the future and solve real-world problems.
                </p>
              </div>
              </motion.div>
            </ParticleCardWrapper>

            {/* Collaboration Card - Orange */}
            <ParticleCardWrapper
              glowColor="249, 115, 22"
              particleCount={10}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative group rounded-xl bg-gradient-to-br from-[#1a0f0a] to-[#2e150d] border-2 border-orange-500/50 p-6 backdrop-blur-sm overflow-hidden w-full h-full"
                style={{
                  boxShadow: '0 0 25px rgba(249, 115, 22, 0.3), inset 0 0 50px rgba(249, 115, 22, 0.1)'
                }}
              >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4 w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/50">
                  <div className="text-orange-400">
                    <CollaborationIcon />
                  </div>
                </div>
                <h3 className="text-orange-400 text-xl font-bold mb-3">Collaboration</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Work alongside talented developers, designers, and mentors from across the nation.
                </p>
              </div>
              </motion.div>
            </ParticleCardWrapper>

            {/* Recognition Card - Yellow */}
            <ParticleCardWrapper
              glowColor="234, 179, 8"
              particleCount={10}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative group rounded-xl bg-gradient-to-br from-[#1a1a0a] to-[#2e2e0d] border-2 border-yellow-500/50 p-6 backdrop-blur-sm overflow-hidden w-full h-full"
                style={{
                  boxShadow: '0 0 25px rgba(234, 179, 8, 0.3), inset 0 0 50px rgba(234, 179, 8, 0.1)'
                }}
              >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4 w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50">
                  <div className="text-yellow-400">
                    <RecognitionIcon />
                  </div>
                </div>
                <h3 className="text-yellow-400 text-xl font-bold mb-3">Recognition</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Gain national recognition and connect with industry leaders and potential employers.
                </p>
              </div>
              </motion.div>
            </ParticleCardWrapper>

            {/* Learning Card - Teal */}
            <ParticleCardWrapper
              glowColor="20, 184, 166"
              particleCount={10}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative group rounded-xl bg-gradient-to-br from-[#0a1a1a] to-[#0d2e2e] border-2 border-teal-500/50 p-6 backdrop-blur-sm overflow-hidden w-full h-full"
                style={{
                  boxShadow: '0 0 25px rgba(20, 184, 166, 0.3), inset 0 0 50px rgba(20, 184, 166, 0.1)'
                }}
              >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4 w-12 h-12 rounded-lg bg-teal-500/20 flex items-center justify-center border border-teal-500/50">
                  <div className="text-teal-400">
                    <LearningIcon />
                  </div>
                </div>
                <h3 className="text-teal-400 text-xl font-bold mb-3">Learning</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Access workshops, mentorship sessions, and resources to enhance your skills and knowledge.
                </p>
              </div>
              </motion.div>
            </ParticleCardWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}

