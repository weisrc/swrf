import type { EffectHandler, SignalFn, WritableSignal } from "../types";
import { ctx } from "./effect";

export let signal: SignalFn = (data?: unknown) => {
  let signal = ((...args: any[]) => {
    if (0 in args) {
      let next = args[0]!;
      if (next !== data || args[1]) {
        data = next;
        signal.v++;
        for (let fx of signal.fx) fx(args[2]);
      }
    } else {
      ctx?.add(signal);
    }
    return data;
  }) as WritableSignal<unknown>;
  signal.v = 0;
  signal.fx = new Set<EffectHandler>();
  return signal;
};
