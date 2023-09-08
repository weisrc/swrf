import { Element } from "./types";
import { updateMount } from "./utils";

export const render = (fn: () => Element, node: HTMLElement) => {
  const out = fn();
  node.append(out);
  updateMount(out);
};
