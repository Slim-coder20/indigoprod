// Confirmation affichée après une action (ajout, modification, suppression).
export default function FlashMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="status"
      className="rounded-lg border border-line bg-surface px-4 py-3 text-sm font-medium text-foreground"
    >
      ✓ {message}
    </p>
  );
}
