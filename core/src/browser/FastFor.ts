import { signal } from "../common";
import { INTERNAL } from "../constants";
import {
  ArraySignal,
  BaseElement,
  Fragment,
  Lazy,
  Props,
  Signal
} from "../types";
import { For } from "./For";

export let FastFor = <T>(
  props: Props<{ each: ArraySignal<T> }> | ArraySignal<T>,
  fn: (item: T, i: Signal<number>) => Lazy<BaseElement>
): Lazy<Fragment> => {
  let array = ((props as any).each ?? props) as ArraySignal<T>;
  let each = signal(array());

  return () => {
    let nodes: BaseElement[] = [];

    console.log(nodes);

    // let unsubscribe = array.subscribe((method, args) => {
    //   if (nodes.)
    // });

    return For(
      {
        each,
        [INTERNAL]: (nextNodes) => (nodes = nextNodes)
      },
      fn
    )();
  };
};
