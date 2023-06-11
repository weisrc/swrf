export let _fn = () => {};

export const effect = (fn: () => void) => {
	const run = () => {
		const old = _fn;
		_fn = run;
		fn();
		_fn = old;
	};
	run();
};
