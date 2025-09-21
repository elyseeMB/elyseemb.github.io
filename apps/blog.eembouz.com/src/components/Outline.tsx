import { useEffect, useRef, useState } from "preact/hooks";

export function Outline() {
  const [activeItem, setActiveItem] = useState<unknown>(false);
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
            console.log(entry);
            setActiveItem(entry.target.id);
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

  return (
    <div className="outline__wrapper">
      <ul className="outline">
        {headings.heading_level_2?.map((heading) => (
          <a key={heading.id} href={"#" + heading.id}>
            <li
              style={{
                color:
                  activeItem === heading.id ? `var(--contrast) ` : "inherit",
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
