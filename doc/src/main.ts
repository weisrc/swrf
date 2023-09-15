import {
  arraySignal,
  attributes,
  bind,
  For,
  fastFor,
  render,
  Show,
  signal,
  tags
} from "@swrf/core";

const { div, button, h1, input } = tags;
const { onclick, ref } = attributes;

const App = () => {
  const showList = signal(false);

  const array = arraySignal(
    Array(1000)
      .fill(0)
      .map((_, i) => signal(`${i}`))
  );

  const buttonRef = signal<HTMLButtonElement>();

  const [_, forOut] = fastFor(array, (v) => {
    return div(
      input(bind("input", v)),
      v,
      input({ placeholder: "placeholder" }),
      button(
        onclick(() => {
          return () => {
            const i = array.indexOf(v);
            array.splice(i, 1);
          };
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
    h1("Hello World!"),
    button(
      ref(buttonRef),
      onclick(() => {
        return () => {
          array.unshift(signal(""));
        };
      }),
      "add"
    ),
    button(
      onclick(() => {
        return () => showList(!showList());
      }),
      "toggle"
    ),
    forOut()
  );
};

render(App, document.getElementById("app")!);
