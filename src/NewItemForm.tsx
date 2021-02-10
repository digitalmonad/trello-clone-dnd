import {
  CancelNewItemFormButton,
  NewItemButton,
  NewItemFormContainer,
  NewItemInput,
} from "./styles";
import React, { useState } from "react";

import { useFocus } from "./utils/hooks/useFocus";

interface NewItemFormProps {
  onAdd: (text: string) => void;
  onCancel: () => void;
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAdd(text);
    }
  };
  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleAddText}
      />
      <NewItemButton onClick={() => onAdd(text)}> Create</NewItemButton>
      <CancelNewItemFormButton>Close</CancelNewItemFormButton>
    </NewItemFormContainer>
  );
};
