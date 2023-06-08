type HTMLMap = HTMLElementTagNameMap;
type EventName = keyof HTMLElementEventMap;
export type Tag = keyof HTMLMap;
export type Fun<T> = () => T;
export type Get<T> = T | Fun<T>;
export type Ref<T> = (update?: T) => T;
export type Elements = {
    [key in Tag]: ElementFactory<key>;
};
export type Attributes<T extends Tag> = {
    [key in keyof AttributeMap<T>]-?: (value: Get<AttributeMap<T>[key]>) => Get<AttributeMap<T>>;
};
export type Style = {
    [key in keyof CSSStyleDeclaration]?: Get<string>;
};
export type ClassList = {
    [key in string]?: Get<boolean>;
};
export declare const UPDATE_MOUNT: unique symbol;
type MountAttributes = {
    onmount?: (e: Element) => void;
    onunmount?: (e: Element) => void;
    [UPDATE_MOUNT]?: () => void;
};
export type AttributeMap<T extends Tag> = {
    [key in keyof HTMLMap[T]]?: key extends `on${EventName}` ? HTMLMap[T][key] : key extends "style" ? Get<Style> | Get<string> : key extends "classList" ? ClassList : Get<HTMLMap[T][key]>;
} & MountAttributes;
export type Element = HTMLElement & MountAttributes;
export type Child = Element | string | number | null | undefined;
export type Init<T extends Tag> = Child | AttributeMap<T>;
export type ElementFactory<T extends Tag> = (...inits: Get<Init<T>>[]) => HTMLMap[T];
export {};
