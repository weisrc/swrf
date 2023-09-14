import { EffectControl, EffectHandler, EffectSource } from "../types";

export let ctx: Set<EffectSource> | undefined;

export let effect = (
  fn: () => void,
  idle?: boolean
): [EffectHandler, EffectControl] => {
  let scheduled = false;
  let deps = new Set<EffectSource>();
  let sum = -1;

  let activate = () => {
    if (sum != control(false)) {
      let previous = ctx;
      ctx = new Set();
      fn();
      deps = ctx;
      ctx = previous;
    }
    sum = control(true);
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
  let control: EffectControl = (active?: boolean, sum = 0) => {
    deps.forEach((signal) => {
      signal.fx[active ? "add" : "delete"](handler);
      sum += signal.v;
    });
    return sum;
  };

  if (!idle) activate();

  return [handler, control];
};

export let setCtx = (next: Set<EffectSource> | undefined) => {
  ctx = next;
};
