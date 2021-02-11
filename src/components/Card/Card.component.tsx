import { DragItemKind, DragItemT } from "../../app/types/DragItem.types";
import React, { useRef } from "react";

import { AppActionKind } from "../../app/types/AppState.types";
import { CardContainer } from "./Card.styles";
import { isHidden } from "../../utils/globals/isHidden";
import { useAppState } from "../../utils/hooks/useAppState";
import { useDragItem } from "../../utils/hooks/useDragItem";
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
    hover(item: DragItemT) {
      if (item.type === DragItemKind.CARD) {
        if (item.id === id) {
          return;
        }

        const dragIndex = item.index;
        const hoverIndex = index;
        const sourceColumnId = item.columnId;
        const targetColumnId = columnId;

        dispatch({
          type: AppActionKind.MOVE_TASK,
          payload: { dragIndex, hoverIndex, sourceColumnId, targetColumnId },
        });
        item.index = hoverIndex;
        item.columnId = targetColumnId;
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
