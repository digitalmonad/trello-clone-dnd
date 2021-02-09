import React, { createContext, useContext, useReducer } from "react";
import {
  findItemIndexById,
  insertItemAtIndex,
  moveItem,
  overrideItemAtIndex,
  removeItemAtIndex,
} from "./utils/arrayUtils";

import { DragItem } from "./DragItem.type";
import { nanoid } from "nanoid";

export type Task = { id: string; text: string };

export type List = { id: string; text: string; tasks: Task[] };

export type AppState = {
  lists: List[];
  draggedItem: DragItem | undefined;
};

export enum AppActionKind {
  "ADD_LIST" = "ADD_LIST",
  "ADD_TASK" = "ADD_TASK",
  "MOVE_LIST" = "MOVE_LIST",
  "MOVE_TASK" = "MOVE_TASK",
  "SET_DRAGGED_ITEM" = "SET_DRAGGED_ITEM",
}

type Action =
  | {
      type: AppActionKind.ADD_LIST;
      payload: { text: string };
    }
  | {
      type: AppActionKind.ADD_TASK;
      payload: { text: string; listId: string };
    }
  | {
      type: AppActionKind.MOVE_LIST;
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
        sourceColumn: string;
        targetColumn: string;
      };
    };

const appStateReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case AppActionKind.ADD_LIST: {
      const { text } = action.payload;
      const newList: List = {
        id: nanoid(),
        text,
        tasks: [],
      };

      return { ...state, lists: [...state.lists, newList] };
    }
    case AppActionKind.ADD_TASK: {
      const targetListIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      );

      const targetList = state.lists[targetListIndex];

      const updatedTargetList = {
        ...targetList,
        tasks: [
          ...targetList.tasks,
          { id: nanoid(), text: action.payload.text },
        ],
      };
      return {
        ...state,
        lists: overrideItemAtIndex(
          state.lists,
          updatedTargetList,
          targetListIndex
        ),
      };
    }
    case AppActionKind.MOVE_LIST: {
      const { dragIndex, hoverIndex } = action.payload;

      return {
        ...state,
        lists: moveItem(state.lists, dragIndex, hoverIndex),
      };
    }

    case AppActionKind.MOVE_TASK: {
      const {
        dragIndex,
        hoverIndex,
        sourceColumn,
        targetColumn,
      } = action.payload;
      const sourceListIndex = findItemIndexById(state.lists, sourceColumn);

      const targetListIndex = findItemIndexById(state.lists, targetColumn);
      const sourceList = state.lists[sourceListIndex];
      const task = sourceList.tasks[dragIndex];

      const updatedSourceList = {
        ...sourceList,
        tasks: removeItemAtIndex(sourceList.tasks, dragIndex),
      };

      const stateWithUpdatedSourceList = {
        ...state,
        lists: overrideItemAtIndex(
          state.lists,
          updatedSourceList,
          sourceListIndex
        ),
      };

      const targetList = stateWithUpdatedSourceList.lists[targetListIndex];

      const updatedTargetList = {
        ...targetList,
        tasks: insertItemAtIndex(targetList.tasks, task, hoverIndex),
      };

      return {
        ...stateWithUpdatedSourceList,
        lists: overrideItemAtIndex(
          stateWithUpdatedSourceList.lists,
          updatedTargetList,
          targetListIndex
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
  lists: [
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
