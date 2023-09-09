import { useSignal } from "./useSignal";
import { Child, Component } from "../types";

export const lazy = <T extends { default: Component }>(
  fn: () => Promise<T>
): ((...args: Parameters<T["default"]>) => () => Child) => {
  let cache: T["default"] | undefined;
  return (...args) => {
    const signal = useSignal<Child>(null);
    cache
      ? signal(cache(...(args as unknown[]))())
      : fn().then((res) =>
          signal((cache = res.default)(...(args as unknown[]))())
        );
    return signal;
  };
};
