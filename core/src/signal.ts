import { Signal } from "./types";
import { _fn } from "./createEffect";

export const signal = <T>(data: T): Signal<T> => {
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
