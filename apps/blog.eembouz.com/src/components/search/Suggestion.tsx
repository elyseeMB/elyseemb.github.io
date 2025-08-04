import type { CollectionEntry } from "astro:content";
import type { JSX } from "preact/jsx-runtime";

export function Suggestions({
  matches,
}: {
  matches: (
    | ({
        highlight: (string | JSX.Element)[];
        name: string;
        link: string;
      } & CollectionEntry<"blog">)
    | null
  )[];
}) {
  return (
    <>
      <div class="stack">
        {matches ? (
          matches.map((article) => (
            <a href={`/blog/${article!.id}`}>
              <article class="item">
                <div class="item__info">
                  <h3 class="item__title">{article!.highlight}</h3>
                  <div class="meta">
                    <span>
                      {new Intl.DateTimeFormat("fr", {
                        dateStyle: "medium",
                      }).format(article!.data.pubDate)}
                      · {article!.data.author.id}
                    </span>
                  </div>
                  <p class="item__description">{article!.data.summary}</p>
                </div>
              </article>
            </a>
          ))
        ) : (
          <>pas d'articles</>
        )}
      </div>
    </>
  );
}
