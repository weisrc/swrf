type HTMLMap = HTMLElementTagNameMap;
type EventName = keyof HTMLElementEventMap;

export type HTMLTag = keyof HTMLMap;
export type Signal<T> = () => T;
export type Readable<T> = T | Signal<T>;
export type WritableSignal<T> = (value?: T) => T;

export type Tags = {
  [key in HTMLTag]: (...params: Params<key>) => HTMLMap[key];
};

export type Attributes<T extends HTMLTag> = {
  [key in keyof AttributeMap<T>]-?: (
    value: Readable<AttributeMap<T>[key]>
  ) => Readable<AttributeMap<T>>;
};

export type Style = {
  [key in keyof CSSStyleDeclaration]?: Readable<string>;
};

export type ClassList = {
  [key in string]?: Readable<boolean>;
};

export const UPDATE_MOUNT = Symbol();

type MountAttributes = {
  onmount?: (e: Element) => void;
  onunmount?: (e: Element) => void;
  [UPDATE_MOUNT]?: () => void;
};

export type AttributeMap<T extends HTMLTag> = {
  [key in keyof HTMLMap[T]]?: key extends `on${EventName}`
    ? HTMLMap[T][key]
    : key extends "style"
    ? Readable<Style> | Readable<string>
    : key extends "classList"
    ? ClassList
    : Readable<HTMLMap[T][key]>;
} & MountAttributes;

export type Element = HTMLElement & MountAttributes;

export type Component = (...a: unknown[]) => Element;

export type Child = Element | string | number | null | undefined | boolean;

export type Param<T extends HTMLTag> = Readable<Child | AttributeMap<T>>;

export type Params<T extends HTMLTag | Component> = T extends HTMLTag
  ? Param<T>[]
  : unknown[];

export type Props<T extends Record<string, unknown>> = {
  [key in keyof T]: Readable<T[key]>;
};

export declare namespace JSX {
  interface IntrinsicElements {
    foo: number;
  }
}