import React, { useState } from "react";
import "./App.css";

const BUTTONS = [
  "7","8","9","+",
  "4","5","6","-",
  "1","2","3","*",
  "C","0","=","/"
];

const isOperator = (ch) => ["+","-","*","/"].includes(ch);

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const appendChar = (ch) => {
    if (ch === "C") {
      setInput("");
      setResult("");
      return;
    }

    if (ch === "=") {
      // 1. If input is empty → show Error
      if (input.trim() === "") {
        setResult("Error");
        return;
      }

      // 2. Prevent evaluation if last char is operator or dot
      const lastChar = input.slice(-1);
      if (isOperator(lastChar) || lastChar === ".") {
        setResult("Error");
        return;
      }

      // 3. Validate input: only numbers, operators, parentheses, spaces, dot
      if (!/^[0-9+\-*/().\s]+$/.test(input)) {
        setResult("Error");
        return;
      }

      try {
        // 4. Evaluate expression (BODMAS via JS)
        // eslint-disable-next-line no-eval
        const val = eval(input);
        setResult(String(val));
      } catch (e) {
        setResult("Error");
      }
      return;
    }

    // If operator clicked
    if (isOperator(ch)) {
      if (input === "" && ch !== "-") return;

      const last = input.slice(-1);
      if (isOperator(last)) {
        setInput(input.slice(0, -1) + ch);
        return;
      }
      setInput(input + ch);
      return;
    }

    // number or dot
    setInput(input + ch);
  };

  return (
    <div className="container">
      <h1 className="title">React Calculator</h1>
      <div className="calculator">
        <input
          className="input"
          type="text"
          value={input}
          readOnly
          aria-label="calculator-input"
        />
        <div className="result" aria-live="polite">{result}</div>

        <div className="buttons-grid">
          {BUTTONS.map((b) => (
            <button
              key={b}
              className={"btn " + (b === "=" ? "btn-eq" : "")}
              onClick={() => appendChar(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
