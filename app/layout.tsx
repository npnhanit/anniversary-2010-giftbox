import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🎁 Món quà đặc biệt 20/10',
  description: 'Một món quà bí mật dành cho em',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}



