import { Lazy, Readable, WritableSignal } from "./base";
import {
  AttributeMap,
  BaseElement,
  BaseNamespace,
  CommonNamespace,
  CommonTag,
  Fragment
} from "./element";

export type HFn = {
  <T extends CommonTag>(
    tag: T,
    ...params: Param<CommonNamespace[T]>[]
  ): Lazy<CommonNamespace[T]>;
  <T extends Component>(tag: T, ...params: Parameters<T>): ReturnType<T>;
};

export type SignalFn = {
  <T>(): WritableSignal<T | undefined>;
  <T>(data: T): WritableSignal<T>;
};

export type Tags<T extends BaseNamespace = CommonNamespace> = {
  [k in keyof T]: Component<T[k], Param<T[k]>[]>;
};

export type Attributes<T extends BaseNamespace = CommonNamespace> = {
  [key in keyof AttributeMap<T[keyof T]>]-?: key extends "ref"
    ? <T extends WritableSignal<any>>(
        signal: T
      ) => {
        ref: T;
      }
    : <U extends AttributeMap<T[keyof T]>[key]>(
        value: U
      ) => {
        [k in key]: U;
      };
};

export type Component<
  T extends BaseElement = BaseElement,
  P extends any[] = any[]
> = (...params: P) => Lazy<T>;

export type Child =
  | Readable<BaseElement>
  | Readable<Fragment>
  | string
  | number
  | null
  | undefined
  | boolean;

export type Props<T extends Record<string, unknown>> = {
  [key in keyof T]: Readable<T[key]>;
};

export type Param<T extends BaseElement> =
  | AttributeMap<T>
  | Readable<Child>
  | Readable<Child>[];

