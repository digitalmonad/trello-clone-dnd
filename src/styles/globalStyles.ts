import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
html,
body,
#root {
  height: 100%;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

input:focus, textarea:focus, select:focus{
        outline: none;
    }
`;

interface DragPreviewContainerProps {
  isHidden?: boolean;
  isPreview?: boolean;
}
export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transform: ${(props) => (props.isPreview ? "rotate(5deg)" : undefined)};
`;

export const Button = styled.button`
  background-color: #fff;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #000;
  cursor: pointer;
  padding: 10px 12px;
  text-align: center;
  transition: background 85ms ease-in;
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
