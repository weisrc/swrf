import { Get, Init, Tag } from "./types";
export declare const node: (x: Init<Tag>) => Text | import("./types").Element | import("./types").AttributeMap<keyof HTMLElementTagNameMap> | null | undefined;
export declare const get: <T>(x: Get<T>) => T;
