import { effect } from "../common";
import { listen } from "./utils";

export let affect = (node: Node, fn: () => void) => {
  let control = effect(fn);
  control(false);
  listen(node, "mount", () => control(true));
  listen(node, "unmount", () => control(false));
};
