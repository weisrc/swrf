import type { Lazy, Element } from "../types";
import { updateMount } from "./nodeUtils";

export const render = (lazy: Lazy<Element>, node: Element) => {
  const out = lazy();
  node.append(out);
  updateMount(out);
};
