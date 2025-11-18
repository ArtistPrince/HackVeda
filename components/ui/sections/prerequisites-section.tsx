'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardStack } from '@/components/ui/CardStack'
import { X } from 'lucide-react'

// AWS Educate Courses Data - For All Section
interface Course {
  title: string
  duration: string
  badgeType?: string
  url: string
}

interface Module {
  name: string
  courses: Course[]
}

const awsEducateModules: Module[] = [
  {
    name: 'Cloud Computing',
    courses: [
      {
        title: 'Introduction to Cloud 101',
        duration: '3 hours',
        badgeType: 'B',
        url: 'https://awseducate.instructure.com/courses/891'
      },
      {
        title: 'Introduction to the AWS Management Console',
        duration: '1 hour',
        url: 'https://awseducate.instructure.com/courses/909'
      }
    ]
  },
  {
    name: 'AI/ML',
    courses: [
      {
        title: 'Machine Learning Foundations',
        duration: '3 hours',
        badgeType: 'B',
        url: 'https://awseducate.instructure.com/courses/910'
      },
      {
        title: 'Introduction to Generative Artificial Intelligence',
        duration: '0.75 hours',
        badgeType: 'B',
        url: 'https://awseducate.instructure.com/courses/1108'
      },
      {
        title: 'Introduction to Amazon Bedrock',
        duration: '0.75 hours',
        url: 'https://awseducate.instructure.com/courses/1103'
      },
      {
        title: 'Explore Artificial Intelligence',
        duration: '2 hours',
        url: 'https://awseducate.instructure.com/courses/549'
      },
      {
        title: 'Introduction to Responsible AI',
        duration: '0.75 hours',
        url: 'https://awseducate.instructure.com/courses/1107'
      }
    ]
  },
  {
    name: 'Agentic AI & RAG',
    courses: [
      {
        title: 'Introduction to Agentic AI',
        duration: '1.5 hours',
        url: 'https://skillbuilder.aws/learn/DNBD5MT8ZD/introduction-to-agentic-ai-on-aws/WAKAFK6UFY'
      },
      {
        title: 'Agentic AI Solutions with AWS Messaging Services - Amazon SNS, SQS, and MQ',
        duration: '2 hours',
        url: 'https://skillbuilder.aws/learn/C5CJHTEV9J/agentic-ai-solutions-with-aws-messaging-services--amazon-sns-sqs-and-mq/BNGE29AQFQ'
      }
    ]
  }
]
const ibmMandatoryModule: Module = {
  name: 'IBM SkillsBuild Course',
  courses: [
    {
      title: 'IBM SkillsBuild Learning Path',
      duration: 'Self-paced',
      url: 'https://skills.yourlearning.ibm.com/activity/PLAN-3897EAA7D08A'
    }
  ]
}
const mainCards = [
  {
    title: 'Cloud Computing',
    description: 'Learn cloud computing fundamentals and AWS basics',
    link: '#'
  },
  {
    title: 'AI/ML',
    description: 'Master Artificial Intelligence and Machine Learning',
    link: '#'
  },
  {
    title: 'Agentic AI & RAG',
    description: 'Explore Agentic AI and Retrieval-Augmented Generation',
    link: '#'
  },
  {
    title: 'IBM',
    description: 'Build with Intelligence: Transforming Learners into Innovators',
    link: '#'
  }
]

// AWS Skill Builder Courses Data - AS per Theme Section
const awsSkillBuilderModules: Module[] = [
  {
    name: 'Theme 1: Finance / Fintech',
    courses: [
      {
        title: 'Cloud Financial Management: FinOps fundamentals & strategies',
        duration: '1 hour',
        url: 'https://skillbuilder.aws/learn/YZYAV9M2UB/cloud-financial-management-finops-fundamentals--strategies-part-1/JG1XFPZQG1'
      }
    ]
  },
  {
    name: 'Theme 2: Healthcare',
    courses: [
      {
        title: 'Introduction to the Cloud for Clinicians',
        duration: '0.45 hours',
        url: 'https://skillbuilder.aws/learn/FK9XW216SD/introduction-to-the-cloud-for-clinicians/FBUF2UD2S7'
      },
      {
        title: 'Amazon HealthLake Getting Started',
        duration: '1 hour',
        url: 'https://skillbuilder.aws/learn/N8EEWKBQ5M/amazon-healthlake-getting-started/M4962QC3D1'
      }
    ]
  },
  {
    name: 'Theme 3: Sustainability',
    courses: [
      {
        title: 'Sustainability Strategies with Generative AI',
        duration: '1 hour',
        url: 'https://skillbuilder.aws/learn/QR8JDZU55U/sustainability-strategies-with-generative-ai/6VJ2N2NFCZ'
      }
    ]
  }
]

const themeCards = [
  {
    title: 'Finance / Fintech',
    description: 'Learn financial management and FinOps strategies',
    link: '#'
  },
  {
    title: 'Healthcare',
    description: 'Explore cloud solutions for healthcare industry',
    link: '#'
  },
  {
    title: 'Sustainability',
    description: 'Discover sustainability strategies with AI',
    link: '#'
  }
]

// Modal Component for Course Details
interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  modules: Module[]
  title: string
}

function CourseModal({ isOpen, onClose, modules, title }: CourseModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full w-full bg-gradient-to-br from-[#1A1A1A] to-[#2C3E50] border-2 border-[#E16D3C]/50 rounded-2xl p-6 md:p-8 overflow-y-auto backdrop-blur-md shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E16D3C]/30">
                <h2 className="text-3xl md:text-4xl font-bold text-[#E16D3C]">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#E16D3C]/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-[#E8DDBF]" />
                </button>
              </div>

              {/* Modules */}
              <div className="space-y-8">
                {modules.map((module, moduleIndex) => (
                  <motion.div
                    key={moduleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: moduleIndex * 0.1 }}
                    className="bg-gradient-to-br from-[#1A1A1A]/60 to-[#2C3E50]/60 border border-[#E16D3C]/30 rounded-xl p-6"
                  >
                    {/* Only show module name if there are multiple modules */}
                    {modules.length > 1 && (
                      <h3 className="text-2xl font-bold text-[#E8DDBF] mb-4 pb-2 border-b border-[#E16D3C]/20">
                        {module.name}
                      </h3>
                    )}
                    
                    {/* Course Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {module.courses.map((course, courseIndex) => (
                        <motion.div
                          key={courseIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (moduleIndex * 0.1) + (courseIndex * 0.05) }}
                          className="bg-gradient-to-br from-[#2C3E50]/40 to-[#1A1A1A]/40 border border-[#E16D3C]/20 rounded-lg p-4 hover:border-[#E16D3C]/50 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-semibold text-[#E8DDBF] flex-1">
                              {course.title}
                            </h4>
                            {course.badgeType && (
                              <span className="ml-2 px-2 py-1 bg-[#E16D3C]/20 text-[#E16D3C] text-xs font-bold rounded">
                                Badge {course.badgeType}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-[#E8DDBF]/70">
                              Duration: {course.duration}
                            </span>
                            <a
                              href={course.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-gradient-to-r from-[#E16D3C] to-[#2C3E50] text-white text-sm font-semibold rounded-lg hover:from-[#E16D3C] hover:to-[#E16D3C] transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                              Enroll Now
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function PrerequisitesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [modalTitle, setModalTitle] = useState('')

  // Handler for "For All" section
  const handleLearnMore = (cardTitle: string) => {
    // Find the module that matches the clicked card
    if (cardTitle === 'IBM') {
      setSelectedModule(ibmMandatoryModule)
      setModalTitle('IBM - Mandatory Learning')
      setIsModalOpen(true)
      return
    }
    const module = awsEducateModules.find(m => m.name === cardTitle)
    if (module) {
      setSelectedModule(module)
      setModalTitle(`${cardTitle} - AWS Educate`)
      setIsModalOpen(true)
    }
  }

  // Handler for "AS per Theme" section
  const handleThemeLearnMore = (cardTitle: string) => {
    // Map card titles to theme module names
    const themeNameMap: Record<string, string> = {
      'Finance / Fintech': 'Theme 1: Finance / Fintech',
      'Healthcare': 'Theme 2: Healthcare',
      'Sustainability': 'Theme 3: Sustainability'
    }
    
    const themeName = themeNameMap[cardTitle]
    const module = awsSkillBuilderModules.find(m => m.name === themeName)
    
    if (module) {
      setSelectedModule(module)
      setModalTitle(`AWS Skill Builder - ${cardTitle}`)
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <section
        id="prerequisites"
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
              Prerequisites
            </h2>
            <p className="text-[#E8DDBF] text-lg opacity-80 max-w-2xl mx-auto">
            For Education/Skill development Themes please look for suitable Online resources.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Left Box - For All */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#1A1A1A]/40 to-[#2C3E50]/40 border-2 border-[#E16D3C]/30 rounded-2xl p-8 backdrop-blur-sm shadow-xl hover:border-[#E16D3C]/50 transition-all duration-300"
            >
              <h3 className="text-3xl font-bold text-[#E16D3C] mb-8 text-center">Mandatory Learning for all participants</h3>
              <div className="overflow-x-auto pb-2">
              <div className="flex flex-col gap-6">
  {mainCards.map((card, idx) => (
    <div
      key={idx}
      className="w-full bg-gradient-to-br from-[#1A1A1A] to-[#2C3E50]
      border-2 border-[#E16D3C]/40 rounded-xl p-6 shadow-lg
      hover:shadow-2xl hover:border-[#E16D3C]/80
      transition-all duration-200 flex flex-col items-center cursor-pointer"
      onClick={() => handleLearnMore(card.title)}
    >
      <h3 className="text-xl font-bold text-[#E8DDBF] mb-2">{card.title}</h3>
      {card.description && (
        <p className="text-[#E8DDBF] text-sm opacity-80 mb-4 text-center">{card.description}</p>
      )}
      <button
        className="inline-flex items-center justify-center px-4 py-2 mt-2 bg-gradient-to-r from-[#E16D3C] to-[#2C3E50] text-white text-sm font-semibold rounded-lg hover:from-[#E16D3C] hover:to-[#E16D3C] transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Learn More
      </button>
    </div>
  ))}
</div>
</div>
            </motion.div>

            {/* Right Box - AS per Theme */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#1A1A1A]/40 to-[#2C3E50]/40 border-2 border-[#E16D3C]/30 rounded-2xl p-8 backdrop-blur-sm shadow-xl hover:border-[#E16D3C]/50 transition-all duration-300"
            >
              <h3 className="text-3xl font-bold text-[#E16D3C] mb-8 text-center">Themes based learning for participants</h3>
              <div className="flex flex-col gap-6">
  {themeCards.map((card, idx) => (
    <div
      key={idx}
      className="w-full bg-gradient-to-br from-[#1A1A1A] to-[#2C3E50]
      border-2 border-[#E16D3C]/40 rounded-xl p-6 shadow-lg
      hover:shadow-2xl hover:border-[#E16D3C]/80
      transition-all duration-200 flex flex-col items-center cursor-pointer"
      onClick={() => handleThemeLearnMore(card.title)}
    >
      <h3 className="text-xl font-bold text-[#E8DDBF] mb-2">{card.title}</h3>
      {card.description && (
        <p className="text-[#E8DDBF] text-sm opacity-80 mb-4 text-center">{card.description}</p>
      )}
      <button
        className="inline-flex items-center justify-center px-4 py-2 mt-2 bg-gradient-to-r from-[#E16D3C] to-[#2C3E50] text-white text-sm font-semibold rounded-lg hover:from-[#E16D3C] hover:to-[#E16D3C] transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Learn More
      </button>
    </div>
  ))}
</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Details Modal */}
      {selectedModule && (
        <CourseModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedModule(null)
          }}
          modules={[selectedModule]}
          title={modalTitle}
        />
      )}
    </>
  )
}

// Custom CardStack component that handles Learn More click
interface CardStackWithModalProps {
  cards: Array<{ title: string; description?: string; link: string }>
  onLearnMore: (cardTitle: string) => void
  className?: string
}

function CardStackWithModal({ cards, onLearnMore, className = '' }: CardStackWithModalProps) {
  const [activeIndex, setActiveIndex] = useState(1)

  const handleCardClick = (index: number) => {
    setActiveIndex(index)
  }

  const getCardTransform = (index: number) => {
    const isActive = index === activeIndex
    
    if (isActive) {
      return {
        translateX: 0,
        rotateY: 0,
        scale: 1.1,
        zIndex: 30,
        opacity: 1
      }
    }
    
    const nonActiveIndices = cards
      .map((_, i) => i)
      .filter(i => i !== activeIndex)
      .sort((a, b) => a - b)
    
    const isLeftCard = index === nonActiveIndices[0]
    
    if (isLeftCard) {
      return {
        translateX: -160,
        rotateY: 30,
        scale: 1,
        zIndex: 10,
        opacity: 0.5
      }
    } else {
      return {
        translateX: 160,
        rotateY: -30,
        scale: 1,
        zIndex: 10,
        opacity: 0.5
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
              ease: [0.68, -0.55, 0.27, 1.55]
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
                  ? 'bg-gradient-to-br from-[#1A1A1A] to-[#2C3E50] border-[#E16D3C]/50'
                  : 'bg-gradient-to-br from-[#2C3E50] to-[#E16D3C] border-[#E16D3C]/40'
              }`}
              whileHover={isActive ? { scale: 1.02 } : {}}
              style={{
                boxShadow: isActive
                  ? '0 20px 40px rgba(225, 109, 60, 0.3), 0 0 30px rgba(225, 109, 60, 0.2)'
                  : '0 8px 16px rgba(0, 0, 0, 0.2)',
                transformStyle: 'preserve-3d'
              }}
            >
              {isActive && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/60 to-[#2C3E50]/40 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#E16D3C]/20 to-transparent rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}

              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <h3 className="text-xl font-bold text-[#E8DDBF] mb-2">{card.title}</h3>
                {card.description && (
                  <p className="text-[#E8DDBF] text-sm opacity-80 mb-4">{card.description}</p>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onLearnMore(card.title)
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#E16D3C] to-[#2C3E50] text-white text-sm font-semibold rounded-lg hover:from-[#E16D3C] hover:to-[#E16D3C] transition-all duration-300 shadow-md hover:shadow-lg"
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
                </button>
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

