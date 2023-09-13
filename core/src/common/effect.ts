import { EffectControl, EffectHandler, EffectSource } from "../types";

export let ctx: Set<EffectSource> | undefined;

export let effect = (fn: () => void, manual?: boolean): EffectControl => {
  let scheduled = false;
  let deps = new Set<EffectSource>();
  let sum = -1;

  let activate = () => {
    if (sum != setActive(false)) {
      let previous = ctx;
      ctx = new Set();
      fn();
      deps = ctx;
      ctx = previous;
    }
    sum = setActive(true);
    scheduled = false;
  };

  let handler: EffectHandler = (immediate) => {
    if (immediate) {
      activate();
    } else if (!scheduled) {
      scheduled = true;
      setTimeout(activate);
    }
  };
  let setActive = (active?: boolean) => {
    let curSum = 0;
    for (let signal of deps) {
      signal.fx[active ? "add" : "delete"](handler);
      curSum += signal.v;
    }
    return curSum;
  };

  if (!manual) activate();

  return (active, immediate) => {
    if (active) handler(immediate);
    else setActive(active);
  };
};

export let setCtx = (next: Set<EffectSource> | undefined) => {
  ctx = next;
};
