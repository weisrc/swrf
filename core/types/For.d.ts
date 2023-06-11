import { Get, Elem, Props } from "./types";
export declare const For: <T>(props: Props<{
    each: T[];
}> | Get<T[]>, fn: (item: T, i: () => number) => Elem) => DocumentFragment;
