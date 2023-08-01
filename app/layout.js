import './globals.css'
import { Inter } from 'next/font/google'
import { store } from '@components/app/store';
import { ReduxWrapper } from '@components/ReduxWrapper';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OCMC',
  description: 'The Ontario Competitive Mathematics Committee',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <ReduxWrapper>
            {children}
          </ReduxWrapper>
        </body>
    </html>
  )
}
