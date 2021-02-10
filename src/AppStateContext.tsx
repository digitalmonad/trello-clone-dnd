import React, { createContext, useContext, useReducer } from "react";
import { append, findIndex, lensPath, over, pipe, propEq, view } from "ramda";
import {
  findItemIndexById,
  insertItemAtIndex,
  moveItem,
  overrideItemAtIndex,
  removeItemAtIndex,
} from "./utils/arrayUtils";

import { DragItem } from "./DragItem.type";
import { nanoid } from "nanoid";

export type TaskT = { id: string; text: string };

export type ColumnT = { id: string; text: string; tasks: TaskT[] };

export type AppState = {
  columns: ColumnT[];
  draggedItem: DragItem | undefined;
};

const columnsLens = lensPath(["columns"]);

export enum AppActionKind {
  "ADD_COLUMN" = "ADD_COLUMN",
  "ADD_TASK" = "ADD_TASK",
  "MOVE_COLUMN" = "MOVE_COLUMN",
  "MOVE_TASK" = "MOVE_TASK",
  "SET_DRAGGED_ITEM" = "SET_DRAGGED_ITEM",
}

type Action =
  | {
      type: AppActionKind.ADD_COLUMN;
      payload: { text: string };
    }
  | {
      type: AppActionKind.ADD_TASK;
      payload: { text: string; columnId: string };
    }
  | {
      type: AppActionKind.MOVE_COLUMN;
      payload: {
        dragIndex: number;
        hoverIndex: number;
      };
    }
  | {
      type: AppActionKind.SET_DRAGGED_ITEM;
      payload: DragItem | undefined;
    }
  | {
      type: AppActionKind.MOVE_TASK;
      payload: {
        dragIndex: number;
        hoverIndex: number;
        sourceColumnId: string;
        targetColumnId: string;
      };
    };

const appStateReducer = (state: AppState, action: Action) => {
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

const appData: AppState = {
  columns: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
  draggedItem: undefined,
};

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

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

export const useAppState = () => {
  return useContext(AppStateContext);
};
