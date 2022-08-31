import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import PageLoader from "components/PageLoader";

import { setAuthHeaders } from "./apis/axios";
import { initializeLogger } from "./common/logger";
import Dashboard from "./components/Dashboard";
import CreateTask from "./components/Tasks/Create";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    setAuthHeaders(setLoading);
    // logger.info("Never use console.log");
    // logger.error("Never use console.error");
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact component={CreateTask} path="/tasks/create" />
        <Route exact component={Dashboard} path="/dashboard" />
      </Switch>
    </Router>
  );
};

export default App;
