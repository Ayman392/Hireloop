"use client"

import type { ChangeEvent } from "react"
import { jobCategories, jobTypes } from "@/lib/job-options"
import { useRouter } from "next/navigation"

function FilterGroup({
  legend,
  name,
  options,
  type,
  selectedValues,
}: {
  legend: string
  name: string
  options: readonly { value: string; label: string }[]
  type: "checkbox" | "radio"
  selectedValues: string[]
}) {
  const router = useRouter()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(window.location.search)
    if (type === "radio") {
      params.set(name, event.currentTarget.value)
    } else {
      const values = params.getAll(name).filter((value) => value !== event.currentTarget.value)
      if (event.currentTarget.checked) values.push(event.currentTarget.value)
      params.delete(name)
      values.forEach((value) => params.append(name, value))
    }

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
  }

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
            defaultChecked={selectedValues.includes(option.value)}
            name={name}
            onChange={handleChange}
            type={type}
            value={option.value}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  )
}

export function JobFilters({
  activeFilters,
}: {
  activeFilters: Record<string, string[]>
}) {
  return (
    <aside className="h-fit rounded-xl border border-white/[0.07] bg-[#111113] p-4 sm:p-5">
      <h2 className="mb-5 text-sm font-semibold text-white">Filters</h2>
      <div className="space-y-6">
        <FilterGroup
          legend="Job type"
          name="jobType"
          options={jobTypes}
          selectedValues={activeFilters.jobType ?? []}
          type="radio"
        />
        <FilterGroup
          legend="Category"
          name="category"
          options={jobCategories}
          selectedValues={activeFilters.category ?? []}
          type="radio"
        />
        <FilterGroup
          legend="Work arrangement"
          name="remoteAllowed"
          options={[
            { value: "true", label: "Remote" },
            { value: "false", label: "On-site" },
          ]}
          selectedValues={activeFilters.remoteAllowed ?? []}
          type="checkbox"
        />
      </div>
    </aside>
  )
}
