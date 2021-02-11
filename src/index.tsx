import App from "./app/App";
import { AppStateProvider } from "./app/contexts/AppStateContext";
import { HTML5Backend as Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={Backend}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
