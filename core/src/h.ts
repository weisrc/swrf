import { fx } from "./fx";
import { ClassList, Tag, Style, Get, Init } from "./types";
import { get, node } from "./utils";

export function h<T extends Tag>(tag: T, ...inits: Get<Init<T>>[]): Node;
export function h<T extends (...a: any) => Node>(
	tag: T,
	...params: Parameters<T>
): Node;
export function h(tag: string | ((...a: any) => Node), ...inits: any): Node {
	if (typeof tag === "function") return tag(...inits);
	const el = document.createElement(tag);
	for (const init of inits) {
		const empty = document.createTextNode("");
		let old: Node = el.appendChild(empty);
		fx(() => {
			const got = node(get(init));
			if (got instanceof Node) {
				el.replaceChild(got, old);
				old = got;
			} else {
				el.replaceChild(empty, old);
				old = empty;
				for (const key in got) {
					const value = got[key as keyof typeof got];
					if (key === "style") {
						const style = get(value) as Style;
						if (typeof style === "object") {
							for (const p in style) {
								fx(() => (el.style[p] = get(style[p])!));
							}
							continue;
						}
					}
					if (key === "classList") {
						const list = get(value) as ClassList;
						for (const name in list) {
							fx(() =>
								get(list[name])
									? el.classList.add(name)
									: el.classList.remove(name)
							);
						}
						continue;
					}
					fx(
						() =>
							(el[key as "id"] =
								!key.startsWith("on") && value instanceof Function
									? // @ts-expect-error - this is callable
									  value()
									: value)
					);
				}
			}
		});
	}
	return el;
}
