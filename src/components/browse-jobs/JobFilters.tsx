import { jobCategories, jobTypes } from "@/lib/job-options"

function FilterGroup({
  legend,
  name,
  options,
  type,
}: {
  legend: string
  name: string
  options: readonly { value: string; label: string }[]
  type: "checkbox" | "radio"
}) {
  return (
    <fieldset className="space-y-2.5">
      <legend className="mb-3 text-xs font-semibold text-white/85">
        {legend}
      </legend>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-2.5 text-xs text-white/60 transition-colors hover:text-white"
        >
          <input
            className="size-3.5 rounded border-white/20 bg-[#1c1c20] accent-[#6258f5]"
            name={name}
            type={type}
            value={option.value}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  )
}

export function JobFilters() {
  return (
    <aside className="h-fit rounded-xl border border-white/[0.07] bg-[#111113] p-4 sm:p-5">
      <h2 className="mb-5 text-sm font-semibold text-white">Filters</h2>
      <div className="space-y-6">
        <FilterGroup
          legend="Job type"
          name="jobType"
          options={jobTypes}
          type="radio"
        />
        <FilterGroup
          legend="Category"
          name="category"
          options={jobCategories}
          type="radio"
        />
        <FilterGroup
          legend="Work arrangement"
          name="remoteAllowed"
          options={[
            { value: "true", label: "Remote" },
            { value: "false", label: "On-site" },
          ]}
          type="checkbox"
        />
      </div>
    </aside>
  )
}
