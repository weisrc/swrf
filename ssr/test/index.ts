import { attributes, bind, elements, map, ref, Ref, str } from "@swrf/core";
import { render } from "../src";

const { button, div, br, input } = elements;
const { onclick, style } = attributes;

function counter() {
	const array = ref<Ref<string>[]>(
		Array(10)
			.fill(0)
			.map((_, i) => ref(i + " data"))
	);
	const text = ref("");
	const index = ref(0);
	const red = style({ color: "red" });

	const add = () => {
		array().splice(index(), 0, ref(text() || Math.random().toFixed(2)));
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

	const out = div(
		input({ type: "number" }, bind(str(index))),
		input(bind(text)),
		button(onclick(add), "add"),
		button(onclick(remove), red, "remove"),
		button(onclick(shuffle), "shuffle"),
		br(),
		map(array, (n) => {
			return div(
				"value=",
				n,
				input(bind(n)),
				button(
					onclick(() => array(array().filter((x) => x !== n))),
					red,
					"remove"
				)
			);
		})
	);
	return out;
}

const start = performance.now();
const out = render(() => counter());

console.log(performance.now() - start);
console.log(out.outerHTML);
