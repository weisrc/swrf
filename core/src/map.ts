import { fx } from "./fx";
import { ref } from "./ref";
import { Fun, Get, Ref } from "./types";
import { get } from "./utils";

export const map = <T>(
	data: Get<T[]>,
	fn: (x: T, i: Fun<number>) => Node
): Node => {
	let nodes: Node[] = [];
	let cache = new Map<T, Node>();
	const indices = new WeakMap<Node, Ref<number>>();
	const head = document.createTextNode("");
	const frag = document.createDocumentFragment();
	frag.appendChild(head);
	fx(() => {
		const nextNodes: Node[] = [];
		const nextCache = new Map<T, Node>();

		const got = get(data);
		let current: Node = head.nextSibling!;

		for (let i = 0; i < got.length; i++) {
			const item = got[i];
			let node: Node = null!;
			const index = ref(i);
			node = (!nextCache.has(item) && cache.get(item)) || fn(item, index);
			indices.get(node)?.(i) ?? indices.set(node, index);
			node === current
				? (current = current.nextSibling!)
				: node === current?.nextSibling
				? (current = current.nextSibling?.nextSibling!)
				: head.parentNode!.insertBefore(node, current);
			nextCache.set(item, node);
			nextNodes.push(node);
		}
		for (const node of nodes) {
			if (nextNodes.indexOf(node) < 0) {
				head.parentNode!.removeChild(node);
			}
		}
		cache = nextCache;
		nodes = nextNodes;
	});
	return frag;
};
