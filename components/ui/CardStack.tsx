'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Card {
  title: string
  description?: string
  link: string
}

interface CardStackProps {
  cards: Card[]
  className?: string
}

export function CardStack({ cards, className = '' }: CardStackProps) {
  const [activeIndex, setActiveIndex] = useState(1) // Start with middle card (index 1) active

  const handleCardClick = (index: number) => {
    setActiveIndex(index)
  }

  const getCardTransform = (index: number) => {
    const isActive = index === activeIndex
    
    if (isActive) {
      // Active Card (Center) - 100% opacity, centered
      return {
        translateX: 0,
        rotateY: 0,
        scale: 1.1,
        zIndex: 30,
        opacity: 1
      }
    }
    
    // Get all non-active card indices
    const nonActiveIndices = cards
      .map((_, i) => i)
      .filter(i => i !== activeIndex)
      .sort((a, b) => a - b) // Sort by index to maintain order
    
    // Determine if this card should be on left or right
    // Left card is the one with lower index, right card is the one with higher index
    const isLeftCard = index === nonActiveIndices[0]
    
    if (isLeftCard) {
      // Left Card - Always on left with rotateY 30
      return {
        translateX: -160,
        rotateY: 30,
        scale: 1,
        zIndex: 10,
        opacity: 0.5 // Reduced intensity
      }
    } else {
      // Right Card - Always on right with rotateY -30
      return {
        translateX: 160,
        rotateY: -30,
        scale: 1,
        zIndex: 10,
        opacity: 0.5 // Reduced intensity
      }
    }
  }

  return (
    <div
      className={`relative w-full h-[600px] flex items-center justify-center ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {cards.map((card, index) => {
        const transform = getCardTransform(index)
        const isActive = index === activeIndex

        return (
          <motion.div
            key={index}
            className="absolute w-64 h-80 cursor-pointer"
            initial={false}
            animate={{
              x: `calc(-50% + ${transform.translateX}px)`,
              y: '-50%',
              rotateY: transform.rotateY,
              scale: transform.scale,
              opacity: transform.opacity
            }}
            transition={{
              duration: 0.7,
              ease: [0.68, -0.55, 0.27, 1.55] // cubic-bezier for spring effect
            }}
            onClick={() => handleCardClick(index)}
            style={{
              left: '50%',
              top: '50%',
              zIndex: transform.zIndex,
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div
              className={`h-full w-full border rounded-xl p-6 backdrop-blur-sm relative overflow-hidden shadow-lg ${
                isActive
                  ? 'bg-gradient-to-br from-[#020617] to-[#1E293B] border-[#CBD5E1]/50'
                  : 'bg-gradient-to-br from-[#1E293B] to-[#CBD5E1] border-[#CBD5E1]/40'
              }`}
              whileHover={isActive ? { scale: 1.02 } : {}}
              style={{
                boxShadow: isActive
                  ? '0 20px 40px rgba(225, 109, 60, 0.3), 0 0 30px rgba(225, 109, 60, 0.2)'
                  : '0 8px 16px rgba(0, 0, 0, 0.2)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Dark overlay for active card */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#020617]/60 to-[#1E293B]/40 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              {/* Glow effect for active card */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#CBD5E1]/20 to-transparent rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <h3 className="text-xl font-bold text-[#F1F5F9] mb-2">{card.title}</h3>
                {card.description && (
                  <p className="text-[#F1F5F9] text-sm opacity-80 mb-4">{card.description}</p>
                )}
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#CBD5E1] to-[#1E293B] text-white text-sm font-semibold rounded-lg hover:from-[#CBD5E1] hover:to-[#CBD5E1] transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

