import { signal } from ".";
import { MUTABLE_ARRAY_METHODS } from "../constants";
import { ArraySignal } from "../types";

export function arraySignal<T>(data: T[]): ArraySignal<T>;

export function arraySignal(data: any = []) {
  const array = signal(data);

  const subcribers = new Set<any>();
  function subscribe(fn: any) {
    subcribers.add(fn);
    return () => subcribers.delete(fn);
  }

  return new Proxy(array, {
    get(_, key: any) {
      if (key === "subscribe") return subscribe;
      if (!MUTABLE_ARRAY_METHODS.includes(key)) return array()[key];
      return (...args: any[]) => {
        const result = array()[key](...args);
        array(array(), true);
        for (const fn of subcribers) fn(key, args);
        return result;
      };
    },
    set(_, key: any, value: any) {
      array()[key] = value;
      array(array(), true);
      for (const fn of subcribers) fn("set", key, value);
      return value;
    }
  });
}
