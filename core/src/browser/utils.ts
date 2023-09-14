import { INTERNAL } from "../constants";
import { BaseElement } from "../types";

export let doc = document;

export let tryNode = <T>(x: T) => {
  let t = getType(x);
  return isNode(x)
    ? x
    : t == "boolean"
    ? null
    : t == "string" || t[0] == "n"
    ? doc.createTextNode(x as string)
    : x;
};

export let getType = (x: any) => typeof x;

export let isNode = (x: any): x is Node => x instanceof Node;

export let updateMount = (element: BaseElement, willBeConnected?: boolean) => {
  let isNowConnected = willBeConnected ?? isConnected(element);
  let eventName = (isNowConnected ? "" : "un") + "mount";
  let dispatchEvent = (name: string) => element.dispatchEvent(new Event(name));

  if (!(element as any)[INTERNAL] == isNowConnected) {
    (element as any)[INTERNAL] = isNowConnected;
    dispatchEvent("pre" + eventName);
    setTimeout(dispatchEvent, 0, eventName);
    element.childNodes.forEach((c) =>
      updateMount(c as BaseElement, willBeConnected)
    );
  }
};

export let replace = (current: BaseElement, next: BaseElement) => {
  updateMount(next, isConnected(current));
  current.replaceWith(next);
  updateMount(current);
  return next;
};

export let nextSibling = (node: Node) => node?.nextSibling!;

export let isConnected = (node: Node) => node.isConnected;

export let listen = (
  node: Node,
  type: string,
  listener: EventListenerOrEventListenerObject
) => node.addEventListener(type, listener);
