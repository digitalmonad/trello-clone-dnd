import { Button } from "../../styles/globalStyles";
import styled from "styled-components";

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
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

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`;
