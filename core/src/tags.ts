import { h } from "./h";
import { HTMLTag, Params, Tags } from "./types";

export const tags = new Proxy({} as Tags, {
  get:
    <T extends HTMLTag>(_: unknown, tag: T) =>
    (...params: Params<T>) =>
      h(tag, ...params),
});
