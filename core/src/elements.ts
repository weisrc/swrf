import { h } from "./h";
import { Elements, Init, Tag, Get } from "./types";

export const elements = new Proxy({} as Elements, {
	get:
		(_, tag: Tag) =>
		(...inits: Get<Init<Tag>>[]) =>
			h(tag, ...inits),
});