import { Attributes, Tag } from "./types";

export const attributes = new Proxy({} as Attributes<Tag>, {
	get: (_, key) => (value: unknown) => ({ [key]: value }),
});
