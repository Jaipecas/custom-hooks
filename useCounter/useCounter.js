import { useState } from "react";

export const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue);

  const add = (value) => setCounter(counter + value);
  const reset = () => setCounter(initialValue);
  const substract = (value) => setCounter(counter - value);

  return {
    counter,
    add,
    reset,
    substract,
  };
};
