import { Signal } from "./types";

export const str =
	(signal: Signal<number>): Signal<string> =>
	(...args) =>
		(args.length ? signal(+args[0]!) : signal()) + "";

export const num =
	(signal: Signal<string>): Signal<number> =>
	(...args) =>
		+(args.length ? signal(args[0] + "") : signal());
