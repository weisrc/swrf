export let _fn = () => {};

export const createEffect = (fn: () => void) => {
	const run = () => {
		const old = _fn;
		_fn = run;
		fn();
		_fn = old;
	};
	run();
};
