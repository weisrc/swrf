import { read, effect, signal } from "../common";
import type {
  Props,
  Readable,
  WritableSignal,
  Signal,
  Lazy,
  BaseElement,
  Fragment
} from "../types";
import { updateMount } from "./utils";

const nextSibling = (node: Node) => node?.nextSibling!;

export const For = <T>(
  props: Props<{ each: T[] }> | Readable<T[]>,
  fn: (item: T, i: Signal<number>) => Lazy<BaseElement>
): Lazy<Fragment> => {
  return () => {
    let nodes: BaseElement[] = [];
    let cache = new Map<T, BaseElement>();
    const indices = new WeakMap<Node, WritableSignal<number>>();
    const head = document.createComment("");
    const fragment = document.createDocumentFragment() as Fragment;
    fragment.appendChild(head);
    fragment.replaceWith = (next) => {
      head.replaceWith(next);
      fragment.append(head, ...nodes);
      nodes.forEach((node) => updateMount(node));
    };
    effect(() => {
      const nextNodes: BaseElement[] = [];
      const nextCache = new Map<T, BaseElement>();
      const parent = head.parentNode!;

      const items = read((<Props<{ each: T[] }>>props).each ?? props);
      let current = nextSibling(head) as BaseElement;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let node: BaseElement = null!;
        const index = signal(i);
        node = (!nextCache.has(item) && cache.get(item)) || fn(item, index)();
        indices.get(node)?.(i) ?? indices.set(node, index);

        if (node === current) {
          current = nextSibling(current) as BaseElement;
        } else if (node === nextSibling(current)) {
          current = nextSibling(nextSibling(current)) as BaseElement;
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
