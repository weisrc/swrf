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
import { listen, replace, tryNode, updateMount } from "./utils";
import { read } from "../common";
import { affect } from "./affect";

let currentNS: string;

export let render = (
  component: Component<BaseElement, []>,
  node: BaseElement
) => {
  currentNS = node.namespaceURI!;
  let out = component()();
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
): ReturnType<T>;

export function h(tag: any, ...params: any): any {
  if (typeof tag === "function") {
    return tag(...params);
  }
  return (() => {
    let previousNS = currentNS;
    let element = document.createElementNS(currentNS, tag) as any;
    currentNS = params[0]?.xmlns ?? currentNS;

    for (let param of params) {
      element.append("");
      let empty = element.lastChild;
      let current = empty;
      affect(element, () => {
        let out = tryNode(read(read(param)));
        let isNode = out instanceof Node;
        current = replace(current, isNode ? out : empty);
        if (!isNode) {
          for (let key in out) {
            let value = out[key];
            if (key === "style") {
              let style = read(value) as Style;
              if (typeof style === "object") {
                for (let p in style) {
                  affect(element, () => (element.style[p] = read(style[p])));
                }
              }
            } else if (key === "classList") {
              let list = read(value) as ClassList;
              for (let name in list) {
                affect(element, () =>
                  read(list[name])
                    ? element.classList.add(name)
                    : element.classList.remove(name)
                );
              }
            } else if (key.startsWith("on")) {
              listen(element, key.slice(2), value);
            } else if (key === "ref") {
              value(element);
            } else {
              affect(element, () => (element[key] = read(value)));
            }
          }
        }
      });
    }
    currentNS = previousNS;
    return element;
  }) as any;
}
