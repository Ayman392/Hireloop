import { SiteNavbar } from "@/components/site-navbar"
import { SiteHero } from "@/components/hero/site-hero"

export default function Page() {
  return (
    <main className="min-h-svh overflow-x-clip bg-[#010103]">
      <SiteNavbar />
      <SiteHero />
    </main>
  )
}
