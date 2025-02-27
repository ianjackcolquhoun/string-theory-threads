"use client"
import { usePathname } from "next/navigation"
import { Inter } from "next/font/google"
import "./globals.css"
import NavigationHeader from "@/components/claude-header"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* Background Image section - moved to bottom of DOM order */}
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
          {pathname !== "/pages/checkout" && (
            <div className="relative z-50">
              {" "}
              {/* Added z-index container */}
              <NavigationHeader />
            </div>
          )}

          <main className="relative z-30">{children}</main>
        </div>
      </body>
    </html>
  )
}
