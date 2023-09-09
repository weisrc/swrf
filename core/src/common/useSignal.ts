import type { WritableSignal } from "../types";
import { handler } from "./useEffect";

export const useSignal = <T>(data: T): WritableSignal<T> => {
  let handlers = new Set<() => void>();
  return (...args) => {
    if (args.length) {
      const update = args[0]!;
      if (update !== data) {
        data = args[0]!;
        const previous = handlers;
        handlers = new Set();
        for (const o of previous) o();
      }
    } else {
      handlers.add(handler);
    }
    return data;
  };
};
