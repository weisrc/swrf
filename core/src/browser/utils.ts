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
  let eventName = isNowConnected ? "mount" : "unmount";
  let preEventName = "pre" + eventName;

  if (!(element as any)[INTERNAL] == isNowConnected) {
    (element as any)[INTERNAL] = isNowConnected;
    element.dispatchEvent(new Event(preEventName));
    setTimeout(() => element.dispatchEvent(new Event(eventName)));
    element.childNodes.forEach((c) =>
      updateMount(c as BaseElement, willBeConnected)
    );
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

export let listen = (
  node: Node,
  type: string,
  listener: EventListenerOrEventListenerObject
) => node.addEventListener(type, listener);
