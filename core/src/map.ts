import { fx } from "./fx";
import { ref } from "./ref";
import { Fun, Get, Ref, UPDATE_MOUNT, Element } from "./types";
import { get } from "./utils";

export const map = <T>(
	data: Get<T[]>,
	fn: (x: T, i: Fun<number>) => Element
): DocumentFragment => {
	let nodes: Element[] = [];
	let cache = new Map<T, Element>();
	const indices = new WeakMap<Node, Ref<number>>();
	const head = document.createTextNode("");
	const frag = document.createDocumentFragment();
	frag.appendChild(head);
	fx(() => {
		const nextNodes: Element[] = [];
		const nextCache = new Map<T, Element>();

		const got = get(data);
		let current = head.nextSibling! as Element;

		for (let i = 0; i < got.length; i++) {
			const item = got[i];
			let node: Element = null!;
			const index = ref(i);
			node = (!nextCache.has(item) && cache.get(item)) || fn(item, index);
			indices.get(node)?.(i) ?? indices.set(node, index);
			node === current
				? (current = current.nextSibling! as Element)
				: node === current?.nextSibling
				? (current = current.nextSibling?.nextSibling! as Element)
				: head.parentNode!.insertBefore(node, current);
			nextCache.set(item, node);
			nextNodes.push(node);
			node[UPDATE_MOUNT]?.();
		}
		for (const node of nodes) {
			if (nextNodes.indexOf(node) < 0) {
				head.parentNode!.removeChild(node);
				node[UPDATE_MOUNT]?.();
			}
		}
		cache = nextCache;
		nodes = nextNodes;
	});
	return frag;
};
