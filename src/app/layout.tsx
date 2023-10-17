import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "@/src/components/Navbar";
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar />
      <main>
        {children}
      </main>
      </body>
    </html>
  )
}
