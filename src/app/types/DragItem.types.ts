export enum DragItemKind {
  "COLUMN" = "COLUMN",
  "CARD" = "CARD",
}

export type ColumnDragItemT = {
  index: number;
  id: string;
  text: string;
  type: DragItemKind.COLUMN;
};

export type CardDragItemT = {
  index: number;
  id: string;
  columnId: string;
  text: string;
  type: DragItemKind.CARD;
};

export type DragItemT = ColumnDragItemT | CardDragItemT;
