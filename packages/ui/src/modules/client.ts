export function onLoadClientRouter(cb: Function) {
  return document.addEventListener("astro:page-load", cb.bind(this));
}

export function onDisconnectedClientRouter(cb: Function) {
  return document.removeEventListener("astro:page-load", cb.bind(this));
}
