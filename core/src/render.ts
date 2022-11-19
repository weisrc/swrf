import { Fun } from "./types";

export const render = (fn: Fun<Node>, node: HTMLElement) => {
	node.appendChild(fn());
};
