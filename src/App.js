import React from "react";

function App(props) {
  return (
    <div className="App">
      <div>This is div from remote App</div>
      <button onClick={props?.onChange}>+</button>
    </div>
  );
}

export default App;
