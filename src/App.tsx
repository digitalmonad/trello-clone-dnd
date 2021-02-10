import { AppActionKind, useAppState } from "./AppStateContext";

import { AddNewItem } from "./AddNewItem";
import { AppContainer } from "./styles";
import { Column } from "./Column";
import { CustomDragLayer } from "./CustomDragLayer";

function App() {
  const { state, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      {state.columns.map((column, i) => (
        <Column text={column.text} key={column.id} index={i} id={column.id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add New Column'
        onAdd={(text) =>
          dispatch({ type: AppActionKind.ADD_COLUMN, payload: { text } })
        }
      />
    </AppContainer>
  );
}

export default App;
