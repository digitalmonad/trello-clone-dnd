import { Button } from "../../styles/globalStyles";
import styled from "styled-components";

interface AddItemButtonProps {
  dark?: boolean;
}

export const AddItemButton = styled(Button)<AddItemButtonProps>`
  background-color: #fff;

  border-radius: 10px;
  border: 2px solid #d9e8e2;
  color: ${(props) => (props.dark ? "#000" : "#fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: center;
  transition: background 85ms ease-in, border-color 0.1s ease;
  width: 100%;
  &:hover {
    border-color: #8be8c2;
  }
`;
