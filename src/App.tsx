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
      {state.lists.map((list, i) => (
        <Column text={list.text} key={list.id} index={i} id={list.id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add New List'
        onAdd={(text) =>
          dispatch({ type: AppActionKind.ADD_LIST, payload: { text } })
        }
      />
    </AppContainer>
  );
}

export default App;
