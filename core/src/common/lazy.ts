import { Component, BaseElement, Lazy } from "../types";
import { signal } from "./signal";

export const lazy = <T extends { default: Component }>(
  fn: () => Promise<T>
): ((...args: Parameters<T["default"]>) => Lazy<BaseElement>) => {
  let cache: T["default"] | undefined;
  return (...args) => {
    const element = signal<BaseElement>();
    const set = () => element(cache!(...(args as unknown[]))());
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
