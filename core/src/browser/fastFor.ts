import { effect, signal } from "../common";
import { INTERNAL } from "../constants";
import { ArraySignal, BaseElement, Fragment, Lazy } from "../types";
import { For } from "./For";
import { updateMount } from "./utils";

type NormalizeFastFor = () => void;

export let fastFor = <T>(
  array: ArraySignal<T>,
  fn: (item: T) => Lazy<BaseElement>
): [NormalizeFastFor, Lazy<Fragment>] => {
  let each = signal(array());
  let nodes: BaseElement[];
  let cache: Map<T, BaseElement>;

  let splice = (start: number, deleteCount: number, ...items: T[]) => {
    if (start < 0) start = nodes.length + start;
    for (let i = 0; i < deleteCount; i++) {
      let node = nodes[start + i];
      node.remove();
    }
    let current = nodes[start].previousSibling as BaseElement;
    let newNodes = items.map((item) => {
      let node = fn(item)();
      current.after(node);
      updateMount(node);
      cache.set(item, node);
      current = node;
      return node;
    });
    nodes.splice(start, deleteCount, ...newNodes);
  };

  let unsubscribe = array.subscribe((method, args) => {
    if (!nodes) return;
    if (method == "update") {
      each(args[0]);
    } else if (method == "pop") {
      splice(nodes.length, 1);
    } else if (method == "push") {
      splice(nodes.length, 0, ...args);
    } else if (method == "set") {
      splice(args[0], 1, args[1]);
    } else if (method == "shift") {
      splice(0, 1);
    } else if (method == "unshift") {
      splice(0, 0, ...args);
    } else if (method == "splice") {
      splice(...args);
    } else {
      each(array(), true, true);
    }
  });

  let normalize = () => {
    unsubscribe();
    effect(() => each(array(), true, true)); // TODO: possible memory leak
  };

  let lazy = () => {
    return For(
      {
        each,
        [INTERNAL]: (nextNodes, nextCache) => {
          nodes = nextNodes;
          cache = nextCache;
        }
      },
      fn
    )();
  };

  return [normalize, lazy];
};
