import { DragPreviewContainer } from "../../styles/globalStyles";
import styled from "styled-components";

export const ColumnContainer = styled(DragPreviewContainer)`
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  padding: 8px 8px;
  flex-grow: 0;
  &:hover {
    cursor: pointer;
  }
`;

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
  color: #939d99;
  &:hover {
    color: #000;
  }
`;
