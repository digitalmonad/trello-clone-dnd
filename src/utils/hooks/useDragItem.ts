import { AppActionKind, useAppState } from "../../AppStateContext";

import { DragItem } from "../../DragItem.type";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import { useEffect } from "react";

export const useDragItem = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    item,
    begin: () =>
      dispatch({
        type: AppActionKind.SET_DRAGGED_ITEM,
        payload: item,
      }),
    end: () =>
      dispatch({ type: AppActionKind.SET_DRAGGED_ITEM, payload: undefined }),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
