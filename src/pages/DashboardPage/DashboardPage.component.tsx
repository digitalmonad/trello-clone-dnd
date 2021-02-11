import { AddNewItem } from "../../components/AddNewItem";
import { AppActionKind } from "../../app/types/AppState.types";
import { Column } from "../../components/Column";
import { useAppState } from "../../utils/hooks/useAppState";

export const DashbordPage = () => {
  const { state, dispatch } = useAppState();
  return (
    <>
      {state.columns.map((column, i) => (
        <Column text={column.text} key={column.id} index={i} id={column.id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Column'
        onAdd={(text) =>
          dispatch({ type: AppActionKind.ADD_COLUMN, payload: { text } })
        }
        dark
      />
    </>
  );
};
