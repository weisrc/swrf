import { signal as oldSignal } from "..";
import type { WritableSignal } from "../../types";
import { increaseRecoveredRefCount, isHMR, iterators } from "./render";

const re = /([^(]+)@|at ([^(]+) \(/g;

type Entry<T> = {
  i: number;
  signals: [T, WritableSignal<T>][];
};

export const signal = (data: any) => {
  if (import.meta.hot) {
    const cache: Record<string, Entry<typeof data>> = import.meta.hot.data;
    try {
      throw new Error();
    } catch (e) {
      const { stack } = e as Error;
      if (stack) {
        const fns = [];
        loop: for (const line of stack.split("\n")) {
          for (const match of line.matchAll(re)) {
            const fn = match[1] || match[2];
            if (fn.endsWith("SWRF_RENDER")) break loop;
            fns.push(fn);
          }
        }
        const key = JSON.stringify(fns);
        if (isHMR) {
          const i = (iterators[key] = (iterators[key] || 0) + 1);
          const pair = cache[key].signals[i - 1];
          if (!pair || JSON.stringify(pair[0]) !== JSON.stringify(data)) {
            globalThis.location.reload();
          }
          increaseRecoveredRefCount();
          return pair[1];
        } else {
          const out = oldSignal(data);
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