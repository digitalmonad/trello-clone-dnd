import { AppActionKind } from "../../app/types/AppState.types";
import { DragItemT } from "../../app/types/DragItem.types";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useAppState } from "./useAppState";
import { useDrag } from "react-dnd";
import { useEffect } from "react";

export const useDragItem = (item: DragItemT) => {
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
