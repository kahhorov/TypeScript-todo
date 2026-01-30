import { createContext, useState, useEffect, type ReactNode } from "react";

export interface Todo {
  id: string;
  text: string;
  time: string;
  isDone: boolean;
}

interface TodoContextType {
  todo: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoContext = createContext<TodoContextType | null>(null);

type Props = {
  children: ReactNode;
};

export default function DataContext({ children }: Props) {
  const [todo, setTodo] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  return (
    <TodoContext.Provider value={{ todo, setTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
