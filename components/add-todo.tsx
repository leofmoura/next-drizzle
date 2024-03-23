"use client";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createTodo: (value: string, remarks: string[]) => void;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  // State for handling input value
  const [input, setInput] = useState("");
  const [textarea, setTextarea] = useState("");

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
  };

  // Event handler for adding a new todo
  const handleAdd = async () => {
    createTodo(input, textarea?.split("\n") || []);
    setInput("");
    setTextarea("");
  };

  // Rendering the AddTodo component
  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      {/* Input field for entering new todo text */}
      <span>Title</span>
      <input
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleInput}
        value={input}
      />
      <span>Remarks</span>
      <textarea
        rows={3}
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleTextarea}
        placeholder="Add a remark on each line"
        value={textarea}
      />
      {/* Button for adding a new todo */}
      <button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;
