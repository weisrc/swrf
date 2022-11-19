import { ref as _ref } from "../ref";
import { Ref } from "../types";
import { increaseRecoveredRefCount, isHMR, iterators } from "./render";

const re = /([^(]+)@|at ([^(]+) \(/g;

type Entry = {
	i: number;
	refs: [any, Ref<any>][];
};

export const ref: typeof _ref = (data) => {
	if (import.meta.hot) {
		const cache: Record<string, Entry> = import.meta.hot.data;
		try {
			throw new Error();
		} catch (e) {
			const { stack } = e as Error;
			if (stack) {
				const fns = [];
				loop: for (const line of stack.split("\n")) {
					for (const match of line.matchAll(re)) {
						const fn = match[1] || match[2];
						if (fn.endsWith("SWRF_RENDER")) break loop;
						fns.push(fn);
					}
				}
				const key = JSON.stringify(fns);
				if (isHMR) {
					const i = (iterators[key] = (iterators[key] || 0) + 1);
					const pair = cache[key].refs[i - 1];
					if (!pair || JSON.stringify(pair[0]) !== JSON.stringify(data)) {
						globalThis.location.reload();
					}
					increaseRecoveredRefCount();
					return pair[1];
				} else {
					const out = _ref(data) as Ref<any>;
					if (cache[key]) {
						cache[key].refs.push([data, out]);
						cache[key].i++;
					} else {
						cache[key] = {
							i: 0,
							refs: [[data, out]],
						};
					}
					return out;
				}
			}
		}
	}
	return _ref(data);
};
