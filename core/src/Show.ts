import { Child, Get, Props } from "./types";
import { get } from "./utils";

export const Show =
	(props: Props<{ when: boolean }> | Get<boolean>, then: Get<Child>) => () =>
		get((props as Props<{ when: boolean }>).when ?? props) ? get(then) : null;
