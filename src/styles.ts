import styled from "styled-components";

export const AppContainer = styled.div`
  background-color: #0d0028;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
  width: 100%;
`;

interface DragPreviewContainerProps {
  isHidden?: boolean;
  isPreview?: boolean;
}
export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transform: ${(props) => (props.isPreview ? "rotate(5deg)" : undefined)};
`;

export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
`;

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`;

export const CardContainer = styled(DragPreviewContainer)`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
`;

interface AddItemButtonProps {
  dark?: boolean;
}

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${(props) => (props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
  }
`;

export const Button = styled.button`
  background-color: #fff;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #000;
  cursor: pointer;
  padding: 6px 12px;
  text-align: center;
  transition: background 85ms ease-in;
  font-weight: bold;
  &:hover {
    background-color: #65c64c;
  }
`;

export const NewItemButton = styled(Button)`
  background-color: #5aac44;
  color: #fff;
  letter-spacing: 1px;
  &:hover {
    background-color: #65c64c;
  }
`;

export const CancelNewItemFormButton = styled(Button)`
  background-color: #d52020;
  color: #fff;
  letter-spacing: 1px;
  &:hover {
    background-color: #ff4545;
  }
`;

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`;

export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;
