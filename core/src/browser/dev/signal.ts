import { signal as oldSignal } from "..";
import type { WritableSignal } from "../../types";
import { increaseRecoveredRefCount, isHMR, iterators } from "./render";

let re = /([^(]+)@|at ([^(]+) \(/g;

type Entry<T> = {
  i: number;
  signals: [T, WritableSignal<T>][];
};

export let signal = (data: any) => {
  if (import.meta.hot) {
    let cache: Record<string, Entry<typeof data>> = import.meta.hot.data;
    try {
      throw new Error();
    } catch (e) {
      let { stack } = e as Error;
      if (stack) {
        let fns = [];
        loop: for (let line of stack.split("\n")) {
          for (let match of line.matchAll(re)) {
            let fn = match[1] || match[2];
            if (fn.endsWith("SWRF_RENDER")) break loop;
            fns.push(fn);
          }
        }
        let key = JSON.stringify(fns);
        if (isHMR) {
          let i = (iterators[key] = (iterators[key] || 0) + 1);
          let pair = cache[key].signals[i - 1];
          if (!pair || JSON.stringify(pair[0]) !== JSON.stringify(data)) {
            globalThis.location.reload();
          }
          increaseRecoveredRefCount();
          return pair[1];
        } else {
          let out = oldSignal(data);
          if (cache[key]) {
            cache[key].signals.push([data, out]);
            cache[key].i++;
          } else {
            cache[key] = {
              i: 0,
              signals: [[data, out]]
            };
          }
          return out;
        }
      }
    }
  }
  return oldSignal(data);
};
