import { DragItem } from "../types/DragItem.types";

export type TaskT = { id: string; text: string };

export type ColumnT = { id: string; text: string; tasks: TaskT[] };

export type AppState = {
  columns: ColumnT[];
  draggedItem: DragItem | undefined;
};

export enum AppActionKind {
  "ADD_COLUMN" = "ADD_COLUMN",
  "ADD_TASK" = "ADD_TASK",
  "MOVE_COLUMN" = "MOVE_COLUMN",
  "MOVE_TASK" = "MOVE_TASK",
  "SET_DRAGGED_ITEM" = "SET_DRAGGED_ITEM",
}

export type Action =
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

export interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}
