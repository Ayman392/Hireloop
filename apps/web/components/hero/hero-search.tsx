"use client"

import { Chip } from "@heroui/react"
import { MapPinIcon, SearchIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const bareInput =
  "h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 text-base text-white shadow-none [font-family:var(--font-satoshi)] placeholder:text-white/80 focus-visible:ring-0 dark:bg-transparent"

export function HeroSearch() {
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-12 flex h-16 w-full items-center gap-6 rounded-2xl border border-white/20 bg-[#101010] pr-2 pl-6"
      >
        <label className="flex min-w-0 flex-1 items-center gap-2">
          <SearchIcon
            strokeWidth={1.5}
            className="size-6 shrink-0 text-white"
          />
          <Input
            name="job-search"
            placeholder="Job title, skill or company"
            className={bareInput}
          />
        </label>

        <span
          aria-hidden="true"
          className="hidden h-[23px] w-px shrink-0 bg-white/20 sm:block"
        />

        <label className="hidden min-w-0 flex-1 items-center gap-2 sm:flex">
          <MapPinIcon
            strokeWidth={1.5}
            className="size-6 shrink-0 text-white"
          />
          <Input
            name="job-location"
            placeholder="Location or Remote"
            className={bareInput}
          />
        </label>

        <Button
          type="submit"
          size="icon"
          aria-label="Search jobs"
          className="size-12 shrink-0 rounded-xl bg-[#5c53fe] text-white hover:bg-[#4f47e8]"
        >
          <SearchIcon className="size-6" />
        </Button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:flex-nowrap">
        <span className="shrink-0 [font-family:var(--font-manrope)] text-base text-white/70">
          Trending Position
        </span>
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {trendingPositions.map((position) => (
            <li key={position}>
              <Chip
                variant="secondary"
                className="cursor-pointer rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 [font-family:var(--font-manrope)] text-sm text-white hover:bg-[#242425]"
              >
                {position}
              </Chip>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
