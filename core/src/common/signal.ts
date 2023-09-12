import type { WritableSignal } from "../types";
import { ctx } from "./effect";

export function signal<T>(): WritableSignal<T | undefined>;
export function signal<T>(data: T): WritableSignal<T>;
export function signal(data?: unknown) {
  let signal = ((...args: any[]) => {
    if (0 in args) {
      let next = args[0]!;
      if (next !== data || args[1]) {
        data = next;
        signal.v++;
        for (let s of signal.subs) s();
      }
    } else {
      ctx?.add(signal);
    }
    return data;
  }) as WritableSignal<unknown>;
  signal.v = 0;
  signal.subs = new Set<() => void>();
  return signal;
}
