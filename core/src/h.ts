import { useEffect } from "./useEffect";
import {
  ClassList,
  HTMLTag,
  Style,
  Params,
  UPDATE_MOUNT,
  Element,
  Component,
  AttributeMap,
} from "./types";
import { read, toNode, replace } from "./utils";

export function h<T extends HTMLTag | Component>(
  tag: T,
  ...params: Params<T>
): Node {
  if (typeof tag === "function") return tag(...params);
  const el = document.createElement(tag) as Element;

  let wasConnected = false;
  el[UPDATE_MOUNT] = () => {
    const isConnected = el.isConnected;
    if (wasConnected !== isConnected) {
      if ((wasConnected = isConnected)) {
        el.onmount?.(el);
      } else {
        el.onunmount?.(el);
      }
      el.childNodes.forEach((c) => (c as Element)[UPDATE_MOUNT]?.());
    }
  };

  for (const param of params as Params<HTMLTag>) {
    el.append("");
    const empty: Node = el.lastChild!;
    let current = empty;
    useEffect(() => {
      const out = toNode(read(param));
      const isNode = out instanceof Node;
      current = replace(el, isNode ? out : empty, current);
      if (isNode) return;
      for (const key in out as AttributeMap<HTMLTag>) {
        const value = <AttributeMap<HTMLTag>>out![key as keyof typeof out];
        if (key === "style") {
          const style = read(value) as Style;
          if (typeof style === "object") {
            for (const p in style) {
              useEffect(() => (el.style[p] = read(style[p])!));
            }
            continue;
          }
        }
        if (key === "classList") {
          const list = read(value) as ClassList;
          for (const name in list) {
            useEffect(() =>
              read(list[name])
                ? el.classList.add(name)
                : el.classList.remove(name)
            );
          }
          continue;
        }
        useEffect(
          () =>
            (el[key as "id"] =
              !key.startsWith("on") && value instanceof Function
                ? value()
                : value)
        );
      }
    });
  }
  return el;
}
