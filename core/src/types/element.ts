import { Readable, WritableSignal } from "./base";
import { MathMLTag } from "./math";

export type BaseNamespace = Readonly<Record<string, Element>>;
export type HTMLNamespace = Readonly<HTMLElementTagNameMap>;
export type SVGNamespace = Readonly<SVGElementTagNameMap>;
export type MathMLNamespace = Readonly<Record<MathMLTag, MathMLElement>>;
export type CommonNamespace = HTMLNamespace & SVGNamespace & MathMLNamespace;

export type HTMLTag = keyof HTMLNamespace;
export type SVGTag = keyof SVGNamespace;
export type CommonTag = keyof CommonNamespace;

export type AnyMathMLElement = MathMLNamespace[MathMLTag];
export type AnySVGElement = SVGNamespace[SVGTag];
export type AnyHTMLElement = HTMLNamespace[HTMLTag];
export type AnyCommonElement =
  | AnyMathMLElement
  | AnySVGElement
  | AnyHTMLElement;

export type BaseElement = Element;

export type Fragment = DocumentFragment & {
  replaceWith: BaseElement["replaceWith"];
};

export type Style = {
  [key in keyof CSSStyleDeclaration]?: Readable<string>;
};

export type ClassList = {
  [key in string]?: Readable<boolean>;
};

type ExtraAttributeMap<E> = {
  onmount?: (e: Event) => void;
  onunmount?: (e: Event) => void;
  ref?: WritableSignal<E | undefined>;
};

export type AttributeMap<T extends BaseElement = BaseElement> = {
  [key in keyof T]?: key extends `on${keyof ElementEventMap}`
    ? T[key]
    : key extends "style"
    ? Readable<Style> | Readable<string>
    : key extends "classList"
    ? ClassList
    : Readable<T[key]>;
} & ExtraAttributeMap<T>;
