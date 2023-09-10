import type { AttributesFab } from "../types";

export const attributes = new Proxy({} as AttributesFab, {
  get: (_, key) => (value: unknown) => ({ [key]: value })
});
