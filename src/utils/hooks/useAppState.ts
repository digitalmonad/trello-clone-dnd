import { AppStateContext } from "../../app/contexts/AppStateContext";
import { useContext } from "react";

export const useAppState = () => {
  return useContext(AppStateContext);
};
