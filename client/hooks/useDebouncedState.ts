import { useState, useEffect } from "react";

export function useDebouncedState(defaultValue: string, delay: number = 300) {
  const [value, setValue] = useState(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return { value, setValue, debouncedValue };
}
