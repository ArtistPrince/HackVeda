'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedList from '@/components/ui/AnimatedList'
import '@/components/ui/sections/ResultsTable.css'
import { Navigation } from '@/components/ui/sections/navigation'
import { Footer } from '@/components/ui/sections/footer'
import BackgroundMeshEffect from '@/components/ui/BackgroundMeshEffect'

interface ResultItem {
    id: number
    leader: string
    institution: string
    theme: string
}

const resultData: ResultItem[] = [
    { id: 1, leader: "Harsheen Kour", institution: "Model Institute of Engineering and Technology (MIET), Jammu", theme: "Health Care including Well-being" },
    { id: 2, leader: "Bhoomi Bhardwaj", institution: "Inderprastha engineering college Ghaziabad", theme: "Education/Skill Development" },
    { id: 3, leader: "Piyush Singh", institution: "Babu Banarasi Das Northern India Institute of Technology", theme: "Education/Skill Development" },
    { id: 4, leader: "Aasthik Upadhyay", institution: "University of Petroleum and Energy Studies", theme: "Education/Skill Development" },
    { id: 5, leader: "Aayush Prabhakar", institution: "Inderprastha Engineering College", theme: "Health Care including Well-being" },
    { id: 6, leader: "Akshat", institution: "IILM University, Greater Noida", theme: "Education/Skill Development" },
    { id: 7, leader: "Anamta Ahmed", institution: "Integral University Lucknow", theme: "Education/Skill Development" },
    { id: 8, leader: "Ananya Chakravorty", institution: "University of Petroleum and Energy Studies", theme: "Finance & Financial Products" },
    { id: 9, leader: "Anchita Labh", institution: "IILM UNIVERSITY", theme: "Finance & Financial Products" },
    { id: 10, leader: "Anjali Bharti", institution: "Amity University", theme: "Education/Skill Development" },
    { id: 11, leader: "Annu Tiwari", institution: "IILM University Greater Noida", theme: "Health Care including Well-being" },
    { id: 12, leader: "Anubhav saxena", institution: "babu banarasi das university", theme: "Health Care including Well-being" },
    { id: 13, leader: "Archisha Ranjan", institution: "IILM UNIVERSITY", theme: "Finance & Financial Products" },
    { id: 14, leader: "Arpita pandey", institution: "Geu", theme: "Education/Skill Development" },
    { id: 15, leader: "Atharv Sharma", institution: "University of petroleum and energy studies", theme: "Health Care including Well-being" },
    { id: 16, leader: "Atrayee Nag", institution: "Techno India University", theme: "Finance & Financial Products" },
    { id: 17, leader: "Ainaan Raza", institution: "Integral University Lucknow", theme: "Finance & Financial Products" },
    { id: 18, leader: "Deepjyoti Das", institution: "Dr. Akhilesh Das Gupta Institute of Professional Studies", theme: "Education/Skill Development" },
    { id: 19, leader: "Devanshi Jain", institution: "University of Petroleum and Energy Studies", theme: "Finance & Financial Products" },
    { id: 20, leader: "Md Dilshad Akram", institution: "Techno India University", theme: "Education/Skill Development" },
    { id: 21, leader: "Gaurav Mehta", institution: "IILM UNIVERSITY GURUGRAM", theme: "Education/Skill Development" },
    { id: 22, leader: "Gaurav Kumar SIngh", institution: "IILM UNIVERSITY GREATER NOIDA", theme: "Education/Skill Development" },
    { id: 23, leader: "Manish Gupta", institution: "Graphic Era (deemed to be) University", theme: "Education/Skill Development" },
    { id: 24, leader: "Hifza Amir", institution: "IILM University", theme: "Clean Energy & Sustainability" },
    { id: 25, leader: "Hiten Gupta", institution: "University of Petroleum and Energy Studies (UPES)", theme: "Clean Energy & Sustainability" },
    { id: 26, leader: "Jeevika Khanna", institution: "IILM University", theme: "Health Care including Well-being" },
    { id: 27, leader: "Khushi", institution: "Indira Gandhi Delhi Technical University For Women", theme: "Finance & Financial Products" },
    { id: 28, leader: "Krishna Bisht", institution: "UPES", theme: "Education/Skill Development" },
    { id: 29, leader: "Krishna Rathod", institution: "GLS University", theme: "Clean Energy & Sustainability" },
    { id: 30, leader: "Manvi kaushik", institution: "Meerut institute of engineering and technology", theme: "Education/Skill Development" },
    { id: 31, leader: "RITISH MISHRA", institution: "Babu Banarasi Das University", theme: "Education/Skill Development" },
    { id: 32, leader: "Nida Fatima", institution: "IILM University", theme: "Clean Energy & Sustainability" },
    { id: 33, leader: "ROHAN VIJ", institution: "IILM University", theme: "Health Care including Well-being" },
    { id: 34, leader: "Rohit Das", institution: "Arka Jain University", theme: "Clean Energy & Sustainability" },
    { id: 35, leader: "Sneha yadav", institution: "IILM UNIVERSITY GREATER NOIDA", theme: "Clean Energy & Sustainability" },
    { id: 36, leader: "Sommya Jain", institution: "Indira Gandhi Delhi Technical University for Women", theme: "Finance & Financial Products" },
    { id: 37, leader: "Tanishq Chauhan", institution: "UPES Dehradun", theme: "Health Care including Well-being" },
    { id: 38, leader: "Vinay semwal", institution: "UPES", theme: "Clean Energy & Sustainability" },
    { id: 39, leader: "Vinit Kumar", institution: "Amity University", theme: "Education/Skill Development" },
]

const AnimatedTableRow = ({ item, index, isSelected, onMouseEnter, onClick }: {
    item: ResultItem
    index: number
    isSelected: boolean
    onMouseEnter: () => void
    onClick: () => void
}) => {
    return (
        <div
            data-index={index}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            className="results-row-wrapper"
        >
            <div className={`results-row ${isSelected ? 'selected' : ''}`}>
                <div className="results-cell">
                    <span className="cell-text leader-text">{item.leader}</span>
                </div>
                <div className="results-cell">
                    <span className="cell-text institution-text">{item.institution}</span>
                </div>
                <div className="results-cell">
                    <span className="cell-text theme-text">{item.theme}</span>
                </div>
            </div>
        </div>
        </div >
    )
}

export default function ResultsPage() {
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const handleItemSelect = (item: ResultItem, index: number) => {
        setSelectedIndex(index)
        console.log('Selected:', item)
    }

    return (
        <div className="relative min-h-screen">
            <BackgroundMeshEffect />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navigation />

                <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-12 text-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-[#E8DDBF] mb-4">
                                Round 1 Results
                            </h1>
                            <p className="text-[#E8DDBF] text-opacity-80 text-lg">
                                Shortlisted teams for the next round
                            </p>
                        </motion.div>

                        <div className="results-table-container">
                            {/* Table Header */}
                            <div className="results-table-header">
                                <div className="results-header-item">
                                    <span className="header-text">TEAM LEADER</span>
                                </div>
                                <div className="results-header-item">
                                    <span className="header-text">INSTITUTION</span>
                                </div>
                                <div className="results-header-item">
                                    <span className="header-text">THEME</span>
                                </div>
                            </div>

                            {/* Animated Table Rows */}
                            <AnimatedList
                                className="results-list-container"
                                showGradients={true}
                                enableArrowNavigation={true}
                                displayScrollbar={true}
                                selectedIndex={selectedIndex}
                                setSelectedIndex={setSelectedIndex}
                                items={resultData as any[]} // AnimatedList expects specific shape but it handles generics loosely often. Casting to any[] to avoid strict type mismatch if AnimatedList works slightly differently, assuming standard usage based on TimelineSection.
                                onItemSelect={(item, index) => handleItemSelect(item as ResultItem, index)}
                            >
                                {resultData.map((item, index) => (
                                    <AnimatedTableRow
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        isSelected={selectedIndex === index}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        onClick={() => handleItemSelect(item, index)}
                                    />
                                ))}
                            </AnimatedList>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}
