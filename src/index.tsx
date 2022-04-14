import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store, { persistor } from "./store/store";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import "bootstrap/dist/css/bootstrap.min.css";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  rootElement
);
