"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ChevronLeft, ChevronRight, Users, Trophy, Mail, Clock, MailCheck } from "lucide-react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type FormData = {
  teamName: string;
  managerName: string;
  ageGroup: string;
  town: string;
  league: string;
  achievement: string;
  email: string;
  phone: string;
  message: string;
};

const initialData: FormData = {
  teamName: "",
  managerName: "",
  ageGroup: "",
  town: "",
  league: "",
  achievement: "",
  email: "",
  phone: "",
  message: "",
};

const steps = [
  { title: "Team Details", icon: Users },
  { title: "Achievements", icon: Trophy },
  { title: "Contact", icon: Mail },
];

export function RegisterInterestForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<FormData>(initialData);

  function update(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validateStep(current: number): boolean {
    const newErrors: Record<string, string> = {};
    if (current === 0) {
      if (!data.teamName) newErrors.teamName = "Team name is required";
      if (!data.managerName) newErrors.managerName = "Manager name is required";
      if (!data.ageGroup) newErrors.ageGroup = "Age group is required";
      if (!data.town) newErrors.town = "Town/city is required";
    }
    if (current === 2) {
      if (!data.email) newErrors.email = "Email is required";
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }
    setErrors(newErrors);
    const firstError = Object.keys(newErrors)[0];
    if (firstError) {
      requestAnimationFrame(() => document.getElementById(firstError)?.focus());
    }
    return Object.keys(newErrors).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(2)) return;
    setSubmitted(true);
    setData(initialData);
    setStep(0);
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl border border-green-200 bg-green-50 p-8 animate-[fade-up_0.4s_ease-out]"
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <CheckCircle className="mx-auto h-14 w-14 text-green-600" aria-hidden="true" />
          <h3 className="font-display mt-4 text-2xl font-bold uppercase tracking-tight text-aces-navy">
            Interest registered
          </h3>
          <p className="mx-auto mt-2 max-w-md text-aces-muted">
            Thank you — your team&apos;s details have reached the ACES team. Here&apos;s what happens next.
          </p>
        </div>

        <ol className="mx-auto mt-8 max-w-md space-y-4">
          <li className="flex gap-4">
            <Clock className="mt-0.5 h-6 w-6 shrink-0 text-aces-red" aria-hidden="true" />
            <span className="text-sm text-aces-navy">
              <strong className="block">We review against the entry criteria</strong>
              Submissions are assessed on your team&apos;s performance this season.
            </span>
          </li>
          <li className="flex gap-4">
            <MailCheck className="mt-0.5 h-6 w-6 shrink-0 text-aces-red" aria-hidden="true" />
            <span className="text-sm text-aces-navy">
              <strong className="block">We&apos;ll be in touch within 7 days</strong>
              If your team qualifies, you&apos;ll receive an invitation and entry details by email.
            </span>
          </li>
          <li className="flex gap-4">
            <Mail className="mt-0.5 h-6 w-6 shrink-0 text-aces-red" aria-hidden="true" />
            <span className="text-sm text-aces-navy">
              <strong className="block">Questions in the meantime?</strong>
              Email us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="font-medium text-aces-red hover:underline">
                {siteConfig.contact.email}
              </a>
              .
            </span>
          </li>
        </ol>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Register another team
          </Button>
          <Link href="/tournament/entry-criteria" className="text-sm font-semibold text-aces-red hover:underline">
            Review the entry criteria
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-aces-navy shadow-sm transition-colors focus:border-aces-red focus:outline-none focus:ring-1 focus:ring-aces-red";

  return (
    <div>
      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {steps.length}: {steps[step].title}
      </p>
      <div className="mb-8">
        <ol className="flex items-center justify-between">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="flex flex-1 items-center">
                <div className="flex flex-col items-center" aria-current={i === step ? "step" : undefined}>
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                      i <= step ? "bg-aces-red text-white" : "bg-gray-100 text-gray-500"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span
                    className={cn(
                      "mt-2 hidden text-xs font-medium sm:block",
                      i === step ? "font-semibold text-aces-red" : i < step ? "text-aces-navy" : "text-aces-muted"
                    )}
                  >
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "mx-2 h-0.5 flex-1 transition-colors",
                      i < step ? "bg-aces-red" : "bg-gray-200"
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {step === 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: "teamName" as const, label: "Team Name", required: true },
              { name: "managerName" as const, label: "Manager Name", required: true },
              { name: "ageGroup" as const, label: "Age Group", required: true, placeholder: "e.g. U12 Boys" },
              { name: "town" as const, label: "Town/City Representing", required: true },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-aces-navy">
                  {field.label}
                  {field.required && <span className="text-aces-red"> *</span>}
                </label>
                <input
                  type="text"
                  id={field.name}
                  value={data[field.name]}
                  onChange={(e) => update(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  aria-required={field.required}
                  aria-invalid={errors[field.name] ? true : undefined}
                  aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  className={cn(inputClass, errors[field.name] && "border-aces-red ring-1 ring-aces-red")}
                />
                {errors[field.name] && (
                  <p id={`${field.name}-error`} className="mt-1 text-sm text-aces-red">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="league" className="block text-sm font-medium text-aces-navy">
                League
              </label>
              <input
                type="text"
                id="league"
                value={data.league}
                onChange={(e) => update("league", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="achievement" className="block text-sm font-medium text-aces-navy">
                League Position / Cup Won
              </label>
              <input
                type="text"
                id="achievement"
                value={data.achievement}
                onChange={(e) => update("achievement", e.target.value)}
                placeholder="e.g. League Champions"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-aces-navy">
                Additional Information
              </label>
              <textarea
                id="message"
                rows={4}
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us about your team's achievements this season..."
                className={inputClass}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-lg bg-surface p-4 text-sm text-aces-muted">
              <p className="font-medium text-aces-navy">Review your details</p>
              <ul className="mt-2 space-y-1">
                <li>Team: {data.teamName || "—"}</li>
                <li>Manager: {data.managerName || "—"}</li>
                <li>Age group: {data.ageGroup || "—"}</li>
                <li>Town: {data.town || "—"}</li>
                {data.league && <li>League: {data.league}</li>}
                {data.achievement && <li>Achievement: {data.achievement}</li>}
              </ul>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-aces-navy">
                  Email Address <span className="text-aces-red">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  aria-required
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(inputClass, errors.email && "border-aces-red ring-1 ring-aces-red")}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-aces-red">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-aces-navy">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between gap-4">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={back} className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}
          {step < 2 ? (
            <Button type="button" onClick={next} className="gap-1">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" size="lg">
              Submit Registration
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
