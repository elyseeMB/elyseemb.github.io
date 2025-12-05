export class ChapiterAnimation {
  //@ts-ignore it's initialize
  itemSize: number;
  //@ts-ignore it's initialize
  children: HTMLElement[];
  //@ts-ignore it's initialize
  wrapper: HTMLElement;

  constructor(private item: HTMLElement | null) {
    if (!item) {
      return;
    }
    this.children = Array.from(item.children) as HTMLElement[];
    if (this.children.length === 0) {
      return;
    }
    const parent = this.item?.parentElement;
    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("class", "bg-secondary absolute rounded-md");
    this.wrapper.style.opacity = "0";
    this.wrapper.style.pointerEvents = "none";
    parent?.prepend(this.wrapper);
    parent?.addEventListener("mouseleave", () => {
      this.wrapper.style.opacity = "0";
    });

    this.itemSize = this.children[0].offsetHeight;
    this.children.forEach((item, index) => {
      item.addEventListener("mouseenter", (e) =>
        this.handleMouseenter(e, index)
      );
    });
  }

  handleMouseenter = (e: MouseEvent, index: number) => {
    const child = (e.currentTarget as HTMLLIElement)
      .firstElementChild! as HTMLElement;

    const item = e.currentTarget as HTMLElement;

    const top = index * this.itemSize;
    const rect = item.getBoundingClientRect();

    const mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    const translateX = mouseX;
    const translateY = mouseY;
    const translateZ = 0;

    const scaleX = 1 + Math.abs(mouseX) * 0.1;
    const scaleY = 1 + Math.abs(mouseY) * 0.05;
    this.wrapper.setAttribute(
      "style",
      `left: ${item.offsetLeft}px;
        top: ${top}px;
        width: ${child.offsetWidth}px;
        height: ${item.offsetHeight}px;
        transform: translate3d(${translateX}px, ${translateY}px, ${translateZ}px) scale(${scaleX}, ${scaleY});
        transform-origin: 50% 50% 0px;
        z-index: -1;
        opacity: 1;
        transition: all 0.2s ease;`
    );
  };
}
