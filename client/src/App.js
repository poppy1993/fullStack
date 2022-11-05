import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import Main from "./page/Main";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Item from "./page/Item";
import Detail from "./page/Detail";
import Store from "./page/Store";
import ForgotPassword from "./page/ForgotPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <div className="rc">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/item">
            <Item />
          </Route>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/store">
            <Store />
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
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
