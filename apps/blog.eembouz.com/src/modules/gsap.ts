import { gsap } from "gsap";

const elements = document.querySelectorAll(".split");

elements.forEach((el) => {
  const words = el.textContent!.trim().split(" ");

  el.innerHTML = words
    .map(
      (word) =>
        `<span class="word" style="opacity:0; display:inline-block">${word}&nbsp;</span>`
    )
    .join("");

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        gsap.to(entry.target.querySelectorAll(".word"), {
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        });
        observer.unobserve(entry.target);
      }
    }
  });

  observer.observe(el);
});
