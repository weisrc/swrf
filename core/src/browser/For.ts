import { read, signal } from "../common";
import { INTERNAL } from "../constants";
import type {
  BaseElement,
  Fragment,
  Lazy,
  Props,
  Readable,
  Signal,
  WritableSignal
} from "../types";
import { affect } from "./affect";
import { nextSibling, updateMount } from "./utils";

export let For = <T>(
  props:
    | Props<{ each: T[]; [INTERNAL]?: (data: BaseElement[]) => void }>
    | Readable<T[]>,
  fn: (item: T, i: Signal<number>) => Lazy<BaseElement>
): Lazy<Fragment> => {
  return () => {
    let nodes: BaseElement[] = [];
    let cache = new Map<T, BaseElement>();
    let indices = new WeakMap<Node, WritableSignal<number>>();
    let head = document.createComment("");
    let fragment = document.createDocumentFragment() as Fragment;
    fragment.appendChild(head);
    fragment.replaceWith = (next) => {
      head.replaceWith(next);
      fragment.append(head, ...nodes);
      nodes.forEach((node) => updateMount(node));
    };
    affect(head, () => {
      let nextNodes: BaseElement[] = [];
      let nextCache = new Map<T, BaseElement>();
      let parent = head.parentNode!;

      let items = read((<Props<{ each: T[] }>>props).each ?? props);
      let current = nextSibling(head) as BaseElement;

      console.log("for doing stuff");

      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let node: BaseElement = null!;
        let index = signal(i);
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

      for (let node of nodes) {
        if (!nextNodes.includes(node)) {
          parent.removeChild(node);
          updateMount(node);
        }
      }
      cache = nextCache;
      nodes = nextNodes;
      (props as any)[INTERNAL]?.(nodes);
    });
    return fragment;
  };
};
