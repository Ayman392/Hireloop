import type { LucideIcon } from "lucide-react"
import {
  BriefcaseBusinessIcon,
  ChartNoAxesColumnIcon,
  StarIcon,
  UserSearchIcon,
} from "lucide-react"

import { Card, CardContent } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils"
import { HeroSearch } from "@/components/hero/hero-search"

const stats: Array<{
  value: string
  label: string
  icon: LucideIcon
  filledIcon?: boolean
}> = [
  { value: "50K", label: "Active Jobs", icon: BriefcaseBusinessIcon },
  { value: "12K", label: "Companies", icon: ChartNoAxesColumnIcon },
  { value: "2M", label: "Job Seekers", icon: UserSearchIcon },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: StarIcon,
    filledIcon: true,
  },
]

function BadgeBriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="hl-badge-glint" x1="12" y1="0.4" x2="12" y2="4.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e6eeff" />
          <stop offset="1" stopColor="#bac8fa" />
        </linearGradient>
        <linearGradient id="hl-badge-handle" x1="12" y1="1.6" x2="12" y2="3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5a5a5a" />
          <stop offset="1" stopColor="#444444" />
        </linearGradient>
        <linearGradient id="hl-badge-light" x1="7.2" y1="4" x2="7.2" y2="7.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fee45a" />
          <stop offset="1" stopColor="#fea613" />
        </linearGradient>
        <linearGradient id="hl-badge-light-2" x1="16.8" y1="4" x2="16.8" y2="7.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fee45a" />
          <stop offset="1" stopColor="#fea613" />
        </linearGradient>
        <linearGradient id="hl-badge-body" x1="12" y1="6.1" x2="12" y2="22.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c86d36" />
          <stop offset="1" stopColor="#883f2e" />
        </linearGradient>
        <linearGradient id="hl-badge-shade" x1="17" y1="13.2" x2="23.6" y2="13.2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6d3326" stopOpacity="0" />
          <stop offset="1" stopColor="#6d3326" />
        </linearGradient>
      </defs>
      <path d="M6.2 4.9V2.9c0-1.4 1.1-2.5 2.5-2.5h6.6c1.4 0 2.5 1.1 2.5 2.5v2H6.2Z" fill="url(#hl-badge-glint)" />
      <path d="M9.4 3V2.7c0-.6.5-1.1 1.1-1.1h3c.6 0 1.1.5 1.1 1.1V3" stroke="url(#hl-badge-handle)" strokeWidth="1.6" />
      <circle cx="7.2" cy="5.65" r="1.6" fill="url(#hl-badge-light)" />
      <circle cx="16.8" cy="5.65" r="1.6" fill="url(#hl-badge-light-2)" />
      <path d="M3.4 6.1h17.2c1.7 0 3 1.3 3 3v9.7c0 2.2-1.8 4-4 4H4.4c-2.2 0-4-1.8-4-4V9.1c0-1.7 1.3-3 3-3Z" fill="url(#hl-badge-body)" />
      <path d="M17 13.2h6.6v9.6c0 .9-1.2 1.6-2.4 1.6h-4.2v-11.2Z" fill="url(#hl-badge-shade)" />
      <rect x="3.7" y="22.4" width="16.6" height="1.5" rx="0.75" fill="#5a5a5a" fillOpacity="0.5" />
    </svg>
  )
}

export function SiteHero() {
  return (
    <section className="relative isolate -mt-[98px] overflow-clip bg-black pt-[98px] pb-24">
      {/* ===== Stars (pure CSS, no image needed) ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute top-[520px] left-1/2 hidden h-[700px] w-[1180px] -translate-x-1/2 opacity-70 sm:block"
          style={{
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 12% 20%, #8b85ff 50%, transparent 52%), radial-gradient(1px 1px at 30% 55%, #fff 50%, transparent 52%), radial-gradient(1.5px 1.5px at 48% 12%, #8b85ff 50%, transparent 52%), radial-gradient(1px 1px at 66% 40%, #fff 50%, transparent 52%), radial-gradient(1.5px 1.5px at 84% 25%, #8b85ff 50%, transparent 52%), radial-gradient(1px 1px at 92% 60%, #fff 50%, transparent 52%)",
          }}
        />
      </div>

      {/* ===== Copy block ===== */}
      <div className="relative z-10 mx-auto mt-[88px] flex w-full max-w-[784px] flex-col items-center px-4 text-center sm:mt-[176px] sm:px-0">
        {/* Badge */}
        <div className="flex items-center justify-center gap-px">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-r from-transparent to-white/40 sm:block"
          />
          <span className="flex h-12 items-center gap-3 rounded-full border border-white/15 bg-gradient-to-b from-[#2b2b2c] to-[#0a0a0b] px-5">
            <BadgeBriefcaseIcon className="size-5 shrink-0" />
            <span className="[font-family:var(--font-space-mono)] text-xs whitespace-nowrap uppercase sm:text-base">
              <span className="text-white">50,000+</span>{" "}
              <span className="text-white/50">new jobs this month</span>
            </span>
          </span>
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-l from-transparent to-white/40 sm:block"
          />
        </div>

        {/* Title + description */}
        <h1 className="mt-8 max-w-full text-center [font-family:var(--font-manrope)] text-[40px] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[56px]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-full [font-family:var(--font-manrope)] text-lg leading-[1.6] text-white/70 sm:text-xl">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar + trending chips (shadcn Input/Button + HeroUI Chip) */}
        <HeroSearch />
      </div>

      {/* ===== Globe + stats ===== */}
      <div className="relative isolate mt-[144px] sm:mt-[286px]">
        {/* 1. outer halo */}
        <div
          aria-hidden="true"
          className="absolute -top-[150px] left-1/2 h-[1037px] w-[1300px] -translate-x-1/2 rounded-full bg-[#5c53fe] opacity-90 blur-[130px]"
        />

        {/* 2. dark core with inner glow and rim line */}
        <div
          aria-hidden="true"
          className="absolute -top-[110px] left-1/2 h-[1037px] w-[1208px] -translate-x-1/2 rounded-full border-t border-[#a5a0ff]/60 bg-[#010103] shadow-[inset_0_70px_140px_-10px_rgba(92,83,254,0.95)]"
        />

        {/* 3. lit-from-the-top gradient */}
        <div
          aria-hidden="true"
          className="absolute -top-[110px] left-1/2 h-[1037px] w-[1208px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(1100px 760px at 50% 0%, rgba(120,110,255,0.95) 0%, rgba(92,83,254,0.7) 25%, rgba(92,83,254,0.35) 50%, rgba(92,83,254,0) 85%)",
          }}
        />

        {/* 4. continents, clipped to the globe circle */}
        <div
          aria-hidden="true"
          className="absolute -top-[110px] left-1/2 h-[1037px] w-[1208px] -translate-x-1/2 overflow-hidden rounded-full"
        >
          <div
            className="absolute inset-x-0 top-[12px] h-[557px] opacity-30 mix-blend-soft-light"
            style={{
              background: "url('/hero-map.svg') center / 100% 100% no-repeat",
            }}
          />
        </div>

        {/* 5. fade lower globe into the page */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[360px] h-[300px] bg-gradient-to-b from-transparent to-black"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[60px]">
          <h2 className="mx-auto max-w-[600px] text-center [font-family:var(--font-instrument-sans)] text-2xl leading-[1.3] font-medium tracking-[-1px] text-white/70 sm:text-[40px]">
            Assisting over <span className="text-white">15,000</span> job
            seekers find their dream positions.
          </h2>

          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <li key={stat.value}>
                <Card className="gap-0 rounded-2xl border-white/10 bg-[linear-gradient(180deg,#010102,#313132)] py-6 text-white shadow-none">
                  <CardContent>
                    <stat.icon
                      strokeWidth={1.5}
                      className={cn(
                        "size-6 text-white",
                        stat.filledIcon && "fill-white"
                      )}
                    />
                    <p className="mt-[72px] [font-family:var(--font-plus-jakarta)] text-[56px] leading-[1.15] font-semibold tracking-[-0.02em]">
                      {stat.value}
                    </p>
                    <p className="mt-4 [font-family:var(--font-inter-tight)] text-lg leading-[1.65] text-white/60">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}