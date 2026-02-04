import type { ItemDisplayed } from "../../config.ts";

type Props = {
  items: ItemDisplayed["props"];
};
export function Overlay({ items }: Props) {
  return <div class="absolute inset-0">Overlay</div>;
}
