import { EffectControl, EffectHandler, EffectSource } from "../types";

export let ctx: Set<EffectSource> | undefined;

export let effect = (fn: () => void): EffectControl => {
  let scheduled = false;
  let deps = new Set<EffectSource>();
  let sum = -1;

  let run = () => {
    if (sum != setActive(false)) {
      let previous = ctx;
      ctx = new Set();
      fn();
      deps = ctx;
      ctx = previous;
      sum = setActive(true);
    }
    scheduled = false;
  };
  let handler: EffectHandler = (immediate) => {
    if (immediate) {
      run();
    } else if (!scheduled) {
      scheduled = true;
      setTimeout(run);
    }
  };
  let setActive = (active?: boolean) => {
    let sum = 0;
    for (let signal of deps) {
      signal.fx[active ? "add" : "delete"](handler);
      sum += signal.v;
    }
    return sum;
  };

  run();

  return (active, immediate) => {
    setActive(active);
    handler(immediate);
  };
};

export let setCtx = (next: Set<EffectSource> | undefined) => {
  ctx = next;
};
