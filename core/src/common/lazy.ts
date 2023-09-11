import { Component, BaseElement, Lazy } from "../types";
import { signal } from "./signal";

export let lazy = <T extends { default: Component }>(
  fn: () => Promise<T>
): ((...args: Parameters<T["default"]>) => Lazy<BaseElement>) => {
  let cache: T["default"] | undefined;
  return (...args) => {
    let element = signal<BaseElement>();
    let set = () => element(cache!(...(args as unknown[]))());
    if (cache) {
      set();
    } else {
      fn().then((res) => {
        cache = res.default;
        set();
      });
    }
    return element as any;
  };
};
