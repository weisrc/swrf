import { elements, map, ref, render, attributes } from "@swrf/core";

const { div, button } = elements;
const { onclick } = attributes;
const count = ref(0);

function app() {
	return div(
		button(
			onclick(() => count(count() + 1)),
			"click me ",
			count,
      " times"
		),
		map(
			() => new Array(count()),
			() => div("hello world")
		)
	);
}

render(app, document.body);
