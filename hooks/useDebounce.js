import { useEffect, useState } from "react";

// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export default function useDebounce(value, delay) {
  // state and setter for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // set the debounced value to the value passed in after the specified delay
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    // return the cleanup function that will be called everytime useEffect is re-called.
    // useEffect will only be recalled if the input value changes
    return () => clearTimeout(handler);
  });

  return debouncedValue;
}
