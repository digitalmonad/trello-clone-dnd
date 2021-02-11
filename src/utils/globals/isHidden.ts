import { DragItemT } from "../../app/types/DragItem.types";
export const isHidden = (
  draggedItem: DragItemT | undefined,
  itemType: string,
  id: string,
  isPreview: boolean | undefined
): boolean => {
  return Boolean(
    !isPreview &&
      draggedItem &&
      draggedItem.type === itemType &&
      draggedItem.id === id
  );
};
