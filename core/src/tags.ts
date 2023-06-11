import { h } from "./h";
import { Tags, Init, HTMLTag, Get } from "./types";

export const tags = new Proxy({} as Tags, {
	get:
		(_, tag: HTMLTag) =>
		(...inits: Get<Init<HTMLTag>>[]) =>
			h(tag, ...inits),
});