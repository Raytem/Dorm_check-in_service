import React, { useEffect, useRef, useState } from 'react';
import { Button, Divider, Text, Textarea, TextareaProps } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons-react';
import classes from './editable-text.module.css';

export interface EditableTextProps {
  initialText: string;
  onSave: (text: string) => void;
  placeholder?: string;
  textAreaProps?: Omit<TextareaProps, 'value' | 'onChange'>;
}

const EditableText: React.FC<EditableTextProps> = ({
  initialText,
  onSave,
  placeholder = '',
  textAreaProps = {},
}) => {
  const [text, setText] = useState(initialText);
  const [draftText, setDraftText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const editableTextAreaWrapperRef = useClickOutside(() => {
    if (!isEditing) return;
    saveText(draftText);
    setIsEditing(false);
  });

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isEditing) return;
    setFocusToEndOfTextArea();
  }, [isEditing]);

  const saveText = (newText: string) => {
    if (newText === text) return;
    setText(newText);
    onSave(newText);
  };

  const setFocusToEndOfTextArea = () => {
    if (!textAreaRef?.current) return;
    const el = textAreaRef.current;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  };

  // handlers

  const onTextClick = () => {
    if (isEditing) return;
    setIsEditing(true);
  };

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = e.target.value;
    setDraftText(textValue);
  };

  const onSaveClick = () => {
    setIsEditing(false);
    saveText(draftText);
  };

  const onCancelClick = () => {
    setDraftText(text);
    setIsEditing(false);
  };

  const editingView = (
    <div
      className={classes['editable-textarea-wrapper']}
      ref={editableTextAreaWrapperRef}
    >
      <Textarea
        className={classes['editable-textarea-wrapper__textarea']}
        value={draftText}
        onChange={onTextareaChange}
        ref={textAreaRef}
        variant="unstyled"
        {...textAreaProps}
      />

      <Divider />

      <div className={classes['editable-textarea-wrapper__bottom-toolbar']}>
        <Button onClick={onSaveClick} size="compact-sm" radius="sm">
          Сохранить
        </Button>
        <Button
          onClick={onCancelClick}
          size="compact-sm"
          radius="sm"
          variant="subtle"
        >
          Отменить
        </Button>
      </div>
    </div>
  );

  const readonlyView = (
    <div onClick={onTextClick} className={classes['editable-text-wrapper']}>
      <Text className={classes['editable-text']}>
        {text.length === 0 ? placeholder : text}
      </Text>
      <IconPencil size={16} className={classes['editable-icon']} />
    </div>
  );

  return <>{isEditing ? editingView : readonlyView}</>;
};

export default EditableText;
