import { Attributes, HTMLTag } from "./types";

export const attributes = new Proxy({} as Attributes<HTMLTag>, {
	get: (_, key) => (value: unknown) => ({ [key]: value }),
});
