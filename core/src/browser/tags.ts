import type { CommonNamespace, CommonTag, Param, Tags } from "../types";
import { h } from "./render";

export let tags = new Proxy({} as Tags, {
  get:
    <T extends CommonTag>(_: unknown, tag: T) =>
    (...params: Param<CommonNamespace[T]>[]) =>
      h(tag, ...params)
});
