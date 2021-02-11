import { Button } from "../../styles/globalStyles";
import styled from "styled-components";

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin-top: 2rem;
`;

export const NewItemButton = styled(Button)`
  border: 2px solid #8be8c2;
  border-radius: 10px;
  letter-spacing: 1px;
  width: 100%;
  &:hover {
    color: #fff;
    font-weight: bold;
    border-color: #8be8c2;
    background-color: #05f090;
  }
`;

export const CancelNewItemFormButton = styled(Button)`
  color: #ff4545;
  border: 2px solid #ff4545;
  border-radius: 0 10px 10px 0;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  &:hover {
    background-color: #ff4545;
    color: white;
  }
`;

export const NewItemInput = styled.input`
  border-radius: 10px 0 0 10px;
  border: 2px solid #d9e8e2;
  border-right: none;
  transition: border-color 0.1s ease;
  padding: 0.5rem 1rem;
  width: 100%;
  &:focus {
    border: 2px solid #a8a8a8;
    border-right: none;
  }
`;

export const FormInputWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0.5rem;
`;
