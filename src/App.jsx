import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/navbar/Header";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Transaction from "./pages/Transaction";
import AuthService from "./services/AuthService";
import Monitoring from "./pages/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const classes = useStyles();

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {currentUser ? (
        <Header
          currentUser={currentUser}
          isMod={showModeratorBoard}
          isAdmin={showAdminBoard}
        />
      ) : null}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={Monitoring}
            authed={currentUser ? true : false}
          />
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/product"
            component={Product}
            authed={currentUser ? true : false}
          />
          <PrivateRoute
            exact
            path="/transaction"
            component={Transaction}
            authed={currentUser ? true : false}
          />
        </Switch>
      </main>
    </div>
  );
}

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
