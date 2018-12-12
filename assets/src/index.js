import React, { useEffect } from "react";
import { node } from "prop-types";
import ReactDOM from "react-dom";
import App from "./App";
import "./fonts/fonts.scss";
import { StoreProvider, useReduxStore } from "./store";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    ReactDOM.render(
      <StoreProvider>
        <App />
      </StoreProvider>,
      document.getElementById("root")
    );
  });
}
