import { Get, Init, HTMLTag, Elem } from "./types";
export declare const node: (x: Init<HTMLTag>) => Text | Elem | import("./types").AttributeMap<keyof HTMLElementTagNameMap> | null | undefined;
export declare const updateMountState: (e: Node) => void | undefined;
export declare const replace: (parent: Node, next: Node, current: Node) => Node;
export declare const get: <T>(x: Get<T>) => T;
