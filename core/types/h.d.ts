import { Tag, Get, Init } from "./types";
export declare function h<T extends Tag>(tag: T, ...inits: Get<Init<T>>[]): Node;
export declare function h<T extends (...a: any) => Node>(tag: T, ...params: Parameters<T>): Node;
