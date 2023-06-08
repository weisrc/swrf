import { HTMLTag, Gettable, Init } from "./types";
export declare function h<T extends HTMLTag>(tag: T, ...inits: Gettable<Init<T>>[]): Node;
export declare function h<T extends (...a: any) => Node>(tag: T, ...params: Parameters<T>): Node;
