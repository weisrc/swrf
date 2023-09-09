import { read, useEffect, useSignal } from "../common";
import type {
  Props,
  Readable,
  WritableSignal,
  Signal,
  Lazy,
  Element
} from "../types";
import { updateMount } from "./nodeUtils";

export const For = <T>(
  props: Props<{ each: T[] }> | Readable<T[]>,
  fn: (item: T, i: Signal<number>) => Lazy<Element>
): Lazy<DocumentFragment> => {
  let nodes: Element[] = [];
  let cache = new Map<T, Element>();
  const indices = new WeakMap<Node, WritableSignal<number>>();
  const head = document.createTextNode("");
  const fragment = document.createDocumentFragment();
  fragment.appendChild(head);
  return () => {
    useEffect(() => {
      const nextNodes: Element[] = [];
      const nextCache = new Map<T, Element>();

      const items = read((<Props<{ each: T[] }>>props).each ?? props);
      let current = head.nextSibling! as Element;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let node: Element = null!;
        const index = useSignal(i);
        node = (!nextCache.has(item) && cache.get(item)) || fn(item, index)();
        indices.get(node)?.(i) ?? indices.set(node, index);
        node === current
          ? (current = current.nextSibling! as Element)
          : node === current?.nextSibling
          ? (current = current.nextSibling?.nextSibling! as Element)
          : head.parentNode!.insertBefore(node, current);
        nextCache.set(item, node);
        nextNodes.push(node);
        updateMount(node);
      }
      for (const node of nodes) {
        if (nextNodes.indexOf(node) < 0) {
          head.parentNode!.removeChild(node);
          updateMount(node);
        }
      }
      cache = nextCache;
      nodes = nextNodes;
    });
    return fragment;
  };
};
