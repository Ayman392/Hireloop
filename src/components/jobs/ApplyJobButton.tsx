"use client"

import { useState } from "react"
import Link from "next/link"
import { ApplyToJobError, applyToJob } from "@/lib/actions/application"

type ApplyState = "ready" | "submitting" | "applied" | "error" | "sign-in"

export function ApplyJobButton({
  jobId,
  canApply,
  userRole,
}: {
  jobId: string
  canApply: boolean
  userRole: string | null
}) {
  const [state, setState] = useState<ApplyState>("ready")
  const [message, setMessage] = useState("")

  async function handleApply() {
    setState("submitting")
    setMessage("")

    try {
      await applyToJob(jobId)
      setState("applied")
      setMessage("Your application has been submitted.")
    } catch (error) {
      if (error instanceof ApplyToJobError && error.paymentRequired) {
        window.location.assign("/payment")
        return
      }

      if (error instanceof ApplyToJobError && error.alreadyApplied) {
        setState("applied")
        setMessage(error.message)
        return
      }

      if (error instanceof ApplyToJobError && error.status === 401) {
        setState("sign-in")
        setMessage(error.message)
        return
      }

      setState("error")
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your application."
      )
    }
  }

  const callbackURL = `/browse-jobs/${encodeURIComponent(jobId)}`
  const disabled =
    !canApply ||
    userRole !== "seeker" ||
    state === "submitting" ||
    state === "applied"
  const buttonLabel = !canApply
    ? "Applications Closed"
    : userRole !== "seeker"
      ? "Seekers Only"
      : state === "submitting"
        ? "Applying..."
        : state === "applied"
          ? "Applied"
          : "Apply Now"

  return (
    <div className="flex flex-col items-end gap-1.5">
      {userRole === null && canApply ? (
        <Link
          className="inline-flex h-10 items-center rounded-lg bg-white px-4 text-xs font-semibold text-[#111113] transition-colors hover:bg-white/90"
          href={`/sign-in?callbackURL=${encodeURIComponent(callbackURL)}`}
        >
          Sign in to Apply
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleApply}
          disabled={disabled}
          className="h-10 rounded-lg bg-white px-4 text-xs font-semibold text-[#111113] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {buttonLabel}
        </button>
      )}
      {userRole !== null && userRole !== "seeker" && canApply && (
        <p className="text-right text-[11px] text-white/55">
          Sign in with a job seeker account to apply.
        </p>
      )}
      {message && (
        <p
          className={`max-w-56 text-right text-[11px] ${
            state === "error" ? "text-red-300" : "text-white/60"
          }`}
          role={state === "error" ? "alert" : "status"}
        >
          {message}
          {state === "sign-in" && (
            <>
              {" "}
              <Link
                className="text-[#a7a1ff] underline underline-offset-2"
                href={`/sign-in?callbackURL=${encodeURIComponent(callbackURL)}`}
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      )}
    </div>
  )
}
