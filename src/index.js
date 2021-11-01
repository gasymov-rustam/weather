import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./hooks/useData";
import { YMaps } from "react-yandex-maps";

ReactDOM.render(
  <YMaps>
    <React.StrictMode>
      <BrowserRouter>
        <DataProvider>
          <App />
        </DataProvider>
      </BrowserRouter>
    </React.StrictMode>
  </YMaps>,
  document.getElementById("root")
);
