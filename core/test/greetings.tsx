/* @jsx h */
import { h, Gettable, get } from "../src";

export default (props: { name: Gettable<string> }, children: any) => {
	return (
		<h1>
			kldddlo {() => get(props.name) + "hey"}! {children}
		</h1>
	);
};
