"use client";

import { useState, type FormEvent } from "react";

type FormState = "idle" | "submitting" | "submitted";

const INTEREST_OPTIONS = [
  "Future build",
  "Client build",
  "Media",
  "Supplier",
  "Service partner",
] as const;

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // This preview has no automated outreach, CRM, or payment flow connected.
    // We acknowledge the request locally so the owner can follow up manually.
    setState("submitting");
    window.setTimeout(() => setState("submitted"), 700);
  }

  if (state === "submitted") {
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <p className="mono-label accent">Received</p>
        <h2>Your request is logged.</h2>
        <p>
          Private interest is reviewed manually. If your note aligns with the
          registry, a Burakorn Performance representative will reach out through
          your approved contact channel.
        </p>
        <button
          type="button"
          className="button-link"
          onClick={() => setState("idle")}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="contact-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your full name"
        />
      </div>

      <div className="contact-field-row">
        <div className="contact-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@email.com"
          />
        </div>
        <div className="contact-field">
          <label htmlFor="channel">WhatsApp / Line (optional)</label>
          <input
            id="channel"
            name="channel"
            type="text"
            placeholder="If approved by owner"
          />
        </div>
      </div>

      <div className="contact-field-row">
        <div className="contact-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="country-name"
            placeholder="City, country"
          />
        </div>
        <div className="contact-field">
          <label htmlFor="interest">Interest</label>
          <select id="interest" name="interest" defaultValue="" required>
            <option value="" disabled>
              Select an interest
            </option>
            {INTEREST_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your interest in the registry."
        />
      </div>

      <button
        type="submit"
        className="button-link primary contact-submit"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Sending…" : "Request private discussion"}
      </button>
    </form>
  );
}
