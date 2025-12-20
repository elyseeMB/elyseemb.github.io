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
  const currentUrl = new URL(window.location.href);
  const activePathSegment = getActivePathSegment(currentUrl);

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
            currentUrl={currentUrl}
            activePathSegment={activePathSegment}
          />
        ))}
      </ul>
    </div>
  );
}

type ChapiterItemProps = {
  item: ChapiterItem;
  index: number;
  currentUrl: URL;
  activePathSegment: string;
};

function ChapiterItem({
  item,
  index,
  currentUrl,
  activePathSegment,
}: ChapiterItemProps) {
  const itemPath = buildItemPath(item.id, currentUrl);
  const isCurrentPage = isActivePage(itemPath, activePathSegment);
  const animationDelay = between(index * 100, 0, 300);

  return (
    <li
      className={`relative px-2 py-2 flex items-center cursor-pointer animate-perspective-in animation-delay-${animationDelay}`}
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

function getActivePathSegment(url: URL): string {
  const pathSegments = url.pathname.split("/").filter(Boolean);
  return pathSegments.slice(pathSegments.length - 1).join("/");
}

function buildItemPath(itemId: string, baseUrl: URL): string {
  const pathSegments = new URL(itemId, baseUrl).pathname
    .split("/")
    .filter(Boolean);

  const uniqueSegments = Array.from(new Set(pathSegments));
  return "/" + uniqueSegments.join("/");
}

function isActivePage(itemPath: string, activeSegment: string): boolean {
  const itemSegments = itemPath.split("/").filter(Boolean);
  return activeSegment === itemSegments[itemSegments.length - 1];
}
