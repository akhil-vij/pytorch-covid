import React, { Suspense, lazy } from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./components/Home/Home";
import SidebarHome from "./components/Home/SidebarHome";
import HeaderHome from "./components/Home/HeaderHome";
// For lazy loading components
const Classify = lazy(() => import("./components/Classify"));
const Compare = lazy(() => import("./components/Compare"));
const Study = lazy(() => import("./components/Study"));
const Resources = lazy(() => import("./components/Resources/Resources"));

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={HeaderHome} />
          <Route component={Header} />
        </Switch>
        <Switch>
          <Route exact path="/" component={SidebarHome} />
          <Route component={Sidebar} />
        </Switch>

        <Switch>
          <Route exact path="/" component={Home} />
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/classify" component={Classify} />
                <Route path="/compare" component={Compare} />
                <Route path="/study" component={Study} />
                <Route path="/resources" component={Resources} />
              </Switch>
            </Suspense>
          </main>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
