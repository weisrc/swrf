import { createEffect } from "./createEffect";
import { signal } from "./signal";
import { Get, Signal, Elem } from "./types";
import { get, updateMountState } from "./utils";

export const forEach = <T>(
	data: Get<T[]>,
	fn: (x: T, i: () => number) => Elem
): DocumentFragment => {
	let nodes: Elem[] = [];
	let cache = new Map<T, Elem>();
	const indices = new WeakMap<Node, Signal<number>>();
	const head = document.createTextNode("");
	const frag = document.createDocumentFragment();
	frag.appendChild(head);
	createEffect(() => {
		const nextNodes: Elem[] = [];
		const nextCache = new Map<T, Elem>();

		const got = get(data);
		let current = head.nextSibling! as Elem;

		for (let i = 0; i < got.length; i++) {
			const item = got[i];
			let node: Elem = null!;
			const index = signal(i);
			node = (!nextCache.has(item) && cache.get(item)) || fn(item, index);
			indices.get(node)?.(i) ?? indices.set(node, index);
			node === current
				? (current = current.nextSibling! as Elem)
				: node === current?.nextSibling
				? (current = current.nextSibling?.nextSibling! as Elem)
				: head.parentNode!.insertBefore(node, current);
			nextCache.set(item, node);
			nextNodes.push(node);
			updateMountState(node);
		}
		for (const node of nodes) {
			if (nextNodes.indexOf(node) < 0) {
				head.parentNode!.removeChild(node);
				updateMountState(node);
			}
		}
		cache = nextCache;
		nodes = nextNodes;
	});
	return frag;
};
