type HTMLMap = HTMLElementTagNameMap;
type EventName = keyof HTMLElementEventMap;

export type HTMLTag = keyof HTMLMap;
export type Gettable<T> = T | (() => T);
export type Signal<T> = (update?: T) => T;

export type Tags = {
	[key in HTMLTag]: (...inits: Gettable<Init<key>>[]) => HTMLMap[key];
};

export type Attributes<T extends HTMLTag> = {
	[key in keyof AttributeMap<T>]-?: (
		value: Gettable<AttributeMap<T>[key]>
	) => Gettable<AttributeMap<T>>;
};

export type Style = {
	[key in keyof CSSStyleDeclaration]?: Gettable<string>;
};

export type ClassList = {
	[key in string]?: Gettable<boolean>;
};

export const UPDATE_MOUNT = Symbol();

type MountAttributes = {
	onmount?: (e: Elem) => void;
	onunmount?: (e: Elem) => void;
	[UPDATE_MOUNT]?: () => void;
};

export type AttributeMap<T extends HTMLTag> = {
	[key in keyof HTMLMap[T]]?: key extends `on${EventName}`
		? HTMLMap[T][key]
		: key extends "style"
		? Gettable<Style> | Gettable<string>
		: key extends "classList"
		? ClassList
		: Gettable<HTMLMap[T][key]>;
} & MountAttributes;

export type Elem = HTMLElement & MountAttributes;

export type Child = Elem | string | number | null | undefined | boolean;

export type Init<T extends HTMLTag> = Child | AttributeMap<T>;
