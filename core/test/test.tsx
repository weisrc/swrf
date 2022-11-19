/* @jsx h */
import { bind, h, ref } from "../src/dev";
import Greetings from "./greetings";

export const Test = () => {
	const count = ref(0);
	const increment = () => count(count() + 1);
	const text = ref("Hello");
	return (
		<div>
			<button onclick={increment}>
				{text} {count}
			</button>
			<input {...bind(text)} />
			<Greetings name={text}>Hi There!!!!</Greetings>
		</div>
	);
};
