import {
  AppActionKind,
  useAppState,
} from "../../utils/contexts/AppStateContext";

import { AddNewItem } from "../../components/AddNewItem";
import { Column } from "../../components/Column";

export const DashbordPage = () => {
  const { state, dispatch } = useAppState();
  return (
    <>
      {state.columns.map((column, i) => (
        <Column text={column.text} key={column.id} index={i} id={column.id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add New Column'
        onAdd={(text) =>
          dispatch({ type: AppActionKind.ADD_COLUMN, payload: { text } })
        }
      />
    </>
  );
};
