import { designPatterns } from "./data.ts";

export default function DisplayList() {
  const url = new URL(window.location.href);

  return (
    <div class="stack__pattern">
      {designPatterns.map((pattern) => (
        <article style={{ "--bg": `var(--${pattern.slug})` }} class="card">
          <span>{pattern.name}</span>
          <span>{pattern.description}</span>
        </article>
      ))}
    </div>
  );
}
