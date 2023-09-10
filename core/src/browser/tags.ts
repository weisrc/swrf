import type { CommonNamespace, CommonTag, Param, Tags } from "../types";
import { h } from "./h";

export const tags = new Proxy({} as Tags, {
  get:
    <T extends CommonTag>(_: unknown, tag: T) =>
    (...params: Param<CommonNamespace[T]>[]) =>
      h(tag, ...params)
});
