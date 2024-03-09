import * as S from '@/components/TodoItem/TodoItem.styles';
import Delete from '@/assets/Delete.svg?react';
import { useState, useRef, useEffect } from 'react';
import Check from '@/assets/Check.svg?react';
import Complete from '@/assets/Complete.svg?react';

type Todo = {
  text: string;
  id: string;
  done: boolean;
};

type TodoItemProps = {
  todo: Todo;
  deleteClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  toggleClickHandler: React.MouseEventHandler<HTMLDivElement>;
  modifyClickHandler: (e: React.MouseEvent<HTMLButtonElement>, todoId: string) => void;
  updateTodo: string;
  setUpdateTodo: any; // 수정하기
};

export default function TodoItem({
  todo,
  deleteClickHandler,
  toggleClickHandler,
  modifyClickHandler,
  updateTodo,
  setUpdateTodo,
}: TodoItemProps) {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function editModeToggle() {
    setEditMode(!editMode);
    setUpdateTodo(todo.text);
  }

  useEffect(() => {
    function handleOutSideClick(e: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setEditMode(false);
      }
    }
    window.addEventListener('mousedown', handleOutSideClick);
    return () => window.removeEventListener('mousedown', handleOutSideClick);
  }, [inputRef]);

  useEffect(() => {
    if (todo.done) {
      setEditMode(false);
    }
  });

  return (
    <S.Item id={todo.id}>
      {todo.done ? (
        <S.Checkbox onClick={toggleClickHandler} done={todo.done}>
          <span>✓</span>
        </S.Checkbox>
      ) : (
        <S.Checkbox onClick={toggleClickHandler} done={todo.done}></S.Checkbox>
      )}

      {editMode ? (
        <S.EditInput value={updateTodo} onChange={(e) => setUpdateTodo(e.target.value)} ref={inputRef} />
      ) : (
        <S.Text done={todo.done} onClick={editModeToggle}>
          {todo.text}
        </S.Text>
      )}

      <div>
        {editMode && (
          <button
            onClick={(e) => {
              modifyClickHandler(e, todo.id);
              editModeToggle();
            }}
          >
            <Check />
          </button>
        )}

        <button onClick={deleteClickHandler}>
          <Delete />
        </button>
      </div>
    </S.Item>
  );
}
