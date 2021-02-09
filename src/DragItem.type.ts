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
