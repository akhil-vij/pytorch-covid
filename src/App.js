import React, { Suspense, lazy } from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// For lazy loading components
const Classify = lazy(() => import("./components/Classify"));
const Compare = lazy(() => import("./components/Compare"));
const Study = lazy(() => import("./components/Study"));
const Resources = lazy(() => import("./components/Resources"));

function App() {
  return (
    <Router>
      <div className="app">
        <Header></Header>
        <Sidebar></Sidebar>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Classify} />
              <Route path="/compare" component={Compare} />
              <Route path="/study" component={Study} />
              <Route path="/resources" component={Resources} />
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
