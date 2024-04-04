import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import * as S from '@/pages/Home/Home.styles';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Plus from '@/assets/Plus.svg?react';
import TodoItem from '@components/TodoItem/TodoItem';
import Check from '@/assets/Check.svg?react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
const TODO_KEY = 'todo';

type Todo = {
  text: string;
  id: string;
  done: boolean;
  date: dayjs.Dayjs;
};

dayjs.locale('ko');

export default function Home() {
  const currentDate = dayjs();
  const [paintDate, setPaintDate] = useState(currentDate);
  const [todoValue, setTodoValue] = useState('');
  const [todoArray, setTodoArray] = useState<Todo[]>([]);
  const [updateTodo, setUpdateTodo] = useState('');
  const [completedTodoCheck, setCompletedTodoCheck] = useState(false);
  const savedTodo = localStorage.getItem(TODO_KEY);

  function todoChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setTodoValue(e.target.value);
  }

  function todoSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (todoValue.trim() === '') return;

    const newTodoObj = {
      id: Date.now().toString(),
      text: todoValue,
      done: false,
      date: paintDate,
    };

    setTodoValue('');
    setTodoArray((prevTodo) => [...prevTodo, newTodoObj]);
  }

  function deleteClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const target = e.currentTarget as HTMLButtonElement;

    if (target.parentElement?.parentElement) {
      const targetId = target.parentElement.parentElement.id;
      const updatedTodoArray = todoArray.filter((todo) => todo.id != targetId);
      setTodoArray(updatedTodoArray);
      localStorage.setItem(TODO_KEY, JSON.stringify(todoArray));
    }
  }

  function toggleClickHandler(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    const target = e.currentTarget as HTMLDivElement;
    const parentElement = target.parentElement;

    if (!parentElement) return;
    let currenTodoId = target.parentElement.id;
    const todoIndex = todoArray.findIndex((item) => item.id === currenTodoId);

    if (todoIndex !== -1) {
      const currentState = !todoArray[todoIndex].done;

      setTodoArray((prevTodoArray) => {
        const updatedTodoArray = [...prevTodoArray];
        updatedTodoArray[todoIndex] = {
          ...updatedTodoArray[todoIndex],
          done: currentState,
        };
        return updatedTodoArray;
      });

      localStorage.setItem(TODO_KEY, JSON.stringify(todoArray));
    }
  }

  function modifyClickHandler(e: React.MouseEvent<HTMLButtonElement>, todoId: string) {
    e.preventDefault();
    const todoIndex = todoArray.findIndex((item) => item.id === todoId);

    if (todoIndex !== -1) {
      const updatedTodoArray = [...todoArray];
      updatedTodoArray[todoIndex] = {
        ...updatedTodoArray[todoIndex],
        text: updateTodo,
      };

      setUpdateTodo(todoArray[todoIndex].text);
      setTodoArray(updatedTodoArray);
      localStorage.setItem(TODO_KEY, JSON.stringify(updatedTodoArray));
    }
  }

  function nextDate() {
    const addDate = paintDate.add(1, 'day');
    setPaintDate(addDate);
  }

  function prevDate() {
    const minusDate = paintDate.add(-1, 'day');
    setPaintDate(minusDate);
  }
  function completedTodoHiddenToggle() {
    setCompletedTodoCheck(!completedTodoCheck);
  }

  useEffect(() => {
    if (savedTodo) {
      const parseTodo = JSON.parse(savedTodo);
      setTodoArray(parseTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoArray));
  }, [todoArray]);

  // Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // 드래그가 취소된 경우 또는 대상 위치가 없는 경우
    if (!destination) {
      return;
    }

    // 아이템을 옮긴 후의 목록을 생성
    const updatedTodoArray = [...todoArray];
    const movedTodo = updatedTodoArray.splice(source.index, 1)[0];
    updatedTodoArray.splice(destination.index, 0, movedTodo);
    setTodoArray(updatedTodoArray);
    localStorage.setItem(TODO_KEY, JSON.stringify(updatedTodoArray));
  };

  // requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <S.DateBox>
        <button onClick={prevDate}>
          <AiOutlineLeft color="white" />
        </button>
        <S.CurrentDate>{paintDate.format('YYYY.MM.DD (ddd)')}</S.CurrentDate>
        <button onClick={nextDate}>
          <AiOutlineRight color="white" />
        </button>
      </S.DateBox>

      <S.TodoCompleteBox>
        <p>할일 완료 숨기기</p>
        <S.CompleteCheckBox onClick={completedTodoHiddenToggle} />
        {completedTodoCheck && (
          <S.CheckContainer onClick={completedTodoHiddenToggle}>
            <Check />
          </S.CheckContainer>
        )}
      </S.TodoCompleteBox>

      <S.TodoForm onSubmit={todoSubmitHandler}>
        <input placeholder="할일을 작성해보세요." value={todoValue} onChange={todoChangeHandler} />
        <button>
          <Plus />
        </button>
      </S.TodoForm>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todoArray
                .filter((item) => {
                  const itemDate = dayjs(item.date);
                  const itemDateFormat = itemDate.format('YYYY.MM.DD');
                  const paintDateFormat = paintDate.format('YYYY.MM.DD');
                  return itemDateFormat === paintDateFormat;
                })
                .map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TodoItem
                          key={index}
                          todo={todo}
                          updateTodo={updateTodo}
                          setUpdateTodo={setUpdateTodo}
                          deleteClickHandler={deleteClickHandler}
                          toggleClickHandler={toggleClickHandler}
                          modifyClickHandler={(e, todoId) => modifyClickHandler(e, todoId)}
                          completedTodoCheck={completedTodoCheck}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
