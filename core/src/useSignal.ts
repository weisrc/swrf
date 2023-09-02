import { WritableSignal } from "./types";
import { handler } from "./useEffect";

export const useSignal = <T>(data: T): WritableSignal<T> => {
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
		} else if (handler) {
			observers.add(handler);
		}
		return data;
	};
};
