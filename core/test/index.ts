import {
	attributes,
	bindEvent,
	tags,
	forEach,
	createSignal,
	Signal,
	intoString,
	render,
	showIf,
} from "../src/dev";
import greetings from "./greetings";
import { Test } from "./test";

const { button, div, br, input, span } = tags;
const { onclick, style, onmount, onunmount } = attributes;

function counter() {
	const array = createSignal<Signal<string>[]>(
		Array(10)
			.fill(0)
			.map((_, i) => createSignal(i + " data"))
	);
	const text = createSignal("");
	const index = createSignal(0);
	const red = style({ color: "red" });

	const add = () => {
		array().splice(
			index(),
			0,
			createSignal(text() || Math.random().toFixed(2))
		);
		array([...array()]);
	};

	const remove = () => {
		array().splice(index(), 1);
		array([...array()]);
	};

	const shuffle = () => {
		array([...array()].sort(() => Math.random() - 0.5).reverse());
		console.log(array().map((x) => x()));
	};

	return div(
		input({ type: "number" }, bindEvent("input", intoString(index))),
		input(bindEvent("input", text)),
		button(onclick(add), "add"),
		button(onclick(remove), red, "remove"),
		button(onclick(shuffle), "shuffle"),
		br(),
		forEach(array, (n) => {
			return div(
				"value=",
				n,
				input(bindEvent("input", n)),
				showIf(
					() => n().startsWith("0"),
					span(
						onmount((e) => console.log("mounted", e)),
						onunmount((e) => console.log("unmounted", e)),
						"starts with 0"
					)
				),
				button(
					onclick(() => array(array().filter((x) => x !== n))),
					"remove"
				)
			);
		}),
		greetings({ name: text }, "wow"),
		Test()
	);
}

function app() {
	return div(counter());
}

render(app, document.body);
// @ts-expect-error hot is defined
import.meta.hot.accept(() => {});

export {};
