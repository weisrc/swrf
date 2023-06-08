/* @jsx h */
import { h, Get, get } from "../src";

export default (props: { name: Get<string> }, children: any) => {
	return (
		<h1>
			kldddlo {() => get(props.name) + "hey"}! {children}
		</h1>
	);
};
