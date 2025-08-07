import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js + FastAPI Stack',
  description: 'A modern web application built with Next.js frontend and FastAPI backend',
  keywords: ['nextjs', 'fastapi', 'react', 'python', 'docker', 'typescript'],
  authors: [{ name: 'Stack Template' }],
  openGraph: {
    title: 'Next.js + FastAPI Stack',
    description: 'A modern web application stack template',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
