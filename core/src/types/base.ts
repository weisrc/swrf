import { MUTABLE_ARRAY_METHODS } from "../constants";

export type MutableArrayMethod = (typeof MUTABLE_ARRAY_METHODS)[number];

export type Signal<T> = () => T;
export type WritableSignal<T> = (value?: T, force?: boolean) => T;
export type Readable<T> = T | Signal<T>;

/**
 * This is a type that represents a value that is lazily evaluated.
 * It is also put in place to prevent certain operations
 * such as placing a Far<DocumentFragment> from either `For` or `Map`
 * in a function inside an element.
 */
export type Far<T> = (warning?: "Please read the docs before calling!") => T;

export type ArraySubscribeFnParameters<T> = {
  [k in MutableArrayMethod]: [k, Parameters<T[][k]>];
}[MutableArrayMethod];

export type ArraySubscribeFn<T> = (
  ...args: ArraySubscribeFnParameters<T> | ["set", [number, T]]
) => void;

export type ArraySignal<T> = WritableSignal<T[]> &
  T[] & {
    subscribe(fn: ArraySubscribeFn<T>): () => void;
  };
