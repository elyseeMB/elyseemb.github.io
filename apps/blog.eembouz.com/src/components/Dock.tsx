import { useEffect, useRef, useState } from "preact/hooks";
import { Tooltip } from "./Tooltip";

type Props = {
  items: Array<{ data: { thumbnail: string; title: string } }>;
};

function between(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(val, max));
}

function scaling(d: number) {
  return between(-0.2 * Math.pow(d, 2) + 1.05, 0, 1);
}

const transformOrigins = {
  "-1": "right",
  "0": "center",
  "1": "left",
} as const;

export function Dock({ items }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const iconSizeRef = useRef<number>(0);
  const mousePosition = useRef<number>(0);
  const currentIndex = useRef<number>(-1);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    text: string;
    x: number;
    y: number;
  }>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const timeout = setTimeout(() => {
      const icons = Array.from(
        root.querySelectorAll(".dock-icon")
      ) as HTMLElement[];
      if (icons.length === 0) return;

      iconSizeRef.current = icons[0]?.offsetWidth ?? 64;

      const handleMouseMove = (e: MouseEvent) => {
        const mouseX = (e.clientX - root.offsetLeft) / iconSizeRef.current;
        mousePosition.current = between(mouseX, 0, icons.length);
        scaleIcons();
        updateTooltip(e);
      };

      const handleEnter = () => {
        root.classList.add("animated");
        setTimeout(() => root.classList.remove("animated"), 500);
      };

      const handleLeave = () => {
        currentIndex.current = -1;
        icons.forEach((icon) => {
          icon.style.removeProperty("transform");
          icon.style.removeProperty("transform-origin");
          icon.classList.remove("active");
        });

        document
          .querySelector<HTMLElement>(".viewport")
          ?.style.removeProperty("background");
        setTooltip((prev) => ({ ...prev, visible: false }));
      };

      const scaleIcons = () => {
        const selectedIndex = Math.floor(mousePosition.current);
        if (selectedIndex !== currentIndex.current) {
          handleTarget(selectedIndex);
          currentIndex.current = selectedIndex;
        }

        const centerOffset = mousePosition.current - selectedIndex - 0.5;

        let baseOffset = scaleFromDirection(
          selectedIndex,
          0,
          -centerOffset * iconSizeRef.current
        );
        let offset = baseOffset * (0.5 - centerOffset);

        for (let i = selectedIndex + 1; i < icons.length; i++) {
          offset += scaleFromDirection(i, 1, offset);
        }

        offset = baseOffset * (0.5 + centerOffset);
        for (let i = selectedIndex - 1; i >= 0; i--) {
          offset += scaleFromDirection(i, -1, -offset);
        }
      };

      const scaleFromDirection = (
        index: number,
        direction: -1 | 0 | 1,
        offset: number
      ) => {
        const icon = icons[index];
        if (!icon) return 0;
        const center = index + 0.5;
        const distanceFromPointer = mousePosition.current - center;
        const scale = scaling(distanceFromPointer);
        icon.style.transform = `translateX(${offset}px) scale(${scale + 1})`;
        icon.style.transformOrigin = `${transformOrigins[direction]} bottom`;
        return scale * iconSizeRef.current;
      };

      const handleTarget = (index: number) => {
        const icon = icons[index];
        if (!icon) return;

        const img = icon.querySelector("img");
        const title = icon.getAttribute("data-title") ?? "";

        if (img) {
          const bg = img.src;
          document
            .querySelector<HTMLElement>(".viewport")
            ?.style.setProperty("background", `url(${bg}) no-repeat center`);
        }

        icons.forEach((el, i) => el.classList.toggle("active", i === index));

        setTooltip((prev) => ({ ...prev, visible: true, text: title }));
      };

      const updateTooltip = (e: MouseEvent) => {
        setTooltip((prev) => ({
          ...prev,
          x: e.clientX + 10,
          y: e.clientY - 30,
        }));
      };

      root.addEventListener("mousemove", handleMouseMove);
      root.addEventListener("mouseleave", handleLeave);
      root.addEventListener("mouseenter", handleEnter);

      return () => {
        root.removeEventListener("mousemove", handleMouseMove);
        root.removeEventListener("mouseleave", handleLeave);
        root.removeEventListener("mouseenter", handleEnter);
      };
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div class="dock-wrapper">
        <div class="dock" ref={rootRef}>
          {items.map((item, index) => (
            <div class="dock-icon" data-title={item.data.title} key={index}>
              <img src={item.data.thumbnail} alt={`dock-${index}`} />
            </div>
          ))}
        </div>
      </div>
      {tooltip.visible && (
        <Tooltip text={tooltip.text} x={tooltip.x} y={tooltip.y} />
      )}
    </>
  );
}
