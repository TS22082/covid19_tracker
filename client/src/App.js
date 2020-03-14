import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Map from "./components/Map/Map";

import "./App.css";
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";

function App() {
  return (
    <Router>
      <Nav />
      <div>
        <Switch>
          <Route exact path="/" component={Map} />
          <Route exact path="/news" component={News} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
