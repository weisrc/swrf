import { Lazy, Readable } from "./base";
import { Attributes, ElementMap, ElementTag, Element } from "./element";

export type TagsFunction = {
  [T in ElementTag]: (...params: HParams<T>) => Lazy<ElementMap[T]>;
};

export type AttributesFunction<T extends Element> = {
  [key in keyof Attributes<T>]-?: (value: Attributes<T>[key]) => {
    [k in key]: Attributes<T>[key];
  };
};

export type Component<T extends Element = Element> = (
  ...params: any[]
) => Lazy<T>;

export type Child = Element | string | number | null | undefined | boolean;

export type Props<T extends Record<string, unknown>> = {
  [key in keyof T]: Readable<T[key]>;
};

export type HParams<T extends ElementTag> = Readable<
  Attributes<Element<T>> | Child
>[];
