import { Component, Element, Far } from "../types";
import { signal } from "./signal";

export const lazy = <T extends { default: Component }>(
  fn: () => Promise<T>
): ((...args: Parameters<T["default"]>) => Far<Element>) => {
  let cache: T["default"] | undefined;
  return (...args) => {
    const element = signal<Element>();
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
