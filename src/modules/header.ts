/**
 * Throttle un callback
 */
export function throttle(callback: Function, delay: number) {
  let last: number;
  let timer: number;
  return function () {
    // @ts-ignore
    let context = this;
    let now = +new Date();
    let args = arguments;
    if (last && now < last + delay) {
      // le délai n'est pas écoulé on reset le timer
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        callback.apply(context, args);
      }, delay);
    } else {
      last = now;
      callback.apply(context, args);
    }
  };
}

let $header = document.querySelector(".header") as HTMLElement;

let currentTop = 0;
let previousTop = 0;
let scrolling = false;
const scrollDelta = 20;
let scrollOffset = $header ? $header.offsetHeight : 0;

// Les différents états possible du header
const FIXED = 0;
const HIDDEN = 1;
const DEFAULT = 2;
let state = DEFAULT;

/**
 * Fonction de changement d'état du header
 *
 * @param {number} newState
 */
function setState(newState: number) {
  if (newState === state) {
    return;
  }

  if (newState === HIDDEN) {
    $header.classList.add("is-hidden");
    // $header!.style.left = 2 + "px";
  } else if (newState === FIXED) {
    $header.classList.remove("is-hidden");
    $header.classList.add("is-fixed");
  } else if (newState === DEFAULT) {
    $header.classList.remove("is-hidden");
    $header.classList.remove("is-fixed");
  }

  state = newState;
}

const autoHideHeader = function () {
  if (!$header) {
    return;
  }
  currentTop = document.documentElement.scrollTop;
  // Opacité sur le header
  if (currentTop > $header.offsetHeight) {
    if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
      setState(HIDDEN);
    } else if (previousTop - currentTop > scrollDelta) {
      setState(FIXED);
    }
  } else {
    setState(DEFAULT);
  }
  /**
  // Masquage / affichage
  if (previousTop - currentTop > scrollDelta) {
    $header.classList.remove('is-hidden')
  } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
    $header.classList.add('is-hidden')
  }
   **/
  previousTop = currentTop;
  scrolling = false;
};

/**
 * Enregistre le comportement du header (fixed au scoll)
 * @return {function(): void}
 */
export function registerHeader() {
  const scrollListener = throttle(() => {
    if (!scrolling) {
      scrolling = true;
      window.requestAnimationFrame(autoHideHeader);
    }
  }, 100);
  window.addEventListener("scroll", scrollListener);
  return () => {
    window.removeEventListener("scroll", scrollListener);
  };
}

registerHeader();
