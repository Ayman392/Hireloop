"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { cn } from "@workspace/ui/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "#browse-jobs" },
  { label: "Company", href: "#company" },
  { label: "Pricing", href: "#pricing" },
]

export function SiteNavbar() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 w-full px-6 pt-6">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[74px] w-full max-w-[1320px] items-center justify-between gap-4 rounded-[16px] bg-[#222222] pl-6"
      >
        <Link
          href="/"
          aria-label="HireLoop home"
          className="relative block h-11 w-[154px] shrink-0"
        >
          <Image
            src="/hireloop-logo.png"
            alt="HireLoop"
            fill
            sizes="154px"
            priority
            className="object-contain object-left"
          />
        </Link>

        <div className="hidden h-full items-center gap-6 py-2 pr-8 lg:flex">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[16px] leading-[1.8] tracking-[-0.2px] whitespace-nowrap text-white transition-opacity hover:opacity-80"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <span
            aria-hidden="true"
            className="h-6 w-px shrink-0 bg-[#a8a8a8]/40"
          />

          <div className="flex items-center gap-4">
            <Link
              href="#sign-in"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-[58px] rounded-[12px] px-6 [font-family:var(--font-manrope)] text-[18px] font-semibold text-[#5c53fe] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-white/5 hover:text-[#5c53fe]"
              )}
            >
              Sign In
            </Link>
            <Link
              href="#get-started"
              className={cn(
                buttonVariants(),
                "h-[52px] rounded-[12px] border-[#090a15]/10 bg-[#5c53fe] px-6 [font-family:var(--font-instrument-sans)] text-[18px] font-medium tracking-[-0.2px] text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4f47e8]"
              )}
            >
              Get Started
            </Link>
          </div>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="mr-4 text-white hover:bg-white/10 hover:text-white lg:hidden"
              />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(20rem,calc(100%-3rem))] border-white/10 bg-[#1a1a1a] text-white"
          >
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <SheetDescription className="sr-only">
              Links to the main sections of the HireLoop website.
            </SheetDescription>

            <div className="flex flex-col gap-8 px-6 pt-20 pb-6">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[16px] leading-[1.8] tracking-[-0.2px] text-white transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <span
                aria-hidden="true"
                className="h-px w-full bg-[#a8a8a8]/40"
              />

              <div className="flex flex-col gap-3">
                <Link
                  href="#sign-in"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-[58px] justify-start rounded-[12px] px-6 [font-family:var(--font-manrope)] text-[18px] font-semibold text-[#5c53fe] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-white/5 hover:text-[#5c53fe]"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="#get-started"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "h-[52px] rounded-[12px] border-[#090a15]/10 bg-[#5c53fe] px-6 [font-family:var(--font-instrument-sans)] text-[18px] font-medium tracking-[-0.2px] text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4f47e8]"
                  )}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
