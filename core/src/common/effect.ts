export let observer = () => {};

export const effect = (fn: () => void) => {
  const current = () => {
    const previous = observer;
    observer = current;
    fn();
    observer = previous;
  };
  current();
};
