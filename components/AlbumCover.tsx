// Visuel de pochette provisoire, en attendant les vraies images d'albums.
const VARIANTS = [
  { bg: "bg-lilac", disc: "bg-violet", position: "-right-6 -bottom-6" },
  { bg: "bg-violet", disc: "bg-lilac", position: "-left-6 -top-6" },
  { bg: "bg-ink", disc: "bg-lilac", position: "-right-8 -top-8" },
];

export default function AlbumCover({ index }: { index: number }) {
  const variant = VARIANTS[index % VARIANTS.length];
  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-lg ${variant.bg}`}
    >
      <div
        className={`absolute h-3/5 w-3/5 rounded-full ${variant.disc} ${variant.position}`}
      >
        <div className="absolute inset-[38%] rounded-full bg-lavender" />
      </div>
    </div>
  );
}
