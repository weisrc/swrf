import { Signal } from "./types";

export const intoString =
	(signal: Signal<number>): Signal<string> =>
	(...args) =>
		(args.length ? signal(+args[0]!) : signal()) + "";

export const intoNumber =
	(signal: Signal<string>): Signal<number> =>
	(...args) =>
		+(args.length ? signal(args[0] + "") : signal());
