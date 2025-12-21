import { useEffect, useRef } from "preact/hooks";
import { ChapiterAnimation } from "./elements/ChapiterAnimation.ts";
import { between } from "../functions/helper.ts";

type ChapiterItem = {
  id: string;
  data: {
    title: string;
  };
};

type Props = {
  items: ChapiterItem[];
};

export function Chapiter({ items }: Props) {
  const ulRef = useRef<HTMLUListElement>(null);
  const pathname = window.location.pathname;
  const activeArticle = getActiveArticle(pathname);

  useEffect(() => {
    if (items) {
      new ChapiterAnimation(ulRef.current);
    }
  }, [items]);

  return (
    <div class="relative outline__wrapper w-max animate-fade-in animation-delay-200">
      <ul ref={ulRef} id="chapiter-animation text-lg!" className="">
        {items.map((item, index) => (
          <ChapiterItem
            key={item.id}
            item={item}
            index={index}
            pathname={pathname}
            activeArticle={activeArticle}
          />
        ))}
      </ul>
    </div>
  );
}

type ChapiterItemProps = {
  item: ChapiterItem;
  index: number;
  pathname: string;
  activeArticle: string;
};

function ChapiterItem({
  item,
  index,
  pathname,
  activeArticle,
}: ChapiterItemProps) {
  const itemPath = buildItemPath(item.id, pathname);
  const articleName = getArticleFromId(item.id);
  const isCurrentPage = activeArticle === articleName;
  const animationDelay = between(index * 100, 0, 300);

  return (
    <li
      className={`relative px-2 py-2 flex items-center cursor-pointer animate-slide-in animation-delay-${animationDelay}`}
    >
      <a
        class="block pr-4 text-neutral-500! z-10 before:content-[''] before:absolute before:-z-10 before:inset-0 before:w-full before:h-full"
        href={itemPath}
      >
        <div
          aria-current={isCurrentPage ? "page" : undefined}
          class="block whitespace-nowrap max-w-[250px] overflow-hidden text-ellipsis transition aria-[current=page]:border-l-2 aria-[current=page]:border-l-[var(--contrast)]! aria-[current=page]:px-3 aria-[current=page]:text-[var(--color-primary)]! transition-all duration-300"
        >
          {item.data.title}
        </div>
      </a>
    </li>
  );
}

// Helper functions

function getActiveArticle(pathname: string): string {
  // pathname: "/fr/series/automate/introduction"
  // retourne: "introduction"
  const segments = pathname.split("/").filter(Boolean);
  return segments[segments.length - 1];
}

function getArticleFromId(itemId: string): string {
  // itemId: "fr/automate/introduction"
  // retourne: "introduction"
  const segments = itemId.split("/").filter(Boolean);
  return segments[segments.length - 1];
}

function buildItemPath(itemId: string, currentPathname: string): string {
  // itemId: "fr/automate/introduction"
  // currentPathname: "/fr/series/automate/1"

  // Extraire langue et série du pathname actuel
  const currentSegments = currentPathname.split("/").filter(Boolean);
  // currentSegments: ["fr", "series", "automate", "1"]

  const lang = currentSegments[0]; // "fr"
  const seriesName = currentSegments[2]; // "automate"

  // Extraire l'article de l'itemId
  const itemSegments = itemId.split("/").filter(Boolean);
  const article = itemSegments[itemSegments.length - 1]; // "introduction"

  // Construire: /fr/series/automate/introduction
  return `/${lang}/series/${seriesName}/${article}`;
}

function isActivePage(itemPath: string, activeSegment: string): boolean {
  const itemSegments = itemPath.split("/").filter(Boolean);
  return activeSegment === itemSegments[itemSegments.length - 1];
}
