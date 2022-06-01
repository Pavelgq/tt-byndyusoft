import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

export function arrayHandler(array) {
  if (!array.length) {
    return NaN;
  }
  console.log(array);

  let middle = Infinity;
  let min = array.reduce((prev, next) => {
    if (prev > next) {
      middle = prev;
      prev = next;
    } else {
      if (middle > next) {
        middle = next;
      }
    }
    return prev;
  });
  return min + middle;
}

function App() {
  const [value, setValue] = useState("");
  const [array, setArray] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    setArray(
      arrayHandler(
        value
          .trim()
          .split(",")
          .map((el) => Number(el.trim()))
      )
    );
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input-text"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
      <span>{array}</span>
    </div>
  );
}

export default App;
