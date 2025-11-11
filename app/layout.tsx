import type { Metadata } from 'next'
import { Poppins, Orbitron } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/ui/custom-cursor'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const orbitron = Orbitron({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HackVeda - National Level Hackathon',
  description: 'A national-level hackathon pushing the boundaries of innovation. Hosted by IILM University.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${orbitron.variable}`}>
      <body className="font-poppins antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
