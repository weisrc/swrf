import { Child, Readable, Props } from "./types";
import { read } from "./utils";

export const Show =
	(props: Props<{ when: boolean }> | Readable<boolean>, then: Readable<Child>) => () =>
		read((props as Props<{ when: boolean }>).when ?? props) ? read(then) : null;
