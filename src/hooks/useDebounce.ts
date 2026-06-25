import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of {@link value} that updates after {@link delay} ms
 * of inactivity. On the initial render the current {@link value} is returned
 * immediately (no wait).
 *
 * @param value - Value to debounce.
 * @param delay - Debounce interval in milliseconds.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
