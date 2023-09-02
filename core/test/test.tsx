/* @jsx h */
import { bindEvent, h, lazy, useSignal } from "../src/dev";

const Greetings = lazy(() => import("./greetings"));

export const Test = () => {
	const count = useSignal(0);
	const increment = () => count(count() + 1);
	const text = useSignal("Hello");
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
