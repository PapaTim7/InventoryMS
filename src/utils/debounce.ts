/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (fn: (...args: any[]) => void, ms = 1000) => {
  let timerId: number;
  return (...args: any[]) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      fn(...args);
    }, ms);
  };
};