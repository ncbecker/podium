import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.table(key, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  return [storedValue, setValue];
}
export default useLocalStorage;
