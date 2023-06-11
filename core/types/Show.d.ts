import { Child, Get, Props } from "./types";
export declare const Show: (props: Props<{
    when: boolean;
}> | Get<boolean>, then: Get<Child>) => () => Child;
