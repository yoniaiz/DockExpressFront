import React from "react";
import { Router, Switch } from "react-router-dom";
import { history } from "./utils/history";
import "./App.css";

import jwtDecode from "jwt-decode";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// Components
import NavBar from "./Components/Navbar";
import AuthRoute from "./utils/AuthRoute";

// pages
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

// const
import { routes as urls } from "./constants";

// utils
import MainTheme from "./utils/theme";

// redux
import store from "./redux/store";
import { getUser, setAuthanticated } from "./redux/actions";
import axios from "axios";

const theme = createMuiTheme(MainTheme);

const validToken = () => {
  try {
    const token = localStorage.getItem("FBidToken");
    if (token) {
      const decodetToken = jwtDecode(token);
      if (decodetToken.exp * 1000 > Date.now()) {
        axios.defaults.headers.common["Authorization"] = token;
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
};

if (validToken()) {
  store.dispatch(setAuthanticated());
  store.dispatch(getUser());
  if (history) history.push("/");
} else {
  history.push("/login");
}

const routes = [
  {
    route: urls.MAIN,
    component: Home,
    protectedRoute: false
  },
  {
    route: urls.REGISTER,
    component: Register,
    protectedRoute: true
  },
  {
    route: urls.LOGIN,
    component: Login,
    protectedRoute: true
  }
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router history={history}>
          <NavBar />
          <div className="container" dir="rtl">
            <Switch>
              {routes.map((route, index) => (
                <AuthRoute
                  key={index}
                  exact
                  path={route.route}
                  protectedRoute={route.protectedRoute}
                  component={route.component}
                />
              ))}
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
