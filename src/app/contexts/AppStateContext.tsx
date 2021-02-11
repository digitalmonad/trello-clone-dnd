import React, { createContext, useReducer } from "react";
import { appData, appStateReducer } from "../states/appState";

import { AppStateContextProps } from "../types/AppState.types";

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
