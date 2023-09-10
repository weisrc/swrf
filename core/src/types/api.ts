import { Far, Readable, WritableSignal } from "./base";
import { Attributes, ElementMap, ElementTag, Element } from "./element";

export type TagsFab = {
  [T in ElementTag]: (...params: Param<ElementMap[T]>[]) => Far<ElementMap[T]>;
};

export type AttributesFab = {
  [key in keyof Attributes<Element>]-?: key extends "ref"
    ? <T extends WritableSignal<any>>(
        signal: T
      ) => {
        ref: T;
      }
    : <U extends Attributes<Element>[key]>(
        value: U
      ) => {
        [k in key]: U;
      };
};

export type Component<T extends Element = Element> = (
  ...params: any[]
) => Far<T>;

export type Child = Far<Element> | string | number | null | undefined | boolean;

export type Props<T extends Record<string, unknown>> = {
  [key in keyof T]: Readable<T[key]>;
};

export type Param<T extends Element> =
  | Attributes<T>
  | Readable<Child>
  | Far<DocumentFragment>;
