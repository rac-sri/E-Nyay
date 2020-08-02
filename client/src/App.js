import React from "react";
import "./App.css";
import CommunicationPage from "./components/CommunicationPage";
import Entry from "./components/entry";
import { Router, Link } from "@reach/router";
import Panel from "./components/panel";

function App() {
  return (
    <div className="App">
      <Router>
        <Entry path="/" default />
        <Panel path="/call" />
      </Router>
    </div>
  );
}

export default App;
