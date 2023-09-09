import type { AttributesFunction, Element } from "../types";

export const attributes = new Proxy({} as AttributesFunction<Element>, {
  get: (_, key) => (value: unknown) => ({ [key]: value })
});
