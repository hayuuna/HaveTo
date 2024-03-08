import * as S from '@/components/TodoItem/TodoItem.styles';
import Delete from '@/assets/Delete.svg?react';
import { useState, useRef } from 'react';
import Check from '@/assets/Check.svg?react';

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

  // useEffect(() => {
  //   function handleClick(e: MouseEvent) {
  //     if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
  //       setEditMode(false);
  //     }
  //   }
  //   window.addEventListener('mousedown', handleClick);
  //   return () => window.removeEventListener('mousedown', handleClick);
  // }, [inputRef]);

  return (
    <S.Item id={todo.id}>
      <S.Checkbox onClick={toggleClickHandler} done={todo.done}>
        <span>{todo.done ? '✓' : ''}</span>
      </S.Checkbox>

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
