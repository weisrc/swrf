import { signal } from ".";
import { MUTABLE_ARRAY_METHODS } from "../constants";
import { ArraySignal } from "../types";

export function arraySignal<T>(data: T[]): ArraySignal<T>;

export function arraySignal(data: any[] = []) {
  let array = signal(data);

  let subcribers = new Set<any>();
  function subscribe(fn: any) {
    subcribers.add(fn);
    return () => subcribers.delete(fn);
  }

  return new Proxy(array, {
    get(_, key: any) {
      if (key === "subscribe") return subscribe;
      if (!MUTABLE_ARRAY_METHODS.includes(key)) return array()[key];
      return (...args: any[]) => {
        let result = array()[key](...args);
        array(array(), true);
        for (let fn of subcribers) fn(key, args);
        return result;
      };
    },
    set(_, key: any, value: any) {
      array()[key] = value;
      array(array(), true);
      for (let fn of subcribers) fn("set", key, value);
      return value;
    },
    apply(_, __, args: any[]) {
      
      return array(...args);
    }
  });
}
