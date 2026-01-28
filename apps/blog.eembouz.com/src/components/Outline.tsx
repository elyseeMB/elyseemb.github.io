import type { MouseEventHandler } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";
import { ChapiterAnimation } from "./elements/ChapiterAnimation.ts";
import { between } from "../functions/helper.ts";

export function Outline() {
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

  useEffect(() => {
    if (headings) {
      new ChapiterAnimation(ulRef.current);
    }
  }, [headings]);

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
        // i.setAttribute("class", "opacity-[0.5] transition");
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

  return (
    <div className="relative outline__wrapper w-max animate-fade-in  animation-delay-200">
      <ul ref={ulRef} id="chapiter-animation" className="">
        {headings.heading_level_2?.map((heading, index) => (
          <li
            onClick={handleClick}
            className={`px-2 py-2 flex items-center cursor-pointer animate-slide-in animation-delay-${between(
              index * 100,
              0,
              300
            )}`}
          >
            <a
              class="relative inline-block pr-4 "
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
                {heading.textContent?.replace(/[^\p{L}\p{N}\s]/gu, "").trim()}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
