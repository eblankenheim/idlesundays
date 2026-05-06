import React from "react";
import ReactDOM from "react-dom/client";
import { IonReactRouter } from "@ionic/react-router"; // Import IonReactRouter
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <IonReactRouter>
    <App />
  </IonReactRouter>
);
