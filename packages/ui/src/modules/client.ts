export function onLoadClientRouter(cb: Function) {
  return document.addEventListener("astro:page-load", cb.bind(this));
}
