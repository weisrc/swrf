declare type HTMLMap = HTMLElementTagNameMap;
declare type EventName = keyof HTMLElementEventMap;
export declare type H = <T extends Tag>(tag: T, ...inits: Get<Init<T>>[]) => Node;
export declare type Tag = keyof HTMLMap;
export declare type Fun<T> = () => T;
export declare type Get<T> = T | Fun<T>;
export declare type Ref<T> = (update?: T) => T;
export declare type Elements = {
    [key in Tag]: Element<key>;
};
export declare type Attributes<T extends Tag> = {
    [key in keyof AttributeMap<T>]-?: (value: Get<AttributeMap<T>[key]>) => Get<AttributeMap<T>>;
};
export declare type Style = {
    [key in keyof CSSStyleDeclaration]?: Get<string>;
};
export declare type ClassList = {
    [key in string]?: Get<boolean>;
};
export declare type AttributeMap<T extends Tag> = {
    [key in keyof HTMLMap[T]]?: key extends `on${EventName}` ? HTMLMap[T][key] : key extends "style" ? Get<Style> | Get<string> : key extends "classList" ? ClassList : Get<HTMLMap[T][key]>;
};
export declare type Child = string | number | Node | null | undefined;
export declare type Element<T extends Tag> = (...inits: Get<Init<T>>[]) => HTMLMap[T];
export declare type Init<T extends Tag> = Child | AttributeMap<T>;
export {};
