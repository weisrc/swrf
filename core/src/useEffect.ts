export let handler = () => {};

export const useEffect = (fn: () => void) => {
	const currentHandler = () => {
		const previousHandler = handler;
		handler = currentHandler;
		fn();
		handler = previousHandler;
	};
	currentHandler();
};
