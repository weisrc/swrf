import {
  ClassList,
  Component,
  Element,
  ElementTag,
  HParams,
  Lazy,
  Style
} from "../types";

import { read, useEffect } from "../common";
import { replace, tryNode } from "./nodeUtils";

export function h<T extends ElementTag>(
  tag: T,
  ...params: HParams<T>
): Lazy<Element<T>>;

export function h<T extends Component>(
  tag: T,
  ...params: Parameters<T>
): Lazy<ReturnType<T>>;

export function h(tag: any, ...params: any): any {
  if (typeof tag === "function") {
    return tag(...params);
  }
  return (() => {
    const el = document.createElement(tag);

    for (const param of params) {
      el.append("");
      const empty = el.lastChild!;
      let current = empty;
      useEffect(() => {
        const out = tryNode(read(param));
        const isNode = out instanceof Node;
        current = replace(el, isNode ? out : empty, current);
        if (isNode) return;
        for (const key in out) {
          const value = out[key];
          if (key === "style") {
            const style = read(value) as Style;
            if (typeof style === "object") {
              for (const p in style) {
                useEffect(() => (el.style[p] = read(style[p])));
              }
            }
          } else if (key === "classList") {
            const list = read(value) as ClassList;
            for (const name in list) {
              useEffect(() =>
                read(list[name])
                  ? el.classList.add(name)
                  : el.classList.remove(name)
              );
            }
          } else if (key.startsWith("on")) {
            el.addEventListener(
              key.slice(2),
              value as EventListenerOrEventListenerObject
            );
          } else {
            useEffect(() => {
              el[key] = read(value);
            });
          }
        }
      });
    }
    return el;
  }) as any;
}
