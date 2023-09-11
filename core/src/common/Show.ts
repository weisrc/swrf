import type { Child, Readable, Props } from "../types";
import { read } from "./read";

export let Show =
  (
    props: Props<{ when: boolean }> | Readable<boolean>,
    then: Readable<Child>
  ) =>
  () =>
    read((props as Props<{ when: boolean }>).when ?? props) ? read(then) : null;
