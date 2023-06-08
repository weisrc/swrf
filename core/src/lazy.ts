import { createSignal } from "./createSignal";
import { Child } from "./types";

export const lazy = <T extends { default: (...args: any[]) => Child }>(
	fn: () => Promise<T>
): ((...args: Parameters<T["default"]>) => () => Child) => {
	let cache: T["default"] | undefined;
	return (...args) => {
		const out = createSignal<Child>(null);
		cache
			? out(cache(...(args as unknown[])))
			: fn().then((res) => out((cache = res.default)(...(args as unknown[]))));
		return out;
	};
};
