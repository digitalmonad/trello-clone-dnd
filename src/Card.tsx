import { AppActionKind, useAppState } from "./AppStateContext";
import { DragItem, DragItemKind } from "./DragItem.type";
import React, { useRef } from "react";

import { CardContainer } from "./styles";
import { isHidden } from "./utils/isHidden";
import { useDragItem } from "./utils/hooks/useDragItem";
import { useDrop } from "react-dnd";

interface CardProps {
  text: string;
  index: number;
  id: string;
  columnId: string;
  isPreview?: boolean;
}

export const Card = ({ text, id, index, columnId, isPreview }: CardProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useDragItem({
    type: DragItemKind.CARD,
    id,
    index,
    text,
    columnId,
  });
  const [, drop] = useDrop({
    accept: DragItemKind.CARD,
    hover(item: DragItem) {
      if (item.type === DragItemKind.CARD) {
        if (item.id === id) {
          return;
        }

        const dragIndex = item.index;
        const hoverIndex = index;
        const sourceColumn = item.columnId;
        const targetColumn = columnId;

        dispatch({
          type: AppActionKind.MOVE_TASK,
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
        });
        item.index = hoverIndex;
        item.columnId = targetColumn;
      }
    },
  });

  drag(drop(ref));
  return (
    <CardContainer
      isHidden={isHidden(state.draggedItem, DragItemKind.CARD, id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
};
