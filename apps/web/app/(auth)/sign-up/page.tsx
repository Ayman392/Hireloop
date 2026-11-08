"use client"

import { useState } from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"

const fieldClass =
  "h-12 rounded-xl border-white/15 bg-[#101010] pl-11 text-white [font-family:var(--font-satoshi)] placeholder:text-white/50 focus-visible:border-[#5c53fe] focus-visible:ring-[#5c53fe]/30 dark:bg-[#101010]"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirmPassword") ?? "")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setError("")
    setIsSubmitting(true)
    try {
      const { data, error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      })
      if (authError) {
        console.log("Sign-up failed:", {
          status: authError.status,
          statusText: authError.statusText,
          message: authError.message,
        })
        setError(authError.message || "Unable to create your account. Please try again.")
      } else {
        console.log("Sign-up data:", { user: data?.user })
      }
    } catch (cause) {
      console.error("Sign-up request failed:", cause)
      setError(cause instanceof Error && cause.message
        ? cause.message
        : "Unable to create your account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-black px-4 py-12">
      {/* purple glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[300px] left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#5c53fe]/40 blur-[140px]"
      />

      <div className="w-full max-w-[440px]">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="relative mx-auto mb-8 block h-10 w-[154px]"
        >
          <Image
            src="/hireloop-logo.png"
            alt="HireLoop"
            fill
            sizes="154px"
            priority
            className="object-contain object-center"
          />
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#0b0b0c,#181819)] p-8">
          <h1 className="text-center [font-family:var(--font-manrope)] text-3xl font-bold text-white">
            Create your account
          </h1>
          <p className="mt-2 text-center [font-family:var(--font-manrope)] text-white/60">
            Join HireLoop and land your next role faster.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">
                Full name
              </Label>
              <div className="relative">
                <UserIcon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/60" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email
              </Label>
              <div className="relative">
                <MailIcon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/60" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">
                Password
              </Label>
              <div className="relative">
                <LockIcon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/60" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                  className={`${fieldClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-5" />
                  ) : (
                    <EyeIcon className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white/80">
                Confirm password
              </Label>
              <div className="relative">
                <LockIcon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/60" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  required
                  className={fieldClass}
                />
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm text-white/60">
              <input
                type="checkbox"
                name="terms"
                required
                className="mt-0.5 size-4 shrink-0 accent-[#5c53fe]"
              />
              <span>
                I agree to the{" "}
                <Link href="#" className="text-[#8b85ff] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#8b85ff] hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-[#5c53fe] text-base font-semibold text-white hover:bg-[#4f47e8]"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center [font-family:var(--font-manrope)] text-sm text-white/60">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#8b85ff] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
