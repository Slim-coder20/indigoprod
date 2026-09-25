import type { ReactNode } from "react";

// Carrousel en défilement continu : la liste est dupliquée et translatée
// de -50 % en boucle (animation `marquee` de globals.css). Pause au survol
// et au focus ; défilement manuel si l'utilisateur réduit les animations.
// La copie sert uniquement à la boucle : masquée aux lecteurs d'écran et
// hors de la navigation clavier (`focusable` vaut false).
export default function Marquee<T>({
  items,
  getKey,
  renderItem,
  itemClassName = "w-72",
}: {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T, focusable: boolean) => ReactNode;
  itemClassName?: string;
}) {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
      <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) =>
          items.map((item) => (
            <li
              key={`${copy}-${getKey(item)}`}
              aria-hidden={copy === 1 ? true : undefined}
              className={`${itemClassName} shrink-0 pr-6 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
            >
              {renderItem(item, copy === 0)}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
