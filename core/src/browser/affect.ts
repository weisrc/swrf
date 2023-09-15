import { effect } from "../common";
import { listen } from "./utils";

export let affect = (node: Node, fn: () => void) => {
  let [handler, control] = effect(fn);
  listen(node, "premount", () => handler());
  listen(node, "unmount", () => control(false));
};
