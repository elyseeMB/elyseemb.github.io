import type { CollectionEntry } from "astro:content";
import { render } from "preact";
import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type EventHandler,
  type FocusEvent,
  type ReactNode,
  type TargetedEvent,
} from "preact/compat";
import { Wrapper } from "./Wrapper.tsx";

function createSuggestionsContainer() {
  const container = document.createElement("div");
  container.className = "search-suggestions";
  const blogElement = document.querySelector(".blog");
  if (blogElement && blogElement.parentNode) {
    blogElement.parentNode.insertBefore(container, blogElement.nextSibling);
  }
  return container;
}

export function Search({ articles }: { articles: CollectionEntry<"blog">[] }) {
  const [links, setLinks] = useState<any[]>([]);

  const handleSearch: EventHandler<ChangeEvent<HTMLInputElement>> = useCallback(
    async (e) => {
      e.preventDefault();
      const newSearch = (e.target as HTMLInputElement)!.value.trim();
      const blogElement = document.querySelector(".blog") as HTMLElement;
      const suggestionsContainer: HTMLDivElement =
        document.querySelector(".search-suggestions") ||
        createSuggestionsContainer();

      if (!newSearch) {
        if (blogElement) {
          blogElement.style.display = "block";
        }
        suggestionsContainer.style.display = "none";
        return;
      }

      const currentMatches = getMatches(links, newSearch);
      const { Suggestions } = await import("./Suggestion.tsx");

      if (currentMatches.length >= 1) {
        if (blogElement) {
          blogElement.style.display = "none";
        }
        suggestionsContainer.style.display = "block";
        render(<Suggestions matches={currentMatches} />, suggestionsContainer);
      }
    },
    [links]
  );

  useEffect(() => {
    setLinks(
      Array.from(
        articles.map((a) => {
          return {
            name: a.data.title,
            link: a.id,
            ...a,
          };
        })
      )
    );
  }, []);

  return (
    <Wrapper className="search">
      <input
        onInput={handleSearch}
        className="search-input"
        type="text"
        placeholder="Quel article rechercez vous ?"
      />
    </Wrapper>
  );
}

function getMatches(links: { name: string; link: string }[], search: any) {
  if (!search) {
    return [];
  }
  let regexp = "\\b(.*)";
  for (const i in search) {
    regexp += `(${search[i]})(.*)`;
  }
  regexp += "\\b";

  return links
    .map((link) => {
      const results = link.name.match(new RegExp(regexp, "i"));
      if (results) {
        const highlight = [];
        for (const i in results) {
          if (i > 0) {
            highlight.push(
              i % 2 === 0 ? <mark>{results[i]}</mark> : results[i]
            );
          }
        }
        return {
          ...link,
          highlight,
        };
      }
      return null;
    })
    .filter((link) => link !== null);
}
