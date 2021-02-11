import { AppActionKind, TaskT } from "../../app/types/AppState.types";
import { ColumnContainer, ColumnTitle } from "./Column.styles";
import { DragItemKind, DragItemT } from "../../app/types/DragItem.types";
import React, { useRef } from "react";

import { AddNewItem } from "../AddNewItem";
import { Card } from "../Card";
import { isHidden } from "../../utils/globals/isHidden";
import { useAppState } from "../../utils/hooks/useAppState";
import { useDragItem } from "../../utils/hooks/useDragItem";
import { useDrop } from "react-dnd";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useDragItem({ type: DragItemKind.COLUMN, id, index, text });

  const [, drop] = useDrop({
    accept: [DragItemKind.COLUMN, DragItemKind.CARD],
    hover(item: DragItemT) {
      if (item.type === DragItemKind.COLUMN) {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }
        dispatch({
          type: AppActionKind.MOVE_COLUMN,
          payload: { dragIndex, hoverIndex },
        });
        item.index = hoverIndex;
      } else {
        const dragIndex = item.index;
        const hoverIndex = 0;
        const sourceColumnId = item.columnId;
        const targetColumnId = id;

        if (sourceColumnId === targetColumnId) {
          return;
        }

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
    <ColumnContainer
      {...{ ref, isPreview }}
      isHidden={isHidden(state.draggedItem, DragItemKind.COLUMN, id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.columns[index].tasks.map((task, i) => (
        <Card
          id={task.id}
          columnId={id}
          text={task.text}
          key={task.id}
          index={i}
        />
      ))}
      <AddNewItem
        toggleButtonText='+ Task'
        onAdd={(text) =>
          dispatch({
            type: AppActionKind.ADD_TASK,
            payload: { text, columnId: id },
          })
        }
        dark
      />
    </ColumnContainer>
  );
};
