import { Fun, UPDATE_MOUNT } from "./types";

export const render = (fn: Fun<Node>, node: HTMLElement) => {
	const out = fn();
	node.appendChild(out);
	// @ts-expect-error - internal use only
	out[UPDATE_MOUNT]();
};
