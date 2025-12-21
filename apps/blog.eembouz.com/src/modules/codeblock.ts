document.addEventListener("astro:page-load", () => {
  const codeBlocks = document.querySelectorAll("pre.astro-code");

  const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
  const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M20 6 9 17 4 12"/></svg>`;
  const fileIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-zinc-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`;

  codeBlocks.forEach((pre) => {
    // 1. Créer le wrapper principal (Contrôle le fond ici)
    const wrapper = document.createElement("div");
    const language = pre.dataset.language;
    wrapper.className =
      "my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0d1117]";

    // 2. Créer l'en-tête (Header) sans le titre du langage
    const header = document.createElement("div");
    header.className =
      "flex items-center justify-between border-b border-zinc-200 bg-zinc-50/50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/50";

    header.innerHTML = `
      <span class="copy-btn p-1.5 rounded-md text-[var(--color-secondary)]! transition-all active:scale-90">
      ${language}
      </span>
      <button class="copy-btn p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-all active:scale-90" aria-label="Copier">
        ${copyIcon}
      </button>
    `;

    // 3. Préparer le bloc <pre> original
    pre.className += " !m-0 !p-4 overflow-x-auto text-sm leading-relaxed";

    // 4. Logique du bouton de copie
    const copyBtn = header.querySelector(".copy-btn");
    copyBtn.addEventListener("click", async () => {
      const code = pre.querySelector("code").innerText;
      await navigator.clipboard.writeText(code);
      copyBtn.innerHTML = checkIcon;
      setTimeout(() => (copyBtn.innerHTML = copyIcon), 2000);
    });

    // 5. Remplacement dans le DOM
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });
});
