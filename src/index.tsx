import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store, {  persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react'

import 'bootstrap/dist/css/bootstrap.min.css';
// import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css");


// const store = store();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
  rootElement
);
 