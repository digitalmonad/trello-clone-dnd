export enum DragItemKind {
  "COLUMN" = "COLUMN",
  "CARD" = "CARD",
}

export type ColumnDragItem = {
  index: number;
  id: string;
  text: string;
  type: DragItemKind.COLUMN;
};

export type CardDragItem = {
  index: number;
  id: string;
  columnId: string;
  text: string;
  type: DragItemKind.CARD;
};

export type DragItem = ColumnDragItem | CardDragItem;

export enum AppActionKind {
  "ADD_COLUMN" = "ADD_COLUMN",
  "ADD_TASK" = "ADD_TASK",
  "MOVE_COLUMN" = "MOVE_COLUMN",
  "MOVE_TASK" = "MOVE_TASK",
  "SET_DRAGGED_ITEM" = "SET_DRAGGED_ITEM",
}
