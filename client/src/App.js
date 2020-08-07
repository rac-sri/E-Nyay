import React from "react";
import "./App.css";
import CommunicationPage from "./components/CommunicationPage";
import Entry from "./components/entry";
import { Router, Link } from "@reach/router";
import Panel from "./components/panel";

import Evidence from './components/Evidence'

function App() {
  return (
    <div className="App">
      <Router>
        <Entry path="/" default />
        <Panel path="/call" />
        <Evidence path="/evidence" />
      </Router>
    </div>
  );
}

export default App;
