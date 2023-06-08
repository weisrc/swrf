import { h } from "./h";
import { Tags, Init, HTMLTag, Gettable } from "./types";

export const tags = new Proxy({} as Tags, {
	get:
		(_, tag: HTMLTag) =>
		(...inits: Gettable<Init<HTMLTag>>[]) =>
			h(tag, ...inits),
});