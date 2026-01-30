import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TodoContext, type Todo } from "../../context/DataContext";
import { v4 as uuid4 } from "uuid";
import { toast } from "react-toastify";

export default function Form() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("Form must be used inside DataContext");

  const { setTodo } = context;

  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validation
    if (!text.trim()) {
      toast.error("Ish nomi kiritilmagan!");
      return;
    }

    if (!time.trim()) {
      toast.error("Vaqt kiritilmagan!");
      return;
    }

    // New todo
    const newTodo: Todo = {
      id: uuid4(),
      text,
      time,
      isDone: false,
    };

    // Update context
    setTodo((prev) => [...prev, newTodo]);

    // Success toast
    toast.success("Todo qo'shildi!");

    // Clear input fields
    setText("");
    setTime("");

    // Optional: form reset
    e.currentTarget.reset();
  }

  return (
    <form
      className="flex flex-col md:flex-row gap-3 w-full items-center"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Ish nomi..."
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Input
        type="time"
        name="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <Button type="submit" variant="primary">
        Add
      </Button>
    </form>
  );
}
