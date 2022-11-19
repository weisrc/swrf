import * as dom from "linkedom";
import { Document } from "./Document";

Object.assign(globalThis, dom);

export function render(fn: () => HTMLElement) {
	globalThis.document = new Document();
	return fn();
}
