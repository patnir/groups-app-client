import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import NewGroup from "./containers/NewGroup";
import AppliedRoute from "./components/AppliedRoute";
import Sentiment from "./containers/Sentiment";
import Groups from "./containers/Groups";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Sentiment} props={childProps} />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/groups"
      exact
      component={Home}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/groups/new"
      exact
      component={NewGroup}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/sentiment"
      exact
      component={Sentiment}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/groups/:id"
      exact
      component={Groups}
      props={childProps}
    />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
