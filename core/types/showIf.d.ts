import { Elem, Get } from "./types";
export declare const showIf: (condition: Get<boolean>, then: Elem, otherwise?: Elem) => () => Elem | null;
