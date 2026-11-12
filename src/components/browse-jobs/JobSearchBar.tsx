import { Search } from "lucide-react"

export function JobSearchBar() {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-[#17171a] p-2.5 pl-4">
      <Search aria-hidden="true" className="size-4 shrink-0 text-white/45" />
      <input
        aria-label="Search jobs"
        className="h-9 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        placeholder="Search by job title, keywords..."
        type="search"
      />
      <button
        className="h-9 shrink-0 rounded-lg bg-white px-4 text-xs font-semibold text-[#141416] transition-colors hover:bg-white/90 sm:px-5"
        type="button"
      >
        Search Jobs
      </button>
    </div>
  )
}
