import { INTERNAL } from "../constants";
import { BaseElement } from "../types";

export let tryNode = <T>(x: T) =>
  x instanceof Node
    ? (x as Node)
    : typeof x === "string" || typeof x === "number"
    ? document.createTextNode(x as string)
    : typeof x === "boolean"
    ? null
    : x;

export function updateMount(element: BaseElement, willBeConnected?: boolean) {
  let isNowConnected = willBeConnected ?? isConnected(element);
  if (!(element as any)[INTERNAL] == isNowConnected) {
    element.dispatchEvent(new Event(isNowConnected ? "mount" : "unmount"));
    element.childNodes.forEach((c) =>
      updateMount(c as BaseElement, willBeConnected)
    );
    (element as any)[INTERNAL] = isNowConnected;
  }
}

export function replace(current: BaseElement, next: BaseElement) {
  updateMount(next, isConnected(current));
  current.replaceWith(next);
  updateMount(current);
  return next;
}

export let nextSibling = (node: Node) => node?.nextSibling!;

export let isConnected = (node: Node) => node.isConnected;
