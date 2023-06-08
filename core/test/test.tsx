/* @jsx h */
import { bindEvent, h, createSignal } from "../src/dev";
import Greetings from "./greetings";

export const Test = () => {
	const count = createSignal(0);
	const increment = () => count(count() + 1);
	const text = createSignal("Hello");
	return (
		<div>
			<button onclick={increment}>
				{text} {count}
			</button>
			<input {...bindEvent("input", text)} />
			<Greetings name={text}>Hi There!!!!</Greetings>
		</div>
	);
};
