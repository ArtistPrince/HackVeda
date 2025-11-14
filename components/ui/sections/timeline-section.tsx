'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedList from '@/components/ui/AnimatedList'
import './TimelineTable.css'

interface TimelineItem {
  id: number
  date: string
  description: string
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: '15 Nov',
    description: 'Registrations open'
  },
  {
    id: 2,
    date: '05 Jan',
    description: 'Registrations close'
  },
  {
    id: 3,
    date: '4 Dec - 4 Jan',
    description: 'Online pre-learning (AWS, IBM + theme)'
  },
  {
    id: 4,
    date: '5 - 9 Jan',
    description: 'Enablement sessions (AWS, IBM Gen AI, 60–90 min/day)'
  },
  {
    id: 5,
    date: '10 - 16 Jan',
    description: 'Idea submission'
  },
  {
    id: 6,
    date: '20 Jan',
    description: 'Shortlist teams announcement (30 teams)'
  },
  {
    id: 7,
    date: '21 - 27 Jan',
    description: 'Online office hours for shortlisted teams'
  },
  {
    id: 8,
    date: '28 Jan',
    description: 'Environment setup & access support (online)'
  },
  {
    id: 9,
    date: '29 - 30 Jan',
    description: 'Hackathon at IILM University, Greater Noida (physical)'
  }
]

const AnimatedTableRow = ({ item, index, delay, isSelected, onMouseEnter, onClick }: {
  item: TimelineItem
  index: number
  delay: number
  isSelected: boolean
  onMouseEnter: () => void
  onClick: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: false })

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="timeline-row-wrapper"
    >
      <div className={`timeline-row ${isSelected ? 'selected' : ''}`}>
        <div className="timeline-date">
          <span className="date-text">{item.date}</span>
        </div>
        <div className="timeline-description">
          <span className="description-text">{item.description}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function TimelineSection() {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleItemSelect = (item: TimelineItem, index: number) => {
    setSelectedIndex(index)
    console.log('Selected:', item)
  }

  return (
    <section
      id="timeline"
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
            Timeline
          </h2>
        </motion.div>

        <div className="timeline-table-container">
          {/* Table Header */}
          <div className="timeline-table-header">
            <div className="timeline-header-date">
              <span className="header-text">DATE</span>
            </div>
            <div className="timeline-header-description">
              <span className="header-text">DESCRIPTION</span>
            </div>
          </div>

          {/* Animated Table Rows */}
          <AnimatedList
            className="timeline-list-container"
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex} // <--- This is the fix
            items={timelineData}}
            onItemSelect={handleItemSelect}
          >
            {timelineData.map((item, index) => (
              <AnimatedTableRow
                key={item.id}
                item={item}
                index={index}
                delay={index * 0.1}
                isSelected={selectedIndex === index}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => handleItemSelect(item, index)}
              />
            ))}
          </AnimatedList>
        </div>
      </div>
    </section>
  )
}
