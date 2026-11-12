import { Search } from "lucide-react"

export function JobSearchBar({
  initialSearch,
  activeFilters,
}: {
  initialSearch: string
  activeFilters: Record<string, string[]>
}) {
  return (
    <form
      action="/browse-jobs"
      className="flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-[#17171a] p-2.5 pl-4"
      method="get"
    >
      {Object.entries(activeFilters).flatMap(([name, values]) =>
        values.map((value) => (
          <input key={`${name}-${value}`} type="hidden" name={name} value={value} />
        ))
      )}
      <Search aria-hidden="true" className="size-4 shrink-0 text-white/45" />
      <input
        defaultValue={initialSearch}
        name="search"
        aria-label="Search jobs"
        className="h-9 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        placeholder="Search by job title, keywords..."
        type="search"
      />
      <button
        className="h-9 shrink-0 rounded-lg bg-white px-4 text-xs font-semibold text-[#141416] transition-colors hover:bg-white/90 sm:px-5"
        type="submit"
      >
        Search Jobs
      </button>
    </form>
  )
}
