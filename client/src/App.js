import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Main from './page/Main';
import Home from './page/Home';
import Login from './page/Login';
import './App.css';


const App = () => {
  return (
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;