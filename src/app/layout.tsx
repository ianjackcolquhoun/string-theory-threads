import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavigationHeader from "@/components/claude-header"
import MagicPlusTrail from "@/components/MagicPlusTrail"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "String Theory Threads",
  description: "Where quantum fashion meets cosmic style",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* Background Image - adjusted z-index and made it more specific */}
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
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        {/* Content wrapper */}
        <div className="relative min-h-screen">
          {/* Navigation Header */}
          <NavigationHeader />

          {/* Main content */}
          <main className="relative">{children}</main>

          {/* Mouse Trail */}
          <MagicPlusTrail />
        </div>
      </body>
    </html>
  )
}
