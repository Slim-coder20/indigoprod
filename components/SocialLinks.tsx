import type { SocialLink } from "@/lib/data/artists";

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
          >
            {link.label} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}
