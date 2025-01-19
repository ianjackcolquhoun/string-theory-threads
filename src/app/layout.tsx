"use client"
import { useState } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavigationHeader from "@/components/claude-header"
import MagicPlusTrail from "@/components/MagicPlusTrail"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "String Theory Threads",
//   description: "Where quantum fashion meets cosmic style",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isHoveringNav, setIsHoveringNav] = useState(false)

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* Background Image section */}
        <div
          className="fixed inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/string.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            zIndex: -1,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        <div className="relative min-h-screen">
          <div
            onMouseEnter={() => setIsHoveringNav(true)}
            onMouseLeave={() => setIsHoveringNav(false)}
          >
            <NavigationHeader />
          </div>

          <main className="relative">{children}</main>

          <MagicPlusTrail disabled={isHoveringNav} />
        </div>
      </body>
    </html>
  )
}
