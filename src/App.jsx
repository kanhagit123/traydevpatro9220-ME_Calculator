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
      if (input.trim() === "") {
        setResult("");
        return;
      }
      // allow only safe characters (digits, operators, parentheses, dot, spaces)
      if (!/^[0-9+\-*/().\s]+$/.test(input)) {
        setResult("Error");
        return;
      }
      try {
        // evaluate expression using JavaScript's precedence rules (BODMAS)
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
      // don't allow operator as first char except minus for negative numbers
      if (input === "" && ch !== "-") return;

      // replace last operator if last char is operator
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
