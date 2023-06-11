import { effect } from "./effect";
import { signal } from "./signal";
import { Get, Signal, Elem, Props } from "./types";
import { get, updateMountState } from "./utils";

export const For = <T>(
	props: Props<{ each: T[] }> | Get<T[]>,
	fn: (item: T, i: () => number) => Elem
): DocumentFragment => {
	let nodes: Elem[] = [];
	let cache = new Map<T, Elem>();
	const indices = new WeakMap<Node, Signal<number>>();
	const head = document.createTextNode("");
	const fragment = document.createDocumentFragment();
	fragment.appendChild(head);
	effect(() => {
		const nextNodes: Elem[] = [];
		const nextCache = new Map<T, Elem>();

		const items = get((props as Props<{ each: T[] }>).each ?? props);
		let current = head.nextSibling! as Elem;

		for (let i = 0; i < items.length; i++) {
			const item = items[i];
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
	return fragment;
};
