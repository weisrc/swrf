import type { ElementTag, HParams, TagsFunction } from "../types";
import { h } from "./h";

export const tags = new Proxy({} as TagsFunction, {
  get:
    <T extends ElementTag>(_: unknown, tag: T) =>
    (...params: HParams<T>) =>
      h(tag, ...params)
});
