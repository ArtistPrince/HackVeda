'use client'

import { motion } from 'framer-motion'
import ThemeCard from '@/components/ui/ThemeCard'

const hackathonThemes = [
  {
    title: 'Finance & Financial Products',
    description: 'Innovate solutions for banking, payments, investments, and financial services. Build cutting-edge fintech applications that revolutionize how people manage money, invest, and access financial products.',
    iconUrl: null,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&q=80',
    behindGlowColor: 'rgba(76, 175, 80, 0.67)',
    innerGradient: 'linear-gradient(145deg, rgba(76, 175, 80, 0.2) 0%, rgba(56, 142, 60, 0.1) 100%)'
  },
  {
    title: 'Health Care including Well-being',
    description: 'Develop technologies to improve healthcare delivery and personal wellness. Create innovative solutions for telemedicine, health monitoring, mental health support, and preventive care systems.',
    iconUrl: null,
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&q=80',
    behindGlowColor: 'rgba(33, 150, 243, 0.67)',
    innerGradient: 'linear-gradient(145deg, rgba(33, 150, 243, 0.2) 0%, rgba(25, 118, 210, 0.1) 100%)'
  },
  {
    title: 'Education/Skill Development',
    description: 'Create tools and platforms for learning, training, and skill enhancement. Build educational technologies that make learning accessible, engaging, and effective for learners of all ages.',
    iconUrl: null,
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80',
    behindGlowColor: 'rgba(156, 39, 176, 0.67)',
    innerGradient: 'linear-gradient(145deg, rgba(156, 39, 176, 0.2) 0%, rgba(123, 31, 162, 0.1) 100%)'
  },
  {
    title: 'Clean Energy & Sustainability',
    description: 'Build solutions for renewable energy, environmental protection, and sustainable practices. Develop technologies that help reduce carbon footprint and promote eco-friendly living.',
    iconUrl: null,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&q=80',
    behindGlowColor: 'rgba(255, 193, 7, 0.67)',
    innerGradient: 'linear-gradient(145deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 152, 0, 0.1) 100%)'
  }
]

export function ThemesSection() {
  const handleThemeClick = (title: string) => {
    console.log('Theme clicked:', title)
    // You can add navigation or modal logic here
  }

  return (
    <section
      id="themes"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent snap-start py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#F1F5F9] mb-4">
            Themes
          </h2>
          <p className="text-[#F1F5F9] text-lg opacity-80 max-w-2xl mx-auto">
            Explore innovative solutions across diverse domains. Choose a theme that inspires you to create something extraordinary.
          </p>
        </motion.div>

        <div className="themes-container">
          {hackathonThemes.map((theme, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ThemeCard
                title={theme.title}
                description={theme.description}
                iconUrl={theme.iconUrl}
                imageUrl={theme.imageUrl}
                behindGlowColor={theme.behindGlowColor}
                innerGradient={theme.innerGradient}
                onClick={handleThemeClick}
                className="theme-card-item"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

