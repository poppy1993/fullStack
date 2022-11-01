import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./page/Main";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import ForgotPassword from "./page/ForgotPassword";

const App = () => {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgot">
            <ForgotPassword />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
