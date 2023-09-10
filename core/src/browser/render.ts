import type { Element, Far } from "../types";
import { updateMount } from "./utils";

export const render = (lazy: Far<Element>, node: Element) => {
  const out = lazy();
  node.append(out);
  updateMount(out);
};
