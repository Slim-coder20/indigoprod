"use client";

import { useActionState } from "react";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/app/contact/actions";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "mt-2 w-full rounded-lg border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-accent";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-xl border border-line bg-surface p-8"
      >
        <p className="text-lg font-semibold text-foreground">Message envoyé</p>
        <p className="text-muted">{state.message}</p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* Champ piège anti-spam, invisible pour les visiteurs */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Société</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field label="Nom" id="name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`${inputClass} ${errors.name ? "border-highlight" : "border-line"}`}
          placeholder="Votre nom"
        />
      </Field>

      <Field label="Email" id="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${inputClass} ${errors.email ? "border-highlight" : "border-line"}`}
          placeholder="vous@exemple.com"
        />
      </Field>

      <Field label="Message" id="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={state.values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} ${errors.message ? "border-highlight" : "border-line"}`}
          placeholder="Votre message"
        />
      </Field>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm font-medium text-highlight">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-highlight">
          {error}
        </p>
      )}
    </div>
  );
}
