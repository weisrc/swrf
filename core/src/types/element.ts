import { Readable, WritableSignal } from "./base";

export type ElementMap = HTMLElementTagNameMap & SVGElementTagNameMap;

export type ElementTag = keyof ElementMap;

export type Style = {
  [key in keyof CSSStyleDeclaration]?: Readable<string>;
};

export type ClassList = {
  [key in string]?: Readable<boolean>;
};

export type Element<T extends ElementTag = ElementTag> = ElementMap[T];

type ExtraAttributes<E extends Element> = {
  onmount?: (e: Event) => void;
  onunmount?: (e: Event) => void;
  ref?: WritableSignal<E>;
};

export type Attributes<T extends Element = Element> = {
  [key in keyof T]?: key extends `on${keyof ElementEventMap}`
    ? T[key]
    : key extends "style"
    ? Readable<Style> | Readable<string>
    : key extends "classList"
    ? ClassList
    : Readable<T[key]>;
} & ExtraAttributes<T>;
