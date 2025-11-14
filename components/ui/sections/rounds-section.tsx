'use client'

import { motion } from 'framer-motion'
import RoundCard from '@/components/ui/RoundCard'

const hackathonRounds = [
  {
    title: 'Registration',
    description: 'Register for the hackathon and secure your spot. Complete your profile, form your team, and get ready to build innovative solutions. Early registration ensures you have access to all resources and mentorship opportunities.',
    iconUrl: null,
    date: '15-November 2025',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
    buttonText: 'Register Now',
    behindGlowColor: 'rgba(76, 175, 80, 0.67)',
    innerGradient: 'linear-gradient(145deg, rgba(76, 175, 80, 0.2) 0%, rgba(56, 142, 60, 0.1) 100%)'
  },
  {
    title: 'Idea Submission',
    description: 'Submit your innovative idea and showcase your solution. Upload your project details, documentation, and presentation materials. Make sure to meet all submission requirements and deadlines to be eligible for evaluation.',
    iconUrl: null,
    date: '10-16 January 2026',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80',
    buttonText: 'Submit Idea',
    behindGlowColor: 'rgba(33, 150, 243, 0.67)',
    innerGradient: 'linear-gradient(145deg, rgba(33, 150, 243, 0.2) 0%, rgba(25, 118, 210, 0.1) 100%)'
  },
  {
    title: 'Shortlist Teams Announcement',
    description: 'Witness the announcement of winners and outstanding projects. Our expert judges evaluate all submissions based on innovation, technical excellence, and impact. Celebrate the achievements of all participants.',
    iconUrl: null,
    date: '20-January 2026',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop&q=80',
    buttonText: null,
    behindGlowColor: 'rgba(156, 39, 176, 0.67)',
    innerGradient: 'linear-gradient(145deg, rgba(156, 39, 176, 0.2) 0%, rgba(123, 31, 162, 0.1) 100%)'
  },
  {
    title: 'Invitation to the Hackathon for Shortlisted Teams',
    description: 'Receive your official invitation to participate in the hackathon. Get access to exclusive resources, mentorship sessions, and networking opportunities. Join us for an exciting journey of innovation and collaboration.',
    iconUrl: null,
    date: '29-30 January 2026',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&q=80',
    buttonText: null,
    behindGlowColor: 'rgba(255, 193, 7, 0.67)',
    innerGradient: 'linear-gradient(145deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 152, 0, 0.1) 100%)'
  }
]

export function RoundsSection() {
  const handleRoundClick = (roundTitle: string) => {
    console.log('Round clicked:', roundTitle)
    // You can add navigation or modal logic here
  }

  const handleButtonClick = (roundTitle: string) => {
    console.log('Button clicked for:', roundTitle)
    if (roundTitle === 'Registration') {
      // Redirect to registration form
      window.open('https://forms.gle/ddaZoa56aXnf4rpe8', '_blank')
    } else if (roundTitle === 'Idea Submission') {
      // Add submission logic here - you can update this with your actual submission URL
      window.open('https://forms.gle/rGea47kzxKqpzPLj8', '_blank')
      // Or show an alert: alert('Idea submission portal will be available soon!')
    }
  }

  return (
    <section
      id="rounds"
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
          <h2 className="text-4xl md:text-5xl font-bold text-[#E8DDBF] mb-4">
            Rounds
          </h2>
          <p className="text-[#E8DDBF] text-lg opacity-80 max-w-2xl mx-auto">
            Follow the journey from registration to victory. Each round brings new challenges and opportunities to showcase your innovation.
          </p>
        </motion.div>

        <div className="themes-container">
          {hackathonRounds.map((round, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <RoundCard
                title={round.title}
                description={round.description}
                date={round.date}
                iconUrl={round.iconUrl}
                imageUrl={round.imageUrl}
                behindGlowColor={round.behindGlowColor}
                innerGradient={round.innerGradient}
                buttonText={round.buttonText}
                onClick={handleRoundClick}
                onButtonClick={handleButtonClick}
                className="theme-card-item"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

