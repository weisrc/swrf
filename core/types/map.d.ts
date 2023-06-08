import { Fun, Get, Element } from "./types";
export declare const map: <T>(data: Get<T[]>, fn: (x: T, i: Fun<number>) => Element) => DocumentFragment;
