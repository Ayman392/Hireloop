"use client"

import { useState } from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import Image from "next/image"
import { signIn } from "@/lib/auth-client"

const fieldClass =
  "h-12 rounded-xl border-white/15 bg-[#101010] pl-11 text-white [font-family:var(--font-satoshi)] placeholder:text-white/50 focus-visible:border-[#5c53fe] focus-visible:ring-[#5c53fe]/30 dark:bg-[#101010]"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    setError("")
    setIsSubmitting(true)
    try {
      const result = await signIn.email({ email, password, callbackURL: "/" })
      if (result.error) {
        setError(result.error.message ?? "Unable to sign in. Please try again.")
      } else {
        console.log("Sign-in data:", { user: result.data?.user })
      }
    } catch {
      setError("Unable to sign in. Please try again.")
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
            Welcome back
          </h1>
          <p className="mt-2 text-center [font-family:var(--font-manrope)] text-white/60">
            Sign in to continue your job search.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-sm text-[#8b85ff] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <LockIcon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/60" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
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

            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-[#5c53fe] text-base font-semibold text-white hover:bg-[#4f47e8]"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center [font-family:var(--font-manrope)] text-sm text-white/60">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#8b85ff] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
