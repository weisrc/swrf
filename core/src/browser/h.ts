import {
  ClassList,
  Component,
  ElementMap,
  ElementTag,
  Param,
  Far,
  Style
} from "../types";

import { read, effect } from "../common";
import { replace, tryNode } from "./utils";

export function h<T extends ElementTag>(
  tag: T,
  ...params: Param<ElementMap[T]>[]
): Far<ElementMap[T]>;

export function h<T extends Component>(
  tag: T,
  ...params: Parameters<T>
): Far<ReturnType<T>>;

export function h(tag: any, ...params: any): any {
  if (typeof tag === "function") {
    return tag(...params);
  }
  return (() => {
    const element = document.createElement(tag);

    for (const param of params) {
      element.append("");
      const empty = element.lastChild!;
      let current = empty;
      effect(() => {
        const out = tryNode(read(read(param)));
        const isNode = out instanceof Node;
        current = replace(element, isNode ? out : empty, current);
        if (isNode) return;
        for (const key in out) {
          const value = out[key];
          if (key === "style") {
            const style = read(value) as Style;
            if (typeof style === "object") {
              for (const p in style) {
                effect(() => (element.style[p] = read(style[p])));
              }
            }
          } else if (key === "classList") {
            const list = read(value) as ClassList;
            for (const name in list) {
              effect(() =>
                read(list[name])
                  ? element.classList.add(name)
                  : element.classList.remove(name)
              );
            }
          } else if (key.startsWith("on")) {
            element.addEventListener(
              key.slice(2),
              value as EventListenerOrEventListenerObject
            );
          } else if (key === "ref") {
            value(element);
          } else {
            effect(() => {
              element[key] = read(value);
            });
          }
        }
      });
    }
    return element;
  }) as any;
}
