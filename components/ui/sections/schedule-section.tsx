'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

const scheduleData = [
    {
        date: '5th Jan',
        time: '6:00 - 7:30 pm',
        speaker: 'Vrunda Gadesha',
        topic: 'Granite 4.0'
    },
    {
        date: '6th Jan',
        time: '6:00 - 7:30 pm',
        speaker: 'Dhinesh RajaGopalan',
        topic: 'Langflow'
    },
    {
        date: '7th Jan',
        time: '6:00 - 7:30 pm',
        speaker: 'Ajeet Dubey, Sr. Solution Architect',
        topic: 'Agentic AI'
    },
    {
        date: '8th Jan',
        time: '6:00 - 7:30 pm',
        speaker: 'Tarun Sachdeva, Sr. Solution Architect',
        topic: 'RAG'
    }
]

export function ScheduleSection() {
    return (
        <section
            id="schedule"
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
                        Enablement Sessions
                    </h2>
                    <p className="text-[#E8DDBF] text-lg opacity-80 max-w-2xl mx-auto">
                        Join our expert-led sessions to gear up for the hackathon.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-[#1A1A1A]/95 to-[#2C3E50]/95 border border-[#E16D3C]/20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                        {/* Header */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-[#E16D3C]/10 border-b border-[#E16D3C]/20 text-[#E16D3C] font-semibold hidden md:grid">
                            <div>Date</div>
                            <div>Time</div>
                            <div>Speaker</div>
                            <div>Topic</div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-[#E16D3C]/10">
                            {scheduleData.map((session, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 hover:bg-[#E16D3C]/5 transition-colors group"
                                >
                                    <div className="flex items-center gap-3 text-[#E8DDBF] font-medium">
                                        <Calendar className="w-5 h-5 text-[#E16D3C] md:hidden" />
                                        <span className="md:hidden text-[#E16D3C] w-20">Date:</span>
                                        {session.date}
                                    </div>
                                    <div className="flex items-center gap-3 text-[#E8DDBF]/80">
                                        <span className="md:hidden text-[#E16D3C] w-20">Time:</span>
                                        {session.time}
                                    </div>
                                    <div className="flex items-center gap-3 text-[#E8DDBF]">
                                        <span className="md:hidden text-[#E16D3C] w-20">Speaker:</span>
                                        {session.speaker}
                                    </div>
                                    <div className="flex items-center gap-3 text-[#E16D3C] font-semibold">
                                        <span className="md:hidden text-[#E16D3C] w-20">Topic:</span>
                                        {session.topic}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
