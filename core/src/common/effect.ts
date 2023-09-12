import { listen } from "../browser/utils";
import { WritableSignal } from "../types";

export let ctx: Set<WritableSignal<unknown>> | undefined;

export let effect = (fn: () => void) => {
  let scheduled = false;
  let deps!: Set<WritableSignal<unknown>>;
  let sum!: number;
  let current = () => {
    let previous = ctx;
    ctx = new Set();
    fn();
    deps = ctx;
    sum = control(true);
    ctx = previous;
    scheduled = false;
  };
  let debounced = () => {
    if (!scheduled) setTimeout(current);
    scheduled = true;
  };
  let control = (active?: boolean) => {
    let sum = 0;
    for (let signal of deps) {
      signal.subs[active ? "add" : "delete"](debounced);
      sum += signal.v;
    }
    return sum;
  };

  current();

  return (active?: boolean) => {
    let nextSum = control(active);
    if (active && nextSum != sum) debounced();
  };
};

export let affect = (node: Node, fn: () => void) => {
  let control = effect(fn);
  listen(node, "mount", () => control(true));
  listen(node, "unmount", () => control(false));
};
