import { between } from "../functions/helper.ts";

function initSplitAnimation() {
  const elements = document.querySelectorAll(".split");

  elements.forEach((el) => {
    if (el.getAttribute("data-split-initialized")) {
      return;
    }

    const words = el.textContent!.trim().split(" ");

    el.innerHTML = words
      .map(
        (word, index) =>
          `<span class="animate-perspective-in animation-delay-${between(
            index * 100,
            0,
            300
          )} inline-block">${word}&nbsp;</span>`
      )
      .join("");

    el.setAttribute("data-split-initialized", "true");

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      }
    });

    observer.observe(el);
  });
}

initSplitAnimation();

document.addEventListener("astro:after-swap", () => {
  document.querySelectorAll(".split").forEach((el) => {
    el.removeAttribute("data-split-initialized");
  });

  initSplitAnimation();
});
