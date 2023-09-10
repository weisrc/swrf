import type {
  BaseElement,
  ClassList,
  CommonNamespace,
  CommonTag,
  Component,
  Lazy,
  Param,
  Style
} from "../types";
import { replace, tryNode, updateMount } from "./utils";
import { effect, read } from "../common";

let currentNamespace: string;

export const render = (lazy: Lazy<BaseElement>, node: BaseElement) => {
  currentNamespace = node.namespaceURI!;
  const out = lazy();
  node.append(out);
  updateMount(out);
};

export function h<T extends CommonTag>(
  tag: T,
  ...params: Param<CommonNamespace[T]>[]
): Lazy<CommonNamespace[T]>;

export function h<T extends Component>(
  tag: T,
  ...params: Parameters<T>
): Lazy<ReturnType<T>>;

export function h(tag: any, ...params: any): any {
  if (typeof tag === "function") {
    return tag(...params);
  }
  return (() => {
    let previousNamespace = currentNamespace;
    currentNamespace = params[0]?.xmlns ?? currentNamespace;
    const element = document.createElementNS(currentNamespace, tag) as any;

    for (const param of params) {
      element.append("");
      const empty = element.lastChild;
      let current = empty;

      effect(() => {
        const out = tryNode(read(read(param)));
        const isNode = out instanceof Node;
        current = replace(current, isNode ? out : empty);
        if (!isNode) {
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
        }
      });
    }
    currentNamespace = previousNamespace;
    return element;
  }) as any;
}
