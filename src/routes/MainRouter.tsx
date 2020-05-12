import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from "../components/Header";
import Login from "../views/Login";
import Movies from "../views/Movies";
import {
  LOGIN,
  MOVIES,
  TOKEN_VERIFICATION,
  MOVIE,
  MOVIES_BY_TYPE,
  MOVIES_CHARTS_BY_TYPE
} from "./Routes";
import TokenVerification from "../views/TokenVerification";
import MovieForm from "../views/MovieForm";
import MoviesByType from "../components/MoviesByType";
import Search from "../components/Search";
import Charts from "../views/Charts";

const MainRouter = () => {
  return (
    <Router>
      <Header />
      <Search />
      <Switch>
        <Route
          component={Login}
          path={LOGIN}
          exact
        />

        <Route
          component={TokenVerification}
          path={TOKEN_VERIFICATION}
          exact
        />

        <Route
          component={MovieForm}
          path={MOVIE}
          exact
        />

        <Route
          component={Movies}
          path={MOVIES}
          exact
        />

        <Route
          component={MoviesByType}
          path={MOVIES_BY_TYPE}
          exact
        />

        <Route
          component={Charts}
          path={MOVIES_CHARTS_BY_TYPE}
          exact
        />

        {/*Intentionally left at the bottom*/}
        <Route
          exact
          path={"/*"}
          render={() => {
            return <Redirect to={LOGIN} />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default MainRouter;