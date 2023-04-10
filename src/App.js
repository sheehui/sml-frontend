import "./App.css";
import { runInContext, createContext } from "sml-slang";
import { Variant } from "sml-slang/dist/types";
import { smlTypeToString, smlTypedValToString } from "sml-slang/dist/utils/formatters";
import { useState, useEffect } from "react";
import { CompileTimeSourceError } from 'sml-slang/dist/errors/compileTimeSourceError'
import { RuntimeSourceError } from 'sml-slang/dist/errors/runtimeSourceError'

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

  useEffect(() => {
   setUserInput("")
   setProgOutput("Run your code!")
   setHasError(false)
  }, []);

  function handleRun() {
    setHasError(false);
    runInContext(userInput, context, options)
      .then((data) => {
        if (data.value) {
          setProgOutput(`
          ${smlTypedValToString(data.value)} : ${smlTypeToString(data.value.type)}`);
        }
      }, (error) => {
        if (error instanceof RuntimeSourceError || error instanceof CompileTimeSourceError) {
          setProgOutput(error.explain());
        } else {
          setProgOutput(error.message);
        }
        setHasError(true);
      });
  }

  return (
    <div className="App">
      <h1 className="nav">SML Slang</h1>
      <div className="container">
        <div className="input">
          <h3>Type your Standard ML input here!</h3>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={30}
            cols={80}
            autoFocus
            className="input-box"
          />
          <button onClick={handleRun} className="button">
            Run
          </button>
        </div>
        <div className="output">
          <div className="kermy">
            {hasError ? (
              <img src="./sad-kermit.png" alt="sad kermit" />
            ) : (
              <img src="./happy-kermit.png" alt="happy kermit" />
            )}
          </div>
          <div className="output-list" style={{
            color : hasError ? '#C41E3A' : 'black'
          }}>
            <div className="output-box">{progOutput}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
