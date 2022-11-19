import { Ref } from "./types";

export const into = (ref: Ref<string>) => (e: Event) =>
	ref((e.currentTarget as HTMLInputElement)?.value);

export const bind = (value: Ref<string>) => ({
	value,
	oninput: into(value),
});
