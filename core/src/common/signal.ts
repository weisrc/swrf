import type { WritableSignal } from "../types";
import { observer } from "./effect";

export function signal<T>(): WritableSignal<T | undefined>;
export function signal<T>(data: T): WritableSignal<T>;
export function signal(data?: any) {
  let observers = new Set<() => void>();
  return (...args: any[]) => {
    if (0 in args) {
      let next = args[0]!;
      if (next !== data || args[1]) {
        data = next;
        let previous = observers;
        observers = new Set();
        for (let o of previous) o();
      }
    } else {
      observers.add(observer);
    }
    return data;
  };
}
