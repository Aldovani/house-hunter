import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '400', '700'],
  variable: '--poppins-font',
})

export const metadata: Metadata = {
  title: 'House-Hunter',
  description:
    'Encontre a casa dos seus sonhos em nossa plataforma intuitiva e amigável. Experimente agora!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={poppins.className}>
      <body>{children}</body>
    </html>
  )
}
