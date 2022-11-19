import { Ref } from "./types";
import { _fn } from "./fx";

export const ref = <T>(data: T): Ref<T> => {
	let observers = new Set<() => void>();
	return (...args) => {
		if (args.length) {
			const update = args[0]!;
			if (update !== data) {
				data = args[0]!;
				const previous = observers;
				observers = new Set();
				for (const o of previous) o();
			}
		} else if (_fn) {
			observers.add(_fn);
		}
		return data;
	};
};