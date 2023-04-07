import './App.css'
import { runInContext, createContext } from 'sml-slang'
import { Variant } from 'sml-slang/dist/types'
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState("")
  const [progOutput, setProgOutput] = useState("Run your code!")
  const context = createContext(Variant.DEFAULT, undefined, undefined)
  const options = {
    scheduler: 'preemptive',
    executionMethod: 'interpreter',
    variant: Variant.DEFAULT,
    useSubst: false
  }

  function handleRun() {
    runInContext(userInput, context, options).then(data => {
      setProgOutput(data.value.value)
    })
  }

  return (
    <div className="App">
      <div className="input">
        sml:
        <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} />
        <button onClick={handleRun}>
          Run
        </button>
      </div>
      <div className='output'>
        {progOutput}
      </div>
    </div>
  );
}

export default App;
