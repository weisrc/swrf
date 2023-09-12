import { Readable } from "../types";

export let read = <T>(x: Readable<T>): T =>
  x instanceof Function ? (x as any)() : x;
