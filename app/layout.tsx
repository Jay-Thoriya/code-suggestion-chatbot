import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Code Performance Analyzer',
  description: 'Analyze and improve your code with AI suggestions',
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

