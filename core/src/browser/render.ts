import type { BaseElement, Lazy } from "../types";
import { updateMount } from "./utils";

export const render = (lazy: Lazy<BaseElement>, node: BaseElement) => {
  const out = lazy();
  node.append(out);
  updateMount(out);
};
