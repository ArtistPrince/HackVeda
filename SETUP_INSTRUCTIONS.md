# Project Setup Instructions

This project has been set up with the shadcn/ui structure, TypeScript, and Tailwind CSS. Follow these instructions to complete the setup.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Project Structure

The project follows the shadcn/ui convention:
- `/components/ui` - UI components (shadcn style)
- `/lib` - Utility functions (e.g., `cn` function for className merging)

### Why `/components/ui`?

The `/components/ui` folder is the standard location for shadcn/ui components. This structure:
- Keeps UI components organized and separate from page-specific components
- Follows shadcn/ui conventions for easy component management
- Makes it easy to add/remove components using the shadcn CLI

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React and Next.js
- TypeScript
- Tailwind CSS
- Spline 3D components (`@splinetool/runtime`, `@splinetool/react-spline`)
- Framer Motion (for animations)
- Utility libraries (`clsx`, `tailwind-merge`)

### 2. Verify Project Structure

Ensure you have the following structure:
```
hackveda/
├── app/
│   └── globals.css
├── components/
│   └── ui/
│       ├── card.tsx
│       ├── demo.tsx
│       ├── splite.tsx
│       └── spotlight.tsx
├── lib/
│   └── utils.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

### 3. Create Next.js App Structure (if needed)

If you don't have an `app` directory yet, create it:

```bash
mkdir app
```

Then create `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HackVeda',
  description: 'Interactive 3D UI Components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

And `app/page.tsx` to use the component:

```tsx
import { SplineSceneBasic } from '@/components/ui/demo'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <SplineSceneBasic />
    </main>
  )
}
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Component Usage

### Using the SplineSceneBasic Component

```tsx
import { SplineSceneBasic } from '@/components/ui/demo'

export default function MyPage() {
  return <SplineSceneBasic />
}
```

### Using Individual Components

```tsx
import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'

export default function MyComponent() {
  return (
    <Card>
      <Spotlight fill="white" />
      <SplineScene scene="YOUR_SPLINE_SCENE_URL" />
    </Card>
  )
}
```

## Additional Setup with shadcn CLI (Optional)

If you want to use the shadcn CLI to manage components:

1. Initialize shadcn/ui:
```bash
npx shadcn-ui@latest init
```

2. When prompted:
   - Style: Default
   - Base color: Slate
   - CSS variables: Yes

3. Add more components as needed:
```bash
npx shadcn-ui@latest add [component-name]
```

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors about `@/` imports:
- Ensure `tsconfig.json` has the correct paths configuration
- Restart your TypeScript server in your IDE

### Tailwind Not Working

- Ensure `globals.css` is imported in your root layout
- Check that `tailwind.config.ts` includes all your component paths
- Restart the dev server after changing Tailwind config

### Spline Component Not Loading

- Ensure you have a valid Spline scene URL
- Check browser console for CORS or loading errors
- The component uses lazy loading, so it may take a moment to load

## Dependencies Installed

- `@splinetool/runtime` - Spline runtime
- `@splinetool/react-spline` - React wrapper for Spline
- `framer-motion` - Animation library
- `clsx` - Conditional className utility
- `tailwind-merge` - Merge Tailwind classes
- `tailwindcss-animate` - Animation utilities for Tailwind

## Next Steps

1. Customize the Spline scene URL in `components/ui/demo.tsx`
2. Adjust styling and colors in `tailwind.config.ts`
3. Add more components as needed
4. Deploy your application

