import { createEffect } from "./createEffect";
import {
	ClassList,
	HTMLTag,
	Style,
	Get,
	Init,
	UPDATE_MOUNT,
	Elem,
} from "./types";
import { get, node, replace } from "./utils";

export function h<T extends HTMLTag>(tag: T, ...inits: Get<Init<T>>[]): Node;
export function h<T extends (...a: any) => Node>(
	tag: T,
	...params: Parameters<T>
): Node;
export function h(tag: string | ((...a: any) => Node), ...inits: any): Node {
	if (typeof tag === "function") return tag(...inits);
	const el = document.createElement(tag) as Elem;

	let wasConnected = false;
	el[UPDATE_MOUNT] = () => {
		const isConnected = el.isConnected;
		if (wasConnected !== isConnected) {
			if ((wasConnected = isConnected)) {
				el.onmount?.(el);
			} else {
				el.onunmount?.(el);
			}
			el.childNodes.forEach((c) => (c as Elem)[UPDATE_MOUNT]?.());
		}
	};

	for (const init of inits) {
		el.append("")
		const empty: Node = el.lastChild!
		let current = empty
		createEffect(() => {
			const got = node(get(init));
			const isNode = got instanceof Node;
			current = replace(el, isNode ? got : empty, current);
			if (isNode) return;
			for (const key in got) {
				const value = got[key as keyof typeof got];
				if (key === "style") {
					const style = get(value) as Style;
					if (typeof style === "object") {
						for (const p in style) {
							createEffect(() => (el.style[p] = get(style[p])!));
						}
						continue;
					}
				}
				if (key === "classList") {
					const list = get(value) as ClassList;
					for (const name in list) {
						createEffect(() =>
							get(list[name])
								? el.classList.add(name)
								: el.classList.remove(name)
						);
					}
					continue;
				}
				createEffect(
					() =>
						(el[key as "id"] =
							!key.startsWith("on") && value instanceof Function
								? // @ts-expect-error - this is callable
								  value()
								: value)
				);
			}
		});
	}
	return el;
}
