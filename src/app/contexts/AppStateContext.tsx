import React, { createContext, useReducer } from "react";
import { appData, appStateReducer } from "../states/appState";

import { AppStateContextPropsT } from "../types/AppState.types";

export const AppStateContext = createContext<AppStateContextPropsT>(
  {} as AppStateContextPropsT
);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
