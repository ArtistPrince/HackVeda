'use client'

import React from 'react'
import Shuffle from '@/components/ui/Shuffle'
import GlareHover from '@/components/ui/GlareHover'
import '@/components/ui/GetInTouch.css'

export function ContactSection() {
  const handleEmailClick = () => {
    window.location.href = 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new', '_blank'
  }

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/hackathon_iilm/', '_blank')
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent snap-start py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="git-container" aria-label="Get in touch section">
          <div className="git-left">
            <div className="git-heading-wrapper">
              <Shuffle
                text="Get in touch"
                tag="h2"
                className="git-heading"
                textAlign="left"
                duration={0.35}
                stagger={0.03}
                triggerOnHover={true}
                loop={false}
              />
            </div>
          </div>

          <aside className="git-right">
            <GlareHover 
              className="git-glare-wrap" 
              style={{ width: '100%' }} 
              glareOpacity={0.06} 
              glareSize={140} 
              background="transparent" 
              borderRadius="1rem"
            >
              <div className="contact-card" role="article" aria-label="Contact card">
                <div className="contact-top">
                  <div className="avatar" aria-hidden>
                    {/* simple person icon */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="white" fillOpacity="0.95"/>
                      <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="contact-details">
                    <h4>Mr. Priyansh Singh </h4>
                    <p>Student Coordinator, IILM University</p>
                    <p style={{ marginTop: "0.45rem", fontSize: "0.88rem" }}>+91 9910000000</p>
                  </div>
                </div>

                <div className="contact-middle">
                  <div style={{ fontSize: '0.95rem', color: '#E8DDBF' }}>
                    priyansh.singh.csibm26@iilm.edu
                  </div>
                </div>
              </div>
            </GlareHover>

            <div className="small-card-row">
              <GlareHover 
                style={{ width: '100%' }} 
                glareOpacity={0.08} 
                glareSize={120} 
                background="transparent" 
                borderRadius="1rem"
              >
                <div className="contact-card" style={{ display: 'flex', cursor: 'pointer' }} onClick={handleEmailClick}>
                  <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center', width: '100%' }}>
                    <div className="icon-wrap" style={{ background: 'rgba(225, 109, 60, 0.2)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <path d="m22 6-10 7L2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    </div>
                    <div className="label">Email me</div>
                  </div>
                </div>
              </GlareHover>

              <GlareHover 
                style={{ width: '100%' }} 
                glareOpacity={0.12} 
                glareSize={120} 
                background="transparent" 
                borderRadius="1rem"
              >
                <div className="contact-card" style={{ display: 'flex', cursor: 'pointer' }} onClick={handleInstagramClick}>
                  <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center', width: '100%' }}>
                    <div className="icon-wrap" style={{ background: 'linear-gradient(135deg, #E16D3C, #2C3E50)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <path d="M8 12c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
                      </svg>
                    </div>
                    <div className="label">Instagram</div>
                  </div>
                </div>
              </GlareHover>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

