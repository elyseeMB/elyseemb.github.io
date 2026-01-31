import { onLoadClientRouter } from "@portfolio/ui/client";

onLoadClientRouter(() => {
  const codeBlocks = document.querySelectorAll<HTMLElement>("pre.astro-code");

  if (!codeBlocks) {
    return;
  }

  const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
  const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M20 6 9 17 4 12"/></svg>`;

  codeBlocks.forEach(async (pre) => {
    const wrapper = document.createElement("div");
    const language = pre.dataset.language;
    wrapper.className =
      "my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0d1117]";

    const header = document.createElement("div");
    header.className =
      "flex items-center justify-between border-b border-zinc-200 bg-zinc-50/50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/50";

    header.innerHTML = `
      <span class="copy-btn p-1.5 rounded-md text-[var(--color-secondary)]! transition-all active:scale-90">
      ${getLangFromClass(language)}
      </span>
      <button class="copy-btn p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-all active:scale-90" aria-label="Copier">
        ${copyIcon}
      </button>
    `;

    pre.className += "!m-0 !p-4 overflow-x-auto leading-relaxed";

    const copyBtn = header.querySelector(".copy-btn") as HTMLButtonElement;
    copyBtn.addEventListener("click", async () => {
      const code = pre.querySelector("code")?.innerText;
      if (!code) {
        return;
      }
      await navigator.clipboard.writeText(code);
      copyBtn.innerHTML = checkIcon;
      setTimeout(() => (copyBtn.innerHTML = copyIcon), 2000);
    });

    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });
});

function getLangFromClass(lang: string = "") {
  if (!lang) {
    return "bash";
  }
  if (lang === "tsx" || lang === "jsx") {
    return "javascript";
  }
  return lang;
}
