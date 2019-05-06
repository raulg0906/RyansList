import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../styles/main.css";

import CategoryList from "./CategoryList";
import CurrentCategory from "./CurrentCategory";
import Listing from "./Listing";

const App = props => (
  <Provider store={store}>
    <Router>
      <div className="app">
        <Route exact path="/" component={CategoryList} />
        <Route exact path="/:slug" component={CurrentCategory} />
        <Route path="/listing/:id" component={Listing} />
      </div>
    </Router>
  </Provider>
);

export default App;
