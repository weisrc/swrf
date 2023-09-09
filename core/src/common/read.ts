import { Readable } from "../types";

export const read = <T>(x: Readable<T>): T => (x instanceof Function ? x() : x);
