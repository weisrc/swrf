import { WAS_CONNECTED } from "../constants";
import { Element } from "../types";

export const tryNode = <T>(x: T) =>
  x instanceof Node
    ? (x as Node)
    : typeof x === "string" || typeof x === "number"
    ? document.createTextNode(x as string)
    : typeof x === "boolean"
    ? null
    : x;

export function updateMount(el: Element) {
  const isConnected = el.isConnected;
  if ((el as any)[WAS_CONNECTED] !== isConnected) {
    el.dispatchEvent(new Event(isConnected ? "mount" : "unmount"));
    el.childNodes.forEach((c) => updateMount(c as Element));
    (el as any)[WAS_CONNECTED] = isConnected;
  }
}

export function replace(parent: Element, next: Element, current: Element) {
  parent.replaceChild(next, current);
  updateMount(next);
  updateMount(current);
  return next;
}
