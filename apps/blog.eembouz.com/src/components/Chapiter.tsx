import { useCallback, useEffect, useRef } from "preact/hooks";
import { ChapiterAnimation } from "./elements/ChapiterAnimation.ts";

type Props = {
  items: any;
};

export function Chapiter({ items }: Props) {
  const ulRef = useRef<HTMLUListElement>(null);

  const url = new URL(window.location.href);
  const isActive = url.pathname.split("/").filter(Boolean).slice(2).join("/");

  console.log(isActive);

  useEffect(() => {
    if (items) {
      new ChapiterAnimation(ulRef.current);
    }
  }, [items]);

  return (
    <div class="relative outline__wrapper w-max  animate-fade-in  animation-delay-200">
      <ul ref={ulRef} id="chapiter-animation text-lg!" className="">
        {items.map((item) => (
          <li className="relative px-2 py-2 flex items-center cursor-pointer">
            <a
              class="block pr-4 text-neutral-500! z-10 before:content-[''] before:absolute before:-z-10 before:inset-0 before:w-full before:h-full"
              key={item.id}
              href={`/series/${item.id}`}
            >
              <div
                aria-current={
                  isActive === item.id.split("/")[1] ? "page" : undefined
                }
                class="block whitespace-nowrap max-w-[250px] overflow-hidden text-ellipsis transition aria-[current=page]:border-l-2 aria-[current=page]:border-l-[var(--contrast)]! aria-[current=page]:px-3 aria-[current=page]:text-[var(--color-primary)]! transition-all duration-300"
              >
                {item.data.title}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
