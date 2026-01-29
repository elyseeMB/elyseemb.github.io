import type { MouseEventHandler } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";
import { useAsyncEffect } from "@portfolio/ui/hookds"; // J'ai retiré useToggle car on passe à useState
import {
  onDisconnectedClientRouter,
  onLoadClientRouter,
} from "@portfolio/ui/client";

export function Outline() {
  const el = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const [activeItem, setActiveItem] = useState<Element | null>(null);
  const [headings, setHeadings] = useState<
    Partial<{
      heading_level_2: null | HTMLHeadingElement[];
      heading_level_3: null | HTMLHeadingElement[];
    }>
  >({});
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const h2 = Array.from(document.querySelectorAll("h2"));
    const h3 = Array.from(document.querySelectorAll("h3"));

    setHeadings((v) => ({
      ...v,
      heading_level_2: h2,
      heading_level_3: h3,
    }));

    const observers: IntersectionObserver[] = [];

    h2.forEach((item) => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setActiveItem(entry.target);
          }
        },
        {
          rootMargin: "-10px 0px -90% 0px",
        }
      );

      observer.observe(item);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, []);

  useAsyncEffect(async () => {
    if (!ulRef.current) return;

    const { ChapiterAnimation } =
      await import("./elements/ChapiterAnimation.ts");

    const module = new ChapiterAnimation(ulRef.current);

    return () => {
      module.destroy();
    };
  }, [headings, isExpanded]);

  useEffect(() => {
    const next = (el) => {
      const array = [];
      let currentElement = el.nextElementSibling;

      while (currentElement && currentElement.tagName !== "H2") {
        if (currentElement.tagName === "P") {
          array.push(currentElement);
        }
        currentElement = currentElement.nextElementSibling;
      }
      return array;
    };
    const el = document.getElementById("mindmap");

    const listener = (e) => {
      if (!e.target) {
        return;
      }
      const target = document.getElementById(e.target.dataset.target);
      if (!target) {
        return;
      }

      const arrayTarget = new Map(
        Array.from({ length: 2 }, () => [target, next(target)])
      );

      arrayTarget.get(target).forEach((i) => {
        console.log(i);
      });
    };

    el?.addEventListener("mindmap", listener);

    return () => el?.removeEventListener("mindmap", listener);
  }, []);

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();

    const targetHref = e.currentTarget.firstElementChild!.getAttribute("href");
    const targetId = targetHref?.replace("#", "");

    if (targetId) {
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const elementTop =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const offset = 50;

        window.scrollTo({
          top: elementTop - offset,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const clickOutside = (e) => {
      if (
        (el.current && el.current.contains(e.target)) ||
        e.target.closest(".magnetic")
      ) {
        return;
      }
      setIsExpanded(false);
    };

    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [isExpanded]);

  const handleOpen = () => setIsExpanded(true);

  return (
    <div class="relative w-max">
      <div
        class="fixed inset-y-0 right-0 z-40 w-20 "
        onMouseEnter={handleOpen}
      />

      <div class="fixed top-[40%] z-50 right-5 pointer-events-none">
        <div
          data-strength="45"
          data-strength-text="25"
          class="magnetic pointer-events-auto"
          onMouseEnter={handleOpen}
        >
          <div class="relative flex flex-col items-center rounded gap-3 p-3 hover:bg-[var(--secondary)]/30">
            {Array.from(
              { length: headings.heading_level_2?.length ?? 0 },
              (_, k) => {
                const activeIndex =
                  headings.heading_level_2?.findIndex(
                    (h) => h.id === activeItem?.id
                  ) ?? -1;

                return (
                  <div
                    style={{
                      backgroundColor:
                        activeIndex === k
                          ? "var(--color-primary)"
                          : "var(--secondary)",
                    }}
                    class="w-5 h-0.5 block"
                  ></div>
                );
              }
            )}
          </div>
        </div>

        {isExpanded && (
          <div
            ref={el}
            onClick={(e) => {
              console.log(e);
            }}
            className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+1rem)] z-50 w-max max-h-[calc(100vh-4rem)] rounded-lg overflow-y-auto border border-[var(--secondary)] bg-[var(--secondary)] dark:bg-[var(--background)] p-[1rem] animate-slide-x-in pointer-events-auto"
          >
            <ul ref={ulRef} id="chapiter-animation" className="flex flex-col">
              {headings.heading_level_2?.map((heading, index) => (
                <li
                  onClick={handleClick}
                  className="flex items-center cursor-pointer text-[var(--color-secondary)]/60"
                >
                  <a
                    class="relative p-2"
                    key={heading.id}
                    href={"#" + heading.id}
                  >
                    <div
                      style={{
                        color:
                          activeItem?.id === heading.id
                            ? "var(--color-primary)"
                            : "inherit",
                      }}
                      class="block max-w-[200px] overflow-hidden text-ellipsis transition"
                    >
                      {heading.textContent
                        ?.replace(/[^\p{L}\p{N}\s]/gu, "")
                        .trim()}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
