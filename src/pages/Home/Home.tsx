import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import * as S from '@/pages/Home/Home.styles';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Plus from '@/assets/Plus.svg?react';
import TodoItem from '@components/TodoItem/TodoItem';

const TODO_KEY = 'todo';

type Todo = {
  text: string;
  id: string;
  done: boolean;
  date: dayjs.Dayjs;
};

dayjs.locale('ko');
// currentDate.format('YYYY.MM.DD (ddd)');

export default function Home() {
  const currentDate = dayjs(); // 오늘 날짜를 불러오는 메소드
  const [paintDate, setPaintDate] = useState(currentDate); // 화면에 나오는 날짜..................
  const [todoValue, setTodoValue] = useState('');
  const [todoArray, setTodoArray] = useState<Todo[]>([]);
  const [updateTodo, setUpdateTodo] = useState('');
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

  useEffect(() => {
    if (savedTodo) {
      const parseTodo = JSON.parse(savedTodo);
      setTodoArray(parseTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoArray));
  }, [todoArray]);

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

      <S.TodoForm onSubmit={todoSubmitHandler}>
        <input placeholder="할일을 작성해보세요." value={todoValue} onChange={todoChangeHandler} />
        <button>
          <Plus />
        </button>
      </S.TodoForm>

      {todoArray
        .filter((item) => {
          const itemDate = dayjs(item.date);
          const itemDateFormat = itemDate.format('YYYY.MM.DD');
          const paintDateFormat = paintDate.format('YYYY.MM.DD');
          return itemDateFormat === paintDateFormat;
        })
        .map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            updateTodo={updateTodo}
            setUpdateTodo={setUpdateTodo}
            deleteClickHandler={deleteClickHandler}
            toggleClickHandler={toggleClickHandler}
            modifyClickHandler={(e, todoId) => modifyClickHandler(e, todoId)}
          />
        ))}
    </>
  );
}
