import { ActionT, AppActionKind, AppStateT } from "../types/AppState.types";
import { append, findIndex, lensPath, over, pipe, propEq, view } from "ramda";
import {
  findItemIndexById,
  insertItemAtIndex,
  moveItem,
  overrideItemAtIndex,
  removeItemAtIndex,
} from "../../utils/arrayUtils";

import { ColumnT } from "../types/AppState.types";
import { nanoid } from "nanoid";

const columnsLens = lensPath(["columns"]);

export const appStateReducer = (state: AppStateT, action: ActionT) => {
  switch (action.type) {
    case AppActionKind.ADD_COLUMN: {
      const { text } = action.payload;
      const newColumn: ColumnT = {
        id: nanoid(),
        text,
        tasks: [],
      };

      return over(columnsLens, append(newColumn), state);
    }
    case AppActionKind.ADD_TASK: {
      const { columnId } = action.payload;
      const targetColumnIndex = pipe(
        view(columnsLens),
        findIndex(propEq("id", columnId))
      )(state);

      const targetColumn = state.columns[targetColumnIndex];

      const updatedTargetColumn = {
        ...targetColumn,
        tasks: [
          ...targetColumn.tasks,
          { id: nanoid(), text: action.payload.text },
        ],
      };
      return {
        ...state,
        columns: overrideItemAtIndex(
          state.columns,
          updatedTargetColumn,
          targetColumnIndex
        ),
      };
    }
    case AppActionKind.MOVE_COLUMN: {
      const { dragIndex, hoverIndex } = action.payload;

      return {
        ...state,
        columns: moveItem(state.columns, dragIndex, hoverIndex),
      };
    }

    case AppActionKind.MOVE_TASK: {
      const {
        dragIndex,
        hoverIndex,
        sourceColumnId,
        targetColumnId,
      } = action.payload;
      const sourceColumnIndex = findItemIndexById(
        state.columns,
        sourceColumnId
      );

      const targetColumnIndex = findItemIndexById(
        state.columns,
        targetColumnId
      );
      const sourceColumn = state.columns[sourceColumnIndex];
      const task = sourceColumn.tasks[dragIndex];

      const updatedSourceColumn = {
        ...sourceColumn,
        tasks: removeItemAtIndex(sourceColumn.tasks, dragIndex),
      };

      const stateWithUpdatedSourceColumn = {
        ...state,
        columns: overrideItemAtIndex(
          state.columns,
          updatedSourceColumn,
          sourceColumnIndex
        ),
      };

      const targetColumn =
        stateWithUpdatedSourceColumn.columns[targetColumnIndex];

      const updatedTargetColumn = {
        ...targetColumn,
        tasks: insertItemAtIndex(targetColumn.tasks, task, hoverIndex),
      };

      return {
        ...stateWithUpdatedSourceColumn,
        columns: overrideItemAtIndex(
          stateWithUpdatedSourceColumn.columns,
          updatedTargetColumn,
          targetColumnIndex
        ),
      };
    }
    case AppActionKind.SET_DRAGGED_ITEM: {
      return { ...state, draggedItem: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const appData: AppStateT = {
  columns: [
    {
      id: nanoid(),
      text: "To Do",
      tasks: [{ id: nanoid(), text: "Add all CRUD functionalities" }],
    },
    {
      id: nanoid(),
      text: "In Progress",
      tasks: [{ id: nanoid(), text: "Refactor styles" }],
    },
    {
      id: nanoid(),
      text: "Done",
      tasks: [{ id: nanoid(), text: "Generate app scaffold" }],
    },
  ],
  draggedItem: undefined,
};
