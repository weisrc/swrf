/* @jsx h */
import { h, Get, get, Props } from "../src";

export default (props: Props<{ name: string }>, children: any) => {
	return (
		<h1>
			kldddlo {() => get(props.name) + "hey"}! {children}
		</h1>
	);
};
