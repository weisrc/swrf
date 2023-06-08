import { Signal } from "./types";

export const bindEvent = (
	event: keyof GlobalEventHandlersEventMap,
	signal: Signal<string>
) => ({
	value: signal,
	["on" + event]: (e: Event) =>
		signal((e.currentTarget as HTMLInputElement)?.value),
});
