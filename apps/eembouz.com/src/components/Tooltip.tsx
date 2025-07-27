// src/components/Tooltip.tsx
type TooltipProps = {
  text: string;
  x: number;
  y: number;
};

export function Tooltip({ text, x, y }: TooltipProps) {
  return (
    <div
      class="dock-tooltip"
      style={{
        position: "fixed",
        left: `${x}px`,
        top: `${y}px`,
        background: "black",
        color: "#fff",
        textTransform: "uppercase",
        padding: "15px 10px",
        fontSize: "24px",
        pointerEvents: "none",
        zIndex: 1000,
        whiteSpace: "normal",
        maxWidth: "300px",
        wordBreak: "break-word",
      }}
    >
      {text}
    </div>
  );
}
