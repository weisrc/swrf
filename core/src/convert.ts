import { Ref } from "./types";

export const str =
	(ref: Ref<number>): Ref<string> =>
	(...args) =>
		(args.length ? ref(+args[0]!) : ref()) + "";

export const num =
	(ref: Ref<string>): Ref<number> =>
	(...args) =>
		+(args.length ? ref(args[0] + "") : ref());
