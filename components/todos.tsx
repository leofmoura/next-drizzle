"use client";
import { FC, useState } from "react";
import {
  GetDataType,
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "@/actions/todo.actions";
import { TodoWithRemarksType } from "@/db/schema";
import AddTodo from "./add-todo";
import Todo from "./todo";
import { datetime } from "drizzle-orm/mysql-core";

const Todos = ({ todos }: { todos: GetDataType }) => {
  // State to manage the list of todo items
  const [todoItems, setTodoItems] = useState<GetDataType>(todos);

  // Function to create a new todo item
  const createTodo = async (text: string, remarks: string[]) => {
    const newId = await addTodo(text, remarks);

    setTodoItems((prev) => [
      ...prev,
      {
        id: newId,
        text,
        done: false,
        totalRemarks: 0,
      },
    ]);
  };

  // Function to change the text of a todo item
  const changeTodoText = (id: string, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    editTodo(id, text);
  };

  // Function to toggle the "done" status of a todo item
  const toggleIsTodoDone = (id: string) => {
    setTodoItems((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
    toggleTodo(id, true);
  };

  // Function to delete a todo item
  const deleteTodoItem = (id: string) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  // Rendering the Todo List component
  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
      <div className="text-5xl font-medium">To-do app</div>
      <div className="w-full flex flex-col mt-8 gap-2">
        {/* Mapping through todoItems and rendering Todo component for each */}
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoText={changeTodoText}
            toggleIsTodoDone={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
      {/* Adding Todo component for creating new todos */}
      <AddTodo createTodo={createTodo} />
    </main>
  );
};

export default Todos;
