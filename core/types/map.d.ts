import { Fun, Get } from "./types";
export declare const map: <T>(data: Get<T[]>, fn: (x: T, i: Fun<number>) => Node) => Node;
