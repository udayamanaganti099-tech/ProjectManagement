
import React, { useState, useRef, useEffect } from "react";


function FocusAndCounter() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);      
  const renderCount = useRef(0);      


  useEffect(() => {
    renderCount.current += 1;        
  });


  const focusInput = () => {
    inputRef.current.focus();          };


  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus me" />
      <button onClick={focusInput}>Focus Input</button>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>


      <p>This component has rendered {renderCount.current} times</p>
    </div>
  );
}


export default FocusAndCounter;




Return count 
