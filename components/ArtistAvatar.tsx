import Image from "next/image";
import type { Artist } from "@/lib/data/artists";

// Photo ronde de l'artiste, ou ses initiales en attendant une photo.
export default function ArtistAvatar({
  artist,
  size = 48,
}: {
  artist: Artist;
  size?: number;
}) {
  if (artist.photo) {
    return (
      <Image
        src={artist.photo}
        alt={artist.name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{
          width: size,
          height: size,
          objectPosition: artist.photoPosition,
        }}
      />
    );
  }
  return (
    <div
      className="flex items-center justify-center rounded-full bg-ink text-sm font-semibold text-lime"
      style={{ width: size, height: size }}
    >
      {artist.initials}
    </div>
  );
}
