import { XYCoord, useDragLayer } from "react-dnd";

import { Card } from "../../components/Card";
import { Column } from "../../components/Column";
import { CustomDragLayerContainer } from "../../styles/globalStyles";
import { DragItemKind } from "../../DragItem.type";

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: "none",
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));
  if (!isDragging) {
    return null;
  }
  return (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === DragItemKind.COLUMN ? (
          <Column id={item.id} text={item.text} index={item.index} isPreview />
        ) : (
          <Card
            columnId={item.columnId}
            index={0}
            id={item.id}
            text={item.text}
            isPreview
          />
        )}
      </div>
    </CustomDragLayerContainer>
  );
};
