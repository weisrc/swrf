import { Gettable, Init, HTMLTag, UPDATE_MOUNT, Elem } from "./types";

export const node = (x: Init<HTMLTag>) =>
	x instanceof Node
		? x
		: typeof x === "string" || typeof x === "number"
		? document.createTextNode(x as string)
		: typeof x === "boolean"
		? null
		: x;

export const updateMountState = (e: Node) => (e as Elem)[UPDATE_MOUNT]?.();

export const replace = (parent: Node, next: Node, current: Node) => {
	parent.replaceChild(next, current);
	updateMountState(next);
	updateMountState(current);
	return next;
};

export const get = <T>(x: Gettable<T>): T => (x instanceof Function ? x() : x);
