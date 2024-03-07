import * as S from '@/components/TodoItem/TodoItem.styles';
import Delete from '@/assets/Delete.svg?react';

type Todo = {
  text: string;
  id: string;
  done: boolean;
};

type TodoItemProps = {
  todo: Todo;
  deleteClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  toggleClickHandler: React.MouseEventHandler<HTMLDivElement>;
};

export default function TodoItem({ todo, deleteClickHandler, toggleClickHandler }: TodoItemProps) {
  return (
    <S.Item id={todo.id}>
      <S.Checkbox onClick={toggleClickHandler} done={todo.done}>
        <span>{todo.done ? '✓' : ''}</span>
      </S.Checkbox>
      <S.Text done={todo.done}>{todo.text}</S.Text>
      <button onClick={deleteClickHandler}>
        <Delete />
      </button>
    </S.Item>
  );
}
