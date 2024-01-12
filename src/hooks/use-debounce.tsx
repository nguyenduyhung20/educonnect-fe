import { useEffect, useRef, useState } from 'react';

// Hook that debounces any fast changing value
export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  const firstUpdate = useRef(true);

  useEffect(() => {
    // Skip the first effect run after initial render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that will be called every time useEffect is re-called.
    // useEffect will only be re-called if value changes (see the inputs array below).
    // This is how we prevent debouncedValue from changing if value is changed within the delay period.
    // clearTimeout will also be called when the component is unmounted, which is a best practice.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
};
