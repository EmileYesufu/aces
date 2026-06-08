"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

export function NewsletterForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormState("loading");
    setErrorMessage("");

    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      setFormState("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!accessKey) {
      setFormState("error");
      setErrorMessage("Newsletter sign-up is not configured yet. Please try again later.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "ACES Nationals newsletter sign-up",
          from_name: "ACES Newsletter",
          email,
          replyto: email,
          message: `Newsletter sign-up: ${email}`,
          botcheck: "",
        }),
      });

      const data = (await response.json()) as Web3FormsResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }

      setFormState("success");
      form.reset();
    } catch (error) {
      setFormState("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (formState === "success") {
    return (
      <p className="text-sm text-aces-gold-bright" role="status">
        Thanks for signing up — we&apos;ll keep you posted.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" aria-label="Newsletter sign-up">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          required
          disabled={formState === "loading"}
          placeholder="Your email"
          className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-400 focus:border-aces-red-bright focus:outline-none focus:ring-1 focus:ring-aces-red-bright disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={formState === "loading"}
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-aces-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-aces-red-bright disabled:cursor-not-allowed disabled:opacity-50"
        >
          {formState === "loading" ? "Signing up..." : "Sign up"}
        </button>
      </div>
      {formState === "error" && (
        <p className="text-sm text-aces-red-bright" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
