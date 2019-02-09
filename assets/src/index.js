import "./rlhConfig";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./fonts/fonts.scss";
import { StoreProvider } from "./store";
import configureStore from "./configureStore";

const store = configureStore();

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
// ReactDOM.render(<TestApp />, document.getElementById("root"));
// if (module.hot) {
//   module.hot.accept("./App", () => {
//     const NextApp = require("./App").default;
//     ReactDOM.render(
//       <StoreProvider store={store}>
//         <NextApp />
//       </StoreProvider>,
//       document.getElementById("root")
//     );
//   });
// }
