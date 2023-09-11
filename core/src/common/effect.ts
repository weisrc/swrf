import { listen } from "../browser/utils";
import { INTERNAL } from "../constants";

export let observer = () => {};

export let effect = (fn: () => void, node?: Node) => {
  let startup = true;
  let scheduled = false;
  let current = () => {
    let previous = observer;
    observer = delayed;
    if (startup || ((node as any)?.[INTERNAL] ?? true)) {
      fn();
    }
    observer = previous;
    scheduled = false;
  };
  let delayed = () => {
    if (!scheduled) setTimeout(current);
    scheduled = true;
  };
  current();
  startup = false;
  if (node) {
    listen(node, "mount", delayed);
    listen(node, "unmount", delayed);
  }
};
