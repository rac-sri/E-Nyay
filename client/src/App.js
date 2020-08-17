import React from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import Panel from "./components/panel";

import Evidence from './components/Evidence'

function App() {
  return (
    <div className="App">
      <Router>
        <Evidence path="/" default />
        <Panel path="/call" />
      </Router>
    </div>
  );
}

export default App;
