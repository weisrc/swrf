import { Gettable, Init, HTMLTag, Elem } from "./types";
export declare const node: (x: Init<HTMLTag>) => Text | Elem | import("./types").AttributeMap<keyof HTMLElementTagNameMap> | null | undefined;
export declare const get: <T>(x: Gettable<T>) => T;
export declare const updateMountState: (e: Node) => void | undefined;
export declare const replace: (parent: Node, next: Node, current: Node) => Node;
