import { read } from "../common";
import type { BaseElement, ClassList, Component, HFn, Style } from "../types";
import { affect } from "./affect";
import {
  doc,
  getType,
  isNode,
  listen,
  replace,
  tryNode,
  updateMount
} from "./utils";

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

let forKVAffect = (
  element: Node,
  obj: any,
  fn: (key: string, value: any) => void
) => {
  for (let key in obj) affect(element, () => fn(key, read(obj[key])));
};

export let h: HFn = (tag: any, ...params: any): any => {
  if (getType(tag)[0] == "f") {
    return tag(...params);
  }
  return (() => {
    let previousNS = currentNS;
    let element = doc.createElementNS(currentNS, tag) as any;
    currentNS = params[0]?.xmlns ?? currentNS;

    params.map((param: any) => {
      element.append("");
      let empty = element.lastChild;
      let current = empty;
      affect(element, () => {
        let out = tryNode(read(read(param)));
        let gotNode = isNode(out);
        current = replace(current, gotNode ? out : empty);
        if (!gotNode) {
          for (let key in out) {
            let value = out[key];
            if (key == "style") {
              forKVAffect(
                element,
                value as Style,
                (k, v) => (element[key][k] = v)
              );
            } else if (key == "classList") {
              forKVAffect(element, value as ClassList, (k, v) =>
                element[key].toggle(k, v)
              );
            } else if (key[0] == "$") {
              listen(element, key.slice(1), value);
            } else if (key === "ref") {
              value(element);
            } else {
              affect(element, () => (element[key] = read(value)));
            }
          }
        }
      });
    });
    currentNS = previousNS;
    return element;
  }) as any;
};
