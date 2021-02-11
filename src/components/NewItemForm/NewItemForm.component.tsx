import {
  CancelNewItemFormButton,
  FormInputWrapper,
  NewItemButton,
  NewItemFormContainer,
  NewItemInput,
} from "./NewItemForm.styles";
import React, { useCallback, useState } from "react";

import { useFocus } from "../../utils/hooks/useFocus";

interface NewItemFormProps {
  onAdd: (text: string) => void;
  onCancel: () => void;
}

export const NewItemForm = ({ onAdd, onCancel }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleAddTask = useCallback(() => {
    console.log("lol");
    if (text.trim().length < 1) {
      return;
    }
    onAdd(text);
  }, [onAdd, text]);

  const handleInputKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleAddTask();
      }
    },
    [handleAddTask]
  );
  return (
    <NewItemFormContainer>
      <FormInputWrapper>
        <NewItemInput
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
        <CancelNewItemFormButton onClick={handleCancel}>
          X
        </CancelNewItemFormButton>
      </FormInputWrapper>

      <NewItemButton onClick={handleAddTask}> Create</NewItemButton>
    </NewItemFormContainer>
  );
};
