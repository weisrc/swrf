import * as dom from "linkedom";
// @ts-expect-error this is a hack
import { HTMLDocument } from "../node_modules/linkedom/cjs/html/document.js";

Object.assign(globalThis, dom);

export async function render(component: () => HTMLElement) {
  globalThis.document = new HTMLDocument();
  return component();
}
