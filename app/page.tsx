'use client'

import { Navigation } from '@/components/ui/sections/navigation'
import { HomeSection } from '@/components/ui/sections/home-section'
import { AboutSection } from '@/components/ui/sections/about-section'
import { TimelineSection } from '@/components/ui/sections/timeline-section'
import { TracksSection } from '@/components/ui/sections/tracks-section'
import { SponsorsSection } from '@/components/ui/sections/sponsors-section'
import { Footer } from '@/components/ui/sections/footer'
//import { BackgroundPathsOnly } from '@/components/ui/background-paths'
//import { EtherealShadow } from '@/components/ui/etheral-shadow'
import BackgroundMeshEffect from "@/components/ui/BackgroundMeshEffect";
      export default function Home() {
        return (
          <div className="relative">
    {/* Fixed Background - BackgroundPathsOnly */}
    {/*<BackgroundPathsOnly /> */}
          <BackgroundMeshEffect />
            {/* Content that scrolls over the background */}
            <div className="relative z-10">
              <Navigation />
              <HomeSection />
              <AboutSection />
        <TimelineSection />
        <TracksSection />
        {/*<SponsorsSection />*/}
        <Footer />
      </div>
    </div>
  )
}
