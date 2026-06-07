"use client";

import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { enquiryTopics } from "@/content/site";

type FormState = "idle" | "loading" | "success" | "error";

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

type EnquiryFormProps = {
  defaultTopic?: (typeof enquiryTopics)[number];
  compact?: boolean;
};

export function EnquiryForm({ defaultTopic = "General enquiry", compact = false }: EnquiryFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormState("loading");
    setErrorMessage("");

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const topic = String(formData.get("topic") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!accessKey) {
      setFormState("error");
      setErrorMessage("Contact form is not configured yet. Please try again later.");
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
          subject: `ACES Enquiry — ${topic}`,
          from_name: name,
          name,
          email,
          replyto: email,
          topic,
          message,
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

  const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-aces-navy shadow-sm transition-colors focus:border-aces-red focus:outline-none focus:ring-1 focus:ring-aces-red disabled:opacity-50";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-6", !compact && "rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8")}
    >
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className="block text-sm font-medium text-aces-navy">
            Name <span className="text-aces-red">*</span>
          </label>
          <input
            type="text"
            id="enquiry-name"
            name="name"
            required
            disabled={formState === "loading"}
            className={inputClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="enquiry-email" className="block text-sm font-medium text-aces-navy">
            Email <span className="text-aces-red">*</span>
          </label>
          <input
            type="email"
            id="enquiry-email"
            name="email"
            required
            disabled={formState === "loading"}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-topic" className="block text-sm font-medium text-aces-navy">
          Enquiry type
        </label>
        <select
          id="enquiry-topic"
          name="topic"
          defaultValue={defaultTopic}
          disabled={formState === "loading"}
          className={inputClass}
        >
          {enquiryTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="enquiry-message" className="block text-sm font-medium text-aces-navy">
          Message <span className="text-aces-red">*</span>
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          required
          rows={5}
          disabled={formState === "loading"}
          className={inputClass}
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        disabled={formState === "loading" || formState === "success"}
        className="inline-flex items-center justify-center rounded-md bg-aces-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-aces-red-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {formState === "loading" ? "Sending..." : "Send Enquiry"}
      </button>

      {formState === "success" && (
        <p className="text-sm text-green-700" role="status">
          Thank you — your message has been sent. We&apos;ll be in touch soon.
        </p>
      )}

      {formState === "error" && (
        <p className="text-sm text-aces-red" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
