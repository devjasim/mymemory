import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import reducers from "./reducers";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
