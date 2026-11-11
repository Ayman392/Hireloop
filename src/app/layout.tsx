import {
  Geist,
  Geist_Mono,
  Instrument_Sans,
  Inter_Tight,
  Manrope,
  Plus_Jakarta_Sans,
  Space_Mono,
} from "next/font/google"
import localFont from "next/font/local"

import "@workspace/ui/globals.css"
import { Toaster } from "@workspace/ui/components/toast"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
})

const spaceMono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-space-mono",
})

const satoshi = localFont({
  src: "../fonts/satoshi-regular.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-satoshi",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark",
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        manrope.variable,
        instrumentSans.variable,
        plusJakartaSans.variable,
        interTight.variable,
        spaceMono.variable,
        satoshi.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Toaster>{children}</Toaster>
        </ThemeProvider>
      </body>
    </html>
  )
}
