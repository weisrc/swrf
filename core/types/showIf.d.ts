import { Elem, Gettable } from "./types";
export declare const showIf: (condition: Gettable<boolean>, then: Elem, otherwise?: Elem) => () => Elem | null;
