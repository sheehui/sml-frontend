import "./App.css";
import { runInContext, createContext } from "sml-slang";
import { Variant } from "sml-slang/dist/types";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState("");
  const [progOutput, setProgOutput] = useState("Run your code!");
  const [hasError, setHasError] = useState(false);
  const context = createContext(Variant.DEFAULT, undefined, undefined);
  const options = {
    scheduler: "preemptive",
    executionMethod: "interpreter",
    variant: Variant.DEFAULT,
    useSubst: false,
  };

  function handleRun() {
    setHasError(false);
    runInContext(userInput, context, options)
      .catch((error) => {
        setProgOutput(error.explain());
        setHasError(true);
      })
      .then((data) => {
        if (data) {
          setProgOutput(data.value.value);
        }
      });
  }

  return (
    <div className="App">
      <div className="nav"> SML Slang </div>
      <div className="container">
        <div className="input">
          Type your Standard ML input here!
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={40}
            cols={80}
            autoFocus
            className="input-box"
          />
          <button onClick={handleRun} className="button">
            Run
          </button>
        </div>
        <div className="output">
          <div>
            {hasError ? (
              <img src="./sad-kermit.png" alt="sad kermit" />
            ) : (
              <img src="./happy-kermit.png" alt="sad kermit" />
            )}
          </div>
          <div className="output-list">
            <div className="output-box">{progOutput}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
