"use client";

import { useFormStatus } from "react-dom";

// Bouton de suppression : demande une confirmation avant d'envoyer.
export default function DeleteButton({
  action,
  confirmMessage,
  label = "Supprimer",
}: {
  action: () => Promise<void>;
  confirmMessage: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) event.preventDefault();
      }}
    >
      <Submit label={label} />
    </form>
  );
}

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-highlight px-5 py-2.5 text-sm font-semibold text-highlight transition-colors hover:bg-highlight hover:text-surface disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Suppression…" : label}
    </button>
  );
}
