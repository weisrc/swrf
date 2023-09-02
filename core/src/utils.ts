import { Element, Readable, UPDATE_MOUNT } from "./types";

export const toNode = <T>(x: T) =>
	x instanceof Node
		? x as Node
		: typeof x === "string" || typeof x === "number"
		? document.createTextNode(x as string)
		: typeof x === "boolean"
		? null
		: x;

export const updateMount = (e: Node) => (e as Element)[UPDATE_MOUNT]?.();

export const replace = (parent: Node, next: Node, current: Node) => {
	parent.replaceChild(next, current);
	updateMount(next);
	updateMount(current);
	return next;
};

export const read = <T>(x: Readable<T>): T => (x instanceof Function ? x() : x);
