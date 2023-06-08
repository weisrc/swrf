import { Gettable, Elem } from "./types";
export declare const forEach: <T>(data: Gettable<T[]>, fn: (x: T, i: () => number) => Elem) => DocumentFragment;
