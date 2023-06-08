import { Elem, Gettable } from "./types";
import { get } from "./utils";

export const showIf =
	(condition: Gettable<boolean>, then: Elem, otherwise?: Elem) => () =>
		get(condition) ? then : otherwise ?? null;
