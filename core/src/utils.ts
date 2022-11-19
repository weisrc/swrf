import { Get, Init, Tag } from "./types";

export const node = (x: Init<Tag>) =>
	x instanceof Node
		? x
		: typeof x === "string" || typeof x === "number"
		? document.createTextNode(x as string)
		: x;

export const get = <T>(x: Get<T>): T => (x instanceof Function ? x() : x);
