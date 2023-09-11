import type { Attributes } from "../types";

export let attributes = new Proxy({} as Attributes, {
  get: (_, key) => (value: unknown) => ({ [key]: value })
});
