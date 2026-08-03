import React, { useState, useRef, useEffect } from "react";

function FocusAndCounter() {
  const [count, setCount] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const renderCount = useRef<number>(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  const focusInput = () => {
    inputRef.current?.focus(); // ✅ safe access
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus me" />

      <button onClick={focusInput}>Focus Input</button>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <p>This component has rendered {renderCount.current} times</p>
    </div>
  );
}

export default FocusAndCounter;