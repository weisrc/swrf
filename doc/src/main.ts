import {
  attributes,
  render,
  tags,
  signal,
  For,
  Show,
  bind,
  effect,
  arraySignal
} from "@swrf/core";

const { div, button, h1, input, template } = tags;
const { onclick, onmount, ref } = attributes;

const App = () => {
  const showList = signal(false);
  const array = arraySignal(new Array(3000).fill(0).map(() => signal("")));

  array.subscribe(console.log);

  const buttonRef = signal<HTMLButtonElement>();

  effect(() => {
    console.log("effect", buttonRef());
  });

  const forOut = For(array, (v, i) => {
    return div(
      i,
      input(bind("input", v)),
      v,
      input({ placeholder: "placeholder" }),
      button(
        onclick(() => {
          array.splice(i(), 1);
        }),
        "remove"
      ),
      Show(
        () => v().startsWith("0"),
        div(
          {
            style: {
              color: "red",
              fontWeight: "bold"
            }
          },
          "starts with 0"
        )
      )
    );
  });

  return div(
    onmount(() => console.log("mounted 2")),
    h1("Hello World!"),
    button(
      ref(buttonRef),
      onclick(() => {
        array.unshift(signal(""));
      }),
      "add"
    ),
    button(
      onclick(() => {
        showList(!showList());
      }),
      "toggle"
    ),
    Show(showList, div(forOut)),
    "some text here"
  );
};

render(App(), document.getElementById("app")!);
