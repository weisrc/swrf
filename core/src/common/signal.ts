import type { WritableSignal } from "../types";
import { observer } from "./effect";

export function signal<T>(): WritableSignal<T | undefined>;
export function signal<T>(data: T): WritableSignal<T>;
export function signal(data?: any) {
  let observers = new Set<() => void>();
  return (...args: any[]) => {
    if (0 in args) {
      const next = args[0]!;
      if (next !== data || args[1]) {
        data = next;
        const previous = observers;
        observers = new Set();
        for (const o of previous) o();
      }
    } else {
      observers.add(observer);
    }
    return data;
  };
}
