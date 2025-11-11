# HackVeda Landing Page - Project Structure

## 📁 Final Folder Structure

```
hackveda/
├── app/
│   ├── globals.css          # Global styles with scroll-snap, fonts, custom scrollbar
│   ├── layout.tsx           # Root layout with Google Fonts (Poppins & Orbitron)
│   └── page.tsx             # Main page with all sections
│
├── components/
│   └── ui/
│       ├── sections/        # All landing page sections
│       │   ├── navigation.tsx      # Fixed header with dropdown menu
│       │   ├── home-section.tsx     # Home section with 3D robot & event details
│       │   ├── about-section.tsx   # About section with features
│       │   ├── timeline-section.tsx # Timeline with competition rounds
│       │   ├── tracks-section.tsx   # Tracks section (Cybersecurity, FinTech, Healthcare)
│       │   ├── sponsors-section.tsx # Sponsors & Contact section
│       │   └── footer.tsx          # Footer with links and contact info
│       │
│       ├── card.tsx         # shadcn Card component
│       ├── demo.tsx         # Original demo component (can be removed)
│       ├── splite.tsx       # SplineScene component wrapper
│       └── spotlight.tsx    # Spotlight effect component
│
├── lib/
│   └── utils.ts            # Utility functions (cn for className merging)
│
├── package.json            # Dependencies including Spline, Framer Motion, Lucide Icons
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind with custom theme and animations
├── postcss.config.js       # PostCSS configuration
└── next.config.js          # Next.js configuration
```

## 🎯 Component Usage

### Main Page (`app/page.tsx`)

The main page imports and renders all sections in order:

```tsx
'use client'

import { Navigation } from '@/components/ui/sections/navigation'
import { HomeSection } from '@/components/ui/sections/home-section'
import { AboutSection } from '@/components/ui/sections/about-section'
import { TimelineSection } from '@/components/ui/sections/timeline-section'
import { TracksSection } from '@/components/ui/sections/tracks-section'
import { SponsorsSection } from '@/components/ui/sections/sponsors-section'
import { Footer } from '@/components/ui/sections/footer'

export default function Home() {
  return (
    <div className="relative">
      <Navigation />
      <HomeSection />
      <AboutSection />
      <TimelineSection />
      <TracksSection />
      <SponsorsSection />
      <Footer />
    </div>
  )
}
```

### SplineScene Component (`components/ui/splite.tsx`)

The SplineScene component uses lazy loading for optimal performance:

```tsx
'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
```

**Usage in sections:**
```tsx
<SplineScene
  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
  className="w-full h-full"
/>
```

## 🎨 Features Implemented

### ✅ Scroll Snap Behavior
- Each section takes full viewport height (`min-h-screen`)
- Smooth scroll-snap with `scroll-snap-type: y mandatory`
- Sections snap to start on scroll

### ✅ Framer Motion Animations
- Fade-in animations on scroll (`whileInView`)
- Hover effects on interactive elements
- Staggered animations for lists
- Smooth transitions between sections

### ✅ Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Navigation menu collapses on mobile
- Touch-friendly interactions

### ✅ Dark Futuristic Theme
- Background: `#0a0a0a` (deep black)
- Accent: `#7e22ce` (purple glow)
- Text: `#e5e5e5` (light gray)
- Glassmorphism effects with backdrop blur
- Gradient backgrounds and borders

### ✅ Navigation
- Fixed header with smooth scroll to sections
- Mobile dropdown menu
- Active state on scroll
- Smooth transitions

## 📦 Dependencies

### Core Dependencies
- `next` - Next.js 14 framework
- `react` & `react-dom` - React library
- `typescript` - TypeScript support

### UI & Animation
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `tailwindcss` - Utility-first CSS
- `tailwindcss-animate` - Animation utilities

### 3D Components
- `@splinetool/react-spline` - React wrapper for Spline
- `@splinetool/runtime` - Spline runtime

### Utilities
- `clsx` - Conditional className utility
- `tailwind-merge` - Merge Tailwind classes

## 🚀 Running the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Visit `http://localhost:3000`

## 🎯 Section IDs for Navigation

- `#home` - Home section
- `#about` - About section
- `#timeline` - Timeline section
- `#tracks` - Tracks section
- `#sponsors` - Sponsors section
- `#contact` - Contact section (within sponsors section)

## 📝 Customization

### Change Spline Scene
Update the `scene` prop in any section:
```tsx
<SplineScene
  scene="YOUR_SPLINE_SCENE_URL"
  className="w-full h-full"
/>
```

### Modify Colors
Update Tailwind config or use inline styles:
- Purple accent: `#7e22ce`
- Background: `#0a0a0a`
- Text: `#e5e5e5`

### Add New Section
1. Create component in `components/ui/sections/`
2. Import and add to `app/page.tsx`
3. Add navigation link in `navigation.tsx`

## 🎨 Styling Notes

- All sections use `min-h-screen` for full viewport height
- Scroll-snap is applied globally via CSS
- Framer Motion handles all animations
- Responsive breakpoints: `sm:`, `md:`, `lg:`
- Custom scrollbar styled with purple accent

## 📱 Mobile Considerations

- Navigation collapses to hamburger menu
- Sections stack vertically on mobile
- Touch-friendly button sizes
- Optimized 3D scene loading
- Reduced animations on mobile for performance

