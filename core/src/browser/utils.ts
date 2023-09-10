import { WAS_CONNECTED } from "../constants";
import { BaseElement } from "../types";

export const tryNode = <T>(x: T) =>
  x instanceof Node
    ? (x as Node)
    : typeof x === "string" || typeof x === "number"
    ? document.createTextNode(x as string)
    : typeof x === "boolean"
    ? null
    : x;

export function updateMount(el: BaseElement, willConnect?: boolean) {
  const isConnected = willConnect ?? el.isConnected;
  if (!(el as any)[WAS_CONNECTED] == isConnected) {
    el.dispatchEvent(new Event(isConnected ? "mount" : "unmount"));
    el.childNodes.forEach((c) => updateMount(c as BaseElement, willConnect));
    (el as any)[WAS_CONNECTED] = isConnected;
  }
}

export function replace(current: BaseElement, next: BaseElement) {
  updateMount(next, current.isConnected);
  current.replaceWith(next);
  updateMount(current);
  return next;
}
