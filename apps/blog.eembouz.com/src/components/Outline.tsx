import type { EventHandler, MouseEventHandler } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";

export function Outline() {
  const [activeItem, setActiveItem] = useState<Element | null>(null);
  const [headings, setHeadings] = useState<
    Partial<{
      heading_level_2: null | HTMLHeadingElement[];
      heading_level_3: null | HTMLHeadingElement[];
    }>
  >({});

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

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    const targetHref = e.currentTarget.getAttribute("href");
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
    <div className="outline__wrapper w-max">
      <ul className="flex flex-col gap-3 px-[4rem]  w-[350px]">
        {headings.heading_level_2?.map((heading) => (
          <a onClick={handleClick} key={heading.id} href={"#" + heading.id}>
            <li
              className="whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                color:
                  activeItem?.id === heading.id
                    ? `var(--contrast) `
                    : "inherit",
              }}
            >
              {heading.textContent}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
}
