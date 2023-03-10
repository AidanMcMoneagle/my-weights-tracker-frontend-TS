import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store from "./store/index";

import "./index.css";
import App from "./App";

const root = createRoot(
  document.getElementById("root") as Element | DocumentFragment
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
