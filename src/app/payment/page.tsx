"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, LockKeyhole, ShieldCheck } from "lucide-react"

type Currency = "BDT" | "USD"

const prices: Record<Currency, string> = {
  BDT: "BDT 2,553.33",
  USD: "$20.00",
}

function CurrencyOption({
  currency,
  selected,
  onSelect,
}: {
  currency: Currency
  selected: boolean
  onSelect: (currency: Currency) => void
}) {
  return (
    <button
      aria-pressed={selected}
      className={`flex min-h-12 flex-1 items-center justify-between rounded-lg border px-3 text-left transition-colors ${
        selected
          ? "border-white/80 bg-white/[0.06] text-white"
          : "border-white/[0.08] bg-[#101012] text-white/60 hover:border-white/25"
      }`}
      onClick={() => onSelect(currency)}
      type="button"
    >
      <span className="text-xs font-medium">{currency}</span>
      <span className="text-xs">{prices[currency]}</span>
    </button>
  )
}

export default function PaymentPage() {
  const [currency, setCurrency] = useState<Currency>("BDT")
  const [email, setEmail] = useState("")
  const [checkoutMessage, setCheckoutMessage] = useState("")

  function handlePay() {
    setCheckoutMessage("Stripe Checkout will be connected here.")
  }

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col">
        <header className="flex items-center justify-between border-b border-white/[0.07] pb-5">
          <Link
            className="inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white"
            href="/browse-jobs"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to jobs
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-[11px] text-white/60">
            <LockKeyhole aria-hidden="true" className="size-3" />
            Secure checkout
          </div>
        </header>

        <div className="grid flex-1 content-start gap-8 py-10 md:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)] md:gap-16 md:py-16">
          <section aria-labelledby="plan-heading" className="md:pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
              Hireloop membership
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Upgrade your job search
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
              Continue applying to jobs with Hireloop Pro. Your plan removes the
              free application limit and gives you access to all seeker features.
            </p>

            <div className="mt-9">
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                Choose a currency
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row">
                <CurrencyOption
                  currency="BDT"
                  onSelect={setCurrency}
                  selected={currency === "BDT"}
                />
                <CurrencyOption
                  currency="USD"
                  onSelect={setCurrency}
                  selected={currency === "USD"}
                />
              </div>
            </div>

            <div className="mt-8 border-y border-white/[0.08] py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="plan-heading" className="text-sm font-semibold">
                    Hireloop Pro Plan
                  </h2>
                  <p className="mt-1 text-xs text-white/50">
                    Access to all seeker features
                  </p>
                </div>
                <p className="text-sm font-semibold tabular-nums">
                  {prices[currency]}
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-3 text-xs text-white/60">
              {["Apply beyond the free application limit", "Track every application", "Manage your seeker profile"].map((feature) => (
                <li className="flex items-center gap-2.5" key={feature}>
                  <Check aria-hidden="true" className="size-3.5 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="payment-heading"
            className="h-fit rounded-2xl border border-white/[0.08] bg-[#111113] p-5 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/80">
                <CreditCard aria-hidden="true" className="size-5" />
              </div>
              <div>
                <h2 id="payment-heading" className="text-sm font-semibold">
                  Payment information
                </h2>
                <p className="mt-1 text-xs text-white/45">
                  Enter your email to continue to secure payment.
                </p>
              </div>
            </div>

            <label className="mt-7 block text-xs font-medium text-white/70" htmlFor="payment-email">
              Email address
            </label>
            <input
              autoComplete="email"
              className="mt-2 h-11 w-full rounded-lg border border-white/[0.1] bg-[#1a1a1d] px-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-violet-400/70"
              id="payment-email"
              onChange={(event) => setEmail(event.currentTarget.value)}
              placeholder="you@example.com"
              type="email"
              value={email}
            />

            <div className="mt-5 rounded-lg border border-white/[0.08] bg-[#171719] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                  <CreditCard aria-hidden="true" className="size-4 text-white/55" />
                  Card payment
                </div>
                <span className="rounded-full bg-white/[0.06] px-2 py-1 text-[10px] text-white/45">
                  Stripe soon
                </span>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/45">
                Card details will be collected securely by Stripe when checkout
                is connected.
              </p>
            </div>

            <button
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#1677e8] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2585f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              onClick={handlePay}
              type="button"
            >
              Pay {prices[currency]}
            </button>
            {checkoutMessage && (
              <p className="mt-3 text-center text-xs text-white/50" role="status">
                {checkoutMessage}
              </p>
            )}

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
              <ShieldCheck aria-hidden="true" className="size-3.5" />
              Secure payment processing coming soon
            </p>
          </section>
        </div>

        <footer className="border-t border-white/[0.07] py-5 text-center text-[11px] text-white/35">
          Hireloop checkout
        </footer>
      </div>
    </main>
  )
}
