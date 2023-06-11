import { Elem, Get } from "./types";
import { get } from "./utils";

export const showIf =
	(condition: Get<boolean>, then: Elem, otherwise?: Elem) => () =>
		get(condition) ? then : otherwise ?? null;
