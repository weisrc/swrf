import { Elem } from "./types";
import { updateMountState } from "./utils";

export const render = (fn: () => Elem, node: HTMLElement) => {
	const out = fn();
	node.append(out);
	updateMountState(out);
};
