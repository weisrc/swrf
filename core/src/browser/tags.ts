import type { ElementMap, ElementTag, Param, TagsFab } from "../types";
import { h } from "./h";

export const tags = new Proxy({} as TagsFab, {
  get:
    <T extends ElementTag>(_: unknown, tag: T) =>
    (...params: Param<ElementMap[T]>[]) =>
      h(tag, ...params)
});
