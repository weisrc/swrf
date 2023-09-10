import type { Attributes } from "../types";

export const attributes = new Proxy({} as Attributes, {
  get: (_, key) => (value: unknown) => ({ [key]: value })
});
