import { read, effect, signal } from "../common";
import type {
  Props,
  Readable,
  WritableSignal,
  Signal,
  Far,
  Element
} from "../types";
import { updateMount } from "./utils";

const nextSibling = (node: Node) => node?.nextSibling!;

export const For = <T>(
  props: Props<{ each: T[] }> | Readable<T[]>,
  fn: (item: T, i: Signal<number>) => Far<Element>
): Far<DocumentFragment> => {
  return () => {
    let nodes: Element[] = [];
    let cache = new Map<T, Element>();
    const indices = new WeakMap<Node, WritableSignal<number>>();
    const head = document.createComment("");
    const fragment = document.createDocumentFragment();
    fragment.appendChild(head);
    effect(() => {
      const nextNodes: Element[] = [];
      const nextCache = new Map<T, Element>();
      const parent = head.parentNode!;

      const items = read((<Props<{ each: T[] }>>props).each ?? props);
      let current = nextSibling(head) as Element;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let node: Element = null!;
        const index = signal(i);
        node = (!nextCache.has(item) && cache.get(item)) || fn(item, index)();
        indices.get(node)?.(i) ?? indices.set(node, index);

        if (node === current) {
          current = nextSibling(current) as Element;
        } else if (node === nextSibling(current)) {
          current = nextSibling(nextSibling(current)) as Element;
        } else {
          parent.insertBefore(node, current);
        }
        nextCache.set(item, node);
        nextNodes.push(node);
        updateMount(node);
      }

      for (const node of nodes) {
        if (!nextNodes.includes(node)) {
          parent.removeChild(node);
          updateMount(node);
        }
      }
      cache = nextCache;
      nodes = nextNodes;
    });
    return fragment;
  };
};
