'use client'

import { Navigation } from '@/components/ui/sections/navigation'
import { HomeSection } from '@/components/ui/sections/home-section'
import { AboutSection } from '@/components/ui/sections/about-section'
import { TimelineSection } from '@/components/ui/sections/timeline-section'
import { ResultSection } from '@/components/ui/sections/result-section'
import { ScheduleSection } from '@/components/ui/sections/schedule-section'
import { ThemesSection } from '@/components/ui/sections/themes-section'
import { PrerequisitesSection } from '@/components/ui/sections/prerequisites-section'
import { RoundsSection } from '@/components/ui/sections/rounds-section'
import { ContactSection } from '@/components/ui/sections/contact-section'
import { Footer } from '@/components/ui/sections/footer'

import BackgroundMeshEffect from '@/components/ui/BackgroundMeshEffect'
import { IdeaSubmissionPopup } from '@/components/ui/idea-submission-popup'

export default function Home() {
  return (
    <div className="relative">
      <IdeaSubmissionPopup />
      <BackgroundMeshEffect />
      <div className="relative z-10">
        <Navigation />
        <HomeSection />
        <AboutSection />
        <TimelineSection />
        <ResultSection />
        <ScheduleSection />
        <ThemesSection />
        <PrerequisitesSection />
        <RoundsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  )
}
