"use client";

import { useFormStatus } from "react-dom";

// Briques communes aux formulaires de l'admin.

export const inputClass =
  "mt-2 w-full rounded-lg border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-accent";

export function inputBorder(error?: string) {
  return error ? "border-highlight" : "border-line";
}

// Attributs d'accessibilité d'un champ en erreur.
export function errorProps(id: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const;
}

export function Field({
  label,
  id,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {optional && (
          <span className="font-normal text-subtle"> (facultatif)</span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-sm text-subtle">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-highlight">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm font-medium text-highlight">
      {message}
    </p>
  );
}

export function SubmitButton({
  children,
  pendingLabel = "Enregistrement…",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-fit rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
